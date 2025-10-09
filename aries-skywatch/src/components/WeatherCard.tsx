import { Card } from "@/components/ui/card";
import { WeatherData, ForecastData } from "@/lib/types";
import { Thermometer, CloudRain } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

interface WeatherCardProps {
  current: WeatherData;
  forecast: ForecastData;
}

export function WeatherCard({ current, forecast }: WeatherCardProps) {
  const tempData = [
    { value: current.temperature },
    { value: forecast.temperature },
  ];
  
  const cloudData = [
    { value: current.cloud_percentage },
    { value: forecast.cloud_percentage },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4">Current Weather</h3>
        
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Temperature</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold tabular-nums">
                  {current.temperature.toFixed(1)}°C
                </span>
                <span className="text-sm text-muted-foreground">
                  → {forecast.temperature.toFixed(1)}°C
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={tempData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <CloudRain className="w-5 h-5 text-primary" />
                <span className="text-sm text-muted-foreground">Cloud Cover</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold tabular-nums">
                  {current.cloud_percentage}%
                </span>
                <span className="text-sm text-muted-foreground">
                  → {forecast.cloud_percentage}%
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={40}>
              <LineChart data={cloudData}>
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="hsl(var(--secondary))" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="pt-4 border-t border-border">
            <p className="text-sm text-muted-foreground capitalize">
              {current.weather_description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
