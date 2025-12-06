import { CircleAlert } from "lucide-react";
import { PostInput } from "../../types";

interface PostFormProps {
  formData: PostInput;
  loading: boolean;
  error?: Error | null;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onCancel: () => void;
  submitLabel?: string;
  title?: string;
}

export default function PostForm({
  formData,
  loading,
  error,
  onSubmit,
  onChange,
  onCancel,
  submitLabel = "Create Post",
  title = "Create New Post",
}: PostFormProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <CircleAlert className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700 font-medium">Error: {error.message}</p>
          </div>
        </div>
      )}

      <form onSubmit={onSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Post Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={onChange}
            required
            placeholder="Enter post title"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition duration-200"
          />
        </div>

        <div>
          <label
            htmlFor="body"
            className="block text-sm font-semibold text-gray-700 mb-2"
          >
            Post Body
          </label>
          <textarea
            id="body"
            name="body"
            value={formData.body}
            onChange={onChange}
            required
            placeholder="Enter post content"
            rows={10}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none transition duration-200"
          />
        </div>

        <div className="flex justify-end gap-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 font-medium transition duration-200"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
          >
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </form>
    </div>
  );
}
