import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useCity } from "@/hooks/useCity";
import { fetchWeather } from "@/lib/api";
import { CitySearch } from "./CitySearch";
import { LastUpdatedPill } from "./LastUpdatedPill";
import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { Telescope } from "lucide-react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const [city, setCity] = useCity();

  const { data: weatherData } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    staleTime: 5 * 60 * 1000,
  });

  const lastUpdated = weatherData ? new Date() : new Date();

  const navItems = [
    { path: "/", label: "Dashboard" },
    { path: "/details", label: "Details" },
    { path: "/traffic", label: "Traffic" },
    { path: "/about", label: "About" },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Telescope className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold">ARIES ClearSky</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">
                  Observing Conditions Monitor
                </p>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "secondary" : "ghost"}
                  asChild
                >
                  <Link to={`${item.path}?city=${city}`}>{item.label}</Link>
                </Button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              {weatherData && <LastUpdatedPill timestamp={lastUpdated} />}
              <CitySearch currentCity={city} onCityChange={setCity} />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Nav */}
          <nav className="md:hidden flex items-center gap-1 mt-4 overflow-x-auto pb-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "secondary" : "ghost"}
                size="sm"
                asChild
              >
                <Link to={`${item.path}?city=${city}`}>{item.label}</Link>
              </Button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="glass-card border-t border-border mt-auto">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground text-center md:text-left">
              <p className="font-medium mb-1">ARIES ClearSky</p>
              <p className="text-xs">Data from ARIES APIs • Built for astronomers</p>
            </div>
            <div className="text-xs text-muted-foreground text-center md:text-right">
              <p>© {new Date().getFullYear()} ARIES Observatory</p>
              <p className="mt-1">
                Real-time weather, predictions & air traffic monitoring
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
