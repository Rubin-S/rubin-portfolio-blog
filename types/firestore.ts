export interface PostMetrics {
  views: number;
  likes: number;
  lastViewedAt?: string | Date;
}

export interface Post {
  id: string; // <--- ADDED THIS
  slug: string;
  title: string;
  excerpt: string;
  content?: string | object;
  published: boolean;
  status: "draft" | "published" | "archived";
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