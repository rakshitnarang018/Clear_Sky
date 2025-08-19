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

    # Store raw API response
    weather_data = models.JSONField(null=True, blank=True)   

    # Store prediction result
    prediction_result = models.CharField(max_length=100, null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - {self.prediction_result or 'N/A'} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"


class AirTraffic(models.Model):
    # Store complete air traffic API response
    data = models.JSONField(null=True, blank=True)  
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"AirTraffic - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"


class SatelliteTraffic(models.Model):
    # Store complete satellite traffic API response
    data = models.JSONField(null=True, blank=True)   
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"SatelliteTraffic - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"
