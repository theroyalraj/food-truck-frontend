import { useState } from "react";
import { useSelector } from "react-redux";
import SearchForm from "../components/SearchForm";
import FoodTruckCard from "../components/FoodTruckCard";
import { searchFoodTrucks } from "../../services/api";
import { RootState } from "../store";
import { useGeolocation } from "../../hooks/useGeolocation";

const Home = () => {
  const [results, setResults] = useState<any[]>([]);
  const [limit] = useState<number>(3);
  const [offset, setOffset] = useState<number>(0);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false); // Add a loading state

  // Redux state selectors
  const distance = useSelector((state: RootState) => state.search.distance) || "";
  const unit = useSelector((state: RootState) => state.search.unit) || "km";
  const query = useSelector((state: RootState) => state.search.query);
  const lat = useSelector((state: RootState) => state.location.lat);
  const lon = useSelector((state: RootState) => state.location.lon);
  
  // Geolocation hook for additional handling
  const { error } = useGeolocation();

  const handleSearch = async (isPagination: boolean = false) => {
    setLoading(true);  // Start loading when search begins
    if (!isPagination) {
      setOffset(0);  // Reset offset on a new search
    }

    let latitude = lat;
    let longitude = lon;

    if (!latitude || !longitude) {
      console.error("No geolocation data available");
      setLoading(false);
      return;
    }

    const dayOrder = new Date().getDay();
    const params = {
      lat: latitude,
      lon: longitude,
      distance: distance,
      unit: unit,
      query,
      dayOrder,
      limit,
      offset,
    };

    try {
      const data = await searchFoodTrucks(params);
      setResults(data.payload);
      setTotalResults(data.total);
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false);  // Stop loading after data is fetched
    }
  };

  const handleNextPage = () => {
    const newOffset = offset + limit;
    if (newOffset < totalResults) {
      setOffset(newOffset);
      handleSearch(true);  // Pass true to indicate pagination
    }
  };

  const handlePreviousPage = () => {
    const newOffset = offset - limit;
    if (newOffset >= 0) {
      setOffset(newOffset);
      handleSearch(true);  // Pass true to indicate pagination
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Search Food Trucks</h1>
      
      {/* Search Form */}
      <SearchForm onSearch={handleSearch} />

      {/* Show Loader when loading is true */}
      {loading ? (
        <div className="flex justify-center items-center mt-8">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : (
        <div className="flex items-center mt-8 w-full max-w-6xl">
          {/* Left Arrow for Pagination */}
          <button
            onClick={handlePreviousPage}
            disabled={offset === 0}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed ${
              offset === 0 ? "cursor-not-allowed" : ""
            }`}
          >
            ←
          </button>

          {/* Food Truck Cards */}
          <div className="flex-1 mx-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {results.length > 0 ? (
                results.map((foodTruck) => (
                  <FoodTruckCard key={foodTruck.id} foodTruck={foodTruck} />
                ))
              ) : (
                <p className="text-center text-gray-600">No results found</p>
              )}
            </div>
          </div>

          {/* Right Arrow for Pagination */}
          <button
            onClick={handleNextPage}
            disabled={offset + limit >= totalResults}
            className={`px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed ${
              offset + limit >= totalResults ? "cursor-not-allowed" : ""
            }`}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
