import requests
import os

API_KEY = os.getenv("OPENWEATHERMAP_API_KEY")  # Put your API key in .env

def get_weather_data(lat: float, lon: float):
    url = f"https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_KEY}&units=metric"
    response = requests.get(url)
    data = response.json()

    weather = {
        "temperature": data["main"]["temp"],
        "pressure": data["main"]["pressure"],
        "humidity": data["main"]["humidity"],
        "visibility": data.get("visibility", None),
        "clouds": data["clouds"]["all"],
        "wind_speed": data["wind"]["speed"],
        "wind_deg": data["wind"]["deg"]
    }
    return weather
