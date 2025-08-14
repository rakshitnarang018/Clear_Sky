from django.db import models

class APICallLog(models.Model):
    endpoint = models.CharField(max_length=100)
    query_params = models.JSONField()
    response_data = models.JSONField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.endpoint} - {self.created_at}"

class WeatherData(models.Model):
    city = models.CharField(max_length=100)
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    temperature = models.FloatField()
    humidity = models.FloatField()
    pressure = models.FloatField()
    wind_speed = models.FloatField()
    cloud_percentage = models.FloatField()
    weather_description = models.CharField(max_length=255)

    visibility = models.FloatField(null=True, blank=True)  
    uv_index = models.FloatField(null=True, blank=True)
    precipitation = models.FloatField(null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - {self.timestamp.strftime('%Y-%m-%d %H:%M:%S')}"


class PredictionResult(models.Model):
    city = models.CharField(max_length=100)
    prediction = models.CharField(max_length=50)  
    model_version = models.CharField(max_length=50, default="v1")
    weather_data = models.ForeignKey(WeatherData, on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.city} - {self.prediction} - {self.timestamp}"


class AirTraffic(models.Model):
    flight_id = models.CharField(max_length=100)
    callsign = models.CharField(max_length=50, null=True, blank=True)
    origin_country = models.CharField(max_length=100)
    latitude = models.FloatField()
    longitude = models.FloatField()
    altitude = models.FloatField(null=True, blank=True)
    velocity = models.FloatField(null=True, blank=True)

    aircraft_type = models.CharField(max_length=50, null=True, blank=True)
    destination = models.CharField(max_length=100, null=True, blank=True)
    estimated_arrival = models.DateTimeField(null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.callsign or self.flight_id} - {self.timestamp}"


class SatelliteTraffic(models.Model):
    satellite_name = models.CharField(max_length=100)
    norad_id = models.IntegerField()
    latitude = models.FloatField()
    longitude = models.FloatField()
    altitude = models.FloatField()
    velocity = models.FloatField()

    operator = models.CharField(max_length=100, null=True, blank=True)
    mission_type = models.CharField(max_length=50, null=True, blank=True)  
    operational_status = models.CharField(max_length=50, null=True, blank=True)

    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.satellite_name} - {self.timestamp}"
