export type PostStatus = "draft" | "published" | "archived";

export type PostContent = string | Record<string, unknown>;

export interface PostMetrics {
  views: number;
  likes: number;
  lastViewedAt?: string | Date | null;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: PostContent;
  published: boolean;
  status: PostStatus;
  tags: string[];
  seriesId?: string;
  seriesIndex?: number;
  coverImage?: string;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt: string | null;
  updatedAt: string;
  createdAt: string;
  metrics?: PostMetrics;
}

export interface Series {
  id: string;
  title: string;
  description: string;
  slug: string;
}
