from rest_framework import serializers
from .models import APICallLog, WeatherData, AirTraffic, SatelliteTraffic


class APICallLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = APICallLog
        fields = '__all__'


class WeatherDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = WeatherData
        fields = '__all__'


class AirTrafficSerializer(serializers.ModelSerializer):
    class Meta:
        model = AirTraffic
        fields = '__all__'


#class SatelliteTrafficSerializer(serializers.ModelSerializer):
#    class Meta:
#       model = SatelliteTraffic
#       fields = '__all__'
