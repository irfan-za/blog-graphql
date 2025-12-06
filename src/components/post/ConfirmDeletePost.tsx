interface ConfirmDeletePostProps {
  postTitle: string;
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}

export default function ConfirmDeletePost({
  postTitle,
  isOpen,
  onConfirm,
  onCancel,
  isDeleting,
}: ConfirmDeletePostProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-900">
          Delete Post
        </h3>

        <div className="mb-6">
          <p className="text-gray-600 mb-2">
            Are you sure you want to delete this post?
          </p>
          <p className="text-sm text-gray-800 font-medium ">"{postTitle}"</p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-200 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}
