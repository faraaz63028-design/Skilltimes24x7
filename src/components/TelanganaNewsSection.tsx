import React from 'react';
import { Landmark, Clock, ChevronRight, Briefcase, GraduationCap, Building2, ShieldAlert } from 'lucide-react';
import { NewsArticle } from '../types';

interface TelanganaNewsSectionProps {
  articles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  onViewAllTelangana: () => void;
  darkMode: boolean;
}

export const TelanganaNewsSection: React.FC<TelanganaNewsSectionProps> = ({
  articles,
  onOpenArticle,
  onViewAllTelangana,
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

  const mainStory = articles[0];
  const sideStories = articles.slice(1, 5);

  return (
    <section className="mb-10">
      {/* Section Title */}
      <div className="border-b-2 border-red-600 pb-2 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-orange-600 text-white p-1 rounded-sm">
            <Landmark className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white">
            Telangana State News
          </h2>
        </div>

        <button
          onClick={onViewAllTelangana}
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group"
        >
          <span>View All State News</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Topics bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-4 text-xs font-semibold text-neutral-600 dark:text-neutral-400 no-scrollbar">
        <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded">
          <Building2 className="w-3 h-3 text-orange-600" /> State Politics
        </span>
        <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded">
          <Briefcase className="w-3 h-3 text-green-600" /> Jobs & TSPSC
        </span>
        <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded">
          <GraduationCap className="w-3 h-3 text-blue-600" /> Education
        </span>
        <span className="flex items-center gap-1 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded">
          <ShieldAlert className="w-3 h-3 text-red-600" /> Law & Order
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main highlight story */}
        {mainStory && (
          <div 
            onClick={() => onOpenArticle(mainStory)}
            className={`lg:col-span-7 group cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-lg ${
              darkMode ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700' : 'bg-white border-neutral-200'
            }`}
          >
            <div className="relative aspect-16/9 overflow-hidden bg-neutral-800">
              <img
                src={mainStory.featuredImage}
                alt={mainStory.headline}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <span className="absolute top-3 left-3 bg-orange-600 text-white font-bold text-xs uppercase px-2 py-0.5 rounded shadow">
                State Spotlight
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
                <span className="font-bold text-orange-600 uppercase">Telangana</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {formatDate(mainStory.publishedAt)}
                </span>
                <span>•</span>
                <span>By {mainStory.reporterName}</span>
              </div>

              <h3 className={`text-lg sm:text-xl font-bold leading-snug mb-2 group-hover:text-red-600 transition-colors ${
                darkMode ? 'text-white' : 'text-neutral-900'
              } ${mainStory.language === 'hi' ? 'font-hindi' : ''}`}>
                {mainStory.headline}
              </h3>

              <p className={`text-xs sm:text-sm line-clamp-3 leading-relaxed mb-3 ${
                darkMode ? 'text-neutral-300' : 'text-neutral-600'
              }`}>
                {mainStory.summary}
              </p>

              <span className="text-xs font-bold text-red-600 group-hover:underline inline-flex items-center gap-1">
                Read Full Coverage →
              </span>
            </div>
          </div>
        )}

        {/* Side stories list */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          {sideStories.map(art => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className={`group cursor-pointer p-3 rounded-lg border flex gap-3 transition-all hover:shadow-md ${
                darkMode
                  ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
              }`}
            >
              <div className="w-24 h-20 sm:w-28 sm:h-22 shrink-0 rounded overflow-hidden bg-neutral-800">
                <img
                  src={art.featuredImage}
                  alt={art.headline}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-orange-600 uppercase block mb-1">
                    {art.category}
                  </span>
                  <h4 className={`text-xs sm:text-sm font-bold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors ${
                    darkMode ? 'text-white' : 'text-neutral-900'
                  } ${art.language === 'hi' ? 'font-hindi' : art.language === 'ur' ? 'font-urdu' : ''}`}>
                    {art.headline}
                  </h4>
                </div>

                <div className="flex items-center justify-between text-[11px] text-neutral-500 pt-1">
                  <span>{formatDate(art.publishedAt)}</span>
                  <span className="text-red-600 font-semibold group-hover:underline">Read →</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
