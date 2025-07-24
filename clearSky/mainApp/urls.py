from django.urls import path
from .views import PredictSkyView

urlpatterns = [
    path('predict/',PredictSkyView.as_view(), name='predict-sky'),
]
