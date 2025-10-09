import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Search } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface CitySearchProps {
  currentCity: string;
  onCityChange: (city: string) => void;
}

const popularCities = [
  "Nainital", "Delhi", "Mumbai", "Bangalore", "Pune", 
  "Chennai", "Hyderabad", "Kolkata", "Ahmedabad", 
];

export function CitySearch({ currentCity, onCityChange }: CitySearchProps) {
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCityChange(input.trim());
      setInput("");
      setIsOpen(false);
    }
  };

  const handleCitySelect = (city: string) => {
    onCityChange(city);
    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="gap-2">
          <MapPin className="w-4 h-4" />
          <span className="hidden sm:inline">{currentCity}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 glass-card" align="end">
        <div className="space-y-4">
          <h4 className="font-medium">Change Location</h4>
          
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              placeholder="Enter city name..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Search className="w-4 h-4" />
            </Button>
          </form>

          <div>
            <p className="text-sm text-muted-foreground mb-2">Popular cities:</p>
            <div className="flex flex-wrap gap-2">
              {popularCities.map((city) => (
                <Button
                  key={city}
                  variant={city === currentCity ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
