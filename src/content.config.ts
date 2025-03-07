import { defineCollection, z } from 'astro:content';

// Keep existing blog collection
const blog = defineCollection({
  // This likely exists already
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    // other existing properties...
  }),
});

// Add video collection
const videos = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    videoId: z.string(), // YouTube video ID
  }),
});

// Add podcast collection
const podcasts = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    spotifyId: z.string(), // Spotify podcast ID
  }),
});

export const collections = {
  'blog': blog,
  'videos': videos,
  'podcasts': podcasts,
};