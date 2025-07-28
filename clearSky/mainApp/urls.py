from django.urls import path
from .views import PredictSkyView
from . import views

urlpatterns = [
    path('predict/',PredictSkyView.as_view(), name='predict-sky'),
    path('air-traffic/',views.air_traffic_view, name = 'air-traffic'),
    path('satellite-traffic/',views.satellite_traffic_view, name = 'satellite_traffic'),
]
