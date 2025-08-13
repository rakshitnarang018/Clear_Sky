import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, Telescope } from 'lucide-react';
import cosmicHeroBg from '@/assets/cosmic-hero-bg.jpg';

const HeroSection = () => {
  const [location, setLocation] = useState('');

  const handlePrediction = () => {
    // Handle sky prediction logic
    console.log('Predicting sky for:', location);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic Background */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${cosmicHeroBg})` }}
      >
        <div className="absolute inset-0 bg-background/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full animate-sparkle"
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-1 h-1 bg-secondary rounded-full animate-sparkle"
          animate={{
            y: [0, -15, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-3 h-3 bg-accent rounded-full animate-sparkle"
          animate={{
            y: [0, -25, 0],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-8"
        >
          {/* Logo Icon */}
          <motion.div
            className="flex justify-center mb-6"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.4 }}
          >
            <div className="relative">
              <Telescope className="w-16 h-16 text-primary animate-pulse-glow" />
              <motion.div
                className="absolute -top-2 -right-2 w-4 h-4 bg-secondary rounded-full"
                animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-foreground leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            See the Stars
            <br />
            <span className="bg-aurora bg-clip-text text-transparent animate-pulse">
              Before They Appear
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl sm:text-2xl text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            AI-powered night sky predictions for astronomers and stargazers 🌌
          </motion.p>

          {/* Location Input & CTA */}
          <motion.div
            className="max-w-md mx-auto space-y-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Enter your location..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 glass border-primary/30 hover:border-primary focus:border-primary transition-all duration-300 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <Button
              variant="hero"
              size="lg"
              onClick={handlePrediction}
              className="w-full h-14 text-lg font-semibold"
            >
              <Search className="w-5 h-5 mr-2" />
              Predict My Sky
            </Button>
          </motion.div>

          {/* Stats or Features */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            {[
              { number: '99%', label: 'Accuracy' },
              { number: '24h', label: 'Predictions' },
              { number: '10k+', label: 'Stargazers' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center glass p-4 rounded-lg hover-glow-cyan"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-2xl font-heading font-bold text-primary">
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-primary rounded-full mt-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;