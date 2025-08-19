import requests
import os

OPENWEATHER_API_KEY = os.getenv("1a60591fa72b518f021b82624db98de2", "1a60591fa72b518f021b82624db98de2")
BASE_URL = "https://api.openweathermap.org/data/2.5/weather"

def fetch_weather(city):

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
