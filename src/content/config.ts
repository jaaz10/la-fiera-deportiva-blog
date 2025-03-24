import { defineCollection, z } from 'astro:content';

// Define the schema for the videos collection
const videosCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(), // Make sure this matches the field name in your markdown
    videoId: z.string(), // Add this required field
    thumbnailUrl: z.string(),
    videoUrl: z.string(),
    // Add any other fields you need
  })
});

// Export the collections
export const collections = {
  'videos': videosCollection,
  // Include any other collections you might have
};