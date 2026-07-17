import { createClient, type SanityClient } from '@sanity/client';
import { createImageUrlBuilder, type SanityImageSource } from '@sanity/image-url';
import {
  paragraphsToPortableText,
  seedArticles,
  seedVideos,
} from '../data/seed-content';
import type { Article, Video } from './types';

const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET || 'production';
const apiVersion = import.meta.env.PUBLIC_SANITY_API_VERSION || '2025-03-01';
const token = import.meta.env.SANITY_API_READ_TOKEN;

export const isSanityConfigured = Boolean(projectId && projectId !== 'your_project_id');

let client: SanityClient | null = null;

function getClient(): SanityClient | null {
  if (!isSanityConfigured) return null;
  if (!client) {
    client = createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      token: token || undefined,
    });
  }
  return client;
}

const builder = isSanityConfigured
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

export function urlForImage(source: SanityImageSource) {
  return builder?.image(source);
}

function formatArticleFromSeed(article: (typeof seedArticles)[number]): Article {
  return {
    _id: article._id,
    title: article.title,
    slug: article.slug,
    category: article.category,
    excerpt: article.excerpt,
    publishedAt: article.publishedAt,
    heroImageUrl: article.heroImageUrl,
    body: paragraphsToPortableText(article.body),
    featured: article.featured,
    homepageOrder: article.homepageOrder,
  };
}

function formatVideoFromSeed(video: (typeof seedVideos)[number]): Video {
  return {
    _id: video._id,
    title: video.title,
    slug: video.slug,
    category: video.category,
    description: video.description,
    publishedAt: video.publishedAt,
    youtubeId: video.youtubeId,
    thumbnailUrl: video.thumbnailUrl,
    featured: video.featured,
    homepageOrder: video.homepageOrder,
  };
}

const articleProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  publishedAt,
  heroImageUrl,
  heroImage,
  body,
  featured,
  homepageOrder
}`;

const videoProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  description,
  publishedAt,
  youtubeId,
  thumbnailUrl,
  thumbnail,
  featured,
  homepageOrder
}`;

export async function getArticles(): Promise<Article[]> {
  const sanity = getClient();
  if (!sanity) {
    return seedArticles.map(formatArticleFromSeed);
  }

  try {
    const articles = await sanity.fetch<Article[]>(
      `*[_type == "article" && defined(slug.current)] | order(publishedAt desc) ${articleProjection}`,
    );
    return articles.length > 0 ? articles : seedArticles.map(formatArticleFromSeed);
  } catch (error) {
    console.warn('[sanity] Failed to fetch articles, using seed content.', error);
    return seedArticles.map(formatArticleFromSeed);
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  const articles = await getArticles();
  return articles.find((article) => article.slug === slug);
}

export async function getHomepageArticles(): Promise<{
  featured?: Article;
  secondary: Article[];
}> {
  const articles = await getArticles();
  const ordered = articles
    .filter((article) => article.homepageOrder != null)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));

  if (ordered.length === 0) {
    const seeded = seedArticles.map(formatArticleFromSeed);
    return {
      featured: seeded.find((a) => a.homepageOrder === 1),
      secondary: seeded.filter((a) => a.homepageOrder && a.homepageOrder > 1),
    };
  }

  return {
    featured: ordered.find((a) => a.homepageOrder === 1) ?? ordered[0],
    secondary: ordered.filter((a) => a.homepageOrder !== 1).slice(0, 2),
  };
}

export async function getVideos(): Promise<Video[]> {
  const sanity = getClient();
  if (!sanity) {
    return seedVideos.map(formatVideoFromSeed);
  }

  try {
    const videos = await sanity.fetch<Video[]>(
      `*[_type == "video" && defined(slug.current)] | order(publishedAt desc) ${videoProjection}`,
    );
    return videos.length > 0 ? videos : seedVideos.map(formatVideoFromSeed);
  } catch (error) {
    console.warn('[sanity] Failed to fetch videos, using seed content.', error);
    return seedVideos.map(formatVideoFromSeed);
  }
}

export async function getVideoBySlug(slug: string): Promise<Video | undefined> {
  const videos = await getVideos();
  return videos.find((video) => video.slug === slug);
}

export async function getHomepageVideos(): Promise<Video[]> {
  const videos = await getVideos();
  const ordered = videos
    .filter((video) => video.homepageOrder != null)
    .sort((a, b) => (a.homepageOrder ?? 99) - (b.homepageOrder ?? 99));

  if (ordered.length === 0) {
    return seedVideos.map(formatVideoFromSeed).slice(0, 3);
  }

  return ordered.slice(0, 3);
}

export function getArticleImageUrl(article: Article): string {
  if (article.heroImage) {
    const url = urlForImage(article.heroImage)?.width(1600).url();
    if (url) return url;
  }
  return article.heroImageUrl || '/blog-placeholder-1.jpg';
}

export function getVideoThumbnailUrl(video: Video): string {
  if (video.thumbnail) {
    const url = urlForImage(video.thumbnail)?.width(1200).url();
    if (url) return url;
  }
  if (video.thumbnailUrl) return video.thumbnailUrl;
  return `https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`;
}

export function formatPublishedDate(dateString: string, locale = 'es-MX'): string {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getBodyParagraphs(body: Article['body']): string[] {
  if (!body?.length) return [];
  if (typeof body[0] === 'string') return body as string[];

  return (body as import('./types').PortableTextBlock[])
    .filter((block) => block._type === 'block')
    .map((block) => (block.children || []).map((child) => child.text || '').join(''))
    .filter(Boolean);
}
