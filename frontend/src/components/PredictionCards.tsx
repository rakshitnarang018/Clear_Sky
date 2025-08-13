import { motion } from 'framer-motion';
import { Sun, Moon, Cloud, Telescope, CloudRain, Eye } from 'lucide-react';

interface PredictionData {
  time: string;
  status: 'clear' | 'partial' | 'obstructed';
  obstruction: number;
  temperature: number;
  humidity: number;
  visibility: number;
}

const mockPredictions: PredictionData[] = [
  {
    time: '9:00 PM',
    status: 'clear',
    obstruction: 15,
    temperature: 18,
    humidity: 45,
    visibility: 95,
  },
  {
    time: '12:00 AM',
    status: 'partial',
    obstruction: 45,
    temperature: 16,
    humidity: 60,
    visibility: 70,
  },
  {
    time: '3:00 AM',
    status: 'obstructed',
    obstruction: 80,
    temperature: 14,
    humidity: 75,
    visibility: 30,
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'clear':
      return 'text-success border-success shadow-glow-cyan';
    case 'partial':
      return 'text-warning border-warning shadow-glow-magenta';
    case 'obstructed':
      return 'text-destructive border-destructive shadow-glow-purple';
    default:
      return 'text-foreground border-border';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'clear':
      return <Telescope className="w-8 h-8" />;
    case 'partial':
      return <Eye className="w-8 h-8" />;
    case 'obstructed':
      return <CloudRain className="w-8 h-8" />;
    default:
      return <Cloud className="w-8 h-8" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'clear':
      return 'Perfect Viewing';
    case 'partial':
      return 'Limited Viewing';
    case 'obstructed':
      return 'Poor Viewing';
    default:
      return 'Unknown';
  }
};

const PredictionCards = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            Tonight's Sky Predictions
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            AI-powered 3-hour forecast showing optimal stargazing windows
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPredictions.map((prediction, index) => (
            <motion.div
              key={prediction.time}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                type: "spring",
                bounce: 0.3
              }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className={`glass rounded-xl p-6 border-2 transition-all duration-300 hover:shadow-lg ${getStatusColor(prediction.status)}`}
            >
              {/* Time Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-heading font-semibold text-foreground">
                  {prediction.time}
                </h3>
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className={getStatusColor(prediction.status)}
                >
                  {getStatusIcon(prediction.status)}
                </motion.div>
              </div>

              {/* Status */}
              <div className="text-center mb-6">
                <div className={`text-lg font-semibold mb-2 ${getStatusColor(prediction.status)}`}>
                  {getStatusText(prediction.status)}
                </div>
                <div className="text-sm text-muted-foreground">
                  Cloud Coverage: {prediction.obstruction}%
                </div>
              </div>

              {/* Obstruction Meter */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-muted-foreground mb-2">
                  <span>Sky Clarity</span>
                  <span>{100 - prediction.obstruction}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${100 - prediction.obstruction}%` }}
                    transition={{ duration: 1, delay: index * 0.3 }}
                    viewport={{ once: true }}
                    className={`h-full rounded-full ${
                      prediction.status === 'clear' 
                        ? 'bg-success' 
                        : prediction.status === 'partial' 
                        ? 'bg-warning' 
                        : 'bg-destructive'
                    }`}
                  />
                </div>
              </div>

              {/* Weather Details */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-sm text-muted-foreground">Temp</div>
                  <div className="font-mono text-foreground">{prediction.temperature}°C</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Humidity</div>
                  <div className="font-mono text-foreground">{prediction.humidity}%</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Visibility</div>
                  <div className="font-mono text-foreground">{prediction.visibility}%</div>
                </div>
              </div>

              {/* Glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 hover:opacity-20 transition-opacity duration-300 pointer-events-none bg-gradient-to-br from-primary via-transparent to-secondary" />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-muted-foreground mb-4">
            Want more detailed predictions for your location?
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-glow-cyan transition-all duration-300"
          >
            Get Extended Forecast
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default PredictionCards;