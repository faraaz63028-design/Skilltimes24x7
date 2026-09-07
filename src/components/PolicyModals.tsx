import React from 'react';
import { X, ShieldCheck, Mail, MapPin, Phone, Award, FileText } from 'lucide-react';

interface PolicyModalProps {
  policyType: string | null;
  onClose: () => void;
  darkMode: boolean;
}

export const PolicyModals: React.FC<PolicyModalProps> = ({
  policyType,
  onClose,
  darkMode
}) => {
  if (!policyType) return null;

  const renderContent = () => {
    switch (policyType) {
      case 'about':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">About SkillTimes24x7 Digital Media</h3>
            <p>
              SkillTimes24x7 is a premier independent 24x7 digital news publication headquartered in Hyderabad, Telangana. Guided by our channel motto <strong>“Har Khabar, Sabse Pehle”</strong>, we bring swift, accurate, and multi-perspective coverage of local neighborhoods, state political affairs, socio-economic developments, crime investigation, technology, and sports.
            </p>
            <p>
              With specialized regional desks focusing on Old City, Charminar, Yakutpura, Nampally, Mehdipatnam, Falaknuma, Rajendranagar, and Asif Nagar, we give voice to grassroots issues often overlooked by mainstream syndicates.
            </p>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
              <h4 className="font-bold text-neutral-900 dark:text-white mb-1">Our Core Pillars:</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Zero sensationalism, verified facts first.</li>
                <li>Hyperlocal coverage of every Hyderabad ward and Telangana district.</li>
                <li>Multilingual journalism in English, Hindi, Urdu, and Roman Urdu.</li>
              </ul>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Contact News Desk & Grievance Redressal</h3>
            <p>
              Have a breaking story, civic issue, video evidence, or official press release? Reach out to our 24x7 editorial bureau:
            </p>
            <div className="space-y-2 bg-neutral-100 dark:bg-neutral-800 p-4 rounded-lg">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-red-600 shrink-0" />
                <span>SkillTimes Media Tower, Banjara Hills Road No. 12, Hyderabad, Telangana - 500034</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-red-600 shrink-0" />
                <span>Editorial Hotline: +91 40 2345 6789 | WhatsApp Tip-line: +91 98480 24700</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-red-600 shrink-0" />
                <span>News tips: news@skilltimes24x7.com | Grievances: grievance@skilltimes24x7.com</span>
              </div>
            </div>
            <p>
              <strong>Grievance Officer:</strong> Syed Moazzam Hussain (Resident Editor)<br />
              Responses are acknowledged within 24 hours in compliance with Rule 11 of the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021.
            </p>
          </div>
        );

      case 'editorial':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Editorial Policy & Code of Ethics</h3>
            <p>
              SkillTimes24x7 strictly adheres to the Code of Ethics established by the Press Council of India (PCI) and the News Broadcasters & Digital Association (NBDA).
            </p>
            <div className="space-y-2">
              <p><strong>1. Fact-Checking:</strong> Every headline is cross-checked against primary sources, government gazettes, police FIRs, or on-record statements before release.</p>
              <p><strong>2. Right of Reply:</strong> When allegations are reported regarding any individual, corporate, or political entity, reasonable effort is made to incorporate their response.</p>
              <p><strong>3. Protection of Minors & Victims:</strong> Identities of victims of sexual offenses and juvenile suspects are safeguarded in accordance with the POCSO Act and IPC.</p>
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Privacy Policy</h3>
            <p>
              SkillTimes24x7 respects reader privacy. We do not sell or trade personal data. Information collected via comments or newsletter subscriptions is utilized purely to enhance website navigation and prevent abusive spam.
            </p>
            <p>
              Third-party analytics tools and verified advertising partners may utilize anonymous HTTP cookies to measure traffic benchmarks. You can disable cookies at any time through your browser settings.
            </p>
          </div>
        );

      case 'terms':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Terms & Conditions</h3>
            <p>
              By accessing SkillTimes24x7, you agree to comply with applicable laws of the Republic of India. Users commenting on articles agree not to post defamatory, hate-inciting, or obscene commentary. We reserve the right to remove non-compliant comments and report malicious activity.
            </p>
          </div>
        );

      case 'disclaimer':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Legal Disclaimer</h3>
            <p>
              Articles published on SkillTimes24x7 reflect journalistic reporting at the time of publication. While every diligence is taken to verify dispatches, SkillTimes24x7 assumes no liability for external hyperlinks or sponsored advertisement claims.
            </p>
          </div>
        );

      case 'cookie':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Cookie Policy</h3>
            <p>
              We utilize essential session cookies to remember your display preferences (such as dark mode and selected language). No intrusive personal profiling cookies are deployed.
            </p>
          </div>
        );

      case 'advertise':
        return (
          <div className="space-y-4 text-xs leading-relaxed">
            <h3 className="text-base font-bold text-red-600">Advertise with SkillTimes24x7</h3>
            <p>
              SkillTimes24x7 connects brands with over 10 Lakh monthly digital news consumers across Hyderabad, Telangana, and the global Indian diaspora.
            </p>
            <div className="bg-red-50 dark:bg-red-950/40 p-3 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="font-bold text-red-700 dark:text-red-400 mb-1">Available Placements:</h4>
              <ul className="list-disc pl-4 space-y-1">
                <li>Leaderboard Top Banners (Desktop & Mobile)</li>
                <li>Sponsored News Features & Ground Video Reports</li>
                <li>Category & Locality Targeted In-Feed Banners</li>
                <li>Breaking News Ticker Sponsorships</li>
              </ul>
            </div>
            <p>
              Contact our sales department at: <strong className="text-red-600">ads@skilltimes24x7.com</strong> or call <strong>+91 40 2345 6780</strong> for our comprehensive rate card and media kit.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className={`w-full max-w-xl rounded-xl shadow-2xl border p-6 max-h-[85vh] overflow-y-auto ${
        darkMode ? 'bg-neutral-900 border-neutral-800 text-white' : 'bg-white border-neutral-200 text-neutral-900'
      }`}>
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-200 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold uppercase tracking-wider">SkillTimes24x7 Information</span>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-neutral-200 dark:hover:bg-neutral-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {renderContent()}

        <div className="pt-4 mt-6 border-t border-neutral-200 dark:border-neutral-800 text-right">
          <button
            onClick={onClose}
            className="bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold px-4 py-2 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
