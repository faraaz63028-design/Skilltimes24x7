import React from 'react';
import { Clock, Eye, Share2, ArrowRight, Flame } from 'lucide-react';
import { NewsArticle } from '../types';

interface HeroSectionProps {
  featuredArticle?: NewsArticle;
  trendingArticles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  featuredArticle,
  trendingArticles,
  onOpenArticle,
  darkMode
}) => {
  if (!featuredArticle) return null;

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const getLanguageClass = (lang?: string) => {
    if (lang === 'ur') return 'font-urdu text-right text-lg';
    if (lang === 'hi') return 'font-hindi';
    return '';
  };

  return (
    <section className="mb-8">
      {/* Section Tag */}
      <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-red-600">
        <h2 className="text-lg font-black uppercase tracking-wider text-red-600 flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-red-600 inline-block" />
          Top Stories
        </h2>
        <span className="text-xs font-semibold text-neutral-500 uppercase tracking-widest">
          Updated 24x7
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Large Featured News Story (8 cols on desktop) */}
        <div className="lg:col-span-8 group">
          <div 
            onClick={() => onOpenArticle(featuredArticle)}
            className={`cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-xl ${
              darkMode 
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' 
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {/* Big Image with Overlay Badges */}
            <div className="relative aspect-video sm:aspect-16/9 overflow-hidden bg-neutral-800">
              <img
                src={featuredArticle.featuredImage}
                alt={featuredArticle.headline}
                loading="eager"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

              {/* Category & Status Badges */}
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="bg-red-600 text-white font-extrabold text-xs uppercase px-2.5 py-1 rounded shadow-md tracking-wider">
                  {featuredArticle.category}
                </span>
                {featuredArticle.isBreaking && (
                  <span className="bg-amber-500 text-black font-extrabold text-xs uppercase px-2 py-0.5 rounded animate-pulse">
                    Breaking
                  </span>
                )}
                {featuredArticle.subArea && (
                  <span className="bg-black/70 backdrop-blur-xs text-white text-xs px-2 py-0.5 rounded font-medium border border-white/20">
                    {featuredArticle.subArea}
                  </span>
                )}
              </div>

              {/* Views and Reading Time Overlay */}
              <div className="absolute bottom-3 right-3 flex items-center gap-3 text-white/90 text-xs font-medium bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded border border-white/10">
                <span className="flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5 text-red-400" />
                  {featuredArticle.views?.toLocaleString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-neutral-300" />
                  {formatDate(featuredArticle.publishedAt)}
                </span>
              </div>
            </div>

            {/* Headline & Body Container */}
            <div className="p-4 sm:p-6">
              <h1 className={`text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight mb-2 leading-tight group-hover:text-red-600 transition-colors ${
                darkMode ? 'text-white' : 'text-neutral-900'
              } ${getLanguageClass(featuredArticle.language)}`}>
                {featuredArticle.headline}
              </h1>

              {featuredArticle.subheadline && (
                <p className="text-sm font-semibold text-red-600 dark:text-red-400 mb-2">
                  {featuredArticle.subheadline}
                </p>
              )}

              <p className={`text-sm line-clamp-3 mb-4 leading-relaxed ${
                darkMode ? 'text-neutral-300' : 'text-neutral-600'
              } ${getLanguageClass(featuredArticle.language)}`}>
                {featuredArticle.summary}
              </p>

              {/* Footer Meta & Read More */}
              <div className="flex items-center justify-between pt-3 border-t border-neutral-200 dark:border-neutral-800 text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-xs">
                    {featuredArticle.reporterName.charAt(0)}
                  </span>
                  <div>
                    <span className={`font-bold block ${darkMode ? 'text-neutral-200' : 'text-neutral-800'}`}>
                      {featuredArticle.reporterName}
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      {featuredArticle.reporterRole || 'SkillTimes Bureau'}
                    </span>
                  </div>
                </div>

                <button
                  id={`btn-read-more-${featuredArticle.id}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenArticle(featuredArticle);
                  }}
                  className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded text-xs transition-colors shadow-xs"
                >
                  <span>Read Full Story</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Smaller Trending News Cards Beside It (4 cols on desktop) */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="flex items-center justify-between pb-1 border-b border-neutral-300 dark:border-neutral-700">
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-red-600" />
              Trending Right Now
            </h3>
            <span className="text-[11px] font-semibold text-neutral-500">Top 3</span>
          </div>

          <div className="flex flex-col gap-3">
            {trendingArticles.slice(0, 3).map((art, idx) => (
              <div
                key={art.id}
                onClick={() => onOpenArticle(art)}
                className={`group cursor-pointer p-3 rounded-lg border flex gap-3 transition-all duration-150 hover:shadow-md ${
                  darkMode
                    ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                    : 'bg-white border-neutral-200 hover:border-neutral-300'
                }`}
              >
                {/* Number Badge & Thumbnail */}
                <div className="relative w-28 h-20 sm:w-32 sm:h-22 shrink-0 rounded overflow-hidden bg-neutral-800">
                  <img
                    src={art.featuredImage}
                    alt={art.headline}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-1 left-1 bg-red-600 text-white font-black text-[11px] w-5 h-5 flex items-center justify-center rounded">
                    #{idx + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className="text-[10px] font-bold text-red-600 uppercase">
                        {art.category}
                      </span>
                      {art.subArea && (
                        <span className="text-[10px] text-neutral-500">• {art.subArea}</span>
                      )}
                    </div>
                    <h4 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors ${
                      darkMode ? 'text-white' : 'text-neutral-900'
                    } ${getLanguageClass(art.language)}`}>
                      {art.headline}
                    </h4>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(art.publishedAt)}
                    </span>
                    <span className="font-semibold text-red-600 group-hover:underline">
                      Read →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mini Quick Digest / Weather / Ad Spot */}
          <div className="bg-gradient-to-r from-red-900 to-neutral-900 text-white p-3.5 rounded-lg border border-red-800/40">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] uppercase font-bold tracking-wider text-red-300">Channel Notice</span>
              <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-bold">24x7 Desk</span>
            </div>
            <p className="text-xs font-bold leading-snug">
              Got breaking news from your Hyderabad locality?
            </p>
            <p className="text-[11px] text-neutral-300 mt-1">
              Connect with SkillTimes24x7 reporting desk on WhatsApp or email us your news tips.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
