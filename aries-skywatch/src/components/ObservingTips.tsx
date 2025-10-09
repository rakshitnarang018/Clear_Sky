import { Card } from "@/components/ui/card";
import { Lightbulb, Eye, Mountain, Moon } from "lucide-react";
import { motion } from "framer-motion";

const tips = [
  {
    icon: Eye,
    title: "Clear Skies",
    tip: "Lower cloud percentage and gentle winds improve seeing quality significantly.",
  },
  {
    icon: Moon,
    title: "Humidity Matters",
    tip: "Lower humidity reduces atmospheric turbulence and improves telescope performance.",
  },
  {
    icon: Mountain,
    title: "Pressure Trends",
    tip: "Stable or rising pressure often indicates clearer, more stable conditions.",
  },
  {
    icon: Lightbulb,
    title: "Wind Speed",
    tip: "Calm winds (<15 km/h) provide the best conditions for detailed observations.",
  },
];

export function ObservingTips() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
    >
      <Card className="glass-card p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Lightbulb className="w-5 h-5 text-primary" />
          Observing Tips
        </h3>
        
        <div className="space-y-4">
          {tips.map((tip, index) => {
            const Icon = tip.icon;
            return (
              <div key={index} className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1">{tip.title}</h4>
                  <p className="text-sm text-muted-foreground">{tip.tip}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </motion.div>
  );
}
