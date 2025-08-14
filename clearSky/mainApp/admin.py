from django.contrib import admin

from .models import WeatherData, AirTraffic, SatelliteTraffic

@admin.register(WeatherData)
class WeatherLogAdmin(admin.ModelAdmin):
    list_display = ("city", "latitude", "longitude", "timestamp")
    search_fields = ("city",)
    list_filter = ("timestamp",)

@admin.register(AirTraffic)
class AirTrafficLogAdmin(admin.ModelAdmin):
    list_display = ("timestamp",)
    list_filter = ("timestamp",)

@admin.register(SatelliteTraffic)
class SatelliteTrafficLogAdmin(admin.ModelAdmin):
    list_display = ("timestamp",)
    list_filter = ("timestamp",)
