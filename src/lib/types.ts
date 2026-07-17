export type PortableTextSpan = {
  _type: 'span';
  _key?: string;
  text: string;
  marks?: string[];
};

export type PortableTextBlock = {
  _type: 'block';
  _key?: string;
  style?: string;
  markDefs?: unknown[];
  children?: PortableTextSpan[];
};

export type Article = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  publishedAt: string;
  heroImageUrl?: string | null;
  heroImage?: {
    asset?: { _ref?: string; url?: string };
    alt?: string;
  } | null;
  body: PortableTextBlock[] | string[];
  featured?: boolean;
  homepageOrder?: number | null;
};

export type Video = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  publishedAt: string;
  youtubeId: string;
  thumbnailUrl?: string | null;
  thumbnail?: {
    asset?: { _ref?: string; url?: string };
  } | null;
  featured?: boolean;
  homepageOrder?: number | null;
};
