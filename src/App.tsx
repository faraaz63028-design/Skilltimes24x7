import React, { useState, useEffect, useCallback } from 'react';
import { 
  Header 
} from './components/Header';
import { HeroSection } from './components/HeroSection';
import { HyderabadNewsSection } from './components/HyderabadNewsSection';
import { TelanganaNewsSection } from './components/TelanganaNewsSection';
import { IndiaWorldSection } from './components/IndiaWorldSection';
import { VideoNewsSection } from './components/VideoNewsSection';
import { TrendingNewsSection } from './components/TrendingNewsSection';
import { LatestNewsSection } from './components/LatestNewsSection';
import { AdvertisementBanner } from './components/AdvertisementBanner';
import { ArticleView } from './components/ArticleView';
import { SearchModal } from './components/SearchModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Footer } from './components/Footer';
import { PolicyModals } from './components/PolicyModals';
import { NewsArticle, Category, Advertisement, Language } from './types';
import { api } from './services/api';
import { ArrowLeft, Loader2, Sparkles, Filter } from 'lucide-react';

export default function App() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [breakingArticles, setBreakingArticles] = useState<NewsArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<NewsArticle[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [ads, setAds] = useState<Advertisement[]>([]);
  const [loading, setLoading] = useState(true);

  // Active navigation states
  const [activeCategory, setActiveCategory] = useState<string>('home');
  const [selectedSubArea, setSelectedSubArea] = useState<string>('');
  const [selectedArticle, setSelectedArticle] = useState<NewsArticle | null>(null);

  // Modals & Panels
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activePolicy, setActivePolicy] = useState<string | null>(null);

  // User Preferences
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('en');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('skilltimes_theme') === 'dark';
    }
    return false;
  });

  // Dark mode effect
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('skilltimes_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('skilltimes_theme', 'light');
    }
  }, [darkMode]);

  // Load all initial data from backend API
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      const [allArticles, breaking, trending, cats, allAds] = await Promise.all([
        api.getArticles(),
        api.getBreakingNews(),
        api.getTrendingNews(),
        api.getCategories(),
        api.getAds()
      ]);

      setArticles(allArticles);
      setBreakingArticles(breaking);
      setTrendingArticles(trending);
      setCategories(cats);
      setAds(allAds);
    } catch (err) {
      console.error('Error loading news data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Handle URL hash routing (e.g. #news-slug)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#news-')) {
        const slug = hash.replace('#news-', '');
        const found = articles.find(a => a.slug === slug || a.id === slug);
        if (found) {
          setSelectedArticle(found);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#admin') {
        setIsAdminOpen(true);
      }
    };

    if (articles.length > 0) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [articles]);

  const handleOpenArticle = (article: NewsArticle) => {
    setSelectedArticle(article);
    window.location.hash = `#news-${article.slug}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setSelectedArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catSlug: string) => {
    setActiveCategory(catSlug);
    setSelectedArticle(null);
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectSubArea = (area: string) => {
    setSelectedSubArea(area);
    setActiveCategory('hyderabad');
    setSelectedArticle(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Language filter applied to general views, while allowing all when viewing full portal
  const filterByLanguage = (list: NewsArticle[]) => {
    if (!selectedLanguage) return list;
    const match = list.filter(a => a.language === selectedLanguage);
    return match.length > 0 ? match : list;
  };

  // Separate sections data
  const filteredArticles = filterByLanguage(articles);
  const featuredArticle = filteredArticles.find(a => a.isFeatured) || articles[0];
  const hyderabadArticles = articles.filter(a => a.category === 'hyderabad');
  const telanganaArticles = articles.filter(a => a.category === 'telangana');
  const videoArticles = articles.filter(a => a.category === 'videos' || a.videoUrl);

  // Specific ad positions
  const topAd = ads.find(a => a.position === 'top-banner');
  const sidebarAd = ads.find(a => a.position === 'sidebar');
  const inFeedAd = ads.find(a => a.position === 'in-feed');

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      darkMode ? 'bg-[#0f1117] text-neutral-100' : 'bg-[#f8f9fa] text-neutral-900'
    }`}>
      {/* 1. Master Header with Ticker & Navigation */}
      <Header
        breakingArticles={breakingArticles}
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
        onSelectSubArea={handleSelectSubArea}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenArticle={handleOpenArticle}
        onOpenAdmin={() => setIsAdminOpen(true)}
        selectedLanguage={selectedLanguage}
        onSelectLanguage={setSelectedLanguage}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-4 lg:px-6 py-6">
        {loading && articles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-neutral-500">
            <Loader2 className="w-10 h-10 animate-spin text-red-600 mb-3" />
            <p className="text-sm font-bold tracking-wide">Loading SkillTimes24x7 Dispatches...</p>
          </div>
        ) : selectedArticle ? (
          /* 2. News Article View */
          <ArticleView
            article={selectedArticle}
            allArticles={articles}
            onBack={handleBackToHome}
            onOpenArticle={handleOpenArticle}
            darkMode={darkMode}
          />
        ) : activeCategory !== 'home' ? (
          /* 3. Category Specific Page View */
          <div>
            {/* Category Banner Header */}
            <div className="border-b-2 border-red-600 pb-3 mb-6 flex items-center justify-between">
              <div>
                <button
                  onClick={handleBackToHome}
                  className="text-xs text-neutral-500 hover:text-red-600 font-bold flex items-center gap-1 mb-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back to All News
                </button>
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
                  <span className="w-3 h-3 bg-red-600 inline-block" />
                  {categories.find(c => c.slug === activeCategory)?.name || activeCategory} News
                </h1>
              </div>

              {activeCategory === 'hyderabad' && (
                <span className="text-xs font-bold text-red-600 bg-red-100 dark:bg-red-950 px-3 py-1 rounded-full">
                  {selectedSubArea ? `Showing: ${selectedSubArea}` : 'All Hyderabad Zones'}
                </span>
              )}
            </div>

            {/* If Hyderabad Category, render Hyderabad Section with Local Area selector */}
            {activeCategory === 'hyderabad' ? (
              <HyderabadNewsSection
                articles={hyderabadArticles}
                selectedSubArea={selectedSubArea}
                onSelectSubArea={setSelectedSubArea}
                onOpenArticle={handleOpenArticle}
                onViewAllHyderabad={() => setSelectedSubArea('')}
                darkMode={darkMode}
              />
            ) : activeCategory === 'telangana' ? (
              <TelanganaNewsSection
                articles={telanganaArticles}
                onOpenArticle={handleOpenArticle}
                onViewAllTelangana={() => {}}
                darkMode={darkMode}
              />
            ) : activeCategory === 'videos' ? (
              <VideoNewsSection
                videoArticles={videoArticles}
                onOpenArticle={handleOpenArticle}
                darkMode={darkMode}
              />
            ) : (
              /* General Category listing */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8">
                  <LatestNewsSection
                    articles={articles.filter(a => activeCategory === 'latest' || a.category.toLowerCase() === activeCategory.toLowerCase())}
                    onOpenArticle={handleOpenArticle}
                    darkMode={darkMode}
                  />
                </div>
                <div className="lg:col-span-4 space-y-6">
                  <TrendingNewsSection
                    trendingArticles={trendingArticles}
                    onOpenArticle={handleOpenArticle}
                    darkMode={darkMode}
                  />
                  <AdvertisementBanner
                    ad={sidebarAd}
                    position="sidebar"
                    onAdClick={(id) => api.recordAdClick(id)}
                    darkMode={darkMode}
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          /* 4. Complete Homepage */
          <div className="space-y-6">
            {/* Top Advertisement Banner */}
            <AdvertisementBanner
              ad={topAd}
              position="top-banner"
              onAdClick={(id) => api.recordAdClick(id)}
              darkMode={darkMode}
            />

            {/* Section 1: Hero News Section (Large story + 3 trending beside) */}
            <HeroSection
              featuredArticle={featuredArticle}
              trendingArticles={trendingArticles}
              onOpenArticle={handleOpenArticle}
              darkMode={darkMode}
            />

            {/* Section 2: Hyderabad Local News Section */}
            <HyderabadNewsSection
              articles={hyderabadArticles}
              selectedSubArea={selectedSubArea}
              onSelectSubArea={handleSelectSubArea}
              onOpenArticle={handleOpenArticle}
              onViewAllHyderabad={() => handleSelectCategory('hyderabad')}
              darkMode={darkMode}
            />

            {/* Section 3: Telangana State News Section */}
            <TelanganaNewsSection
              articles={telanganaArticles}
              onOpenArticle={handleOpenArticle}
              onViewAllTelangana={() => handleSelectCategory('telangana')}
              darkMode={darkMode}
            />

            {/* Mid-feed Advertisement */}
            <AdvertisementBanner
              ad={inFeedAd}
              position="in-feed"
              onAdClick={(id) => api.recordAdClick(id)}
              darkMode={darkMode}
            />

            {/* Section 4: India & World News Section */}
            <IndiaWorldSection
              articles={articles}
              onOpenArticle={handleOpenArticle}
              darkMode={darkMode}
            />

            {/* Section 5: Video News Section (YouTube embedded cards) */}
            <VideoNewsSection
              videoArticles={videoArticles}
              onOpenArticle={handleOpenArticle}
              darkMode={darkMode}
            />

            {/* Section 6: Latest News Feed + Trending Sidebar Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
              <div className="lg:col-span-8">
                <LatestNewsSection
                  articles={articles.slice(0, 8)}
                  onOpenArticle={handleOpenArticle}
                  darkMode={darkMode}
                />
              </div>

              <div className="lg:col-span-4 space-y-6">
                <TrendingNewsSection
                  trendingArticles={trendingArticles}
                  onOpenArticle={handleOpenArticle}
                  darkMode={darkMode}
                />

                <AdvertisementBanner
                  ad={sidebarAd}
                  position="sidebar"
                  onAdClick={(id) => api.recordAdClick(id)}
                  darkMode={darkMode}
                />
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 5. Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        articles={articles}
        categories={categories}
        onOpenArticle={handleOpenArticle}
        darkMode={darkMode}
      />

      {/* 6. Admin CMS Dashboard */}
      {isAdminOpen && (
        <AdminDashboard
          onClose={() => setIsAdminOpen(false)}
          onRefreshData={loadData}
          darkMode={darkMode}
        />
      )}

      {/* 7. Institutional Policy Modals */}
      <PolicyModals
        policyType={activePolicy}
        onClose={() => setActivePolicy(null)}
        darkMode={darkMode}
      />

      {/* 8. Footer */}
      <Footer
        categories={categories}
        onSelectCategory={handleSelectCategory}
        onOpenPolicy={(policy) => setActivePolicy(policy)}
        darkMode={darkMode}
      />
    </div>
  );
}
