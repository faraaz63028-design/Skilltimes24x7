import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Edit3, 
  BarChart3, 
  FileText, 
  FolderPlus, 
  MessageSquare, 
  Layers, 
  Upload, 
  LogOut, 
  CheckCircle, 
  AlertCircle, 
  Search, 
  Flame, 
  Radio, 
  Star, 
  X,
  ExternalLink,
  ShieldAlert,
  ArrowLeft,
  Image as ImageIcon,
  Video
} from 'lucide-react';
import { NewsArticle, Category, Comment, Advertisement, WebsiteStats, Language } from '../types';
import { api } from '../services/api';

interface AdminDashboardProps {
  onClose: () => void;
  onRefreshData: () => void;
  darkMode: boolean;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onClose,
  onRefreshData,
  darkMode
}) => {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Tabs
  const [activeTab, setActiveTab] = useState<'articles' | 'stats' | 'categories' | 'ads' | 'comments'>('articles');

  // Data states
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [stats, setStats] = useState<WebsiteStats | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionSuccess, setActionSuccess] = useState<string>('');

  // Article Filters & Modals
  const [searchFilter, setSearchFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isArticleModalOpen, setIsArticleModalOpen] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(null);

  // Article Form State
  const [formHeadline, setFormHeadline] = useState('');
  const [formSubheadline, setFormSubheadline] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('hyderabad');
  const [formSubArea, setFormSubArea] = useState('');
  const [formLanguage, setFormLanguage] = useState<Language>('en');
  const [formFeaturedImage, setFormFeaturedImage] = useState('');
  const [formGalleryImages, setFormGalleryImages] = useState('');
  const [formVideoUrl, setFormVideoUrl] = useState('');
  const [formReporterName, setFormReporterName] = useState('SkillTimes Desk');
  const [formReporterRole, setFormReporterRole] = useState('Staff Correspondent');
  const [formStatus, setFormStatus] = useState<'published' | 'draft' | 'scheduled'>('published');
  const [formIsBreaking, setFormIsBreaking] = useState(false);
  const [formIsFeatured, setFormIsFeatured] = useState(false);
  const [formIsTrending, setFormIsTrending] = useState(false);
  const [formTrendingRank, setFormTrendingRank] = useState(1);
  const [formTags, setFormTags] = useState('');
  const [uploadingImage, setUploadingImage] = useState(false);

  // Category Form State
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');

  // Ad Form State
  const [newAdTitle, setNewAdTitle] = useState('');
  const [newAdClient, setNewAdClient] = useState('');
  const [newAdImage, setNewAdImage] = useState('');
  const [newAdTarget, setNewAdTarget] = useState('');
  const [newAdPosition, setNewAdPosition] = useState<'top-banner' | 'sidebar' | 'in-feed'>('top-banner');

  // Check existing session
  useEffect(() => {
    const savedToken = localStorage.getItem('skilltimes_admin_token');
    const savedUser = localStorage.getItem('skilltimes_admin_user');
    if (savedToken && savedUser) {
      setIsLoggedIn(true);
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch {
        setCurrentUser({ name: 'Admin User' });
      }
    }
  }, []);

  // Fetch admin data
  const loadAdminData = async () => {
    setLoading(true);
    try {
      const [artData, catData, comData, adData, statsData] = await Promise.all([
        api.getArticles({ admin: true }),
        api.getCategories(),
        api.getComments(undefined, true),
        api.getAds(undefined, true),
        api.getStats()
      ]);
      setArticles(artData);
      setCategories(catData);
      setComments(comData);
      setAds(adData);
      setStats(statsData);
    } catch (err) {
      console.error('Error loading admin data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      loadAdminData();
    }
  }, [isLoggedIn]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await api.login(username, password);
      localStorage.setItem('skilltimes_admin_token', res.token);
      localStorage.setItem('skilltimes_admin_user', JSON.stringify(res.user));
      setCurrentUser(res.user);
      setIsLoggedIn(true);
    } catch (err: any) {
      setAuthError(err.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('skilltimes_admin_token');
    localStorage.removeItem('skilltimes_admin_user');
    setIsLoggedIn(false);
  };

  const triggerNotification = (msg: string) => {
    setActionSuccess(msg);
    setTimeout(() => setActionSuccess(''), 3500);
  };

  // Open Article Modal (Create or Edit)
  const openArticleModal = (art?: NewsArticle) => {
    if (art) {
      setEditingArticle(art);
      setFormHeadline(art.headline);
      setFormSubheadline(art.subheadline || '');
      setFormSummary(art.summary);
      setFormContent(art.content);
      setFormCategory(art.category);
      setFormSubArea(art.subArea || '');
      setFormLanguage(art.language || 'en');
      setFormFeaturedImage(art.featuredImage);
      setFormGalleryImages(art.imageGallery?.join(', ') || '');
      setFormVideoUrl(art.videoUrl || '');
      setFormReporterName(art.reporterName);
      setFormReporterRole(art.reporterRole || '');
      setFormStatus(art.status);
      setFormIsBreaking(art.isBreaking);
      setFormIsFeatured(art.isFeatured);
      setFormIsTrending(art.isTrending);
      setFormTrendingRank(art.trendingRank || 1);
      setFormTags(art.tags?.join(', ') || '');
    } else {
      setEditingArticle(null);
      setFormHeadline('');
      setFormSubheadline('');
      setFormSummary('');
      setFormContent('');
      setFormCategory('hyderabad');
      setFormSubArea('');
      setFormLanguage('en');
      setFormFeaturedImage('https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80');
      setFormGalleryImages('');
      setFormVideoUrl('');
      setFormReporterName(currentUser?.name || 'SkillTimes Desk');
      setFormReporterRole('Staff Correspondent');
      setFormStatus('published');
      setFormIsBreaking(false);
      setFormIsFeatured(false);
      setFormIsTrending(false);
      setFormTrendingRank(1);
      setFormTags('Hyderabad, Telangana, News');
    }
    setIsArticleModalOpen(true);
  };

  // Handle Image File Upload (Base64)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const base64 = reader.result as string;
        const uploadRes = await api.uploadImage(base64, file.name);
        setFormFeaturedImage(uploadRes.url);
        triggerNotification('Image uploaded successfully to server!');
      } catch (err: any) {
        alert('Image upload failed: ' + err.message);
      } finally {
        setUploadingImage(false);
      }
    };
    reader.readAsDataURL(file);
  };

  // Save Article
  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHeadline.trim() || !formSummary.trim()) {
      alert('Headline and summary are required.');
      return;
    }

    const payload: Partial<NewsArticle> = {
      headline: formHeadline.trim(),
      subheadline: formSubheadline.trim() || undefined,
      summary: formSummary.trim(),
      content: formContent.trim() || formSummary.trim(),
      category: formCategory,
      subArea: formSubArea.trim() || undefined,
      language: formLanguage,
      featuredImage: formFeaturedImage.trim() || 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
      imageGallery: formGalleryImages ? formGalleryImages.split(',').map(s => s.trim()).filter(Boolean) : [],
      videoUrl: formVideoUrl.trim() || undefined,
      reporterName: formReporterName.trim() || 'SkillTimes Bureau',
      reporterRole: formReporterRole.trim() || undefined,
      status: formStatus,
      isBreaking: formIsBreaking,
      isFeatured: formIsFeatured,
      isTrending: formIsTrending,
      trendingRank: formIsTrending ? Number(formTrendingRank) : undefined,
      tags: formTags ? formTags.split(',').map(s => s.trim()).filter(Boolean) : [],
    };

    try {
      if (editingArticle) {
        await api.updateArticle(editingArticle.id, payload);
        triggerNotification('Article updated successfully!');
      } else {
        await api.createArticle(payload);
        triggerNotification('New article published to portal!');
      }
      setIsArticleModalOpen(false);
      loadAdminData();
      onRefreshData();
    } catch (err: any) {
      alert('Failed to save article: ' + err.message);
    }
  };

  // Delete Article
  const handleDeleteArticle = async (id: string, headline: string) => {
    if (!confirm(`Are you sure you want to permanently delete: "${headline}"?`)) return;
    try {
      await api.deleteArticle(id);
      triggerNotification('Article deleted.');
      loadAdminData();
      onRefreshData();
    } catch (err: any) {
      alert('Failed to delete: ' + err.message);
    }
  };

  // Categories CRUD
  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName || !newCatSlug) return;
    try {
      await api.createCategory({
        name: newCatName,
        slug: newCatSlug.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        order: categories.length + 1
      });
      setNewCatName('');
      setNewCatSlug('');
      triggerNotification('New category created.');
      loadAdminData();
      onRefreshData();
    } catch (err: any) {
      alert('Failed to create category: ' + err.message);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm('Delete this category?')) return;
    try {
      await api.deleteCategory(id);
      triggerNotification('Category removed.');
      loadAdminData();
      onRefreshData();
    } catch (err: any) {
      alert('Error deleting category: ' + err.message);
    }
  };

  // Ads CRUD
  const handleAddAd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAdTitle || !newAdImage) return;
    try {
      await api.createAd({
        title: newAdTitle,
        clientName: newAdClient || 'Partner Sponsor',
        imageUrl: newAdImage,
        targetUrl: newAdTarget || '#',
        position: newAdPosition,
        status: 'active'
      });
      setNewAdTitle('');
      setNewAdClient('');
      setNewAdImage('');
      setNewAdTarget('');
      triggerNotification('Advertisement created & placed on portal.');
      loadAdminData();
      onRefreshData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  const handleDeleteAd = async (id: string) => {
    if (!confirm('Delete this ad?')) return;
    try {
      await api.deleteAd(id);
      triggerNotification('Ad deleted.');
      loadAdminData();
      onRefreshData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  // Comment Moderation
  const handleDeleteComment = async (id: string) => {
    if (!confirm('Delete comment?')) return;
    try {
      await api.deleteComment(id);
      triggerNotification('Comment deleted.');
      loadAdminData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  // If not logged in, render login form
  if (!isLoggedIn) {
    return (
      <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4">
        <div className={`w-full max-w-md rounded-xl shadow-2xl border p-6 ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="bg-red-600 text-white font-black px-2 py-1 rounded text-sm">
                ST
              </div>
              <h2 className="text-lg font-bold">SkillTimes24x7 CMS Login</h2>
            </div>
            <button onClick={onClose} className="p-1 text-neutral-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-neutral-500 mb-5">
            Authorized portal management for editorial desk and channel administrators.
          </p>

          {authError && (
            <div className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 p-2.5 rounded text-xs mb-4 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold mb-1">Username / ID</label>
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded border focus:border-red-600 focus:outline-hidden ${
                  darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-300'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className={`w-full px-3 py-2 text-xs rounded border focus:border-red-600 focus:outline-hidden ${
                  darkMode ? 'bg-neutral-800 border-neutral-700' : 'bg-neutral-50 border-neutral-300'
                }`}
              />
            </div>

            <div className="p-2.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400">
              💡 <strong>Default Demo Credentials:</strong>
              <div className="mt-0.5">Username: <code className="text-red-600 font-bold">admin</code> | Password: <code className="text-red-600 font-bold">admin123</code></div>
            </div>

            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2.5 rounded text-xs transition-colors shadow-sm"
            >
              Sign In to CMS Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  // Filtered articles
  const displayedArticles = articles.filter(art => {
    const matchesCat = categoryFilter === 'all' || art.category === categoryFilter;
    const matchesQ = !searchFilter || art.headline.toLowerCase().includes(searchFilter.toLowerCase());
    return matchesCat && matchesQ;
  });

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 overflow-y-auto p-2 sm:p-6 text-neutral-100">
      <div className="max-w-7xl mx-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden min-h-[90vh] flex flex-col">
        {/* Top Navbar */}
        <div className="bg-neutral-950 border-b border-neutral-800 px-4 sm:px-6 py-3.5 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="p-1.5 rounded-md hover:bg-neutral-800 text-neutral-400 hover:text-white transition-colors"
              title="Return to Public News Portal"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white font-black px-2 py-0.5 rounded text-xs">
                  CMS
                </span>
                <h1 className="text-base sm:text-lg font-black tracking-tight">
                  SkillTimes24x7 Content Management System
                </h1>
              </div>
              <span className="text-[11px] text-neutral-400">
                Live Channel Editorial Desk • Logged in as: <strong className="text-white">{currentUser?.name || 'Chief Admin'}</strong>
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openArticleModal()}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Create News Story</span>
            </button>

            <button
              onClick={handleLogout}
              className="flex items-center gap-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 px-3 py-1.5 rounded-lg text-xs transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Action Success Toast */}
        {actionSuccess && (
          <div className="bg-green-600 text-white text-xs font-bold px-4 py-2 flex items-center justify-between animate-in slide-in-from-top">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4" />
              {actionSuccess}
            </span>
            <button onClick={() => setActionSuccess('')}><X className="w-3.5 h-3.5" /></button>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex items-center gap-1 px-4 sm:px-6 pt-3 border-b border-neutral-800 bg-neutral-900/90 overflow-x-auto no-scrollbar text-xs font-bold">
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'articles' ? 'border-red-600 text-red-500' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Articles Management ({articles.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'stats' ? 'border-red-600 text-red-500' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Channel Analytics</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'categories' ? 'border-red-600 text-red-500' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'ads' ? 'border-red-600 text-red-500' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>Advertisements ({ads.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-1.5 px-3.5 py-2.5 border-b-2 transition-colors ${
              activeTab === 'comments' ? 'border-red-600 text-red-500' : 'border-transparent text-neutral-400 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Reader Comments ({comments.length})</span>
          </button>
        </div>

        {/* Tab 1: Articles Management */}
        {activeTab === 'articles' && (
          <div className="p-4 sm:p-6 flex-1 flex flex-col">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter by headline or keywords..."
                  value={searchFilter}
                  onChange={e => setSearchFilter(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 text-xs rounded-lg pl-9 pr-3 py-2 text-white focus:outline-hidden focus:border-red-600"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="bg-neutral-800 border border-neutral-700 text-xs rounded-lg px-3 py-2 text-white"
                >
                  <option value="all">All Categories</option>
                  {categories.map(c => (
                    <option key={c.id} value={c.slug}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Articles Table */}
            <div className="border border-neutral-800 rounded-xl overflow-x-auto bg-neutral-950/60">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-800/70 text-neutral-400 uppercase text-[10px] tracking-wider border-b border-neutral-800">
                  <tr>
                    <th className="p-3">News Story</th>
                    <th className="p-3">Category / Locality</th>
                    <th className="p-3">Language</th>
                    <th className="p-3">Badges</th>
                    <th className="p-3">Reporter</th>
                    <th className="p-3">Views</th>
                    <th className="p-3">Published</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60">
                  {displayedArticles.map((art) => (
                    <tr key={art.id} className="hover:bg-neutral-800/40 transition-colors">
                      <td className="p-3 max-w-xs">
                        <div className="flex items-center gap-2.5">
                          <img
                            src={art.featuredImage}
                            alt=""
                            className="w-12 h-9 object-cover rounded bg-neutral-800 shrink-0"
                          />
                          <div>
                            <span className="font-bold text-neutral-100 line-clamp-1">
                              {art.headline}
                            </span>
                            <span className="text-[10px] text-neutral-500">
                              {art.status === 'published' ? '🟢 Published' : '🟡 Draft'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className="bg-neutral-800 text-neutral-300 font-bold px-2 py-0.5 rounded text-[10px] uppercase">
                          {art.category}
                        </span>
                        {art.subArea && (
                          <span className="block text-[10px] text-neutral-400 mt-0.5">
                            📍 {art.subArea}
                          </span>
                        )}
                      </td>
                      <td className="p-3 uppercase font-semibold text-neutral-400">
                        {art.language}
                      </td>
                      <td className="p-3">
                        <div className="flex items-center gap-1 flex-wrap">
                          {art.isBreaking && (
                            <span className="bg-red-600/30 text-red-400 border border-red-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              Breaking
                            </span>
                          )}
                          {art.isFeatured && (
                            <span className="bg-amber-600/30 text-amber-400 border border-amber-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              Featured
                            </span>
                          )}
                          {art.isTrending && (
                            <span className="bg-orange-600/30 text-orange-400 border border-orange-500/40 text-[9px] font-bold px-1.5 py-0.2 rounded">
                              Trending #{art.trendingRank || ''}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-neutral-300">
                        {art.reporterName}
                      </td>
                      <td className="p-3 text-neutral-400 font-mono">
                        {art.views?.toLocaleString()}
                      </td>
                      <td className="p-3 text-neutral-400 whitespace-nowrap">
                        {new Date(art.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </td>
                      <td className="p-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => openArticleModal(art)}
                            className="p-1.5 rounded hover:bg-neutral-800 text-neutral-300 hover:text-white"
                            title="Edit Article"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteArticle(art.id, art.headline)}
                            className="p-1.5 rounded hover:bg-red-900/50 text-red-400 hover:text-red-300"
                            title="Delete Article"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {displayedArticles.length === 0 && (
                    <tr>
                      <td colSpan={8} className="p-8 text-center text-neutral-500">
                        No articles match the current filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 2: Analytics & Channel Stats */}
        {activeTab === 'stats' && stats && (
          <div className="p-4 sm:p-6 space-y-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-neutral-800/60 border border-neutral-700 p-4 rounded-xl">
                <span className="text-xs text-neutral-400 font-semibold block">Total Published Articles</span>
                <span className="text-2xl sm:text-3xl font-black text-white mt-1 block">
                  {stats.totalArticles}
                </span>
                <span className="text-[11px] text-green-400 font-semibold mt-1 block">
                  {stats.publishedCount} active live
                </span>
              </div>

              <div className="bg-neutral-800/60 border border-neutral-700 p-4 rounded-xl">
                <span className="text-xs text-neutral-400 font-semibold block">Total Portal Page Views</span>
                <span className="text-2xl sm:text-3xl font-black text-red-500 mt-1 block">
                  {stats.totalViews.toLocaleString()}
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Real-time engagement</span>
              </div>

              <div className="bg-neutral-800/60 border border-neutral-700 p-4 rounded-xl">
                <span className="text-xs text-neutral-400 font-semibold block">Active Breaking Stories</span>
                <span className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 block">
                  {stats.breakingNewsCount}
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Displayed in live ticker</span>
              </div>

              <div className="bg-neutral-800/60 border border-neutral-700 p-4 rounded-xl">
                <span className="text-xs text-neutral-400 font-semibold block">Reader Comments</span>
                <span className="text-2xl sm:text-3xl font-black text-blue-400 mt-1 block">
                  {stats.totalComments}
                </span>
                <span className="text-[11px] text-neutral-400 mt-1 block">Moderated reader feedback</span>
              </div>
            </div>

            {/* Category breakdown */}
            <div className="bg-neutral-800/40 border border-neutral-800 p-5 rounded-xl">
              <h3 className="text-sm font-extrabold uppercase tracking-wider mb-3 text-neutral-200">
                Stories by Category Distribution
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.entries(stats.categoryBreakdown).map(([cat, count]) => (
                  <div key={cat} className="p-3 bg-neutral-900 rounded-lg border border-neutral-800 flex items-center justify-between">
                    <span className="text-xs font-bold text-neutral-300 uppercase">{cat}</span>
                    <span className="text-xs font-black text-red-400 bg-red-950/60 px-2 py-0.5 rounded">
                      {count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Categories Management */}
        {activeTab === 'categories' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-white mb-3">Add New Category</h3>
              <form onSubmit={handleAddCategory} className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 text-neutral-300">Category Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Science & Space"
                    value={newCatName}
                    onChange={e => {
                      setNewCatName(e.target.value);
                      setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                    }}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">URL Slug</label>
                  <input
                    type="text"
                    placeholder="e.g. science-space"
                    value={newCatSlug}
                    onChange={e => setNewCatSlug(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
                >
                  Create Category
                </button>
              </form>
            </div>

            <div className="md:col-span-7 space-y-2">
              <h3 className="text-sm font-bold text-white mb-3">Current Active Categories</h3>
              <div className="space-y-2">
                {categories.map(c => (
                  <div key={c.id} className="p-3 bg-neutral-800/40 border border-neutral-800 rounded-lg flex items-center justify-between text-xs">
                    <div>
                      <span className="font-bold text-white block">{c.name}</span>
                      <span className="text-[11px] text-neutral-400">Slug: /{c.slug}</span>
                    </div>
                    {c.slug !== 'home' && (
                      <button
                        onClick={() => handleDeleteCategory(c.id)}
                        className="text-neutral-500 hover:text-red-400 p-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Advertisements Management */}
        {activeTab === 'ads' && (
          <div className="p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-5 bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl">
              <h3 className="text-sm font-bold text-white mb-3">Add New Sponsor Advertisement</h3>
              <form onSubmit={handleAddAd} className="space-y-3 text-xs">
                <div>
                  <label className="block mb-1 text-neutral-300">Campaign Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Hyderabad Mega Real Estate Expo"
                    value={newAdTitle}
                    onChange={e => setNewAdTitle(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">Client / Sponsor Name</label>
                  <input
                    type="text"
                    placeholder="e.g. CREDAI Hyderabad"
                    value={newAdClient}
                    onChange={e => setNewAdClient(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">Banner Image URL</label>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newAdImage}
                    onChange={e => setNewAdImage(e.target.value)}
                    required
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">Target Website Link</label>
                  <input
                    type="text"
                    placeholder="https://partner-website.com"
                    value={newAdTarget}
                    onChange={e => setNewAdTarget(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block mb-1 text-neutral-300">Ad Position</label>
                  <select
                    value={newAdPosition}
                    onChange={e => setNewAdPosition(e.target.value as any)}
                    className="w-full bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  >
                    <option value="top-banner">Top Banner (Header area)</option>
                    <option value="sidebar">Sidebar (Beside articles)</option>
                    <option value="in-feed">In-Feed (Between sections)</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded"
                >
                  Save & Publish Ad
                </button>
              </form>
            </div>

            <div className="md:col-span-7 space-y-3">
              <h3 className="text-sm font-bold text-white mb-3">Configured Advertisements</h3>
              <div className="space-y-3">
                {ads.map(ad => (
                  <div key={ad.id} className="p-3 bg-neutral-800/40 border border-neutral-800 rounded-lg flex gap-3 text-xs items-center">
                    <img
                      src={ad.imageUrl}
                      alt=""
                      className="w-20 h-14 object-cover rounded bg-neutral-900 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-[10px] bg-red-950 text-red-400 px-1.5 py-0.5 rounded font-bold uppercase">
                        {ad.position}
                      </span>
                      <h4 className="font-bold text-white truncate mt-1">{ad.title}</h4>
                      <span className="text-[11px] text-neutral-400">Client: {ad.clientName}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteAd(ad.id)}
                      className="text-neutral-500 hover:text-red-400 p-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Comments Moderation */}
        {activeTab === 'comments' && (
          <div className="p-4 sm:p-6 space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">Live Reader Comments Moderation</h3>
            <div className="space-y-2">
              {comments.map(c => (
                <div key={c.id} className="p-3.5 bg-neutral-800/40 border border-neutral-800 rounded-lg flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-white">{c.authorName}</span>
                      <span className="text-[10px] text-neutral-400">
                        {new Date(c.createdAt).toLocaleDateString()}
                      </span>
                      <span className="text-[9px] bg-green-950 text-green-400 px-1.5 py-0.2 rounded uppercase font-bold">
                        Approved
                      </span>
                    </div>
                    <p className="text-neutral-300 leading-relaxed">{c.content}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteComment(c.id)}
                    className="text-neutral-500 hover:text-red-400 p-1.5"
                    title="Remove Comment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {comments.length === 0 && (
                <p className="text-center text-neutral-500 py-8">No comments to moderate.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Article Create / Edit Modal */}
      {isArticleModalOpen && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-3xl bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-4 sm:p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-red-500" />
                {editingArticle ? 'Edit News Article' : 'Publish New News Story'}
              </h2>
              <button
                onClick={() => setIsArticleModalOpen(false)}
                className="text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveArticle} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold mb-1 text-neutral-200">Main Headline *</label>
                <input
                  type="text"
                  placeholder="Enter strong, attention-grabbing news headline..."
                  value={formHeadline}
                  onChange={e => setFormHeadline(e.target.value)}
                  required
                  className="w-full bg-neutral-800 border border-neutral-700 p-2.5 rounded text-white text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-neutral-200">Subheadline (Optional)</label>
                <input
                  type="text"
                  placeholder="Supporting secondary detail or context..."
                  value={formSubheadline}
                  onChange={e => setFormSubheadline(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-neutral-200">Category *</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  >
                    {categories.filter(c => c.slug !== 'home').map(c => (
                      <option key={c.id} value={c.slug}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold mb-1 text-neutral-200">Hyderabad Locality (If applicable)</label>
                  <input
                    type="text"
                    placeholder="e.g. Charminar, Falaknuma, Nampally"
                    value={formSubArea}
                    onChange={e => setFormSubArea(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold mb-1 text-neutral-200">Language *</label>
                  <select
                    value={formLanguage}
                    onChange={e => setFormLanguage(e.target.value as Language)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी (Hindi)</option>
                    <option value="ur">اردو (Urdu)</option>
                    <option value="ur-roman">Roman Urdu</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-neutral-200">Short Summary (Preview text) *</label>
                <textarea
                  rows={2}
                  placeholder="2-3 sentence overview shown on homepage and feeds..."
                  value={formSummary}
                  onChange={e => setFormSummary(e.target.value)}
                  required
                  className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                />
              </div>

              <div>
                <label className="block font-bold mb-1 text-neutral-200">Full Article Content *</label>
                <textarea
                  rows={6}
                  placeholder="Write the full report paragraphs..."
                  value={formContent}
                  onChange={e => setFormContent(e.target.value)}
                  required
                  className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white leading-relaxed"
                />
              </div>

              {/* Image upload and URL */}
              <div className="space-y-2 p-3 bg-neutral-800/40 rounded-lg border border-neutral-700">
                <label className="block font-bold text-neutral-200">Featured Image</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Image URL (e.g. https://images.unsplash.com/...)"
                    value={formFeaturedImage}
                    onChange={e => setFormFeaturedImage(e.target.value)}
                    className="flex-1 bg-neutral-900 border border-neutral-700 p-2 rounded text-white"
                  />
                  <label className="bg-neutral-700 hover:bg-neutral-600 text-white font-bold px-3 py-2 rounded cursor-pointer flex items-center gap-1 shrink-0">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                </div>
                {formFeaturedImage && (
                  <div className="w-32 h-20 rounded overflow-hidden mt-1 border border-neutral-600">
                    <img src={formFeaturedImage} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>

              {/* Gallery & Video */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-neutral-200">Additional Gallery Images (Comma-separated URLs)</label>
                  <input
                    type="text"
                    placeholder="https://img1.jpg, https://img2.jpg"
                    value={formGalleryImages}
                    onChange={e => setFormGalleryImages(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-neutral-200">YouTube Video URL</label>
                  <input
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={formVideoUrl}
                    onChange={e => setFormVideoUrl(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
              </div>

              {/* Reporter details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold mb-1 text-neutral-200">Reporter / Author Name *</label>
                  <input
                    type="text"
                    value={formReporterName}
                    onChange={e => setFormReporterName(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
                <div>
                  <label className="block font-bold mb-1 text-neutral-200">Reporter Role / Designation</label>
                  <input
                    type="text"
                    placeholder="e.g. Senior Bureau Chief"
                    value={formReporterRole}
                    onChange={e => setFormReporterRole(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                  />
                </div>
              </div>

              {/* Status and Flags */}
              <div className="p-3 bg-neutral-800/40 rounded-lg border border-neutral-700 flex items-center justify-between flex-wrap gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsBreaking}
                    onChange={e => setFormIsBreaking(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="font-bold text-red-400">🔴 Is Breaking News</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsFeatured}
                    onChange={e => setFormIsFeatured(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="font-bold text-amber-400">⭐ Homepage Top Story</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formIsTrending}
                    onChange={e => setFormIsTrending(e.target.checked)}
                    className="w-4 h-4 accent-red-600"
                  />
                  <span className="font-bold text-orange-400">🔥 Trending News</span>
                </label>

                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">Publish Status:</span>
                  <select
                    value={formStatus}
                    onChange={e => setFormStatus(e.target.value as any)}
                    className="bg-neutral-900 border border-neutral-700 px-2 py-1 rounded text-white"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="scheduled">Scheduled</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold mb-1 text-neutral-200">Tags (Comma-separated)</label>
                <input
                  type="text"
                  placeholder="Hyderabad, Telangana, Politics, Economy"
                  value={formTags}
                  onChange={e => setFormTags(e.target.value)}
                  className="w-full bg-neutral-800 border border-neutral-700 p-2 rounded text-white"
                />
              </div>

              <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsArticleModalOpen(false)}
                  className="px-4 py-2 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-bold shadow-sm"
                >
                  {editingArticle ? 'Save Changes' : 'Publish Story'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
