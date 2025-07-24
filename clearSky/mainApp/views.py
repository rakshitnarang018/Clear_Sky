import joblib
import os
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

MODEL_PATH = os.path.join(os.path.dirname(__file__), 'ml_model/sky_model.pkl')
model = joblib.load(MODEL_PATH)

class PredictSkyView(APIView):
    def post(self, request):
        try:
            data = request.data
            features = [
                float(data.get('temperature')),
                float(data.get('humidity')),
                float(data.get('clouds'))
            ]
            prediction = model.predict([features])[0]
            return Response({'prediction': prediction})
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)