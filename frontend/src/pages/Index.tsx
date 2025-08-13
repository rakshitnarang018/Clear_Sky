import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import PredictionCards from '@/components/PredictionCards';
import TrendGraph from '@/components/TrendGraph';
import StarfieldBackground from '@/components/StarfieldBackground';

const Index = () => {
  return (
    <div className="min-h-screen bg-background dark">
      {/* 3D Starfield Background */}
      <StarfieldBackground />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section with cosmic background */}
        <HeroSection />
        
        {/* Prediction Cards */}
        <PredictionCards />
        
        {/* Trend Graph Section */}
        <TrendGraph />
        
        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border/30">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-aurora rounded-full animate-pulse-glow" />
                  <span className="font-heading font-bold text-xl text-primary">
                    Clear_Sky
                  </span>
                </div>
                <p className="text-muted-foreground text-sm">
                  AI-powered night sky predictions for astronomers and stargazers worldwide.
                </p>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Features</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• 24/7 Sky Predictions</li>
                  <li>• AI Weather Analysis</li>
                  <li>• Real-time Updates</li>
                  <li>• Location-based Forecasts</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Resources</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• API Documentation</li>
                  <li>• Stargazing Guide</li>
                  <li>• Weather Data</li>
                  <li>• Community Forum</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-4">Connect</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Twitter @clearsky_ai</li>
                  <li>• GitHub Repository</li>
                  <li>• Discord Community</li>
                  <li>• Newsletter</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border/30 mt-8 pt-8 text-center">
              <p className="text-sm text-muted-foreground">
                © 2025 Clear_Sky. Made for ARIES Nainital
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Index;
