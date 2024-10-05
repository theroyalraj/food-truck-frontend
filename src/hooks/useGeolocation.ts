import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLat, setLon } from "../app/features/locationSlice"; // import your Redux actions


export const useGeolocation = () => {
  const [position, setPosition] = useState<{ latitude: number; longitude: number } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch(); // Initialize Redux dispatch

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }

    const geoSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setPosition({ latitude, longitude });
      console.log(latitude, longitude)
      dispatch(setLat(latitude.toString())); // Dispatch to store lat in Redux
      dispatch(setLon(longitude.toString())); // Dispatch to store lon in Redux

    };

    const geoError = (error: GeolocationPositionError) => {
      setError(error.message);
      console.log(error)
    };

    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
  }, []);

  return { position, error };
};