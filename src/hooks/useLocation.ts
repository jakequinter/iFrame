
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { GeolocationPositionCoords } from 'src/types/geolocation/geolocation'

export const useLocation = (options = {}) => {
  const router = useRouter();
  const [location, setLocation] = useState<GeolocationPositionCoords>();
  const [error, setError] = useState("");

  // Success handler for geolocation's `getCurrentPosition` method
  const handleSuccess = (position: GeolocationPosition) => {
    const { latitude, longitude } = position.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  // Error handler for geolocation's `getCurrentPosition` method
  const handleError = () => {
    if (router.query.id === 'FL-CCHDF') {
      setLocation({latitude: 28.538336, longitude: -81.379234});
    } else if (router.query.id === 'TX-CCHDF') {
      setLocation({latitude: 29.760427, longitude: -95.369804});
    } else {
      setLocation({latitude: 43.426029, longitude: -88.184502});
    }
      
  };

  useEffect(() => {
    const { geolocation } = navigator;

    // If the geolocation is not defined set error
    if (!geolocation) {
      setError("Geolocation is not supported.");
      return;
    }

    // Call Geolocation API
    geolocation.getCurrentPosition(handleSuccess, handleError, options);
  }, [options]);

  return { location, error };
};