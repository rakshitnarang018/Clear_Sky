import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Cloud, Droplets, Wind, Gauge } from "lucide-react";
import { motion } from "framer-motion";
import { ClearSkyScore } from "@/lib/types";
import { getStatusBadgeClass } from "@/lib/score";
import { formatIST } from "@/lib/time";

interface PredictionCardProps {
  score: ClearSkyScore;
  forecastTime?: string;
  cloudPercentage: number;
  humidity: number;
  windKmh: number;
  pressure: number;
}

export function PredictionCard({
  score,
  forecastTime,
  cloudPercentage,
  humidity,
  windKmh,
  pressure,
}: PredictionCardProps) {
  const statusClass = getStatusBadgeClass(score.status);
  const shouldGlow = score.status === "Clear";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Card className={`glass-card p-8 ${shouldGlow ? "animate-glow" : ""}`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-sm font-medium text-muted-foreground mb-2">
              Observing Conditions Tonight
            </h2>
            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold tabular-nums">{score.score}</span>
              <div className="flex flex-col gap-1">
                <Badge className={`${statusClass} px-3 py-1 text-sm font-semibold`}>
                  {score.status}
                </Badge>
                {score.isHeuristic && (
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    Heuristic
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Cloud className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Cloud</div>
              <div className="text-lg font-semibold tabular-nums">{cloudPercentage}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Humidity</div>
              <div className="text-lg font-semibold tabular-nums">{humidity}%</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Wind</div>
              <div className="text-lg font-semibold tabular-nums">{windKmh} km/h</div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-muted-foreground" />
            <div>
              <div className="text-xs text-muted-foreground">Pressure</div>
              <div className="text-lg font-semibold tabular-nums">{pressure} hPa</div>
            </div>
          </div>
        </div>

        {forecastTime && (
          <div className="text-sm text-muted-foreground pt-4 border-t border-border">
            Next forecast: {formatIST(forecastTime)}
          </div>
        )}
      </Card>
    </motion.div>
  );
}
