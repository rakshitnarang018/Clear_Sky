import { Card } from "@/components/ui/card";
import { AreaChart, Area, ResponsiveContainer, Tooltip } from "recharts";
import { WeatherData, ForecastData } from "@/lib/types";

interface TinyChartProps {
  current: WeatherData;
  forecast: ForecastData;
}

export function TinyChart({ current, forecast }: TinyChartProps) {
  const tempData = [
    { name: "Current", temp: current.temperature, cloud: current.cloud_percentage },
    { name: "Forecast", temp: forecast.temperature, cloud: forecast.cloud_percentage },
  ];

  return (
    <Card className="glass-card p-6">
      <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
      
      <div className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Temperature</span>
            <span className="text-sm font-medium">
              {current.temperature.toFixed(1)}°C → {forecast.temperature.toFixed(1)}°C
            </span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={tempData}>
              <defs>
                <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area 
                type="monotone" 
                dataKey="temp" 
                stroke="hsl(var(--primary))" 
                fill="url(#tempGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Cloud Cover</span>
            <span className="text-sm font-medium">
              {current.cloud_percentage}% → {forecast.cloud_percentage}%
            </span>
          </div>
          <ResponsiveContainer width="100%" height={80}>
            <AreaChart data={tempData}>
              <defs>
                <linearGradient id="cloudGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--secondary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--secondary))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px",
                }}
              />
              <Area 
                type="monotone" 
                dataKey="cloud" 
                stroke="hsl(var(--secondary))" 
                fill="url(#cloudGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
