import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import pickle

data = {
    "temperature": [30, 25, 22, 35, 28, 24, 33, 21],
    "humidity": [40, 70, 80, 30, 55, 65, 45, 85],
    "clouds": [10, 50, 90, 5, 20, 60, 15, 95],
    "wind_speed": [5, 10, 7, 3, 6, 9, 4, 11],
    "pressure": [1010, 1005, 1008, 1012, 1007, 1009, 1011, 1006],
    "visibility": [10, 6, 4, 12, 9, 5, 11, 3],
    "dew_point": [12, 15, 18, 10, 14, 17, 11, 19],
    "uv_index": [5, 2, 1, 6, 4, 3, 5, 1],
    "precipitation": [0, 2, 5, 0, 1, 3, 0, 6],
    "is_clear": [1, 0, 0, 1, 1, 0, 1, 0]  
}

df = pd.DataFrame(data)

X = df.drop('is_clear', axis=1)
y = df['is_clear']

model = RandomForestClassifier()
model.fit(X, y)

with open("sky_model.pkl", "wb") as f:
    pickle.dump(model, f)

print("✅ Model trained and saved as sky_model.pkl")
