"use client";
// components/SearchBar.tsx
import { useState } from "react";

const SearchBar = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    // You can handle search functionality later, for now, this is just the UI.
  };

  return (
    <div className="mb-8 flex items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for books..."
        className="w-80 rounded border p-2 text-xl"
      />
      <button
        onClick={handleSearch}
        className="ml-2 rounded-md bg-blue-600 px-6 py-2 text-white transition-all hover:bg-blue-700"
        disabled={!query}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
