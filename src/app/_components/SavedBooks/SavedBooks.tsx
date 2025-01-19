"use client";

import { api } from "~/trpc/react";
import Loader from "./../Loader/Loader";

const SavedBooks = () => {
  const {
    data: savedBooks,
    isLoading,
    error,
  } = api.book.getAllSavedBooks.useQuery();
  const utils = api.useUtils();

  // Delete mutation
  const deleteBook = api.book.deleteBook.useMutation({
    onSuccess: async () => {
      await utils.book.getAllSavedBooks.invalidate(); // Refresh the saved books
    },
  });

  const handleDeleteBook = (id) => {
    deleteBook.mutate({ id });
  };

  return (
    <div className="px-6 md:px-0">
      <h2 className="mb-4 text-2xl font-bold pt-6">Saved Books</h2>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div>Error loading saved books.</div>
      ) : savedBooks && savedBooks.length > 0 ? (
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {savedBooks.map((book) => (
            <li key={book.id}>
              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title truncate">{book.title}</h2>
                  <p className="truncate">{book.description}</p>
                  <p className="text-sm text-gray-600">{book.author}</p>
                  <p className="text-sm text-gray-600">{book.publishedDate}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-error">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        class="w-6 h-6"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>No saved books found.</div>
      )}
    </div>
  );
};

export default SavedBooks;
