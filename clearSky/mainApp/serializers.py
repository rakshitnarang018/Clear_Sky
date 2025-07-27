from rest_framework import serializers

class ClearSkyInputSerializer(serializers.Serializer):
    temperature = serializers.ListField(child=serializers.FloatField())
    humidity = serializers.ListField(child=serializers.FloatField())
    clouds = serializers.ListField(child=serializers.FloatField())
    wind_speed = serializers.ListField(child=serializers.FloatField())
    pressure = serializers.ListField(child=serializers.FloatField())
    visibility = serializers.ListField(child=serializers.FloatField())
    dew_point = serializers.ListField(child=serializers.FloatField())
    uv_index = serializers.ListField(child=serializers.FloatField())
    precipitation = serializers.ListField(child=serializers.FloatField())
