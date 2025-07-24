import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

# Simulated data
data = {
    'temperature': [30, 25, 22, 35],
    'humidity': [40, 70, 80, 30],
    'clouds': [10, 50, 90, 5],
    'label': ['Clear', 'Partly Cloudy', 'Overcast', 'Clear']
}
df = pd.DataFrame(data)

X = df[['temperature', 'humidity', 'clouds']]
y = df['label']

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, 'sky_model.pkl')
print("Model trained and saved as sky_model.pkl")