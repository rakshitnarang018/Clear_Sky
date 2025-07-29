import requests

def get_coordinates_from_place(place):
    if not place:
        print("⚠️ Place is missing.")
        return None, None

    url = f"https://nominatim.openstreetmap.org/search"
    params = {
        'q': place,
        'format': 'json',
        'limit': 1
    }
    headers = {
        'User-Agent': 'ClearSkyApp/1.0'
    }

    try:
        response = requests.get(url, params=params, headers=headers)
        response.raise_for_status()
        try:
            data = response.json()
        except ValueError:
            print("❌ Invalid JSON received from geocoding API:")
            print(response.text)
            return None, None

        if not data:
            print("⚠️ No data found for place:", place)
            return None, None

        lat = float(data[0]["lat"])
        lon = float(data[0]["lon"])
        return lat, lon

    except requests.RequestException as e:
        print("❌ Error contacting geocoding API:", e)
        return None, None
