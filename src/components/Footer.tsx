import React from 'react';
import { 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  MessageCircle, 
  MapPin, 
  Phone, 
  Mail, 
  ShieldAlert, 
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  categories: Category[];
  onSelectCategory: (categorySlug: string) => void;
  onOpenPolicy: (policyType: string) => void;
  darkMode: boolean;
}

export const Footer: React.FC<FooterProps> = ({
  categories,
  onSelectCategory,
  onOpenPolicy,
  darkMode
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t-4 border-red-600 select-none">
      {/* Top Footer Newsletter & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="bg-red-600 text-white font-black text-2xl px-2.5 py-1 rounded tracking-tighter">
                ST24x7
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                SkillTimes<span className="text-red-600">24x7</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              <strong className="text-white">“Har Khabar, Sabse Pehle”</strong> — SkillTimes24x7 is Hyderabad & Telangana’s dedicated digital news portal bringing fastest breaking dispatches, unbiased regional analysis, civic journalism, and live ground bulletins.
            </p>

            {/* Contact details */}
            <div className="space-y-1.5 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>Media Enclave, Banjara Hills / Charminar, Hyderabad, Telangana 500034</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>News Bureau: +91 40 2345 6789 / Tip-line: +91 98480 24700</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-red-500 shrink-0" />
                <span>editorial@skilltimes24x7.com / news@skilltimes24x7.com</span>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Follow SkillTimes24x7 On Social Media:
              </span>
              <div className="flex items-center gap-2">
                {/* YouTube */}
                <a
                  href="https://youtube.com/@SkillTimes24x7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#FF0000] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Youtube className="w-4 h-4" />
                </a>

                {/* Instagram */}
                <a
                  href="https://instagram.com/SkillTimes24x7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Page"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#E1306C] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com/SkillTimes24x7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#1877F2] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                {/* X / Twitter */}
                <a
                  href="https://x.com/SkillTimes24x7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="X Twitter"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <Twitter className="w-4 h-4" />
                </a>

                {/* WhatsApp Channel */}
                <a
                  href="https://whatsapp.com/channel/SkillTimes24x7"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Channel"
                  className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#25D366] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-red-600 pl-2">
              Major Sections
            </h4>
            <ul className="space-y-1.5 text-xs">
              {categories.slice(0, 7).map(c => (
                <li key={c.id}>
                  <button
                    onClick={() => onSelectCategory(c.slug)}
                    className="hover:text-red-400 transition-colors text-left"
                  >
                    • {c.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Hyderabad Local Hotspots */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-red-600 pl-2">
              Hyderabad Hubs
            </h4>
            <ul className="space-y-1.5 text-xs text-neutral-400">
              <li><button onClick={() => onSelectCategory('hyderabad')} className="hover:text-red-400">• Old City & Charminar</button></li>
              <li><button onClick={() => onSelectCategory('hyderabad')} className="hover:text-red-400">• Yakutpura & Falaknuma</button></li>
              <li><button onClick={() => onSelectCategory('hyderabad')} className="hover:text-red-400">• Nampally & Mehdipatnam</button></li>
              <li><button onClick={() => onSelectCategory('hyderabad')} className="hover:text-red-400">• Rajendranagar & Asif Nagar</button></li>
              <li><button onClick={() => onSelectCategory('telangana')} className="hover:text-red-400">• Telangana State Assembly</button></li>
              <li><button onClick={() => onSelectCategory('videos')} className="hover:text-red-400">• SkillTimes Live Bulletins</button></li>
            </ul>
          </div>

          {/* Institutional & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3 border-l-2 border-red-600 pl-2">
              Policies & Channel
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button onClick={() => onOpenPolicy('about')} className="hover:text-red-400">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('contact')} className="hover:text-red-400">
                  Contact Us & Grievance
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('editorial')} className="hover:text-red-400">
                  Editorial Policy & Code of Ethics
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('privacy')} className="hover:text-red-400">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('terms')} className="hover:text-red-400">
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('disclaimer')} className="hover:text-red-400">
                  Disclaimer
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('cookie')} className="hover:text-red-400">
                  Cookie Policy
                </button>
              </li>
              <li>
                <button onClick={() => onOpenPolicy('advertise')} className="hover:text-red-400 font-bold text-red-400">
                  Advertise With Us
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Bar */}
        <div className="pt-6 border-t border-neutral-900 text-[11px] text-neutral-500 leading-relaxed">
          <p>
            <strong className="text-neutral-400">Editorial Disclaimer:</strong> SkillTimes24x7 is committed to objective reporting in accordance with the Press Council of India (PCI) norms and Digital Media Ethics Code. All rights reserved. Reproduction of any content without prior written authorization is strictly prohibited.
          </p>
        </div>

        {/* Bottom Copyright & Back to Top */}
        <div className="pt-6 mt-4 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>
            Copyright © {new Date().getFullYear()} <strong className="text-neutral-300">SkillTimes24x7</strong>. All Rights Reserved. Designed for fast mobile news delivery.
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 hover:text-white bg-neutral-900 hover:bg-neutral-800 px-3 py-1.5 rounded transition-colors text-[11px]"
          >
            <span>Back to Top</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
