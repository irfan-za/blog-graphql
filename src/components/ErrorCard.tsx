import { ErrorLike } from "@apollo/client";

export default function ErrorCard({ error }: { error: ErrorLike }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center mb-4">
          <h3 className="text-lg font-semibold text-red-800">
            Error Loading Data
          </h3>
        </div>
        <p className="text-red-600 mb-4">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
