import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const DEFAULT_CITY = "Delhi";
const STORAGE_KEY = "aries-clearsky-city";

export function useCity() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [city, setCity] = useState<string>(() => {
    // Priority: URL > localStorage > default
    const urlCity = searchParams.get("city");
    if (urlCity) return urlCity;
    
    const storedCity = localStorage.getItem(STORAGE_KEY);
    return storedCity || DEFAULT_CITY;
  });

  useEffect(() => {
    // Sync city to URL and localStorage
    const urlCity = searchParams.get("city");
    if (urlCity !== city) {
      setSearchParams({ city }, { replace: true });
    }
    localStorage.setItem(STORAGE_KEY, city);
  }, [city, searchParams, setSearchParams]);

  return [city, setCity] as const;
}
