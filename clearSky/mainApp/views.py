import pickle
import numpy as np
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import ClearSkyInputSerializer

with open("clearSky/sky_model.pkl", "rb") as f:
    model = pickle.load(f)

class PredictSkyView(APIView):
    def post(self, request):
        serializer = ClearSkyInputSerializer(data=request.data)
        if serializer.is_valid():
            input_data = serializer.validated_data
            features = np.array(list(zip(
                input_data['temperature'],
                input_data['humidity'],
                input_data['clouds'],
                input_data['wind_speed'],
                input_data['pressure'],
                input_data['visibility'],
                input_data['dew_point'],
                input_data['uv_index'],
                input_data['precipitation'],
            )))
            prediction = model.predict(features)
            result = ['Clear' if val == 1 else 'Not Clear' for val in prediction]
            return Response({"prediction": result})
        return Response(serializer.errors, status=400)
