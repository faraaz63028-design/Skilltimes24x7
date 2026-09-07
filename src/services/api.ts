import { NewsArticle, Category, Comment, Advertisement, WebsiteStats, Language } from '../types';

export const api = {
  // Articles
  async getArticles(params?: {
    category?: string;
    subArea?: string;
    language?: Language | 'all';
    isBreaking?: boolean;
    isFeatured?: boolean;
    isTrending?: boolean;
    status?: string;
    query?: string;
    limit?: number;
    admin?: boolean;
  }): Promise<NewsArticle[]> {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, val]) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, String(val));
        }
      });
    }
    const res = await fetch(`/api/articles?${searchParams.toString()}`);
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  },

  async getArticleById(idOrSlug: string): Promise<NewsArticle> {
    const res = await fetch(`/api/articles/${encodeURIComponent(idOrSlug)}`);
    if (!res.ok) throw new Error('Article not found');
    return res.json();
  },

  async getBreakingNews(): Promise<NewsArticle[]> {
    const res = await fetch('/api/articles/breaking');
    if (!res.ok) throw new Error('Failed to fetch breaking news');
    return res.json();
  },

  async getTrendingNews(): Promise<NewsArticle[]> {
    const res = await fetch('/api/articles/trending');
    if (!res.ok) throw new Error('Failed to fetch trending news');
    return res.json();
  },

  async createArticle(data: Partial<NewsArticle>): Promise<NewsArticle> {
    const res = await fetch('/api/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Failed to create article');
    }
    return res.json();
  },

  async updateArticle(id: string, data: Partial<NewsArticle>): Promise<NewsArticle> {
    const res = await fetch(`/api/articles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update article');
    return res.json();
  },

  async deleteArticle(id: string): Promise<void> {
    const res = await fetch(`/api/articles/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete article');
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('Failed to fetch categories');
    return res.json();
  },

  async createCategory(data: Partial<Category>): Promise<Category> {
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create category');
    return res.json();
  },

  async deleteCategory(id: string): Promise<void> {
    const res = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete category');
  },

  // Comments
  async getComments(articleId?: string, admin = false): Promise<Comment[]> {
    const url = admin ? '/api/comments?admin=true' : `/api/comments?articleId=${encodeURIComponent(articleId || '')}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch comments');
    return res.json();
  },

  async addComment(data: { articleId: string; authorName: string; content: string }): Promise<Comment> {
    const res = await fetch('/api/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to post comment');
    return res.json();
  },

  async deleteComment(id: string): Promise<void> {
    const res = await fetch(`/api/comments/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete comment');
  },

  async updateCommentStatus(id: string, status: 'approved' | 'pending'): Promise<void> {
    const res = await fetch(`/api/comments/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error('Failed to update comment');
  },

  // Advertisements
  async getAds(position?: string, admin = false): Promise<Advertisement[]> {
    const url = admin ? '/api/ads?admin=true' : `/api/ads${position ? `?position=${position}` : ''}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch ads');
    return res.json();
  },

  async createAd(data: Partial<Advertisement>): Promise<Advertisement> {
    const res = await fetch('/api/ads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to create ad');
    return res.json();
  },

  async updateAd(id: string, data: Partial<Advertisement>): Promise<Advertisement> {
    const res = await fetch(`/api/ads/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update ad');
    return res.json();
  },

  async deleteAd(id: string): Promise<void> {
    const res = await fetch(`/api/ads/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete ad');
  },

  async recordAdClick(id: string): Promise<void> {
    fetch(`/api/ads/${id}/click`, { method: 'POST' }).catch(() => {});
  },

  // Stats
  async getStats(): Promise<WebsiteStats> {
    const res = await fetch('/api/stats');
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // Upload image
  async uploadImage(dataUrl: string, filename?: string): Promise<{ url: string; filename: string }> {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ dataUrl, filename }),
    });
    if (!res.ok) throw new Error('Failed to upload image');
    return res.json();
  },

  // Auth
  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || 'Authentication failed');
    }
    return res.json();
  }
};
