import requests

AIR_TRAFFIC_API = "https://opensky-network.org/api/states/all"

def fetch_air_traffic(bbox=None):
    
    try:
        url = AIR_TRAFFIC_API
        params = {}
        if bbox:
            params = {
                "lamin": bbox[0],
                "lomin": bbox[1],
                "lamax": bbox[2],
                "lomax": bbox[3]
            }

        response = requests.get(url, params=params, timeout=10)
        data = response.json()

        states = data.get("states", [])
        aircraft_list = []

        for s in states[:10]:
            aircraft_list.append({
                "icao24": s[0],
                "callsign": s[1].strip() if s[1] else None,
                "origin_country": s[2],
                "time_position": s[3],
                "last_contact": s[4],
                "longitude": s[5],
                "latitude": s[6],
                "baro_altitude": s[7],
                "on_ground": s[8],
                "velocity": s[9],
                "true_track": s[10],
                "vertical_rate": s[11],
                "geo_altitude": s[13],
                "squawk": s[14],
            })

        return {
            "success": True,
            "aircraft_count": len(states),
            "aircraft": aircraft_list
        }

    except Exception as e:
        return {"success": False, "error": str(e)}


