
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';

import { GeolocationPositionCoords } from 'src/types/geolocation/geolocation'
import { ORLANDO_FL, HOUSTON_TX, WEST_BEND_WI } from 'src/constants/coordinates'

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
      setLocation(ORLANDO_FL);
    } else if (router.query.id === 'TX-CCHDF') {
      setLocation(HOUSTON_TX);
    } else {
      setLocation(WEST_BEND_WI);
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