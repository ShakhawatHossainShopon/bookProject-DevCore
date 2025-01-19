import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

// Define the structure of the response
interface VolumeInfo {
  title: string;
  authors?: string[];
  publishedDate?: string;
  description?: string;
  imageLinks?: {
    thumbnail?: string;
  };
}

interface GoogleBooksApiResponse {
  items?: {
    volumeInfo: VolumeInfo;
  }[];
}

// Router definition
export const bookRouter = createTRPCRouter({
  getBookMetadata: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
      if (!apiKey) {
        throw new Error("Google Books API key is missing");
      }

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          input.title
        )}&key=${apiKey}`
      );

      const data: GoogleBooksApiResponse = await response.json(); // Explicitly type the response
      const book = data.items?.[0]?.volumeInfo;

      if (!book) {
        throw new Error("No book found with the given title");
      }

      // Safely extract data with type checks
      return {
        title: book.title,
        author: book.authors?.join(", "),
        publishedDate: book.publishedDate,
        description: book.description,
        image: book.imageLinks?.thumbnail,
      };
    }),

  saveBookMetadata: publicProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        publishedDate: z.string(),
        description: z.string(),
        image: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.book.create({
        data: {
          title: input.title,
          author: input.author,
          publishedDate: input.publishedDate,
          description: input.description,
          image: input.image ?? "",
        },
      });
    }),

  getAllSavedBooks: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.book.findMany();
  }),

  deleteBook: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.book.delete({
        where: { id: input.id },
      });
    }),
});
