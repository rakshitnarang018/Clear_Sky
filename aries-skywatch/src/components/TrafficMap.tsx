import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Aircraft } from "@/lib/types";

interface TrafficMapProps {
  center: [number, number];
  aircraft: Aircraft[];
  zoom?: number;
}

export function TrafficMap({ center, aircraft, zoom = 9 }: TrafficMapProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center,
      zoom,
      zoomControl: true,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [center, zoom]);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current;
    const currentMarkers = new Map<string, L.Marker>();

    // Create plane icon with rotation
    const createPlaneIcon = (rotation: number) => {
      return L.divIcon({
        html: `<div style="transform: rotate(${rotation}deg); font-size: 20px;">✈️</div>`,
        className: "plane-marker",
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      });
    };

    // Update markers
    aircraft.forEach((plane) => {
      if (plane.latitude === null || plane.longitude === null) return;

      const key = plane.icao24;
      let marker = markersRef.current.get(key);

      if (!marker) {
        // Create new marker
        marker = L.marker([plane.latitude, plane.longitude], {
          icon: createPlaneIcon(plane.true_track ?? 0),
        });

        const popupContent = `
          <div class="text-sm">
            <strong>${plane.callsign || plane.icao24}</strong><br/>
            Country: ${plane.origin_country}<br/>
            Altitude: ${plane.baro_altitude ? `${Math.round(plane.baro_altitude)}m` : "N/A"}<br/>
            Speed: ${plane.velocity ? `${Math.round(plane.velocity * 3.6)} km/h` : "N/A"}<br/>
            Status: ${plane.on_ground ? "On Ground" : "In Flight"}
          </div>
        `;

        marker.bindPopup(popupContent);
        marker.addTo(map);
      } else {
        // Update existing marker
        marker.setLatLng([plane.latitude, plane.longitude]);
        marker.setIcon(createPlaneIcon(plane.true_track ?? 0));
      }

      currentMarkers.set(key, marker);
    });

    // Remove markers for aircraft no longer in data
    markersRef.current.forEach((marker, key) => {
      if (!currentMarkers.has(key)) {
        marker.remove();
      }
    });

    markersRef.current = currentMarkers;
  }, [aircraft]);

  return (
    <div
      ref={mapContainerRef}
      className="w-full h-full rounded-lg overflow-hidden"
      style={{ minHeight: "400px" }}
    />
  );
}
