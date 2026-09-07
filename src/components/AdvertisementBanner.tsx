import React from 'react';
import { ExternalLink, Info } from 'lucide-react';
import { Advertisement } from '../types';

interface AdvertisementBannerProps {
  ad?: Advertisement;
  position: 'top-banner' | 'sidebar' | 'in-feed' | 'article-bottom';
  onAdClick?: (adId: string) => void;
  darkMode: boolean;
}

export const AdvertisementBanner: React.FC<AdvertisementBannerProps> = ({
  ad,
  position,
  onAdClick,
  darkMode
}) => {
  // Fallback ad creatives if no database ad active for this spot
  const defaultAd: Advertisement = {
    id: 'default-ad',
    title: 'Advertise With SkillTimes24x7 Digital Media - Reach Hyderabad & Telangana',
    clientName: 'SkillTimes Ad Sales',
    imageUrl: position === 'sidebar' 
      ? 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=600&q=80'
      : 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '#advertise',
    position,
    status: 'active',
    impressions: 1200,
    clicks: 45
  };

  const currentAd = ad || defaultAd;

  const handleClick = () => {
    if (onAdClick && currentAd.id) {
      onAdClick(currentAd.id);
    }
  };

  if (position === 'sidebar') {
    return (
      <div className={`rounded-lg overflow-hidden border p-2 my-4 transition-colors ${
        darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
      }`}>
        <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-1.5 px-1">
          <span>Advertisement</span>
          <span className="flex items-center gap-0.5 text-[9px] text-neutral-400 hover:text-neutral-600">
            <Info className="w-2.5 h-2.5" /> Sponsored
          </span>
        </div>

        <a
          href={currentAd.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick}
          className="block group"
        >
          <div className="relative aspect-4/3 rounded overflow-hidden bg-neutral-800 mb-2">
            <img
              src={currentAd.imageUrl}
              alt={currentAd.title}
              loading="lazy"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-2 left-2 right-2 text-white">
              <span className="text-[10px] bg-red-600 px-1.5 py-0.5 rounded font-bold uppercase">
                {currentAd.clientName}
              </span>
            </div>
          </div>
          <p className="text-xs font-bold leading-tight group-hover:text-red-600 transition-colors line-clamp-2 px-1 text-neutral-800 dark:text-neutral-200">
            {currentAd.title}
          </p>
        </a>
      </div>
    );
  }

  return (
    <div className={`w-full rounded-lg overflow-hidden border my-6 p-2 sm:p-3 transition-colors ${
      darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-neutral-50 border-neutral-200'
    }`}>
      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-bold uppercase tracking-wider mb-2 px-1">
        <span>Advertisement</span>
        <span className="flex items-center gap-1 text-[10px]">
          Sponsored Partner • {currentAd.clientName}
        </span>
      </div>

      <a
        href={currentAd.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="block group"
      >
        <div className="relative h-28 sm:h-36 rounded overflow-hidden bg-neutral-800">
          <img
            src={currentAd.imageUrl}
            alt={currentAd.title}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-4 sm:p-6">
            <div className="max-w-xl text-white">
              <span className="text-[10px] sm:text-xs font-bold bg-red-600 px-2 py-0.5 rounded uppercase tracking-wider">
                {currentAd.clientName}
              </span>
              <h4 className="text-sm sm:text-lg font-bold leading-tight mt-1.5 group-hover:text-red-400 transition-colors line-clamp-2">
                {currentAd.title}
              </h4>
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-neutral-300 mt-2 hover:underline">
                Visit Sponsor Portal <ExternalLink className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};
