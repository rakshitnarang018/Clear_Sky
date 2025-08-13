import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background dark">
      <div className="text-center glass p-8 rounded-xl border border-primary/30">
        <h1 className="text-6xl font-heading font-bold mb-4 text-primary animate-pulse-glow">404</h1>
        <p className="text-xl text-muted-foreground mb-6">Lost in space? This page doesn't exist.</p>
        <a 
          href="/" 
          className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-glow-cyan transition-all duration-300 hover:scale-105"
        >
          Return to Earth 🌍
        </a>
      </div>
    </div>
  );
};

export default NotFound;
