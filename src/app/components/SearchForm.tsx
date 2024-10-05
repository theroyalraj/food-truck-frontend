import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLat, setLon, clearLocation } from "../features/locationSlice";
import { setDistanceRedux, setUnit, setQuery} from "../features/searchSlice";


interface SearchFormProps {
  onSearch: (distance: string, unit: string, query: string, notFirst: boolean) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }, loading) => {
  const dispatch = useDispatch();
  const lat = useSelector((state: RootState) => state.location.lat);
  const lon = useSelector((state: RootState) => state.location.lon);
  const distance = useSelector((state: RootState) => state.search.distance);
  const unit = useSelector((state: RootState) => state.search.unit);
  const query = useSelector((state: RootState) => state.search.query);


  const handleLatChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLat(e.target.value));
  };

  const handleLonChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setLon(e.target.value));
  };
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setDistanceRedux(e.target.value));
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };  
  
  const handleUnitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(e.target)
    dispatch(setUnit(e.target.value));
  };

  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setLat(latitude.toString()));
          dispatch(setLon(longitude.toString()));
        },
        (error) => {
          console.error("Error fetching geolocation:", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (distance && !lat && !lon) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            dispatch(setLat(latitude.toString()));
            dispatch(setLon(longitude.toString()));
            // dispatch(setDistanceRedux(distance));
            onSearch(distance, unit, query, true);
          },
          (error) => {
            console.error("Error fetching geolocation:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by your browser.");
      }
    } else {
      onSearch(distance, unit, query, true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 md:grid-cols-2 bg-white p-6 rounded-lg shadow-lg">
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Latitude</label>
        <input
          value={lat}  // Ensure the value is coming from Redux state, initially empty
          onChange={handleLatChange}
          placeholder="Enter Latitude"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Longitude</label>
        <input
          value={lon}  // Ensure the value is coming from Redux state, initially empty
          onChange={handleLonChange}
          placeholder="Enter Longitude"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Distance</label>
        <input
          value={distance}
          onChange={handleDistanceChange}
          placeholder="Enter Distance"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Unit</label>
        <select
          value={unit}
          onChange={handleUnitChange}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        >
          <option value="km">Kilometers</option>
          <option value="m">Meters</option>
        </select>
      </div>
      <div className="flex flex-col">
        <label className="mb-2 text-gray-700 font-semibold">Query</label>
        <input
          value={query}
          onChange={handleQueryChange}
          placeholder="Search Text"
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
        />
      </div>

      {/* Buttons */}
      <div className="flex space-x-4 mt-4">
        <button
          type="button"
          hidden={!loading}
          onClick={handleFetchLocation}
          className="w-full bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 transition"
        >
          Fetch Location
        </button>
        <button
          type="submit"
          hidden={!loading}
          className="w-full bg-green-500 text-white p-2 rounded-md shadow hover:bg-green-600 transition"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
