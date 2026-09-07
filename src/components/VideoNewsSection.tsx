import React, { useState } from 'react';
import { Video, Play, X, Clock, Eye, Share2 } from 'lucide-react';
import { NewsArticle } from '../types';

interface VideoNewsSectionProps {
  videoArticles: NewsArticle[];
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const VideoNewsSection: React.FC<VideoNewsSectionProps> = ({
  videoArticles,
  onOpenArticle,
  darkMode
}) => {
  const [activeVideo, setActiveVideo] = useState<NewsArticle | null>(null);

  // Helper to extract YouTube embed URL
  const getEmbedUrl = (url?: string) => {
    if (!url) return 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
    if (url.includes('youtube.com/watch?v=')) {
      const id = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    if (url.includes('youtu.be/')) {
      const id = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${id}?autoplay=1`;
    }
    return url;
  };

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
    <section className="mb-10">
      {/* Header */}
      <div className="border-b-2 border-red-600 pb-2 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-red-600 text-white p-1 rounded-sm">
            <Video className="w-4 h-4" />
          </div>
          <h2 className="text-xl font-extrabold uppercase tracking-tight text-neutral-900 dark:text-white flex items-center gap-2">
            SkillTimes Video Bulletins
            <span className="text-xs bg-red-600 text-white font-black px-2 py-0.5 rounded-full uppercase tracking-wider">
              Watch Live
            </span>
          </h2>
        </div>
        <span className="text-xs font-semibold text-neutral-500">
          Field Reports & Debates
        </span>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {videoArticles.map((art) => (
          <div
            key={art.id}
            className={`group rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-xl flex flex-col justify-between ${
              darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <div>
              {/* Thumbnail with big Red Play button */}
              <div
                onClick={() => setActiveVideo(art)}
                className="relative aspect-video overflow-hidden bg-black cursor-pointer group"
              >
                <img
                  src={art.featuredImage}
                  alt={art.headline}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
                
                {/* Red YouTube style Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-13 h-13 rounded-full bg-red-600 group-hover:bg-red-700 text-white flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110">
                    <Play className="w-6 h-6 fill-white translate-x-0.5" />
                  </div>
                </div>

                {/* Duration / Live Tag */}
                <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[11px] font-bold px-2 py-0.5 rounded">
                  {art.isBreaking ? 'LIVE REPORT' : '12:45'}
                </div>

                <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase">
                  Video
                </div>
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center gap-2 text-xs text-neutral-500 mb-1.5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {formatDate(art.publishedAt)}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5" />
                    {art.views?.toLocaleString()} views
                  </span>
                </div>

                <h3
                  onClick={() => setActiveVideo(art)}
                  className={`text-sm font-bold leading-snug line-clamp-2 cursor-pointer group-hover:text-red-600 transition-colors mb-2 ${
                    darkMode ? 'text-white' : 'text-neutral-900'
                  }`}
                >
                  {art.headline}
                </h3>

                <p className={`text-xs line-clamp-2 leading-relaxed ${
                  darkMode ? 'text-neutral-400' : 'text-neutral-600'
                }`}>
                  {art.summary}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="px-4 py-2.5 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-xs">
              <button
                onClick={() => setActiveVideo(art)}
                className="text-red-600 font-bold flex items-center gap-1.5 hover:underline"
              >
                <Play className="w-3.5 h-3.5 fill-red-600" />
                <span>Watch Video</span>
              </button>

              <button
                onClick={() => onOpenArticle(art)}
                className="text-neutral-500 hover:text-neutral-900 dark:hover:text-white font-medium"
              >
                Read Summary
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Embedded Video Modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-neutral-950 rounded-xl overflow-hidden shadow-2xl border border-neutral-800">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-3.5 border-b border-neutral-800 text-white">
              <div className="flex items-center gap-2">
                <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded">
                  SkillTimes24x7 Broadcast
                </span>
                <span className="text-sm font-bold truncate max-w-md sm:max-w-xl">
                  {activeVideo.headline}
                </span>
              </div>

              <button
                onClick={() => setActiveVideo(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-full hover:bg-neutral-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Embedded YouTube / Video Player */}
            <div className="relative aspect-video w-full bg-black">
              <iframe
                src={getEmbedUrl(activeVideo.videoUrl)}
                title={activeVideo.headline}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 bg-neutral-900 text-neutral-300 text-xs">
              <p className="line-clamp-2 leading-relaxed mb-3">
                {activeVideo.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-neutral-400">
                  Reporter: <strong className="text-white">{activeVideo.reporterName}</strong>
                </span>
                <button
                  onClick={() => {
                    const v = activeVideo;
                    setActiveVideo(null);
                    onOpenArticle(v);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded transition-colors text-xs"
                >
                  View Full Article & Discussion
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
