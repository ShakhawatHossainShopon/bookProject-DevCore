import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  // Query: Fetch metadata from Google Books API
  getBookMetadata: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
      if (!apiKey) {
        throw new Error("Google Books API key is missing");
      }

      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${input.title}&key=${apiKey}`,
      );

      const data = await response.json();
      const book = data.items?.[0]?.volumeInfo;

      if (!book) {
        throw new Error("No book found with the given title");
      }

      return {
        title: book.title,
        author: book.authors?.join(", ") || "Unknown",
        publishedDate: book.publishedDate || "Unknown",
        description: book.description || "No description available",
        image: book.imageLinks?.thumbnail || "",
      };
    }),

  // Mutation: Save book metadata to database
  saveBookMetadata: publicProcedure
    .input(
      z.object({
        title: z.string(),
        author: z.string(),
        publishedDate: z.string(),
        description: z.string(),
        image: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.book.create({
        data: {
          title: input.title,
          author: input.author,
          publishedDate: input.publishedDate,
          description: input.description,
          image: input.image,
        },
      });
    }),
});
