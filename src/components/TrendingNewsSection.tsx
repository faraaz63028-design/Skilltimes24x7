import React from 'react';
import { Flame, TrendingUp, Clock, Eye } from 'lucide-react';
import { NewsArticle } from '../types';

interface TrendingNewsSectionProps {
  trendingArticles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const TrendingNewsSection: React.FC<TrendingNewsSectionProps> = ({
  trendingArticles,
  onOpenArticle,
  darkMode
}) => {
  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className={`rounded-xl border p-4 sm:p-5 transition-colors ${
      darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-red-600">
        <h3 className="text-base font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
          <Flame className="w-5 h-5 text-red-600 animate-bounce" />
          <span>Trending Headlines</span>
        </h3>
        <span className="text-[11px] font-bold text-red-600 bg-red-50 dark:bg-red-950 px-2 py-0.5 rounded">
          Top Viewed
        </span>
      </div>

      {/* Numbered List */}
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-800">
        {trendingArticles.map((art, idx) => (
          <div
            key={art.id}
            onClick={() => onOpenArticle(art)}
            className="group cursor-pointer py-3.5 first:pt-1 last:pb-1 flex items-start gap-3.5 transition-colors"
          >
            {/* Number indicator */}
            <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm tracking-tight shadow-2xs ${
              idx === 0
                ? 'bg-red-600 text-white'
                : idx === 1
                ? 'bg-amber-600 text-white'
                : idx === 2
                ? 'bg-neutral-800 text-white'
                : 'bg-neutral-200 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400'
            }`}>
              #{idx + 1}
            </div>

            {/* Headline and meta */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 text-[10px] text-neutral-500 mb-1">
                <span className="font-bold text-red-600 uppercase">
                  {art.category}
                </span>
                {art.subArea && <span>• {art.subArea}</span>}
                <span>•</span>
                <span className="flex items-center gap-0.5">
                  <Eye className="w-3 h-3 text-neutral-400" />
                  {art.views?.toLocaleString()}
                </span>
              </div>

              <h4 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors ${
                darkMode ? 'text-white' : 'text-neutral-900'
              } ${art.language === 'ur' ? 'font-urdu' : art.language === 'hi' ? 'font-hindi' : ''}`}>
                {art.headline}
              </h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
