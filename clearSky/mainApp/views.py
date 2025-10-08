from django.shortcuts import render
import pickle
from rest_framework.views import APIView
from rest_framework.response import Response
from .prediction import predict_sky
from .geocode import get_coordinates_from_place
from .weather import fetch_weather, fetch_forecast
from .traffic import fetch_air_traffic
from .models import WeatherData, AirTraffic, APICallLog
from django.conf import settings
from .serializers import (
    APICallLogSerializer,
    WeatherDataSerializer,
    AirTrafficSerializer,
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

        try:
            weather_data = fetch_weather(city or place)
        except Exception as e:
            return Response(
                {"success": False, "error": f"Weather fetch failed: {str(e)}"},
                status=500,
            )

        if not weather_data.get("success"):
            return Response(
                {"success": False, "error": "Could not fetch weather data"}, status=500
            )

        prediction_data = predict_sky(city or place)

        # Safe DB insert
        saved_data = None
        try:
            weather_obj = WeatherData.objects.create(
                city=city or place,
                latitude=lat,
                longitude=lon,
                weather_data=weather_data,
                prediction_result=prediction_data.get("prediction"),
            )
            saved_data = WeatherDataSerializer(weather_obj).data
        except Exception as e:
            saved_data = {"warning": f"Prediction result could not be saved: {str(e)}"}

        # Log API call safely
        try:
            APICallLog.objects.create(
                endpoint="/api/predict-sky/",
                query_params={"place": place, "city": city},
                response_data={
                    "weather": weather_data,
                    "prediction": prediction_data.get("prediction"),
                },
            )
        except Exception:
            pass

        return Response(
            {
                "success": True,
                "place": place or city,
                "latitude": lat,
                "longitude": lon,
                "weather": weather_data,
                "prediction": prediction_data.get("prediction"),
                "saved_data": saved_data,
            }
        )


class air_traffic_view(APIView):
    def get(self, request):
        place = request.query_params.get("place")
        city = request.query_params.get("city")

        if not place and not city:
            return Response(
                {"success": False, "error": "Provide either 'place' or 'city'."},
                status=400,
            )

        coords = get_coordinates_from_place(place or city)
        if not coords or coords == (None, None):
            return Response(
                {"success": False, "error": "Could not fetch coordinates."},
                status=400,
            )

        lat, lon = coords
        bbox = (lat - 0.5, lon - 0.5, lat + 0.5, lon + 0.5)

        try:
            data = fetch_air_traffic(bbox=bbox)
        except Exception as e:
            return Response(
                {"success": False, "error": f"Air traffic fetch failed: {str(e)}"},
                status=500,
            )

        # Log API call safely
        try:
            APICallLog.objects.create(
                endpoint="/api/air-traffic/",
                query_params=request.query_params.dict(),
                response_data=data,
            )
        except Exception:
            pass

        if not data.get("success"):
            return Response(data, status=500)

        # Safe DB insert
        saved_data = None
        try:
            air_traffic_obj = AirTraffic.objects.create(data=data)
            saved_data = AirTrafficSerializer(air_traffic_obj).data
        except Exception as e:
            saved_data = {"warning": f"Air traffic data could not be saved: {str(e)}"}

        return Response({"success": True, "data": data, "saved_data": saved_data})




class WeatherView(APIView):
    def get(self, request):
        city = request.query_params.get("city", "Delhi")

        try:
            weather = fetch_weather(city)
            forecast = fetch_forecast(city)
        except Exception as e:
            return Response(
                {"success": False, "error": f"Weather fetch failed: {str(e)}"},
                status=500,
            )

        if not weather or not weather.get("success"):
            return Response(
                {"success": False, "error": f"Could not fetch weather data for {city}."},
                status=500,
            )

        if not forecast or not forecast.get("success"):
            return Response(
                {"success": False, "error": f"Could not fetch forecast data for {city}."},
                status=500,
            )

        latitude = weather.get("coordinates", {}).get("latitude")
        longitude = weather.get("coordinates", {}).get("longitude")

        # Safe DB insert
        saved_data = None
        try:
            weather_obj = WeatherData.objects.create(
                city=city,
                latitude=latitude,
                longitude=longitude,
                weather_data={"current": weather, "forecast": forecast},
                prediction_result=None,
            )
            saved_data = WeatherDataSerializer(weather_obj).data
        except Exception as e:
            saved_data = {"warning": f"Weather data could not be saved: {str(e)}"}

        # Log API call safely
        try:
            APICallLog.objects.create(
                endpoint="/api/weather/",
                query_params={"city": city},
                response_data={"current": weather, "forecast": forecast},
            )
        except Exception:
            pass

        return Response(
            {
                "success": True,
                "current_weather": weather,
                "forecast": forecast,
                "saved_data": saved_data,
            }
        )

"""
def dashboard(request):
    city = request.GET.get("city", "Delhi")  # default city
    result = predict_sky(city)

    return render(request, "dashboard.html", {"result": result})
"""