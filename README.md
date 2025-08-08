# 🌌 Clear_Sky

**AI-powered web app** that predicts whether the night sky will be **clear**, **partially cloudy**, or **obstructed** using real-time weather data, ML models, and deep learning on weather time series.

---

## 🌭 Purpose

To help stargazers, astronomy hobbyists, and astrophotographers quickly know whether their sky will be suitable for observing celestial events — based on live location and forecast.

---

## 🧠 Features

* ✅ Real-time weather data using Open-Meteo API
* ✅ Hybrid prediction logic: ML + rule-based thresholds
* ✅ Deep learning (LSTM) for next 3-hour sky forecast
* ✅ Modern, clean frontend for users
* ✅ Location-based prediction with obstruction label
* ✅ Modular, scalable structure (backend + frontend)

---

## 🏠 Project Structure (Detailed)

```
cloud-obstruction-predictor/
|
|— backend/                    # Django backend with ML & DL logic
|   |
|   |— clearSky/              # Rule-based + XGBoost logic
|   |   |— rules.py           # Hard-coded obstruction rules (humidity, cloud, etc.)
|   |   |— xgb_model.pkl      # Trained XGBoost model
|   |
|   |— dl_models/            # Deep learning model code
|   |   |— train_lstm.py     # Script to train LSTM on weather time-series
|   |   |— predict_lstm.py   # Loads model and predicts next 3h obstruction
|   |   |— model.h5          # Saved trained LSTM model
|   |
|   |— weather_data/         # Data collection & preprocessing
|   |   |— fetch_weather.py  # Gets past 24h weather data from Open-Meteo
|   |   |— preprocess.py     # Normalize / fill missing values
|   |
|   |— mainApp/              # Django application
|       |— views.py          # API endpoints to handle prediction requests
|       |— urls.py           # URL routing
|       |— serializers.py    # (Optional) for DRF integration
|       |— models.py         # DB schema (optional: store logs, feedback)
|   
|   |— manage.py             # Django project entry
|   |— db.sqlite3           # Default local DB
|   |— requirements.txt     # Python dependencies
|
|— frontend/                  # React-based UI
    |
    |— src/
    |   |— components/       # Reusable UI parts (cards, buttons, inputs)
    |   |   |— PredictionCard.tsx
    |   |   |— LocationInput.tsx
    |   |
    |   |— pages/            # Page views (home, about)
    |   |   |— Home.tsx
    |   |   |— About.tsx
    |   |
    |   |— App.tsx           # Main app shell
    |   |— main.tsx          # React entry point
    |
    |— public/              # Static files
    |— tailwind.config.js   # Tailwind setup
    |— package.json         # Node dependencies
    |— index.html           # Base template
|
|— README.md                 # You are here
```

---

## 🔧 Tech Stack

| Layer    | Technology                |
| -------- | ------------------------- |
| Backend  | Django, Django REST       |
| ML Model | XGBoost                   |
| DL Model | LSTM (TensorFlow/Keras)   |
| Data     | Open-Meteo API            |
| Frontend | React + Tailwind CSS      |
| Hosting  | Render / Railway / Vercel |

---

## ⚙️ How It Works

1. User selects or enters location (lat/lon)
2. Backend fetches past 24h weather data
3. Models (rule-based, XGBoost, LSTM) generate obstruction forecast
4. Returns 3-hour sky labels: Clear / Partial / Obstructed
5. Frontend displays result with color-coded prediction cards

---

## ✅ Setup Instructions

### Backend (Django + ML)

```bash
cd backend
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend (React + Tailwind)

```bash
cd frontend
npm install
npm run dev
```

---

## 📌 Roadmap

* [ ] Finalize rule-based + XGBoost hybrid predictor
* [ ] Train + test LSTM model on real weather time series
* [ ] Expose predictions via Django REST APIs
* [ ] Build React UI (location input + result display)
* [ ] Deploy backend & frontend (Railway/Vercel)

---

## 📄 License

MIT — free to use, modify and build upon with credit.
