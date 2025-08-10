import pickle
import numpy as np
from .weather import fetch_weather

with open("clearSky/sky_model.pkl", "rb") as f:
    model = pickle.load(f)

def predict_sky(city):

    weather_data = fetch_weather(city)

    if not weather_data.get("success"):
        return {
            "success": False,
            "error": weather_data.get("error", "Could not fetch weather data")
        }

    try:
        required_keys = ["cloud_percentage", "temperature", "humidity", "wind_speed"]
        if not all(key in weather_data for key in required_keys):
            return {
                "success": False,
                "error": "Missing required weather features for prediction"
            }

        features = [
            weather_data["cloud_percentage"],
            weather_data["temperature"],
            weather_data["humidity"],
            weather_data["wind_speed"]
        ]
        features_array = np.array(features).reshape(1, -1)

        prediction_class = model.predict(features_array)[0]
        prediction_label = "Clear" if prediction_class == 0 else "Cloudy"

        return {
            "success": True,
            "city": weather_data.get("city", city),
            "coordinates": weather_data.get("coordinates"),
            "temperature": weather_data.get("temperature"),
            "humidity": weather_data.get("humidity"),
            "wind_speed": weather_data.get("wind_speed"),
            "cloud_percentage": weather_data.get("cloud_percentage"),
            "weather_description": weather_data.get("weather_description"),
            "prediction": prediction_label
        }

    except Exception as e:
        return {
            "success": False,
            "error": f"Prediction failed: {str(e)}"
        }
