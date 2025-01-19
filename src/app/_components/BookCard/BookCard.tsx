// components/BookCard.tsx
const BookCard = () => {
  return (
    <div className="mb-4 rounded-lg border bg-white p-6 shadow-md transition-all hover:shadow-lg">
      <h3 className="text-xl font-semibold text-gray-900">Book Title</h3>
      <p className="text-gray-700">Author: Author Name</p>
      <p className="mt-2 text-sm text-gray-500">
        This is a brief description of the book. It can span a few lines or more
        depending on the content.
      </p>
      <button
        className="mt-4 rounded-md bg-green-600 px-4 py-2 text-white transition-all hover:bg-green-700"
        disabled
      >
        Save Book
      </button>
    </div>
  );
};

export default BookCard;
