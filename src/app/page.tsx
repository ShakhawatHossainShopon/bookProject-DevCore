import Link from "next/link";
import SearchBar from "./_components/SearchBar/SearchBar";

// import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
import Loader from "./_components/Loader/Loader";
import BookCard from "./_components/BookCard/BookCard";
import SavedBooks from "./_components/SavedBooks/SavedBooks";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();

  return (
    // <HydrateClient>
    <>
      <div className="container mx-auto p-6">
        <SearchBar />
        <Loader />
        <div className="mb-8 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <BookCard />
          <BookCard />
          <BookCard />
        </div>
        <SavedBooks />
      </div>
    </>
    // </HydrateClient>
  );
}
