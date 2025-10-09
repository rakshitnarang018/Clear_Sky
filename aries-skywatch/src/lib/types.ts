export interface WeatherData {
  success: boolean;
  city: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  cloud_percentage: number;
  weather_description: string;
}

export interface ForecastData {
  success: boolean;
  city: string;
  forecast_time: string;
  temperature: number;
  humidity: number;
  pressure: number;
  wind_speed: number;
  cloud_percentage: number;
  weather_description: string;
}

export interface WeatherResponse {
  success: boolean;
  current_weather: WeatherData;
  forecast: ForecastData;
}

export interface PredictionResponse {
  success: boolean;
  place: string;
  latitude: number | null;
  longitude: number | null;
  weather: WeatherData;
  prediction: number | null;
}

export interface Aircraft {
  icao24: string;
  callsign: string | null;
  origin_country: string;
  time_position: number;
  last_contact: number;
  longitude: number | null;
  latitude: number | null;
  baro_altitude: number | null;
  geo_altitude: number | null;
  on_ground: boolean;
  velocity: number | null;
  true_track: number | null;
  vertical_rate: number | null;
  squawk: string | null;
}

export interface AirTrafficResponse {
  success: boolean;
  data: {
    success: boolean;
    aircraft_count: number;
    aircraft: Aircraft[];
  };
}

export type ObservingStatus = "Clear" | "Marginal" | "Poor";

export interface ClearSkyScore {
  score: number;
  status: ObservingStatus;
  wind_kmh: number;
  isHeuristic?: boolean;
}
