import pickle
from rest_framework.views import APIView
from rest_framework.response import Response
from .prediction import predict_sky
from .geocode import get_coordinates_from_place
from .weather import fetch_weather, fetch_forecast
from .traffic import fetch_air_traffic, fetch_satellite_traffic
from .models import WeatherData, AirTraffic, SatelliteTraffic, APICallLog
from django.conf import settings
from .serializers import (
    APICallLogSerializer,
    WeatherDataSerializer,
    AirTrafficSerializer,
    SatelliteTrafficSerializer,
)

with open("clearSky/sky_model.pkl", "rb") as f:
    model = pickle.load(f)


class PredictSkyView(APIView):
    def get(self, request):
        place = request.query_params.get("place")
        city = request.query_params.get("city")

        if not place and not city:
            return Response(
                {"success": False, "error": "Provide either 'place' or 'city'."},
                status=400,
            )

        if place:
            coords = get_coordinates_from_place(place)
            if not coords or coords == (None, None):
                return Response(
                    {"success": False, "error": "Could not get coordinates for place"},
                    status=400,
                )
            lat, lon = coords
        else:
            lat = lon = None

        weather_data = fetch_weather(city or place)
        if not weather_data.get("success"):
            return Response(
                {"success": False, "error": "Could not fetch weather data"}, status=500
            )

        prediction_data = predict_sky(city or place)

        weather_obj = WeatherData.objects.create(
            city=city or place,
            latitude=lat,
            longitude=lon,
            weather_data=weather_data,
            prediction_result=prediction_data.get("prediction"),
        )

        serializer = WeatherDataSerializer(weather_obj)

        # Log API call
        APICallLog.objects.create(
            endpoint="/api/predict-sky/",
            query_params={"place": place, "city": city},
            response_data={
                "weather": weather_data,
                "prediction": prediction_data.get("prediction")
            }
        )

        return Response(
            {
                "success": True,
                "place": place or city,
                "latitude": lat,
                "longitude": lon,
                "weather": weather_data,
                "prediction": prediction_data.get("prediction"),
                "saved_data": serializer.data,
            }
        )


class air_traffic_view(APIView):
    def get(self, request):
        place = request.query_params.get("place")
        city = request.query_params.get("city")

        bbox = None
        if place or city:
            lat, lon = get_coordinates_from_place(place or city)
            if lat is not None and lon is not None:
                bbox = (lat-0.5, lon-0.5, lat+0.5, lon+0.5)

        data = fetch_air_traffic(bbox=bbox)

        # log API call
        APICallLog.objects.create(
            endpoint="/api/air-traffic/",
            query_params=request.query_params.dict(),
            response_data=data
        )

        if not data.get("success"):
            return Response(data, status=500)

        air_traffic_obj = AirTraffic.objects.create(data=data)
        serializer = AirTrafficSerializer(air_traffic_obj)
        return Response({"success": True, "data": data, "saved_data": serializer.data})



class satellite_traffic_view(APIView):
    def get(self, request):
        data = fetch_satellite_traffic()

        # Log API call
        APICallLog.objects.create(
            endpoint="/api/satellite-traffic/",
            query_params=request.query_params.dict(),
            response_data=data
        )

        satellite_obj = SatelliteTraffic.objects.create(
            latitude=data.get("satellite", {}).get("latitude"),
            longitude=data.get("satellite", {}).get("longitude"),
            altitude_km=data.get("satellite", {}).get("altitude_km"),
            velocity_km_s=data.get("satellite", {}).get("velocity_km_s"),
            timestamp=data.get("satellite", {}).get("timestamp"),
            data=data,
        )

        serializer = SatelliteTrafficSerializer(satellite_obj)

        return Response(
            {
                "success": True,
                "data": data,
                "saved_data": serializer.data,
            }
        )


class WeatherView(APIView):
    def get(self, request):
        city = request.query_params.get("city", "Delhi")

        weather = fetch_weather(city)
        forecast = fetch_forecast(city)

        latitude = weather.get("coordinates", {}).get("latitude")
        longitude = weather.get("coordinates", {}).get("longitude")

        weather_obj = WeatherData.objects.create(
            city=city,
            latitude=latitude,
            longitude=longitude,
            weather_data={"current": weather, "forecast": forecast},
            prediction_result=None,
        )

        serializer = WeatherDataSerializer(weather_obj)

        # Log API call
        APICallLog.objects.create(
            endpoint="/api/weather/",
            query_params={"city": city},
            response_data={"current": weather, "forecast": forecast}
        )

        return Response(
            {
                "current_weather": weather,
                "forecast": forecast,
                "saved_data": serializer.data,
            }
        )
