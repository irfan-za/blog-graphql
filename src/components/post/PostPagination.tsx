interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  limit: number;
  totalCount: number;
  postsCount: number;
  onPrevious: () => void;
  onNext: () => void;
  onLimitChange: (newLimit: number) => void;
}

export default function PostPagination({
  currentPage,
  totalPages,
  limit,
  totalCount,
  postsCount,
  onPrevious,
  onNext,
  onLimitChange,
}: PostPaginationProps) {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-lg shadow-md">
      <div className="flex items-center gap-2">
        <label htmlFor="limit" className="text-sm font-medium text-gray-700">
          Posts per page:
        </label>
        <select
          id="limit"
          value={limit}
          onChange={(e) => onLimitChange(Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={onPrevious}
          disabled={currentPage === 1}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-sm font-medium text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={onNext}
          disabled={currentPage >= totalPages}
          className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
        >
          Next
        </button>
      </div>

      <div className="text-sm text-gray-600">
        Showing {postsCount === 0 ? 0 : (currentPage - 1) * limit + 1} -{" "}
        {Math.min(currentPage * limit, totalCount)} of {totalCount} posts
      </div>
    </div>
  );
}
