import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Search, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  MapPin, 
  Calendar, 
  CloudSun, 
  UserCircle, 
  ChevronDown, 
  Radio,
  Share2,
  Bell,
  Globe
} from 'lucide-react';
import { NewsArticle, Category, Language } from '../types';

interface HeaderProps {
  breakingArticles: NewsArticle[];
  categories: Category[];
  activeCategory: string;
  onSelectCategory: (categorySlug: string) => void;
  onSelectSubArea?: (area: string) => void;
  onOpenSearch: () => void;
  onOpenArticle: (article: NewsArticle) => void;
  onOpenAdmin: () => void;
  selectedLanguage: Language;
  onSelectLanguage: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const HYDERABAD_AREAS = [
  'All Areas',
  'Old City',
  'Charminar',
  'Yakutpura',
  'Nampally',
  'Mehdipatnam',
  'Rajendranagar',
  'Falaknuma',
  'Asif Nagar'
];

export const Header: React.FC<HeaderProps> = ({
  breakingArticles,
  categories,
  activeCategory,
  onSelectCategory,
  onSelectSubArea,
  onOpenSearch,
  onOpenArticle,
  onOpenAdmin,
  selectedLanguage,
  onSelectLanguage,
  darkMode,
  onToggleDarkMode
}) => {
  const [tickerPaused, setTickerPaused] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hyderabadDropdownOpen, setHyderabadDropdownOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleDateString('en-IN', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full select-none">
      {/* 1. TOP BREAKING NEWS TICKER BAR */}
      <div className="bg-[#111827] text-white text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center h-10 overflow-hidden">
          {/* Breaking badge */}
          <div className="flex items-center gap-1.5 bg-red-600 text-white font-black px-3 py-1 text-xs tracking-wider shrink-0 uppercase rounded-sm shadow-sm z-10">
            <span className="w-2 h-2 rounded-full bg-white animate-ping mr-0.5" />
            <span>BREAKING NEWS</span>
          </div>

          {/* Pause / Resume control */}
          <button
            id="btn-toggle-ticker"
            onClick={() => setTickerPaused(!tickerPaused)}
            title={tickerPaused ? 'Play Breaking Ticker' : 'Pause Breaking Ticker'}
            className="text-neutral-400 hover:text-white px-2.5 shrink-0 z-10 flex items-center transition-colors"
          >
            {tickerPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Ticker scrolling text */}
          <div className="flex-1 overflow-hidden relative ml-2">
            <div className={`whitespace-nowrap flex items-center gap-8 ${tickerPaused ? 'ticker-paused' : 'animate-ticker'}`}>
              {breakingArticles.length > 0 ? (
                // Duplicate for seamless loop
                [...breakingArticles, ...breakingArticles].map((art, idx) => (
                  <button
                    key={`${art.id}-${idx}`}
                    onClick={() => onOpenArticle(art)}
                    className="text-neutral-200 hover:text-red-400 font-medium inline-flex items-center gap-2 transition-colors cursor-pointer text-left"
                  >
                    <span className="text-red-500 font-bold">•</span>
                    <span className="hover:underline">{art.headline}</span>
                    {art.subArea && (
                      <span className="bg-neutral-800 text-neutral-300 text-[10px] px-1.5 py-0.5 rounded font-semibold">
                        {art.subArea}
                      </span>
                    )}
                  </button>
                ))
              ) : (
                <span className="text-neutral-400">
                  SkillTimes24x7: Hyderabad Metro Old City alignment surveys expedited • TS Cabinet greenlights Warangal industrial corridor • Follow live news updates 24x7
                </span>
              )}
            </div>
          </div>

          {/* Live Indicator */}
          <div className="hidden md:flex items-center gap-2 pl-3 border-l border-neutral-800 shrink-0 text-neutral-400 text-[11px]">
            <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
            <span className="font-semibold text-neutral-200">LIVE 24x7</span>
          </div>
        </div>
      </div>

      {/* 2. TOP UTILITY BAR (Weather, Date, Language, Dark Mode, Admin) */}
      <div className={`border-b text-xs transition-colors ${darkMode ? 'bg-neutral-900 border-neutral-800 text-neutral-300' : 'bg-neutral-100 border-neutral-200 text-neutral-600'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-1.5 flex items-center justify-between gap-2 flex-wrap">
          {/* Location & Time */}
          <div className="flex items-center gap-3 sm:gap-5 flex-wrap">
            <div className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-red-600 shrink-0" />
              <span>Hyderabad, Telangana</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>{currentTime || 'Monday, Sep 7, 2026'}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1">
              <CloudSun className="w-3.5 h-3.5 text-amber-500 shrink-0" />
              <span>29°C | AQI 58 (Good)</span>
            </div>
          </div>

          {/* Controls: Language Selector, Theme Toggle, Admin Dashboard */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">
            {/* Language Selector */}
            <div className="flex items-center bg-white dark:bg-neutral-800 rounded border border-neutral-300 dark:border-neutral-700 px-1 py-0.5 shadow-2xs">
              <Globe className="w-3 h-3 text-neutral-500 mr-1" />
              {(['en', 'hi', 'ur', 'ur-roman'] as Language[]).map((lang) => (
                <button
                  key={lang}
                  id={`lang-btn-${lang}`}
                  onClick={() => onSelectLanguage(lang)}
                  className={`px-1.5 py-0.5 rounded text-[11px] font-medium transition-all ${
                    selectedLanguage === lang
                      ? 'bg-red-600 text-white font-bold'
                      : 'text-neutral-600 dark:text-neutral-300 hover:text-red-600'
                  }`}
                >
                  {lang === 'en' && 'English'}
                  {lang === 'hi' && 'हिंदी'}
                  {lang === 'ur' && 'اردو'}
                  {lang === 'ur-roman' && 'Roman Urdu'}
                </button>
              ))}
            </div>

            {/* Dark Mode Toggle */}
            <button
              id="btn-dark-mode"
              onClick={onToggleDarkMode}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-neutral-700" />}
            </button>

            {/* Admin Portal Button */}
            <button
              id="btn-admin-portal"
              onClick={onOpenAdmin}
              className="flex items-center gap-1 bg-neutral-900 dark:bg-neutral-800 hover:bg-red-700 text-white px-2.5 py-1 rounded text-[11px] font-semibold transition-colors"
            >
              <UserCircle className="w-3.5 h-3.5" />
              <span>CMS Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3. MAIN BRAND HEADER */}
      <div className={`border-b transition-colors ${darkMode ? 'bg-neutral-950 border-neutral-800' : 'bg-white border-neutral-200'}`}>
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-4">
          {/* Logo Branding */}
          <div 
            onClick={() => onSelectCategory('home')}
            className="cursor-pointer group flex items-center gap-3"
          >
            {/* High impact emblem */}
            <div className="bg-red-600 text-white font-black text-2xl sm:text-3xl px-3 py-1.5 rounded tracking-tighter flex items-center justify-center shadow-md group-hover:bg-red-700 transition-colors">
              ST
              <span className="text-xs bg-black text-white px-1 ml-1 rounded font-bold">24x7</span>
            </div>

            {/* Typography */}
            <div>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl sm:text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                  SkillTimes<span className="text-red-600">24x7</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 px-1.5 py-0.5 rounded">
                  Digital Media
                </span>
              </div>
              <p className="text-xs font-semibold text-neutral-500 dark:text-neutral-400 tracking-wide">
                “Har Khabar, Sabse Pehle” • Hyderabad & Telangana News
              </p>
            </div>
          </div>

          {/* Header Ad or Promotion Banner placeholder */}
          <div className="hidden lg:flex items-center border border-neutral-200 dark:border-neutral-800 rounded bg-neutral-50 dark:bg-neutral-900 p-2 text-right">
            <div className="mr-3">
              <span className="text-[9px] uppercase tracking-widest text-neutral-400 font-bold block">ADVERTISEMENT</span>
              <span className="text-xs font-bold text-neutral-800 dark:text-neutral-200">SkillTimes24x7 Fast Digital Reach</span>
              <p className="text-[11px] text-neutral-500">10 Lakh+ Monthly Readers Across Telangana</p>
            </div>
            <button 
              onClick={() => onSelectCategory('home')} 
              className="text-xs font-bold bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded transition-colors"
            >
              Advertise
            </button>
          </div>

          {/* Right Mobile / Search Actions */}
          <div className="flex items-center gap-2">
            <button
              id="btn-search-header"
              onClick={onOpenSearch}
              className={`p-2 rounded-full border transition-colors ${
                darkMode
                  ? 'border-neutral-700 hover:bg-neutral-800 text-neutral-200'
                  : 'border-neutral-300 hover:bg-neutral-100 text-neutral-700'
              }`}
              title="Search News"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="btn-mobile-menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-md bg-neutral-900 text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 4. STICKY MAIN NAVIGATION BAR */}
      <nav className="sticky top-0 z-40 bg-red-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 flex items-center justify-between">
          <ul className="hidden md:flex items-center flex-wrap text-sm font-bold tracking-tight">
            {categories.map((cat) => {
              const isHyderabad = cat.slug === 'hyderabad';
              const isActive = activeCategory === cat.slug;

              return (
                <li key={cat.id} className="relative group">
                  {isHyderabad ? (
                    <div className="flex items-center">
                      <button
                        id={`nav-${cat.slug}`}
                        onClick={() => onSelectCategory(cat.slug)}
                        className={`px-3 py-2.5 transition-colors flex items-center gap-1 ${
                          isActive
                            ? 'bg-black text-white'
                            : 'hover:bg-red-700 text-white'
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
                      </button>

                      {/* Dropdown for Hyderabad areas */}
                      <div className="absolute top-full left-0 hidden group-hover:block bg-neutral-900 text-white text-xs w-48 shadow-xl border-t-2 border-red-500 py-1.5 z-50">
                        <div className="px-3 py-1 font-bold text-neutral-400 text-[10px] uppercase border-b border-neutral-800">
                          Local Areas
                        </div>
                        {HYDERABAD_AREAS.map((area) => (
                          <button
                            key={area}
                            id={`nav-area-${area.toLowerCase().replace(/\s+/g, '-')}`}
                            onClick={() => {
                              onSelectCategory('hyderabad');
                              if (onSelectSubArea) onSelectSubArea(area === 'All Areas' ? '' : area);
                            }}
                            className="w-full text-left px-3 py-1.5 hover:bg-red-600 hover:text-white transition-colors"
                          >
                            {area}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <button
                      id={`nav-${cat.slug}`}
                      onClick={() => onSelectCategory(cat.slug)}
                      className={`px-3 py-2.5 transition-colors block ${
                        isActive
                          ? 'bg-black text-white'
                          : 'hover:bg-red-700 text-white'
                      }`}
                    >
                      {cat.name}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>

          {/* Search Trigger inside Nav */}
          <div className="hidden md:flex items-center ml-auto">
            <button
              onClick={onOpenSearch}
              className="flex items-center gap-1.5 bg-red-700 hover:bg-red-800 px-3 py-1.5 rounded text-xs font-semibold text-white transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search News</span>
            </button>
          </div>
        </div>

        {/* 5. MOBILE NAVIGATION DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-950 text-white border-t border-neutral-800 px-4 py-3 space-y-2 animate-in slide-in-from-top duration-200">
            <div className="text-xs font-bold text-red-500 uppercase tracking-wider pb-1 border-b border-neutral-800">
              News Categories
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-sm">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  id={`mobile-nav-${cat.slug}`}
                  onClick={() => {
                    onSelectCategory(cat.slug);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left px-2.5 py-2 rounded text-xs font-semibold transition-colors ${
                    activeCategory === cat.slug
                      ? 'bg-red-600 text-white font-bold'
                      : 'hover:bg-neutral-800 text-neutral-300'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Hyderabad Area selector in mobile menu */}
            <div className="pt-2 border-t border-neutral-800">
              <button
                onClick={() => setHyderabadDropdownOpen(!hyderabadDropdownOpen)}
                className="w-full flex items-center justify-between text-xs font-bold text-neutral-300 py-1"
              >
                <span className="text-red-400 uppercase tracking-wider">Hyderabad Local Zones</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${hyderabadDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {hyderabadDropdownOpen && (
                <div className="grid grid-cols-2 gap-1 pt-1.5">
                  {HYDERABAD_AREAS.map((area) => (
                    <button
                      key={area}
                      id={`mobile-area-${area.toLowerCase().replace(/\s+/g, '-')}`}
                      onClick={() => {
                        onSelectCategory('hyderabad');
                        if (onSelectSubArea) onSelectSubArea(area === 'All Areas' ? '' : area);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left text-[11px] text-neutral-400 hover:text-white px-2 py-1 hover:bg-neutral-800 rounded"
                    >
                      • {area}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Quick Action Buttons */}
            <div className="pt-2 border-t border-neutral-800 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenSearch();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-1.5 text-xs text-neutral-300 hover:text-white"
              >
                <Search className="w-3.5 h-3.5 text-red-500" />
                <span>Search Articles</span>
              </button>

              <button
                onClick={() => {
                  onOpenAdmin();
                  setMobileMenuOpen(false);
                }}
                className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded"
              >
                CMS Login
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
