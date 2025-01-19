import SearchBar from "./_components/SearchBar/SearchBar";
import { HydrateClient } from "~/trpc/server";
import SavedBooks from "./_components/SavedBooks/SavedBooks";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
export default async function Home() {
  return (
    <HydrateClient>
      <>
        <div className="container mx-auto">
          <Navbar />
          <SearchBar />
          <SavedBooks />
        </div>
        <div className=" pt-40">
          <Footer />
        </div>
      </>
    </HydrateClient>
  );
}
