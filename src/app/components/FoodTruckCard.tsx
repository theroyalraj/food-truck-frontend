import { useState } from "react";

// Define the FoodTruck interface
interface FoodTruck {
  id: string;
  applicant: string;
  dayOfWeekStr: string;
  startTime: string;
  endTime: string;
  permitLocation: string;
  optionalText: string;
  coordinates: [number, number];
  createdAt: string;
}

const FoodTruckCard: React.FC<{ foodTruck: FoodTruck }> = ({ foodTruck }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const textLimit = 100; // Limit for the initial characters shown

  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform hover:scale-105 transition-transform">
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">{foodTruck.applicant}</h2>
      <p className="text-gray-500">
        {foodTruck.dayOfWeekStr}, {foodTruck.startTime} - {foodTruck.endTime}
      </p>
      <p className="text-gray-600 mt-2">{foodTruck.permitLocation}</p>
      
      {/* Optional Text with View More/Less */}
      <p className="text-gray-500 mt-2">
        {isExpanded
          ? foodTruck.optionalText // Show full text if expanded
          : `${foodTruck.optionalText.substring(0, textLimit)}...`} {/* Show limited text */}
      </p>
      {foodTruck.optionalText.length > textLimit && (
        <a
          href="#"
          onClick={(e) => { 
            e.preventDefault(); 
            toggleExpanded(); 
          }}
          className="text-blue-500 underline mt-1 cursor-pointer"
        >
          {isExpanded ? "View Less" : "View More"}
        </a>
      )}

      <div className="text-sm text-gray-500 mt-4">
        <strong>Coordinates:</strong> ({foodTruck.coordinates[1]}, {foodTruck.coordinates[0]})
      </div>
      <div className="text-sm text-gray-500 mt-2">
        <strong>Created At:</strong> {new Date(foodTruck.createdAt).toLocaleString()}
      </div>

      <div className="mt-4">
        <a
          href={`https://www.google.com/maps?q=${foodTruck.coordinates[1]},${foodTruck.coordinates[0]}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline"
        >
          View on Google Maps
        </a>
      </div>
    </div>
  );
};

export default FoodTruckCard;
