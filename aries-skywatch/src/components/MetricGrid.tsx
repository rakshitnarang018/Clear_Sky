import { Card } from "@/components/ui/card";
import { WeatherData } from "@/lib/types";
import { Thermometer, Droplets, Wind, Gauge, Cloud, CloudRain } from "lucide-react";
import { motion } from "framer-motion";

interface MetricGridProps {
  weather: WeatherData;
}

const metrics = [
  { key: "temperature", label: "Temperature", icon: Thermometer, unit: "°C", format: (v: number) => v.toFixed(1) },
  { key: "humidity", label: "Humidity", icon: Droplets, unit: "%", format: (v: number) => v.toString() },
  { key: "pressure", label: "Pressure", icon: Gauge, unit: "hPa", format: (v: number) => v.toString() },
  { key: "wind_speed", label: "Wind Speed", icon: Wind, unit: "m/s", format: (v: number) => v.toFixed(2) },
  { key: "cloud_percentage", label: "Cloud Cover", icon: Cloud, unit: "%", format: (v: number) => v.toString() },
];

export function MetricGrid({ weather }: MetricGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const value = weather[metric.key as keyof WeatherData];
        
        return (
          <motion.div
            key={metric.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-medium">{metric.label}</h3>
                </div>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="metric-value">
                  {typeof value === "number" ? metric.format(value) : "—"}
                </span>
                <span className="text-muted-foreground">{metric.unit}</span>
              </div>
            </Card>
          </motion.div>
        );
      })}
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: metrics.length * 0.05 }}
      >
        <Card className="glass-card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CloudRain className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-medium">Conditions</h3>
            </div>
          </div>
          <p className="text-lg capitalize">{weather.weather_description}</p>
        </Card>
      </motion.div>
    </div>
  );
}
