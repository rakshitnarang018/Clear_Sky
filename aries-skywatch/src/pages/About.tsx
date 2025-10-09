import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Telescope, CloudRain, Plane, BarChart3 } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="text-4xl font-bold mb-4">About ARIES ClearSky</h1>
        <p className="text-xl text-muted-foreground">
          Real-time astronomy observation conditions powered by ARIES APIs
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <Telescope className="w-6 h-6 text-primary" />
            Mission
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            ARIES ClearSky provides astronomers and stargazers with real-time, actionable insights
            into observing conditions. By combining weather forecasts, clear-sky predictions, and
            live air traffic data, we help you make informed decisions about when and where to
            observe the night sky.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card className="glass-card p-6">
          <CloudRain className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Weather Data</h3>
          <p className="text-sm text-muted-foreground">
            Current conditions and short-term forecasts including temperature, humidity, cloud
            cover, and wind speed.
          </p>
        </Card>

        <Card className="glass-card p-6">
          <BarChart3 className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Clear-Sky Scoring</h3>
          <p className="text-sm text-muted-foreground">
            Intelligent scoring algorithm that combines multiple atmospheric factors to predict
            observing quality.
          </p>
        </Card>

        <Card className="glass-card p-6">
          <Plane className="w-12 h-12 text-primary mb-4" />
          <h3 className="text-lg font-semibold mb-2">Air Traffic</h3>
          <p className="text-sm text-muted-foreground">
            Real-time aircraft positions help you understand potential light pollution and
            atmospheric disturbances.
          </p>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Scoring Methodology</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Our Clear-Sky Score (0-100) combines multiple atmospheric factors with scientifically
              weighted importance:
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>
                <strong className="text-foreground">Cloud Cover (60%)</strong>: The most critical
                factor. Lower cloud percentage dramatically improves observing conditions.
              </li>
              <li>
                <strong className="text-foreground">Humidity (20%)</strong>: Lower humidity reduces
                atmospheric turbulence and improves transparency.
              </li>
              <li>
                <strong className="text-foreground">Wind Speed (10%)</strong>: Calmer winds lead to
                steadier seeing and better telescope stability.
              </li>
              <li>
                <strong className="text-foreground">Pressure (10%)</strong>: Stable or rising
                pressure indicates clearer, more predictable conditions.
              </li>
            </ul>
            <p className="pt-4">
              <strong className="text-foreground">Score Ranges:</strong>
            </p>
            <ul className="space-y-2 ml-6 list-disc">
              <li>
                <strong className="text-status-clear">70-100 (Clear)</strong>: Excellent conditions
                for all types of observation
              </li>
              <li>
                <strong className="text-status-marginal">40-69 (Marginal)</strong>: Acceptable for
                bright objects; may limit deep-sky work
              </li>
              <li>
                <strong className="text-status-poor">0-39 (Poor)</strong>: Challenging conditions;
                consider waiting
              </li>
            </ul>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <Card className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Data Sources</h2>
          <p className="text-muted-foreground mb-4">
            ARIES ClearSky is powered exclusively by ARIES (Aryabhatta Research Institute of
            Observational Sciences) APIs, providing high-quality, research-grade atmospheric and
            traffic data.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Weather API: Current conditions & forecasts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Prediction API: ML-based clear-sky predictions</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">Air Traffic API: Real-time aircraft data</span>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
