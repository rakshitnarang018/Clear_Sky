import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { toast } from "sonner";

interface ExportButtonsProps {
  weatherData: any;
  predictionData: any;
  trafficData: any;
}

export function ExportButtons({ weatherData, predictionData, trafficData }: ExportButtonsProps) {
  const exportCSV = () => {
    try {
      const rows = [
        ["Metric", "Value"],
        ["Temperature", `${weatherData?.current_weather?.temperature}°C`],
        ["Humidity", `${weatherData?.current_weather?.humidity}%`],
        ["Pressure", `${weatherData?.current_weather?.pressure} hPa`],
        ["Wind Speed", `${weatherData?.current_weather?.wind_speed} m/s`],
        ["Cloud Cover", `${weatherData?.current_weather?.cloud_percentage}%`],
        ["Weather", weatherData?.current_weather?.weather_description],
        ["Prediction Score", predictionData?.prediction ?? "N/A"],
        ["Aircraft Count", trafficData?.data?.aircraft_count ?? 0],
      ];
      
      const csv = rows.map(row => row.join(",")).join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aries-clearsky-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("CSV exported successfully");
    } catch (error) {
      toast.error("Failed to export CSV");
    }
  };

  const exportJSON = () => {
    try {
      const data = {
        weather: weatherData,
        prediction: predictionData,
        traffic: trafficData,
        exported_at: new Date().toISOString(),
      };
      
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `aries-clearsky-${new Date().toISOString().split("T")[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
      
      toast.success("JSON exported successfully");
    } catch (error) {
      toast.error("Failed to export JSON");
    }
  };

  return (
    <div className="flex gap-2">
      <Button variant="outline" onClick={exportCSV} className="gap-2">
        <FileText className="w-4 h-4" />
        Export CSV
      </Button>
      <Button variant="outline" onClick={exportJSON} className="gap-2">
        <Download className="w-4 h-4" />
        Export JSON
      </Button>
    </div>
  );
}
