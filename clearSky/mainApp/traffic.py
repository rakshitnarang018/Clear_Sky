import requests

AIR_TRAFFIC_API = "https://opensky-network.org/api/states/all"
SATELLITE_TRAFFIC_API = "https://api.wheretheiss.at/v1/satellites/25544"

def fetch_air_traffic():
    try:
        response = requests.get(AIR_TRAFFIC_API, timeout = 10)
        data = response.json()

        return {
            "success" : True,
            "aircraft_count" : len(data.get("states", [])),
            "details": data.get("states", [])[:10]
        }
    except Exception as e:
        return {"success": False, "error": str(e)}
    
def fetch_satellite_traffic():
    try:
        response = requests.get(SATELLITE_TRAFFIC_API, timeout =10)
        data = response.json()

        return {
            "success":True,
            "position":{
                "latitude": data.get("latitude"),
                "longitude": data.get("longitude"),
                "altitude": data.get("altitude")
            },
            "timestamp": data.get("timestamp")
        }
    except Exception as e:
        return {"success": False, "error": str(e)}