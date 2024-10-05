interface PaginationControlsProps {
  offset: number;
  limit: number;
  totalResults: number;
  onNextPage: () => void;
  onPreviousPage: () => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  offset,
  limit,
  totalResults,
  onNextPage,
  onPreviousPage,
}) => {
  return (
    <div className="flex justify-between items-center mt-8 w-full">
      {/* Left Arrow */}
      <button
        onClick={onPreviousPage}
        disabled={offset === 0}
        className={`px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed ${
          offset === 0 ? "cursor-not-allowed" : ""
        }`}
      >
        ←
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNextPage}
        disabled={offset + limit >= totalResults}
        className={`px-4 py-2 bg-indigo-600 text-white rounded-full shadow-md transition-transform transform hover:scale-110 disabled:bg-gray-400 disabled:cursor-not-allowed ${
          offset + limit >= totalResults ? "cursor-not-allowed" : ""
        }`}
      >
        →
      </button>
    </div>
  );
};

export default PaginationControls;
