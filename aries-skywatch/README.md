# ARIES ClearSky

Real-time astronomy observation conditions powered by ARIES APIs. Monitor weather, clear-sky predictions, and live air traffic for optimal stargazing.

![ARIES ClearSky](https://img.shields.io/badge/ARIES-ClearSky-5eead4?style=for-the-badge)

## 🌟 Features

- **Real-Time Weather**: Current conditions and short-term forecasts
- **Clear-Sky Scoring**: Intelligent 0-100 scoring algorithm with status indicators
- **Live Air Traffic**: Interactive map with rotating aircraft markers
- **IST Time Display**: Optimized for Indian astronomy observations
- **Responsive Design**: Beautiful, futuristic dark-first UI
- **Export Tools**: Download data as CSV or JSON
- **Accessibility**: WCAG-compliant with keyboard navigation

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Modern web browser

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd aries-clearsky

# Install dependencies
npm install

# (Optional) Configure API base URL
cp .env.example .env
# Edit .env and set VITE_API_BASE if needed

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 📡 API Endpoints

ARIES ClearSky consumes three ARIES APIs:

1. **Weather API**: `/api/weather/?city=Delhi`
   - Current weather and short-term forecast
   - Updates: Every 10 minutes

2. **Prediction API**: `/api/predict/?city=Delhi`
   - ML-based clear-sky predictions (0-100 score)
   - Falls back to heuristic scoring if unavailable

3. **Air Traffic API**: `/api/air-traffic/?city=Delhi`
   - Real-time aircraft positions
   - Updates: Every 60s (Dashboard), 15s (Traffic page)

### API Configuration

By default, the app expects APIs at the same origin. To use a different base URL:

```bash
# .env
VITE_API_BASE=https://your-api-domain.com
```

## 🎨 Design System

- **Colors**: Deep space blues with teal highlights
- **Theme**: Dark-first with light mode support
- **Typography**: Inter font family
- **Components**: shadcn/ui with custom glass morphism
- **Animations**: 60fps Framer Motion transitions

## 📊 Clear-Sky Scoring

The scoring algorithm combines four atmospheric factors:

- **Cloud Cover (60%)**: Most critical factor
- **Humidity (20%)**: Affects transparency
- **Wind Speed (10%)**: Impacts stability
- **Pressure (10%)**: Indicates trend stability

**Score Ranges:**
- 70-100: Clear (Excellent conditions)
- 40-69: Marginal (Acceptable for bright objects)
- 0-39: Poor (Challenging conditions)

## 🗺️ Routes

- `/` - Dashboard with at-a-glance conditions
- `/details` - Detailed metrics and data export
- `/traffic` - Full-screen live air traffic map
- `/about` - Methodology and data sources

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS + shadcn/ui
- **Data**: React Query (TanStack Query)
- **Maps**: Leaflet with dark tiles
- **Charts**: Recharts
- **Routing**: React Router v6
- **Animations**: Framer Motion
- **Time**: date-fns + date-fns-tz (IST support)

## 📦 Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

The production build will be in the `dist/` directory.

## 🧪 Testing

```bash
# Run unit tests (when implemented)
npm test
```

## ♿ Accessibility

- Semantic HTML5 landmarks
- ARIA labels and live regions
- Keyboard navigation support
- High contrast mode compatible
- Color is not the only indicator (Clear/Marginal/Poor labels)

## 🌐 Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+

## 📝 License

This project is built for ARIES (Aryabhatta Research Institute of Observational Sciences).

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## 📧 Support

For API access or issues, contact ARIES support.

---

**Built with ❤️ for astronomers everywhere**
