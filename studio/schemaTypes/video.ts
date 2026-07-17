import { defineField, defineType } from 'sanity';

export const video = defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'MLS', value: 'MLS' },
          { title: 'NWSL', value: 'NWSL' },
          { title: 'Podcast', value: 'Podcast' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'youtubeId',
      title: 'YouTube video ID',
      description: 'The ID from youtube.com/watch?v=XXXX (just the XXXX part).',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Custom thumbnail',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'thumbnailUrl',
      title: 'Thumbnail URL (optional fallback)',
      description: 'Use a path like /guti.png if the image is already in the site public folder. Leave empty to use the YouTube thumbnail.',
      type: 'string',
    }),
    defineField({
      name: 'featured',
      title: 'Featured on homepage',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homepageOrder',
      title: 'Homepage order',
      description: 'Lower numbers appear first in VIDEOS DESTACADOS. Leave empty to hide from that section.',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
    },
  },
});
