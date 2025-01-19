// components/SavedBooksList.tsx
const SavedBooks = () => {
  return (
    <div>
      <h2 className="mb-4 text-2xl font-semibold">Saved Books</h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Sample saved books - this can later be dynamic */}
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold">Saved Book Title</h3>
          <p className="text-sm text-gray-600">Author Name</p>
        </div>
        <div className="rounded-lg border p-4 shadow-sm">
          <h3 className="font-semibold">Saved Book Title</h3>
          <p className="text-sm text-gray-600">Author Name</p>
        </div>
      </div>
    </div>
  );
};

export default SavedBooks;
