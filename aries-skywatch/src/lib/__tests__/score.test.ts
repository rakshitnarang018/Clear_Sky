import { describe, it, expect } from 'vitest';
import { computeClearSkyScore, getStatusFromScore } from '../score';

describe('computeClearSkyScore', () => {
  it('should return Clear status for excellent conditions', () => {
    const result = computeClearSkyScore({
      cloud_percentage: 0,
      humidity: 20,
      wind_speed_ms: 1,
      pressure_hpa: 1020,
    });

    expect(result.status).toBe('Clear');
    expect(result.score).toBeGreaterThanOrEqual(70);
    expect(result.isHeuristic).toBe(true);
  });

  it('should return Poor status for bad conditions', () => {
    const result = computeClearSkyScore({
      cloud_percentage: 100,
      humidity: 100,
      wind_speed_ms: 15,
      pressure_hpa: 980,
    });

    expect(result.status).toBe('Poor');
    expect(result.score).toBeLessThan(40);
  });

  it('should return Marginal status for moderate conditions', () => {
    const result = computeClearSkyScore({
      cloud_percentage: 50,
      humidity: 60,
      wind_speed_ms: 5,
      pressure_hpa: 1000,
    });

    expect(result.status).toBe('Marginal');
    expect(result.score).toBeGreaterThanOrEqual(40);
    expect(result.score).toBeLessThan(70);
  });

  it('should convert wind speed to km/h correctly', () => {
    const result = computeClearSkyScore({
      cloud_percentage: 10,
      humidity: 30,
      wind_speed_ms: 2.78, // ~10 km/h
      pressure_hpa: 1010,
    });

    expect(result.wind_kmh).toBeCloseTo(10, 0);
  });

  it('should clamp values within reasonable ranges', () => {
    const result = computeClearSkyScore({
      cloud_percentage: -10, // Invalid
      humidity: 150, // Invalid
      wind_speed_ms: -5, // Invalid
      pressure_hpa: 2000, // Very high
    });

    expect(result.score).toBeGreaterThanOrEqual(0);
    expect(result.score).toBeLessThanOrEqual(100);
  });
});

describe('getStatusFromScore', () => {
  it('should return Clear for scores >= 70', () => {
    expect(getStatusFromScore(70)).toBe('Clear');
    expect(getStatusFromScore(85)).toBe('Clear');
    expect(getStatusFromScore(100)).toBe('Clear');
  });

  it('should return Marginal for scores 40-69', () => {
    expect(getStatusFromScore(40)).toBe('Marginal');
    expect(getStatusFromScore(55)).toBe('Marginal');
    expect(getStatusFromScore(69)).toBe('Marginal');
  });

  it('should return Poor for scores < 40', () => {
    expect(getStatusFromScore(0)).toBe('Poor');
    expect(getStatusFromScore(20)).toBe('Poor');
    expect(getStatusFromScore(39)).toBe('Poor');
  });
});
