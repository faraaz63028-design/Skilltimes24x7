import React from 'react';
import { Newspaper, Clock, ArrowRight, Eye, MessageSquare } from 'lucide-react';
import { NewsArticle } from '../types';

interface LatestNewsSectionProps {
  articles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const LatestNewsSection: React.FC<LatestNewsSectionProps> = ({
  articles,
  onOpenArticle,
  darkMode
}) => {
  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-1 rounded-sm">
            <Newspaper className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white">
            Chronological News Feed
          </h2>
        </div>
        <span className="text-xs font-semibold text-neutral-500">
          Latest Dispatches
        </span>
      </div>

      {/* Cards List */}
      <div className="flex flex-col gap-4">
        {articles.map((art) => (
          <article
            key={art.id}
            onClick={() => onOpenArticle(art)}
            className={`group cursor-pointer p-4 rounded-xl border transition-all duration-200 hover:shadow-lg flex flex-col sm:flex-row gap-4 ${
              darkMode
                ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
          >
            {/* Thumbnail */}
            <div className="relative w-full sm:w-56 sm:h-36 shrink-0 aspect-16/10 sm:aspect-auto rounded-lg overflow-hidden bg-neutral-800">
              <img
                src={art.featuredImage}
                alt={art.headline}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 left-2 flex items-center gap-1.5">
                <span className="bg-red-600 text-white font-extrabold text-[10px] uppercase px-2 py-0.5 rounded shadow">
                  {art.category}
                </span>
                {art.isBreaking && (
                  <span className="bg-black/80 text-amber-400 font-bold text-[10px] uppercase px-1.5 py-0.5 rounded">
                    Breaking
                  </span>
                )}
              </div>
              {art.subArea && (
                <span className="absolute bottom-2 left-2 bg-neutral-900/80 text-neutral-200 text-[10px] font-semibold px-1.5 py-0.5 rounded">
                  {art.subArea}
                </span>
              )}
            </div>

            {/* Content info */}
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-xs text-neutral-500 mb-1.5 flex-wrap">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-neutral-400" />
                    {formatDate(art.publishedAt)}
                  </span>
                  <span>•</span>
                  <span>By {art.reporterName}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {art.views?.toLocaleString()}
                  </span>
                </div>

                <h3 className={`text-base sm:text-lg font-bold leading-snug mb-2 group-hover:text-red-600 transition-colors ${
                  darkMode ? 'text-white' : 'text-neutral-900'
                } ${art.language === 'ur' ? 'font-urdu text-right text-xl' : art.language === 'hi' ? 'font-hindi' : ''}`}>
                  {art.headline}
                </h3>

                <p className={`text-xs sm:text-sm line-clamp-2 leading-relaxed ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {art.summary}
                </p>
              </div>

              {/* Read More button */}
              <div className="pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  {art.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="text-[10px] bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 px-1.5 py-0.5 rounded">
                      #{tag}
                    </span>
                  ))}
                </div>

                <span className="text-red-600 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>Read More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
