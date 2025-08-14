import pickle
from rest_framework.views import APIView
from rest_framework.response import Response
from .prediction import predict_sky
from .geocode import get_coordinates_from_place
from .weather import fetch_weather
from .traffic import fetch_air_traffic, fetch_satellite_traffic
from .models import WeatherData, AirTraffic, SatelliteTraffic  

with open("clearSky/sky_model.pkl", "rb") as f:
    model = pickle.load(f)


class PredictSkyView(APIView):
    def get(self, request):
        place = request.query_params.get("place")
        city = request.query_params.get("city")

        if not place and not city:
            return Response({"success": False, "error": "Provide either 'place' or 'city'."}, status=400)

        if place:
            coords = get_coordinates_from_place(place)
            if not coords or coords == (None, None):
                return Response({"success": False, "error": "Could not get coordinates for place"}, status=400)
            lat, lon = coords
        else:
            lat = lon = None

        weather_data = fetch_weather(city or place)
        if not weather_data.get("success"):
            return Response({"success": False, "error": "Could not fetch weather data"}, status=500)

        prediction_data = predict_sky(city or place)

        WeatherData.objects.create(
            city=city or place,
            latitude=lat,
            longitude=lon,
            weather_data=weather_data,
            prediction_result=prediction_data.get("prediction")
        )

        return Response({
            "success": True,
            "place": place or city,
            "latitude": lat,
            "longitude": lon,
            "weather": weather_data,
            "prediction": prediction_data.get("prediction")
        })


class air_traffic_view(APIView):
    def get(self, request):
        data = fetch_air_traffic()

        AirTraffic.objects.create(data=data)

        return Response({
            "success": True,
            "data": data
        })


class satellite_traffic_view(APIView):
    def get(self, request):
        data = fetch_satellite_traffic()

        SatelliteTraffic.objects.create(data=data)

        return Response({
            "success": True,
            "data": data
        })


class WeatherView(APIView):
    def get(self, request):
        city = request.query_params.get("city", "Delhi")
        weather = fetch_weather(city)

        WeatherData.objects.create(
            city=city,
            latitude=None,  
            longitude=None,
            weather_data=weather,
            prediction_result=None
        )

        return Response(weather)
