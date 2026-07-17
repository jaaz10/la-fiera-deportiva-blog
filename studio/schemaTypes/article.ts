import { defineField, defineType } from 'sanity';

export const article = defineType({
  name: 'article',
  title: 'Article',
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
          { title: 'La Liga', value: 'La Liga' },
          { title: 'Champions League', value: 'Champions League' },
          { title: 'Other', value: 'Other' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
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
      name: 'heroImage',
      title: 'Hero image',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero image URL (optional fallback)',
      description: 'Use a path like /gregg.png if the image is already in the site public folder.',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (rule) => rule.required(),
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
      description: '1 = main featured card, 2–3 = secondary cards. Leave empty to hide from homepage hero.',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'heroImage',
    },
  },
});
