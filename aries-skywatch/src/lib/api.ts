import { WeatherResponse, PredictionResponse, AirTrafficResponse } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE || "";

async function fetchJSON<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  return fetchJSON<WeatherResponse>(`/api/weather/?city=${encodeURIComponent(city)}`);
}

export async function fetchPrediction(city: string): Promise<PredictionResponse> {
  return fetchJSON<PredictionResponse>(`/api/predict/?city=${encodeURIComponent(city)}`);
}

export async function fetchAirTraffic(city: string): Promise<AirTrafficResponse> {
  return fetchJSON<AirTrafficResponse>(`/api/air-traffic/?city=${encodeURIComponent(city)}`);
}
