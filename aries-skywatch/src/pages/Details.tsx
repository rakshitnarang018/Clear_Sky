import { useQuery } from "@tanstack/react-query";
import { useCity } from "@/hooks/useCity";
import { fetchWeather, fetchPrediction, fetchAirTraffic } from "@/lib/api";
import { MetricGrid } from "@/components/MetricGrid";
import { TinyChart } from "@/components/TinyChart";
import { PayloadViewer } from "@/components/PayloadViewer";
import { ExportButtons } from "@/components/ExportButtons";
import { Card } from "@/components/ui/card";
import { Loader2, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

export default function Details() {
  const [city] = useCity();

  const { data: weatherData, isLoading: weatherLoading, error: weatherError } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    staleTime: 5 * 60 * 1000,
  });

  const { data: predictionData, isLoading: predictionLoading } = useQuery({
    queryKey: ["prediction", city],
    queryFn: () => fetchPrediction(city),
    staleTime: 10 * 60 * 1000,
  });

  const { data: trafficData, isLoading: trafficLoading } = useQuery({
    queryKey: ["traffic", city],
    queryFn: () => fetchAirTraffic(city),
    staleTime: 30 * 1000,
  });

  const isLoading = weatherLoading || predictionLoading || trafficLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-12 h-12 animate-spin text-primary" />
      </div>
    );
  }

  if (weatherError || !weatherData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Card className="glass-card p-8 max-w-md text-center">
          <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Failed to load data</h2>
          <p className="text-muted-foreground">{weatherError?.message || "Unknown error"}</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Detailed Metrics</h1>
            <p className="text-muted-foreground">
              In-depth analysis of current observing conditions for {city}
            </p>
          </div>
          <ExportButtons
            weatherData={weatherData}
            predictionData={predictionData}
            trafficData={trafficData}
          />
        </div>
      </motion.div>

      <MetricGrid weather={weatherData.current_weather} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TinyChart current={weatherData.current_weather} forecast={weatherData.forecast} />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">Location Info</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-muted-foreground">City</span>
                <p className="text-lg font-medium">{weatherData.current_weather.city}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">Coordinates</span>
                <p className="text-lg font-medium tabular-nums">
                  {weatherData.current_weather.coordinates.latitude.toFixed(4)}°N,{" "}
                  {weatherData.current_weather.coordinates.longitude.toFixed(4)}°E
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-bold">API Payloads</h2>
        <PayloadViewer title="Weather Response" data={weatherData} />
        {predictionData && <PayloadViewer title="Prediction Response" data={predictionData} />}
        {trafficData && <PayloadViewer title="Air Traffic Response" data={trafficData} />}
      </motion.div>
    </div>
  );
}
