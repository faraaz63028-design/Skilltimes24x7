import express, { Request, Response } from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { db } from './server/db.js';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase payload limit for image uploads
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Uploads directory
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (req: Request, res: Response) => {
    res.json({ status: 'ok', time: new Date().toISOString(), channel: 'SkillTimes24x7' });
  });

  // Articles API
  app.get('/api/articles', (req: Request, res: Response) => {
    const {
      category,
      subArea,
      language,
      isBreaking,
      isFeatured,
      isTrending,
      status,
      query,
      limit,
      admin
    } = req.query;

    if (admin === 'true') {
      const all = db.getAllArticlesAdmin();
      return res.json(all);
    }

    const articles = db.getArticles({
      category: category as string,
      subArea: subArea as string,
      language: language as string,
      isBreaking: isBreaking === 'true' ? true : isBreaking === 'false' ? false : undefined,
      isFeatured: isFeatured === 'true' ? true : isFeatured === 'false' ? false : undefined,
      isTrending: isTrending === 'true' ? true : isTrending === 'false' ? false : undefined,
      status: status as string,
      query: query as string,
      limit: limit ? parseInt(limit as string, 10) : undefined,
    });

    res.json(articles);
  });

  // Breaking news route
  app.get('/api/articles/breaking', (req: Request, res: Response) => {
    const breaking = db.getArticles({ isBreaking: true, limit: 10 });
    res.json(breaking);
  });

  // Trending news route
  app.get('/api/articles/trending', (req: Request, res: Response) => {
    const trending = db.getArticles({ isTrending: true, limit: 10 });
    res.json(trending);
  });

  // Single Article
  app.get('/api/articles/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const article = db.getArticleById(id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    // Increment view counter
    db.incrementArticleViews(id);
    res.json(article);
  });

  // Create article
  app.post('/api/articles', (req: Request, res: Response) => {
    try {
      const articleData = req.body;
      if (!articleData.headline || !articleData.category) {
        return res.status(400).json({ error: 'Headline and category are required' });
      }
      const newArticle = db.addArticle(articleData);
      res.status(201).json(newArticle);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to create article' });
    }
  });

  // Update article
  app.put('/api/articles/:id', (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const updated = db.updateArticle(id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Article not found' });
      }
      res.json(updated);
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Failed to update article' });
    }
  });

  // Delete article
  app.delete('/api/articles/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = db.deleteArticle(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ success: true, message: 'Article deleted successfully' });
  });

  // Categories API
  app.get('/api/categories', (req: Request, res: Response) => {
    res.json(db.getCategories());
  });

  app.post('/api/categories', (req: Request, res: Response) => {
    const { name, slug, description, color, order } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ error: 'Name and slug required' });
    }
    const cat = db.addCategory({ name, slug, description, color: color || '#dc2626', order: order || 10 });
    res.status(201).json(cat);
  });

  app.delete('/api/categories/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = db.deleteCategory(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ success: true });
  });

  // Comments API
  app.get('/api/comments', (req: Request, res: Response) => {
    const { articleId, admin } = req.query;
    if (admin === 'true') {
      return res.json(db.getAllCommentsAdmin());
    }
    if (!articleId) {
      return res.status(400).json({ error: 'articleId required' });
    }
    res.json(db.getComments(articleId as string));
  });

  app.post('/api/comments', (req: Request, res: Response) => {
    const { articleId, authorName, content } = req.body;
    if (!articleId || !content) {
      return res.status(400).json({ error: 'articleId and content required' });
    }
    const comment = db.addComment({ articleId, authorName, content });
    res.status(201).json(comment);
  });

  app.delete('/api/comments/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = db.deleteComment(id);
    if (!deleted) return res.status(404).json({ error: 'Comment not found' });
    res.json({ success: true });
  });

  app.put('/api/comments/:id/status', (req: Request, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;
    const updated = db.updateCommentStatus(id, status);
    if (!updated) return res.status(404).json({ error: 'Comment not found' });
    res.json({ success: true });
  });

  // Advertisements API
  app.get('/api/ads', (req: Request, res: Response) => {
    const { position, admin } = req.query;
    if (admin === 'true') {
      return res.json(db.getAllAdsAdmin());
    }
    res.json(db.getAds(position as string));
  });

  app.post('/api/ads', (req: Request, res: Response) => {
    const adData = req.body;
    const newAd = db.addAd(adData);
    res.status(201).json(newAd);
  });

  app.put('/api/ads/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = db.updateAd(id, req.body);
    if (!updated) return res.status(404).json({ error: 'Ad not found' });
    res.json(updated);
  });

  app.delete('/api/ads/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = db.deleteAd(id);
    if (!deleted) return res.status(404).json({ error: 'Ad not found' });
    res.json({ success: true });
  });

  app.post('/api/ads/:id/click', (req: Request, res: Response) => {
    const { id } = req.params;
    db.recordAdClick(id);
    res.json({ success: true });
  });

  // Website Stats
  app.get('/api/stats', (req: Request, res: Response) => {
    res.json(db.getStats());
  });

  // Image Upload API (Base64 file save)
  app.post('/api/upload', (req: Request, res: Response) => {
    try {
      const { dataUrl, filename } = req.body;
      if (!dataUrl) {
        return res.status(400).json({ error: 'dataUrl is required' });
      }

      // Check if it's base64
      const matches = dataUrl.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      if (!matches || matches.length !== 3) {
        return res.status(400).json({ error: 'Invalid base64 data format' });
      }

      const mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      const ext = mimeType.split('/')[1] || 'jpg';
      const cleanName = (filename || 'img').replace(/[^a-z0-9_-]/gi, '_').toLowerCase();
      const finalName = `${cleanName}-${Date.now()}.${ext}`;
      const filePath = path.join(uploadsDir, finalName);

      fs.writeFileSync(filePath, buffer);
      const publicUrl = `/uploads/${finalName}`;

      res.json({ url: publicUrl, filename: finalName });
    } catch (err: any) {
      res.status(500).json({ error: err.message || 'Upload failed' });
    }
  });

  // Admin Authentication
  app.post('/api/auth/login', (req: Request, res: Response) => {
    const { username, password } = req.body;
    // Default admin credentials for the news channel owner
    if ((username === 'admin' && password === 'admin123') || (username === 'editor' && password === 'news2026')) {
      return res.json({
        token: 'skilltimes_auth_token_' + Date.now(),
        user: {
          id: 'u-1',
          username,
          name: username === 'admin' ? 'Chief Editor / Admin' : 'News Desk Editor',
          role: 'admin',
          email: `${username}@skilltimes24x7.com`
        }
      });
    }
    res.status(401).json({ error: 'Invalid username or password. Default demo login is admin / admin123' });
  });

  // SEO: Dynamic robots.txt and sitemap.xml
  app.get('/robots.txt', (req: Request, res: Response) => {
    res.type('text/plain');
    res.send(`User-agent: *\nAllow: /\nDisallow: /admin\nSitemap: /sitemap.xml`);
  });

  app.get('/sitemap.xml', (req: Request, res: Response) => {
    const articles = db.getArticles();
    const urls = articles.map(a => `
    <url>
      <loc>/news/${a.slug}</loc>
      <lastmod>${new Date(a.publishedAt).toISOString().split('T')[0]}</lastmod>
      <changefreq>hourly</changefreq>
      <priority>0.8</priority>
    </url>`).join('');

    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>/</loc><changefreq>always</changefreq><priority>1.0</priority></url>
  <url><loc>/category/hyderabad</loc><changefreq>hourly</changefreq><priority>0.9</priority></url>
  <url><loc>/category/telangana</loc><changefreq>hourly</changefreq><priority>0.9</priority></url>
  <url><loc>/category/india</loc><changefreq>hourly</changefreq><priority>0.9</priority></url>
  ${urls}
</urlset>`);
  });

  // Vite middleware for development vs static build in production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`SkillTimes24x7 Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
