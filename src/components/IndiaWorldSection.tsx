import React, { useState } from 'react';
import { Globe2, Flag, Clock, ArrowRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface IndiaWorldSectionProps {
  articles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const IndiaWorldSection: React.FC<IndiaWorldSectionProps> = ({
  articles,
  onOpenArticle,
  darkMode
}) => {
  const [tab, setTab] = useState<'india' | 'world'>('india');

  const indiaArticles = articles.filter(a => a.category === 'india' || a.tags?.includes('India'));
  const worldArticles = articles.filter(a => a.category === 'world' || a.tags?.includes('World'));

  const currentArticles = tab === 'india' ? (indiaArticles.length ? indiaArticles : articles) : (worldArticles.length ? worldArticles : articles);

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
    <section className="mb-10">
      {/* Header with Switcher Tabs */}
      <div className="border-b-2 border-red-600 pb-2 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1 rounded-sm">
            <Globe2 className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white">
            National & Global Affairs
          </h2>
        </div>

        {/* Tab Toggle */}
        <div className="flex items-center bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-xs font-bold">
          <button
            onClick={() => setTab('india')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
              tab === 'india'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>India</span>
          </button>
          <button
            onClick={() => setTab('world')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
              tab === 'world'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
            }`}
          >
            <Globe2 className="w-3.5 h-3.5" />
            <span>World</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {currentArticles.slice(0, 4).map(art => (
          <div
            key={art.id}
            onClick={() => onOpenArticle(art)}
            className={`group cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-md flex flex-col justify-between ${
              darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200 hover:border-neutral-300'
            }`}
          >
            <div>
              <div className="relative aspect-16/10 overflow-hidden bg-neutral-800">
                <img
                  src={art.featuredImage}
                  alt={art.headline}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                  {art.category}
                </span>
              </div>

              <div className="p-3.5">
                <div className="flex items-center gap-1 text-[11px] text-neutral-500 mb-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(art.publishedAt)}</span>
                </div>

                <h3 className={`text-sm font-bold leading-snug line-clamp-2 mb-1.5 group-hover:text-red-600 transition-colors ${
                  darkMode ? 'text-white' : 'text-neutral-900'
                }`}>
                  {art.headline}
                </h3>

                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {art.summary}
                </p>
              </div>
            </div>

            <div className="px-3.5 py-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-[11px]">
              <span className="text-neutral-500 font-medium">By {art.reporterName}</span>
              <span className="text-red-600 font-bold group-hover:underline">Read →</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
