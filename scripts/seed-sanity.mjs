/**
 * Seeds Sanity with existing La Fiera Deportiva articles and videos.
 *
 * Usage:
 *   1. Copy .env.example → .env and fill PUBLIC_SANITY_PROJECT_ID + SANITY_API_WRITE_TOKEN
 *   2. npm run seed:sanity
 */
import { config } from 'dotenv';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const seed = JSON.parse(
  readFileSync(join(__dirname, '../src/data/seed-content.json'), 'utf8'),
);

const projectId = process.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_API_WRITE_TOKEN?.trim();
const apiVersion = process.env.PUBLIC_SANITY_API_VERSION || '2025-03-01';

if (!projectId || projectId === 'your_project_id') {
  console.error('Missing PUBLIC_SANITY_PROJECT_ID in .env');
  process.exit(1);
}

if (!token) {
  console.error(
    'Missing SANITY_API_WRITE_TOKEN in .env (create a token with Editor permissions at sanity.io/manage)',
  );
  process.exit(1);
}

function paragraphsToPortableText(paragraphs) {
  return paragraphs.map((text, index) => ({
    _type: 'block',
    _key: `p${index}`,
    style: 'normal',
    markDefs: [],
    children: [
      {
        _type: 'span',
        _key: `s${index}`,
        text,
        marks: [],
      },
    ],
  }));
}

const mutations = [
  ...seed.articles.map((article) => ({
    createOrReplace: {
      _id: article._id,
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      category: article.category,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      heroImageUrl: article.heroImageUrl,
      body: paragraphsToPortableText(article.body),
      featured: article.featured,
      homepageOrder: article.homepageOrder,
    },
  })),
  ...seed.videos.map((video) => ({
    createOrReplace: {
      _id: video._id,
      _type: 'video',
      title: video.title,
      slug: { _type: 'slug', current: video.slug },
      category: video.category,
      description: video.description,
      publishedAt: video.publishedAt,
      youtubeId: video.youtubeId,
      thumbnailUrl: video.thumbnailUrl,
      featured: video.featured,
      homepageOrder: video.homepageOrder,
    },
  })),
];

const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}`;

const res = await fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  body: JSON.stringify({ mutations }),
});

const body = await res.text();
if (!res.ok) {
  console.error(`Seed failed (${res.status}):`, body);
  process.exit(1);
}

console.log(
  `Seeded ${seed.articles.length} articles and ${seed.videos.length} videos into ${projectId}/${dataset}`,
);
