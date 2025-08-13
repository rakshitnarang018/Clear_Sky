import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock data for the last 24 hours
const mockTrendData = Array.from({ length: 24 }, (_, i) => {
  const hour = i;
  const time = `${hour.toString().padStart(2, '0')}:00`;
  
  // Generate realistic weather patterns
  const baseTemp = 15 + Math.sin((hour - 6) * Math.PI / 12) * 8;
  const cloudiness = Math.max(0, 30 + Math.sin(hour * Math.PI / 8) * 40 + Math.random() * 20);
  const humidity = Math.max(20, 50 + Math.sin((hour + 4) * Math.PI / 12) * 25 + Math.random() * 10);
  const obstruction = Math.min(100, cloudiness + humidity * 0.3);
  
  return {
    time,
    hour,
    temperature: Math.round(baseTemp * 10) / 10,
    cloudCoverage: Math.round(cloudiness),
    humidity: Math.round(humidity),
    obstructionProbability: Math.round(obstruction),
    visibility: Math.round(100 - obstruction * 0.8),
  };
});

// Custom tooltip component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass p-4 rounded-lg border border-primary/30 shadow-glow-cyan">
        <p className="font-semibold text-primary mb-2">{`Time: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${entry.name === 'Temperature' ? '°C' : '%'}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const TrendGraph = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-card/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground mb-4">
            24-Hour Weather & Prediction Trends
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            LSTM AI predictions combined with real-time meteorological data
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sky Obstruction Chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center">
              <div className="w-3 h-3 bg-destructive rounded-full mr-2 animate-pulse" />
              Sky Obstruction Probability
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <defs>
                    <linearGradient id="obstructionGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="obstructionProbability"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2}
                    fill="url(#obstructionGradient)"
                    name="Obstruction"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Multi-line Weather Chart */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="glass rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300"
          >
            <h3 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center">
              <div className="w-3 h-3 bg-primary rounded-full mr-2 animate-pulse" />
              Weather Conditions
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="time" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="cloudCoverage"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    dot={false}
                    name="Cloud Coverage"
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="hsl(var(--secondary))"
                    strokeWidth={2}
                    dot={false}
                    name="Humidity"
                  />
                  <Line
                    type="monotone"
                    dataKey="visibility"
                    stroke="hsl(var(--success))"
                    strokeWidth={2}
                    dot={false}
                    name="Visibility"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        {/* Temperature Trend */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-8 glass rounded-xl p-6 border border-primary/20 hover:border-primary/40 transition-all duration-300"
        >
          <h3 className="text-xl font-heading font-semibold text-foreground mb-4 flex items-center">
            <div className="w-3 h-3 bg-warning rounded-full mr-2 animate-pulse" />
            Temperature Trend (°C)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockTrendData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="time" 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <Tooltip content={<CustomTooltip />} />
                <defs>
                  <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--warning))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--warning))" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="temperature"
                  stroke="hsl(var(--warning))"
                  strokeWidth={3}
                  fill="url(#temperatureGradient)"
                  name="Temperature"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-6 flex flex-wrap justify-center gap-6 text-sm"
        >
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full" />
            <span className="text-muted-foreground">Cloud Coverage</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-secondary rounded-full" />
            <span className="text-muted-foreground">Humidity</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-success rounded-full" />
            <span className="text-muted-foreground">Visibility</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full" />
            <span className="text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-destructive rounded-full" />
            <span className="text-muted-foreground">AI Obstruction Prediction</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrendGraph;