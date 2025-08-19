import requests
import os

OPENWEATHER_API_KEY = os.getenv("OPENWEATHER_API_KEY", "1a60591fa72b518f021b82624db98de2")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"
FORECAST_URL = "https://api.openweathermap.org/data/2.5/forecast"


def fetch_weather(city):
    """Fetch current weather for a given city"""
    if not city:
        return {"success": False, "error": "City name is required"}

    try:
        params = {
            "q": city,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric"
        }
        response = requests.get(BASE_URL, params=params, timeout=10)
        response.raise_for_status()
        raw_data = response.json()

        if not all(k in raw_data for k in ["coord", "main", "wind", "clouds", "weather"]):
            return {"success": False, "error": "Incomplete data from weather API"}

        return {
            "success": True,
            "city": raw_data.get("name", city),
            "coordinates": {
                "latitude": raw_data["coord"].get("lat"),
                "longitude": raw_data["coord"].get("lon")
            },
            "temperature": raw_data["main"].get("temp"),
            "humidity": raw_data["main"].get("humidity"),
            "pressure": raw_data["main"].get("pressure"),
            "wind_speed": raw_data["wind"].get("speed"),
            "cloud_percentage": raw_data["clouds"].get("all"),
            "weather_description": (
                raw_data["weather"][0].get("description") if raw_data.get("weather") else None
            )
        }

    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"API request failed: {str(e)}"}
    except (KeyError, IndexError, TypeError) as e:
        return {"success": False, "error": f"Unexpected API data format: {str(e)}"}


def fetch_forecast(city):
    """Fetch 3-hour forecast for a given city"""
    if not city:
        return {"success": False, "error": "City name is required"}

    try:
        params = {
            "q": city,
            "appid": OPENWEATHER_API_KEY,
            "units": "metric",
            "cnt": 1   
        }
        response = requests.get(FORECAST_URL, params=params, timeout=10)
        response.raise_for_status()
        raw_data = response.json()

        if "list" not in raw_data or len(raw_data["list"]) == 0:
            return {"success": False, "error": "No forecast data available"}

        forecast = raw_data["list"][0]  # next 3-hour block

        return {
            "success": True,
            "city": raw_data["city"].get("name", city),
            "forecast_time": forecast.get("dt_txt"),
            "temperature": forecast["main"].get("temp"),
            "humidity": forecast["main"].get("humidity"),
            "pressure": forecast["main"].get("pressure"),
            "wind_speed": forecast["wind"].get("speed"),
            "cloud_percentage": forecast["clouds"].get("all"),
            "weather_description": (
                forecast["weather"][0].get("description") if forecast.get("weather") else None
            )
        }

    except requests.exceptions.RequestException as e:
        return {"success": False, "error": f"Forecast API request failed: {str(e)}"}
    except (KeyError, IndexError, TypeError) as e:
        return {"success": False, "error": f"Unexpected forecast data format: {str(e)}"}
