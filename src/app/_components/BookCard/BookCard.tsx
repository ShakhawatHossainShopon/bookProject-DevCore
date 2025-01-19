import Image from "next/image";

// Define the type for book metadata
interface BookMetadata {
  title: string;
  author: string;
  publishedDate: string;
  description: string;
  image: string; // URL of the image
}

// Define the type for the function prop (e.g., for saving or interacting with the book)
interface BookCardProps {
  res: BookMetadata;
  onSave: () => void; // Function to handle saving the book
}

const BookCard: React.FC<BookCardProps> = ({ res, onSave }) => {
  // Fallbacks if data is missing
  const fallbackImage = "/default-book-image.jpg"; // Ensure this file exists in the 'public' folder
  const imageUrl = res?.image || fallbackImage;
  const description = res?.description || "No description available";

  return (
    <>
      <div className="card lg:card-side bg-base-100 shadow-xl md:w-2/4 px-6 md:px-0">
        <figure>
          <Image
            src={imageUrl}
            alt="Album"
            width={400} // Provide width in pixels
            height={250} // Provide height in pixels
            objectFit="object-cover w-full h-full mx-6"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title text-sm md:text-base">{res.title}</h2>
          <p>Author: {res.author}</p>

          <div className="card-actions justify-end">
            <button onClick={onSave} className="btn btn-outline btn-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v14a2 2 0 01-2 2zM12 8v8m4-4H8"
                />
              </svg>
              Save Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookCard;
