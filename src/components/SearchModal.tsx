import React, { useState, useEffect } from 'react';
import { Search, X, Clock, MapPin, Tag, ArrowRight } from 'lucide-react';
import { NewsArticle, Category } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  articles: NewsArticle[];
  categories: Category[];
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  articles,
  categories,
  onOpenArticle,
  darkMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');

  useEffect(() => {
    if (!isOpen) {
      setSearchQuery('');
      setSelectedCat('all');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredArticles = articles.filter(art => {
    const q = searchQuery.toLowerCase().trim();
    const matchesCat = selectedCat === 'all' || art.category.toLowerCase() === selectedCat.toLowerCase();
    if (!q) return matchesCat;

    const inHeadline = art.headline.toLowerCase().includes(q);
    const inSummary = art.summary.toLowerCase().includes(q);
    const inReporter = art.reporterName.toLowerCase().includes(q);
    const inSubArea = art.subArea?.toLowerCase().includes(q);
    const inTags = art.tags?.some(t => t.toLowerCase().includes(q));

    return matchesCat && (inHeadline || inSummary || inReporter || inSubArea || inTags);
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-start justify-center pt-10 sm:pt-20 px-3 sm:px-6 animate-in fade-in duration-200">
      <div className={`w-full max-w-3xl rounded-2xl shadow-2xl border overflow-hidden flex flex-col max-h-[85vh] ${
        darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      }`}>
        {/* Search Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-600 shrink-0" />
          <input
            type="text"
            placeholder="Search Hyderabad, Telangana, Politics, Crime, Metro, Jobs..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            autoFocus
            className={`w-full text-base font-medium focus:outline-hidden bg-transparent ${
              darkMode ? 'text-white placeholder-neutral-500' : 'text-neutral-900 placeholder-neutral-400'
            }`}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-bold bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 px-3 py-1.5 rounded transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Category Filters */}
        <div className="px-4 py-2.5 border-b border-neutral-200 dark:border-neutral-800 flex items-center gap-1.5 overflow-x-auto text-xs no-scrollbar bg-neutral-50 dark:bg-neutral-950">
          <span className="text-neutral-400 font-bold shrink-0 mr-1 uppercase text-[10px]">Filter:</span>
          <button
            onClick={() => setSelectedCat('all')}
            className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-colors ${
              selectedCat === 'all'
                ? 'bg-red-600 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
            }`}
          >
            All Categories
          </button>
          {categories.filter(c => c.slug !== 'home').map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCat(cat.slug)}
              className={`px-2.5 py-1 rounded-full font-bold whitespace-nowrap transition-colors ${
                selectedCat === cat.slug
                  ? 'bg-red-600 text-white'
                  : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Search Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredArticles.length > 0 ? (
            filteredArticles.map(art => (
              <div
                key={art.id}
                onClick={() => {
                  onOpenArticle(art);
                  onClose();
                }}
                className={`group cursor-pointer p-3 rounded-lg border flex gap-3 transition-all hover:border-red-600 ${
                  darkMode ? 'bg-neutral-800/60 border-neutral-700/60' : 'bg-neutral-50 border-neutral-200'
                }`}
              >
                <div className="w-24 h-18 shrink-0 rounded overflow-hidden bg-neutral-800">
                  <img
                    src={art.featuredImage}
                    alt={art.headline}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 mb-0.5">
                      <span className="font-bold text-red-600 uppercase">{art.category}</span>
                      {art.subArea && <span>• {art.subArea}</span>}
                      <span>•</span>
                      <span>{new Date(art.publishedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}</span>
                    </div>

                    <h4 className={`text-xs sm:text-sm font-bold line-clamp-2 leading-snug group-hover:text-red-600 transition-colors ${
                      darkMode ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {art.headline}
                    </h4>
                  </div>

                  <span className="text-[11px] font-bold text-red-600 flex items-center gap-1 mt-1">
                    Read Report <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <Search className="w-10 h-10 mx-auto text-neutral-400 mb-2 opacity-50" />
              <p className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                No matching news stories found for "{searchQuery}"
              </p>
              <p className="text-xs text-neutral-500 mt-1">
                Try searching with another keyword or selecting "All Categories".
              </p>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 border-t border-neutral-200 dark:border-neutral-800 text-xs text-neutral-500 flex items-center justify-between bg-neutral-50 dark:bg-neutral-950">
          <span>Found {filteredArticles.length} stories</span>
          <span>SkillTimes24x7 Realtime Search</span>
        </div>
      </div>
    </div>
  );
};
