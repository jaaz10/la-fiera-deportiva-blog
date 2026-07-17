import { defineCollection, z } from 'astro:content';

// Legacy markdown samples (RSS). Articles/videos are managed in Sanity.
const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const videos = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    videoId: z.string(),
    thumbnailUrl: z.string().optional(),
    videoUrl: z.string().optional(),
  }),
});

export const collections = {
  blog,
  videos,
};
