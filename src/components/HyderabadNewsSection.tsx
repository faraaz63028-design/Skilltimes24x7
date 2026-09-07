import React, { useState } from 'react';
import { MapPin, Clock, ArrowRight, ChevronRight } from 'lucide-react';
import { NewsArticle } from '../types';

interface HyderabadNewsSectionProps {
  articles: NewsArticle[];
  selectedSubArea?: string;
  onSelectSubArea: (area: string) => void;
  onOpenArticle: (article: NewsArticle) => void;
  onViewAllHyderabad: () => void;
  darkMode: boolean;
}

const LOCAL_AREAS = [
  'All Localities',
  'Old City',
  'Charminar',
  'Yakutpura',
  'Nampally',
  'Mehdipatnam',
  'Rajendranagar',
  'Falaknuma',
  'Asif Nagar'
];

export const HyderabadNewsSection: React.FC<HyderabadNewsSectionProps> = ({
  articles,
  selectedSubArea,
  onSelectSubArea,
  onOpenArticle,
  onViewAllHyderabad,
  darkMode
}) => {
  const [activeArea, setActiveArea] = useState<string>(selectedSubArea || 'All Localities');

  const filteredArticles = articles.filter(art => {
    if (activeArea === 'All Localities' || !activeArea) return true;
    return art.subArea?.toLowerCase() === activeArea.toLowerCase();
  });

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
      {/* Section Header with Locality Tabs */}
      <div className="border-b-2 border-red-600 pb-2 mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-1 rounded-sm">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
              Hyderabad City News
              <span className="text-xs bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400 font-bold px-2 py-0.5 rounded-full uppercase">
                Hyper-Local
              </span>
            </h2>
          </div>
        </div>

        <button
          onClick={onViewAllHyderabad}
          className="text-xs font-bold text-red-600 hover:text-red-700 flex items-center gap-1 group self-start sm:self-auto"
        >
          <span>View All Hyderabad News</span>
          <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* Area Filter Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2.5 mb-5 no-scrollbar">
        {LOCAL_AREAS.map(area => {
          const isSelected = activeArea === area;
          return (
            <button
              key={area}
              id={`tab-area-${area.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => {
                setActiveArea(area);
                onSelectSubArea(area === 'All Localities' ? '' : area);
              }}
              className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-red-600 text-white shadow-xs'
                  : darkMode
                  ? 'bg-neutral-800 text-neutral-300 hover:bg-neutral-700'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
              }`}
            >
              {area}
            </button>
          );
        })}
      </div>

      {/* Grid of Hyderabad Articles */}
      {filteredArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredArticles.slice(0, 6).map(art => (
            <div
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className={`group cursor-pointer rounded-lg overflow-hidden border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between ${
                darkMode
                  ? 'bg-neutral-900 border-neutral-800 hover:border-neutral-700'
                  : 'bg-white border-neutral-200 hover:border-neutral-300'
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
                  {art.subArea && (
                    <span className="absolute bottom-2 left-2 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded shadow">
                      {art.subArea}
                    </span>
                  )}
                  {art.language === 'ur' && (
                    <span className="absolute top-2 right-2 bg-black/75 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">
                      اردو خبر
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 mb-1.5">
                    <span className="font-semibold text-red-600 uppercase">Hyderabad</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatDate(art.publishedAt)}
                    </span>
                  </div>

                  <h3 className={`text-base font-bold leading-snug line-clamp-2 mb-2 group-hover:text-red-600 transition-colors ${
                    darkMode ? 'text-white' : 'text-neutral-900'
                  } ${art.language === 'ur' ? 'font-urdu text-right text-lg' : art.language === 'hi' ? 'font-hindi' : ''}`}>
                    {art.headline}
                  </h3>

                  <p className={`text-xs line-clamp-2 leading-relaxed ${
                    darkMode ? 'text-neutral-400' : 'text-neutral-600'
                  }`}>
                    {art.summary}
                  </p>
                </div>
              </div>

              <div className="px-4 py-2.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-500 font-medium text-[11px]">
                  By {art.reporterName}
                </span>
                <span className="text-red-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-[11px]">
                  Read More <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`p-8 rounded-lg text-center border ${
          darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-400' : 'bg-white border-neutral-200 text-neutral-500'
        }`}>
          <MapPin className="w-8 h-8 mx-auto text-neutral-400 mb-2" />
          <p className="font-bold text-sm">No recent news reports found specifically for {activeArea}.</p>
          <p className="text-xs mt-1">Our reporters are continuously tracking updates across Hyderabad.</p>
          <button
            onClick={() => setActiveArea('All Localities')}
            className="mt-3 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded"
          >
            Show All Localities
          </button>
        </div>
      )}
    </section>
  );
};
