from django.urls import path
from .views import PredictSkyView, WeatherView, air_traffic_view
from . import views

urlpatterns = [
    path('predict/',PredictSkyView.as_view(), name='predict-sky'),
    path('weather/', WeatherView.as_view(), name='weather'),
    path('air-traffic/',air_traffic_view.as_view(), name = 'air-traffic'),
]
