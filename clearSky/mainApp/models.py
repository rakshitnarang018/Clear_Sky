from django.db import models


class APICallLog(models.Model):
    endpoint = models.CharField(max_length=100)
    query_params = models.JSONField(null=True, blank=True)   
    response_data = models.JSONField(null=True, blank=True)  
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.endpoint} - {self.created_at.strftime('%Y-%m-%d %H:%M:%S')}"


class WeatherData(models.Model):
    city = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)

    weather_data = models.JSONField(null=True, blank=True)   # Raw API response
    prediction_result = models.JSONField(null=True, blank=True)  # Forecast JSON

    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.city} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"


class AirTraffic(models.Model):
    data = models.JSONField(null=True, blank=True)  
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"AirTraffic - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"


class SatelliteTraffic(models.Model):
    data = models.JSONField(null=True, blank=True)   
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-timestamp']

    def __str__(self):
        return f"SatelliteTraffic - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
