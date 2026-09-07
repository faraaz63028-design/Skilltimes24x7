export type Language = 'en' | 'hi' | 'ur' | 'ur-roman';

export interface NewsArticle {
  id: string;
  slug: string;
  headline: string;
  subheadline?: string;
  summary: string;
  content: string;
  category: string; // e.g. 'hyderabad', 'telangana', 'india', 'world', 'politics', 'crime', 'business', 'sports', 'entertainment', 'technology', 'videos'
  subArea?: string; // e.g. 'Old City', 'Charminar', 'Yakutpura', 'Nampally', 'Mehdipatnam', 'Rajendranagar', 'Falaknuma', 'Asif Nagar'
  language: Language;
  featuredImage: string;
  imageGallery?: string[];
  videoUrl?: string; // YouTube embed or video URL
  reporterName: string;
  reporterRole?: string;
  publishedAt: string;
  updatedAt?: string;
  scheduledAt?: string;
  status: 'published' | 'draft' | 'scheduled';
  isBreaking: boolean;
  isFeatured: boolean;
  isTrending: boolean;
  trendingRank?: number;
  tags: string[];
  views: number;
  likes: number;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  order: number;
}

export interface Comment {
  id: string;
  articleId: string;
  authorName: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending';
  likes: number;
}

export interface Advertisement {
  id: string;
  title: string;
  clientName: string;
  imageUrl: string;
  targetUrl: string;
  position: 'top-banner' | 'sidebar' | 'in-feed' | 'article-bottom';
  status: 'active' | 'inactive';
  impressions: number;
  clicks: number;
}

export interface AdminUser {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'editor' | 'reporter';
  email: string;
}

export interface WebsiteStats {
  totalArticles: number;
  totalViews: number;
  breakingNewsCount: number;
  totalComments: number;
  publishedCount: number;
  draftCount: number;
  categoryBreakdown: { [category: string]: number };
}
