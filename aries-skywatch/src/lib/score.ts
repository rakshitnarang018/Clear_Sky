import { ObservingStatus, ClearSkyScore } from "./types";

interface ScoreParams {
  cloud_percentage: number;
  humidity: number;
  wind_speed_ms: number;
  pressure_hpa: number;
}

export function computeClearSkyScore(params: ScoreParams): ClearSkyScore {
  const clamp = (v: number, min = 0, max = 1) => Math.max(min, Math.min(max, v));
  
  const wind_kmh = params.wind_speed_ms * 3.6;
  
  // Component scores (0-1 range)
  const C = 1 - clamp(params.cloud_percentage / 100);
  const H = 1 - clamp((params.humidity - 20) / 80);
  const W = 1 - clamp(wind_kmh / 40);
  const P = clamp((params.pressure_hpa - 980) / 40);
  
  // Weighted score (0-100)
  const score = 100 * (0.6 * C + 0.2 * H + 0.1 * W + 0.1 * P);
  
  let status: ObservingStatus =
    score >= 70 ? "Clear" : score >= 40 ? "Marginal" : "Poor";
  
  return {
    score: Math.round(score),
    status,
    wind_kmh: Math.round(wind_kmh),
    isHeuristic: true,
  };
}

export function getStatusFromScore(score: number): ObservingStatus {
  return score >= 70 ? "Clear" : score >= 40 ? "Marginal" : "Poor";
}

export function getStatusColor(status: ObservingStatus): string {
  const colors = {
    Clear: "status-clear",
    Marginal: "status-marginal",
    Poor: "status-poor",
  };
  return colors[status];
}

export function getStatusBadgeClass(status: ObservingStatus): string {
  const classes = {
    Clear: "status-badge-clear",
    Marginal: "status-badge-marginal",
    Poor: "status-badge-poor",
  };
  return classes[status];
}
