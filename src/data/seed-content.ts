import seed from './seed-content.json';

export type SeedArticle = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  heroImageUrl: string;
  featured: boolean;
  homepageOrder?: number;
  body: string[];
};

export type SeedVideo = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  publishedAt: string;
  youtubeId: string;
  thumbnailUrl: string;
  featured: boolean;
  homepageOrder?: number;
};

export const seedArticles = seed.articles as SeedArticle[];
export const seedVideos = seed.videos as SeedVideo[];

export function paragraphsToPortableText(paragraphs: string[]) {
  return paragraphs.map((text, index) => ({
    _type: 'block' as const,
    _key: `p${index}`,
    style: 'normal' as const,
    markDefs: [],
    children: [
      {
        _type: 'span' as const,
        _key: `s${index}`,
        text,
        marks: [],
      },
    ],
  }));
}
