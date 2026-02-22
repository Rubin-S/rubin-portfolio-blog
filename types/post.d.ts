export interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  tags?: string[];
  seriesId?: string | null;
  seriesIndex?: number | null;
  content?: any;
  publishedAt: string | null;
  updatedAt?: string | null;
}
