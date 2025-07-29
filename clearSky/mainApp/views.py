import pickle
import numpy as np
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .prediction import predict_cloud_coverage
from .geocode import get_coordinates_from_place
from .weather import get_weather_data
from .traffic import fetch_air_traffic, fetch_satellite_traffic
from .serializers import ClearSkyInputSerializer

with open("clearSky/sky_model.pkl", "rb") as f:
    model = pickle.load(f)


class PredictSkyView(APIView):
    def post(self, request):
        place = request.data.get("place")

        if not place:
            return Response({"error": "Missing 'place' in request body"}, status=400)

        coords = get_coordinates_from_place(place)

        if not coords or coords == (None, None):
            return Response({"error": "Could not get coordinates for place"}, status=400)

        lat, lon = coords

        cloud_percentage = predict_cloud_coverage(lat, lon)
        return Response({
            "place": place,
            "latitude": lat,
            "longitude": lon,
            "cloud_percentage": cloud_percentage,
            "prediction": "Clear" if cloud_percentage < 30 else "Cloudy"
        })

    #except Exception as e:
        #return Response({"error": str(e)}, status=500)

def air_traffic_view(request):
    data = fetch_air_traffic()
    return JsonResponse(data)

def satellite_traffic_view(request):
    data = fetch_satellite_traffic()
    return JsonResponse(data)
