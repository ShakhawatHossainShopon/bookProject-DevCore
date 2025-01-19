"use client";

import { useState, useEffect } from "react";
import { api } from "~/trpc/react";
import BookCard from "../BookCard/BookCard";
import Loader from "./../Loader/Loader";

// Helper function to debounce the search query
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler); // Clean up on component unmount or when value changes
    };
  }, [value, delay]);

  return debouncedValue;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [bookData, setBookData] = useState(null);
  const [title, setBooktitle] = useState(null);
  const [author, setBookauthor] = useState(null);
  const [publishedDate, setBookpublishedDate] = useState(null);
  const [description, setBookdescription] = useState(null);
  const [image, setBookimage] = useState(null);
  const debouncedQuery = useDebounce(query, 500); // Debounce for 500ms

  // Fetch book metadata using debounced query
  const { data, isLoading, error } = api.book.getBookMetadata.useQuery(
    { title: debouncedQuery },
    { enabled: !!debouncedQuery } // Only run the query if there's a valid query
  );

  // Update book data when query changes
  useEffect(() => {
    if (data) {
      setBookData(data);
      setBooktitle(data.title);
      setBookauthor(data.author);
      setBookpublishedDate(data.publishedDate);
      setBookdescription(data.description);
      setBookimage(data.image);
    }
  }, [data]);
  const utils = api.useUtils();
  const Savebook = api.book?.saveBookMetadata.useMutation({
    onSuccess: async () => {
      await utils.book.invalidate();
    },
  });
  const handleSaveBook = async () => {
    if (!title || !author || !publishedDate || !description) {
      console.error("All fields are required to save the book.");
      return;
    }

    try {
      await Savebook.mutateAsync({
        title,
        author,
        publishedDate,
        description,
        image: image || "", // Provide default value if image is null
      });
      console.log("Book saved successfully!");
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  return (
    <>
      <div className="mb-8 flex items-center w-full py-7 justify-center">
        <label className="input input-bordered flex items-center gap-2 md:w-2/4">
          <input
            type="text"
            className="grow"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for books..."
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
          >
            <path
              fillRule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clipRule="evenodd"
            />
          </svg>
        </label>
      </div>

      <div className="mb-8 flex justify-center">
        {isLoading ? (
          <div>
            <Loader />
          </div> // Loading state
        ) : error ? (
          <div>Error fetching data. Please try again.</div> // Error state
        ) : bookData ? (
          <BookCard onSave={handleSaveBook} res={bookData} />
        ) : (
          <div>Please Search Your Favorite Books</div> // No results state
        )}
      </div>
    </>
  );
};

export default SearchBar;
