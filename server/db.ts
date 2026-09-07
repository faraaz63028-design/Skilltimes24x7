import fs from 'fs';
import path from 'path';
import { NewsArticle, Category, Comment, Advertisement, WebsiteStats } from '../src/types.js';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'news_db.json');

export interface DatabaseSchema {
  articles: NewsArticle[];
  categories: Category[];
  comments: Comment[];
  ads: Advertisement[];
  stats: {
    totalViews: number;
  };
}

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Home', slug: 'home', order: 1, color: '#dc2626' },
  { id: '2', name: 'Latest News', slug: 'latest', order: 2, color: '#b91c1c' },
  { id: '3', name: 'Hyderabad', slug: 'hyderabad', order: 3, color: '#e11d48' },
  { id: '4', name: 'Telangana', slug: 'telangana', order: 4, color: '#ea580c' },
  { id: '5', name: 'India', slug: 'india', order: 5, color: '#2563eb' },
  { id: '6', name: 'World', slug: 'world', order: 6, color: '#0284c7' },
  { id: '7', name: 'Politics', slug: 'politics', order: 7, color: '#4f46e5' },
  { id: '8', name: 'Crime', slug: 'crime', order: 8, color: '#991b1b' },
  { id: '9', name: 'Business', slug: 'business', order: 9, color: '#059669' },
  { id: '10', name: 'Sports', slug: 'sports', order: 10, color: '#16a34a' },
  { id: '11', name: 'Entertainment', slug: 'entertainment', order: 11, color: '#d97706' },
  { id: '12', name: 'Technology', slug: 'technology', order: 12, color: '#7c3aed' },
  { id: '13', name: 'Videos', slug: 'videos', order: 13, color: '#dc2626' },
];

const INITIAL_ARTICLES: NewsArticle[] = [
  {
    id: 'art-1',
    slug: 'hyderabad-metro-old-city-falaknuma-route-inspection',
    headline: 'Hyderabad Metro Phase-2: Survey Speeds Up for MGBS to Falaknuma Stretch Through Old City',
    subheadline: 'HMRL Managing Director confirms alignment peg-marking and land acquisition procedures in full swing',
    summary: 'The long-awaited Old City Metro corridor connecting Mahatma Gandhi Bus Station (MGBS) to Falaknuma via Darulshifa, Mir Alam Mandi, and Shalibanda enters its critical civil engineering stage with dedicated heritage protection norms.',
    content: `The Hyderabad Metro Rail Limited (HMRL) has expedited the pre-construction survey and alignment peg-marking for the crucial 5.5-kilometre Old City corridor from MGBS to Falaknuma.

Speaking to SkillTimes24x7, senior engineering authorities confirmed that structural audits of historical monuments along the proposed route, including heritage gateways and places of worship, have been finalized to ensure zero structural disruption.

Key Highlights of the Old City Metro Line:
- Five designated stations: Salar Jung Museum, Charminar, Shalibanda, Shamsheergunj, and Falaknuma.
- Road widening up to 100 feet at select bottlenecks to facilitate smooth pedestrian and vehicular movement.
- Modern aesthetics preserving the Indo-Islamic architectural heritage of Hyderabad's historic precinct.

Local residents and trade associations across Shalibanda, Mir Alam Mandi, and Falaknuma have warmly welcomed the swift developments, expressing optimism that the metro connectivity will drastically alleviate severe traffic snarls and bolster commercial activity in the historic quarter.

The HMRL project wing has also deployed specialized soil testing rigs near the Falaknuma terminus. Construction tenders are anticipated to be awarded within the coming quarter.`,
    category: 'hyderabad',
    subArea: 'Old City',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80',
    imageGallery: [
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1596405344147-3ad35242e472?auto=format&fit=crop&w=800&q=80'
    ],
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    reporterName: 'Syed Moazzam Hussain',
    reporterRole: 'Senior Bureau Chief, Hyderabad',
    publishedAt: new Date(Date.now() - 25 * 60 * 1000).toISOString(),
    status: 'published',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    trendingRank: 1,
    tags: ['Hyderabad', 'Old City', 'Metro Rail', 'HMRL', 'Falaknuma', 'Charminar'],
    views: 14250,
    likes: 832,
  },
  {
    id: 'art-2',
    slug: 'charminar-pedestrianisation-facade-lighting-night-bazaar',
    headline: 'Charminar Heritage Precinct: Night Bazaar and Architectural Facade Illuminations Unveiled',
    subheadline: 'Telangana Municipal Administration rolls out ambitious nighttime cultural experience for tourists and locals',
    summary: 'The historic Charminar pedestrianisation precinct has introduced state-of-the-art dynamic architectural illumination and organized evening pedestrian zones, reviving the cultural glory of Hyderabad.',
    content: `Visitors and heritage enthusiasts flocking to the Charminar were treated to a mesmerizing spectacle as the municipal authorities activated the new warm architectural dynamic facade lighting across the 432-year-old monument.

The initiative, undertaken under the Charminar Pedestrianisation Project (CPP), includes:
1. Cobblestone restoration along the four minarets.
2. Artisanal kiosks featuring Hyderabadi pearls, lac bangles, handloom textiles, and traditional culinary stalls.
3. Electric buggy transport services for senior citizens and differently-abled visitors entering from Madina building and Gulzar Houz.

SkillTimes24x7 spoke to local merchants in Lad Bazaar who highlighted an immediate 40% jump in footfall following the introduction of organized walking corridors and high-definition CCTV security surveillance.`,
    category: 'hyderabad',
    subArea: 'Charminar',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1596405344147-3ad35242e472?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'Mohammed Faraaz',
    reporterRole: 'City Desk Correspondent',
    publishedAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    trendingRank: 2,
    tags: ['Charminar', 'Hyderabad', 'Heritage', 'Lad Bazaar', 'Night Bazaar'],
    views: 9810,
    likes: 540,
  },
  {
    id: 'art-3',
    slug: 'telangana-government-mega-industrial-corridor-hyderabad-warangal',
    headline: 'Telangana Cabinet Approves ₹12,000 Crore Industrial Corridor Linking Hyderabad & Warangal',
    subheadline: 'Massive boost for manufacturing, logistics, and IT hubs across eastern Telangana districts',
    summary: 'In a landmark decision, the state government greenlights the Hyderabad-Warangal Industrial Growth Corridor, projected to generate over 1.5 lakh direct employment opportunities.',
    content: `The Telangana State Cabinet convened under the leadership of Chief Minister has approved the comprehensive master plan for the Hyderabad-Warangal Industrial Growth Corridor (HWIGC).

The ambitious economic corridor spans 140 kilometers, integrating high-speed multi-lane accessways, dedicated freight dry ports, renewable solar parks, and world-class plug-and-play electronics manufacturing clusters.

Key Strategic Pillars:
- Allotment of 4,000 acres for defense, aerospace, and electric vehicle component manufacturers.
- A specialized Pharma & Med-Tech hub strategically positioned outside urban residential belts.
- Fast-track single-window clearances within 14 days under TS-iPASS 2.0 framework.

Industries Minister announced that several multinational engineering giants have already submitted letters of intent for immediate land allotment in the Jangaon and Alair nodes.`,
    category: 'telangana',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'K. V. Ramana Rao',
    reporterRole: 'State Political Editor',
    publishedAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: true,
    isFeatured: true,
    isTrending: true,
    trendingRank: 3,
    tags: ['Telangana', 'Cabinet', 'Warangal', 'Industrial Corridor', 'Jobs', 'Economy'],
    views: 11420,
    likes: 672,
  },
  {
    id: 'art-4',
    slug: 'yakutpura-nampally-mehdipatnam-civic-works-upgraded',
    headline: 'Civic Transformation: GHMC Injects ₹85 Cr for Storm Water Drains in Yakutpura, Nampally & Mehdipatnam',
    subheadline: 'Pre-monsoon drainage overhaul and road re-carpeting taken up on mission mode',
    summary: 'The Greater Hyderabad Municipal Corporation (GHMC) initiates heavy civil works in critical South Zone and Central Zone neighborhoods to permanently eliminate urban waterlogging.',
    content: `To safeguard residential colonies from seasonal flash flooding, the GHMC has commenced round-the-clock desilting and storm water drain enhancement across Yakutpura, Nampally, and Mehdipatnam.

In Yakutpura, specialized box drains are being installed along vulnerable low-lying segments, linking straight to the primary drainage conduits. In Nampally, the area surrounding the historic railway terminus and exhibition grounds is receiving elevated RCC channel conduits.

Meanwhile, Mehdipatnam Junction is witnessing lane-segregation work to eliminate bottleneck traffic coming from Tolichowki and Gachibowli. GHMC Zonal Commissioners are conducting daily morning on-site inspections to ensure stringent adherence to completion deadlines.`,
    category: 'hyderabad',
    subArea: 'Yakutpura',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156a?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'Mirza Tariq Baig',
    reporterRole: 'Civic Affairs Reporter',
    publishedAt: new Date(Date.now() - 6 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    tags: ['Yakutpura', 'Nampally', 'Mehdipatnam', 'GHMC', 'Hyderabad Civic'],
    views: 6200,
    likes: 310,
  },
  {
    id: 'art-5',
    slug: 'cyberabad-cyber-crime-wing-interstate-fraud-busted',
    headline: 'Cyberabad Police Bust Inter-State Digital Arrest Syndicate; ₹4.8 Crore Frozen Across 18 Accounts',
    subheadline: 'Gang impersonated CBI and ED officials to extort retired professionals and businessmen',
    summary: 'In a major breakthrough, the Cyberabad Cyber Crime Police arrested six kingpins operating from multiple states, retrieving high-end telecommunication gear and counterfeit police documents.',
    content: `The Cyberabad Cyber Crime Police have successfully neutralized an interstate syndicate operating a fraudulent 'digital arrest' scam targeting innocent citizens.

Cyberabad Police Commissioner revealed during a special press conference that the accused contacted victims via encrypted video calls, wearing police uniforms and displaying fabricated arrest warrants claiming involvement in money laundering.

"We tracked the digital footprint through IP log analysis and banking trail tracking across Rajasthan, Gujarat, and West Bengal. A dedicated tactical team carried out simultaneous raids, seizing 42 mobile phones, 18 laptops, and 120 counterfeit SIM cards," the Commissioner stated.

Citizens are urged to immediately dial helpline 1930 or report suspicious incidents via the National Cyber Crime Reporting Portal.`,
    category: 'crime',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'P. Anand Sharma',
    reporterRole: 'Crime & Security Bureau',
    publishedAt: new Date(Date.now() - 8 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: true,
    isFeatured: false,
    isTrending: true,
    trendingRank: 4,
    tags: ['Cyber Crime', 'Cyberabad', 'Hyderabad Police', 'Fraud', 'Arrest'],
    views: 13500,
    likes: 890,
  },
  {
    id: 'art-6',
    slug: 'urdu-hyderabad-old-city-development-report',
    headline: 'حیدرآباد: پرانے شہر کی ہمہ جہت ترقی کیلئے خصوصی پیکیج، چارمینار اور فلک نما میں نئے پروجیکٹس کا آغاز',
    subheadline: 'سکِل ٹائمز 24x7 کی خصوصی رپورٹ: انفراسٹرکچر، صفائی اور اسمارٹ لائٹنگ پر خصوصی توجہ',
    summary: 'حیدرآباد کے تاریخی علاقوں بشمول یاقوت پورہ، نامپلی، مہدی پٹنم اور راجیندر نگر میں شہری سہولیات کی بہتری کیلئے جی ایچ ایم سی اور شہری انتظامیہ کے اہم اقدامات۔',
    content: `پرانے شہر حیدرآباد کے عوام کے دیرینہ مطالبات کو مدنظر رکھتے ہوئے حکومت اور بلدیاتی انتظامیہ نے میٹرو ریل سروے اور نکاسی آب کے جامع نظام کو حتمی شکل دے دی ہے۔

سکِل ٹائمز 24x7 کے نمائندے کی حاصل کردہ تفصیلات کے مطابق تاریخی چارمینار، لاڈ بازار، شالینڈہ اور فلک نما روٹ پر سڑکوں کی کشادگی اور برقی کیبلز کو زیر زمین منتقل کرنے کا کام آئندہ چند ہفتوں میں شروع ہو جائے گا۔

علاقہ کے منتخب نمائندوں اور سماجی تنظیموں نے اس پیش رفت کا خیر مقدم کرتے ہوئے امید ظاہر کی ہے کہ اس سے پرانے شہر کی تجارتی اور تعلیمی سرگرمیوں کو نئی توانائی ملے گی۔`,
    category: 'hyderabad',
    subArea: 'Old City',
    language: 'ur',
    featuredImage: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'سید معظم حسین',
    reporterRole: 'سینئر نامہ نگار',
    publishedAt: new Date(Date.now() - 10 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    isTrending: false,
    tags: ['Urdu News', 'Hyderabad', 'Charminar', 'Old City', 'SkillTimes'],
    views: 7420,
    likes: 615,
  },
  {
    id: 'art-7',
    slug: 'hindi-telangana-education-jobs-update',
    headline: 'तेलंगाना में युवाओं के लिए बंपर अवसर: टीएसपीएससी ग्रुप परीक्षाओं की तिथियां घोषित, 15 हजार पदों पर भर्ती',
    subheadline: 'सरकारी विभागों में रिक्तियों को भरने की प्रक्रिया तेज, स्किल टाइम्स 24x7 पर देखें पूरा शेड्यूल',
    summary: 'तेलंगाना लोक सेवा आयोग (TSPSC) ने विभिन्न सरकारी विभागों में ग्रुप-1, ग्रुप-2 और तकनीकी संवर्ग के लिए अंतिम भर्ती कैलेंडर जारी कर दिया है।',
    content: `तेलंगाना के लाखों प्रतियोगी परीक्षार्थियों के लिए बहुप्रतीक्षित खबर आ चुकी है। तेलंगाना लोक सेवा आयोग (TSPSC) ने विभिन्न विभागों में 15,000 से अधिक रिक्तियों के लिए भर्ती प्रक्रिया के विस्तृत कार्यक्रम को अंतिम रूप दे दिया है।

मुख्य विवरण:
1. सभी परीक्षा केंद्रों पर हाई-टेक बायोमेट्रिक जांच और सीसीटीवी निगरानी अनिवार्य।
2. हैदराबाद, वारंगल, करीमनगर, खम्मम और निजामाबाद में अतिरिक्त परीक्षा केंद्र स्थापित किए गए हैं।
3. एडमिट कार्ड परीक्षा से 7 दिन पूर्व आधिकारिक पोर्टल पर उपलब्ध होंगे।

शिक्षा विशेषज्ञों का कहना है कि पारदर्शी और समयबद्ध भर्ती से राज्य के मेधावी युवाओं में सकारात्मक ऊर्जा का संचार हुआ है।`,
    category: 'telangana',
    language: 'hi',
    featuredImage: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'राजेश वर्मा',
    reporterRole: 'शिक्षा एवं रोजगार विश्लेषक',
    publishedAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: true,
    isFeatured: false,
    isTrending: true,
    trendingRank: 5,
    tags: ['TSPSC', 'Telangana Jobs', 'Hindi News', 'Recruitment', 'Education'],
    views: 16800,
    likes: 1205,
  },
  {
    id: 'art-8',
    slug: 'roman-urdu-hyderabad-food-and-heritage-guide',
    headline: 'SkillTimes Special: Hyderabad Ka Zaika Aur Tareekh - Irani Chai, Biryani Aur Naye Food Streets Ka Jalwa',
    subheadline: 'Charminar se Mehdipatnam tak, Old City ke mashhoor cafes aur iconic food joints ki zameen par live report',
    summary: 'Hyderabad ki shaan, yahan ki tehzeeb aur lazeez khano ka koi muqabla nahi. SkillTimes24x7 ki khas report mein dekhiye shahar ke top khaney aur unka tareekhi pas-manzar.',
    content: `Hyderabad shahar sirf apni IT companies ke liye hi nahi, balki apni shaandar mehmandari, garma-garam Irani Chai, Osmania biscuit aur lazeez Dum Biryani ke liye poori dunya mein jana jata hai.

SkillTimes24x7 ki team ne Charminar, Madina, Nayab, Shadab, Shah Ghouse aur Mehdipatnam ke iconic food joints ka daura kiya. 

Subah 5 baje se lekar der raat tak yahan logon ka jamghat rehta hai. Naye food safety standards ke tehat GHMC ne sabhi street food vendors ko hygenic certifications aur clean cooking stations provide karne ki mohim shuru ki hai.

Agar aap Hyderabad mein hain toh Old City ki sham aur yahan ki zaiqedaar chaap zaroor check karein!`,
    category: 'entertainment',
    subArea: 'Charminar',
    language: 'ur-roman',
    featuredImage: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'Farhan Baig',
    reporterRole: 'Culture & Lifestyle Reporter',
    publishedAt: new Date(Date.now() - 14 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    tags: ['Hyderabad Food', 'Biryani', 'Roman Urdu', 'Old City', 'Lifestyle'],
    views: 8930,
    likes: 742,
  },
  {
    id: 'art-9',
    slug: 'isro-deep-space-exploration-next-mission-milestone',
    headline: 'ISRO Gears Up for Next Planetary Exploration Mission; Indigenous Cryogenic Engine Tested Successfully',
    subheadline: 'Indian space agency hits crucial technical milestone ahead of upcoming satellite launch schedule',
    summary: 'The Indian Space Research Organisation (ISRO) has completed the rigorous qualification test of its advanced semi-cryogenic engine at the propulsion complex in Mahendragiri.',
    content: `In a magnificent stride towards space exploration self-reliance, the Indian Space Research Organisation (ISRO) successfully conducted the hot-firing test of the indigenous CE-20 cryogenic upper-stage engine.

ISRO Chairman addressed scientific staff at Sriharikota, noting that the engine performed flawlessly throughout its designated 720-second ignition sequence.

The enhanced thrust capacity will directly empower India's heavy-lift launch vehicles (LVM3) to ferry heavier commercial payloads and support upcoming lunar sample-return objectives. International space agencies have extended congratulations on India's consistent space innovation at ultra-cost-effective benchmarks.`,
    category: 'technology',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1517976487515-56a9c1e7a469?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'Dr. Anita Deshmukh',
    reporterRole: 'Science & Technology Bureau',
    publishedAt: new Date(Date.now() - 16 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    isTrending: false,
    tags: ['ISRO', 'Space', 'Technology', 'Science', 'India'],
    views: 8400,
    likes: 620,
  },
  {
    id: 'art-10',
    slug: 'india-cricket-thrilling-test-victory-hyderabad-stadium',
    headline: 'Sensational Test Match Thriller: India Clinches Dramatic 4th Innings Victory at Uppal Stadium',
    subheadline: 'Sensational 5-wicket haul on day five seals memorable triumph before roaring 40,000 Hyderabad crowd',
    summary: 'The Rajiv Gandhi International Cricket Stadium in Uppal witnessed nail-biting sporting drama as the Indian bowling attack bowled out the opposition in the final session.',
    content: `In one of the most gripping finishes in recent Test cricket history, Team India snatched an exhilarating victory on the final day of the Hyderabad Test match at the Uppal Stadium.

Needing 6 wickets in the final two sessions, India's spin duo turned the contest on its head with venomous turn and immaculate line and length. The packed stadium erupted in patriotic cheers as the final wicket fell with barely 12 minutes remaining before close of play.

The match player of the series commended the pitch preparation and the electric support from Hyderabad cricket enthusiasts.`,
    category: 'sports',
    subArea: 'Hyderabad',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1531415074868-036b1c57e3ce?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'G. Vikram Reddy',
    reporterRole: 'Sports Editor',
    publishedAt: new Date(Date.now() - 18 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    isTrending: true,
    trendingRank: 6,
    tags: ['Cricket', 'Team India', 'Uppal Stadium', 'Hyderabad Sports', 'Test Match'],
    views: 15300,
    likes: 1410,
  },
  {
    id: 'art-11',
    slug: 'rajendranagar-agri-tech-innovation-summit',
    headline: 'Rajendranagar Agri-University Launches AI Crop Diagnostics & Drone Farming Pilot',
    subheadline: 'Professor Jayashankar Telangana State Agricultural University spearheads high-tech solutions for farmers',
    summary: 'A first-of-its-kind smart farming demonstration center opens in Rajendranagar, empowering regional farmers with automated pest detection and precision satellite yield forecasting.',
    content: `PJTSAU at Rajendranagar has inaugurated its state-of-the-art agricultural robotics and artificial intelligence facility today.

The center integrates autonomous drone spraying, soil sensor telemetry, and hyper-local weather advisory services tailored for cotton, paddy, and chili growers across Telangana.

Agriculture Minister inaugurated the facility, pointing out that over 20,000 farmers will receive complimentary mobile app alerts in Telugu and Urdu advising on real-time soil moisture and market commodity prices.`,
    category: 'hyderabad',
    subArea: 'Rajendranagar',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'K. S. Rao',
    reporterRole: 'Agri & Environment Desk',
    publishedAt: new Date(Date.now() - 20 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    tags: ['Rajendranagar', 'Agriculture', 'Technology', 'Telangana Farmers'],
    views: 4200,
    likes: 215,
  },
  {
    id: 'art-12',
    slug: 'falaknuma-asif-nagar-heritage-walks-tourism',
    headline: 'Heritage Tourism Revival: Falaknuma Palace & Asif Nagar Historic Trails Draw Record Global Travellers',
    subheadline: 'Telangana Tourism reports 35% surge in international visitors exploring Hyderabad architectural wonders',
    summary: 'Curated royal trails starting from Falaknuma Palace down through Asif Nagar and Golconda ramparts provide deep historical immersion for heritage tourists.',
    content: `Telangana Tourism's curated weekend heritage walks around Falaknuma, Asif Nagar, and historic Deodis of Old City have registered overwhelming participation this season.

Tour guides recount royal chronicles from the Asaf Jahi era while tourists savor authentic culinary treats including Dum Ka Roat, Lukhmi, and Sheermal at designated traditional pit-stops.

Tourism officials confirmed plans to expand the trail to include nocturnal astronomy watches and classical Sufi musical soirees at restored civic courtyards.`,
    category: 'hyderabad',
    subArea: 'Falaknuma',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=80',
    reporterName: 'Mohammed Faraaz',
    reporterRole: 'Tourism & Culture',
    publishedAt: new Date(Date.now() - 22 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: false,
    isTrending: false,
    tags: ['Falaknuma', 'Asif Nagar', 'Heritage Walk', 'Hyderabad Tourism'],
    views: 5100,
    likes: 380,
  },
  {
    id: 'art-13',
    slug: 'video-special-bulletin-hyderabad-monsoon-preparedness',
    headline: 'VIDEO: SkillTimes24x7 Ground Reality - Hyderabad Municipal & Emergency Teams on High Alert',
    subheadline: 'Special video bulletin examining disaster control rooms, control center radars, and emergency pumps',
    summary: 'SkillTimes24x7 field teams bring on-the-ground footage of emergency response systems activated across Hussain Sagar, Musi River basin, and low-lying municipal wards.',
    content: `Watch our complete 15-minute special broadcast examining how civic authorities, disaster response force (DRF), and traffic police are synchronizing emergency operations across the twin cities.

Includes exclusive interviews with the DRF Commissioner, live demonstration of high-powered dewatering machinery at Malakpet and Begumpet, and direct helpline numbers for citizens.`,
    category: 'videos',
    subArea: 'Hyderabad',
    language: 'en',
    featuredImage: 'https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&q=80',
    videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    reporterName: 'SkillTimes24x7 Video Bureau',
    reporterRole: 'Broadcast Unit',
    publishedAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString(),
    status: 'published',
    isBreaking: false,
    isFeatured: true,
    isTrending: true,
    trendingRank: 7,
    tags: ['Video Bulletin', 'Hyderabad News', 'Special Report', 'SkillTimes Video'],
    views: 19800,
    likes: 1820,
  }
];

const INITIAL_ADS: Advertisement[] = [
  {
    id: 'ad-1',
    title: 'SkillTimes24x7 Digital Media - Advertise with Hyderabad\'s Fast Growing News Channel',
    clientName: 'SkillTimes Ad Sales',
    imageUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&q=80',
    targetUrl: '#advertise',
    position: 'top-banner',
    status: 'active',
    impressions: 48200,
    clicks: 1420
  },
  {
    id: 'ad-2',
    title: 'Hyderabad Real Estate & Properties Expo 2026 - HITEX Exhibition Center',
    clientName: 'CREDAI Hyderabad',
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    targetUrl: 'https://hitex.co.in',
    position: 'sidebar',
    status: 'active',
    impressions: 29500,
    clicks: 890
  },
  {
    id: 'ad-3',
    title: 'Telangana Global IT & AI Summit - Register Now',
    clientName: 'Telangana Tech Forum',
    imageUrl: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
    targetUrl: '#tech-summit',
    position: 'in-feed',
    status: 'active',
    impressions: 18900,
    clicks: 650
  }
];

const INITIAL_COMMENTS: Comment[] = [
  {
    id: 'c-1',
    articleId: 'art-1',
    authorName: 'Ahmed Shareef',
    content: 'Very happy to see metro progress in Falaknuma and Shalibanda. Traffic in Old City was getting unbearable. Kudos to SkillTimes24x7 for timely ground reporting!',
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    status: 'approved',
    likes: 14
  },
  {
    id: 'c-2',
    articleId: 'art-1',
    authorName: 'N. Rajeshwar Rao',
    content: 'Great initiative by HMRL. Heritage conservation must be prioritized along Charminar and Salar Jung museum stretch.',
    createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    status: 'approved',
    likes: 8
  },
  {
    id: 'c-3',
    articleId: 'art-2',
    authorName: 'Fatima Zohra',
    content: 'The new night facade lighting at Charminar looks spectacular! Proud of our city.',
    createdAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    status: 'approved',
    likes: 22
  }
];

class Database {
  private data: DatabaseSchema;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseSchema {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }

      if (fs.existsSync(DB_FILE)) {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(fileContent);
        if (parsed.articles && Array.isArray(parsed.articles)) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Could not read existing news_db.json, re-initializing fresh database', err);
    }

    const defaultData: DatabaseSchema = {
      articles: INITIAL_ARTICLES,
      categories: INITIAL_CATEGORIES,
      comments: INITIAL_COMMENTS,
      ads: INITIAL_ADS,
      stats: {
        totalViews: 98450
      }
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave?: DatabaseSchema) {
    try {
      if (!fs.existsSync(DATA_DIR)) {
        fs.mkdirSync(DATA_DIR, { recursive: true });
      }
      const data = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    } catch (err) {
      console.error('Error saving data to news_db.json:', err);
    }
  }

  // Articles
  public getArticles(filter?: {
    category?: string;
    subArea?: string;
    language?: string;
    isBreaking?: boolean;
    isFeatured?: boolean;
    isTrending?: boolean;
    status?: string;
    query?: string;
    limit?: number;
  }): NewsArticle[] {
    let result = [...this.data.articles];

    if (filter?.status) {
      result = result.filter(a => a.status === filter.status);
    } else {
      // default return published in public view unless specified
      result = result.filter(a => a.status === 'published');
    }

    if (filter?.category && filter.category !== 'all' && filter.category !== 'home') {
      if (filter.category === 'latest') {
        // latest news, keep sorted
      } else {
        result = result.filter(a => a.category.toLowerCase() === filter.category?.toLowerCase());
      }
    }

    if (filter?.subArea) {
      result = result.filter(a => a.subArea?.toLowerCase() === filter.subArea?.toLowerCase());
    }

    if (filter?.language && filter.language !== 'all') {
      result = result.filter(a => a.language === filter.language);
    }

    if (filter?.isBreaking !== undefined) {
      result = result.filter(a => a.isBreaking === filter.isBreaking);
    }

    if (filter?.isFeatured !== undefined) {
      result = result.filter(a => a.isFeatured === filter.isFeatured);
    }

    if (filter?.isTrending !== undefined) {
      result = result.filter(a => a.isTrending === filter.isTrending);
    }

    if (filter?.query) {
      const q = filter.query.toLowerCase().trim();
      result = result.filter(a => 
        a.headline.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.content.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        (a.subArea && a.subArea.toLowerCase().includes(q)) ||
        a.tags.some(t => t.toLowerCase().includes(q)) ||
        a.reporterName.toLowerCase().includes(q)
      );
    }

    // Sort chronologically (newest first)
    result.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

    if (filter?.limit && filter.limit > 0) {
      result = result.slice(0, filter.limit);
    }

    return result;
  }

  public getAllArticlesAdmin(): NewsArticle[] {
    return [...this.data.articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  public getArticleById(id: string): NewsArticle | undefined {
    return this.data.articles.find(a => a.id === id || a.slug === id);
  }

  public incrementArticleViews(id: string): void {
    const article = this.data.articles.find(a => a.id === id || a.slug === id);
    if (article) {
      article.views = (article.views || 0) + 1;
      this.data.stats.totalViews = (this.data.stats.totalViews || 0) + 1;
      this.saveData();
    }
  }

  public addArticle(articleData: Omit<NewsArticle, 'id'>): NewsArticle {
    const id = 'art-' + Date.now() + '-' + Math.random().toString(36).substring(2, 6);
    let slug = articleData.slug || articleData.headline.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    if (!slug) {
      slug = 'article-' + id;
    }
    const newArticle: NewsArticle = {
      ...articleData,
      id,
      slug,
      publishedAt: articleData.publishedAt || new Date().toISOString(),
      views: articleData.views || 0,
      likes: articleData.likes || 0,
      tags: articleData.tags || [],
    };
    this.data.articles.unshift(newArticle);
    this.saveData();
    return newArticle;
  }

  public updateArticle(id: string, updates: Partial<NewsArticle>): NewsArticle | null {
    const index = this.data.articles.findIndex(a => a.id === id || a.slug === id);
    if (index === -1) return null;
    this.data.articles[index] = {
      ...this.data.articles[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.articles[index];
  }

  public deleteArticle(id: string): boolean {
    const initLen = this.data.articles.length;
    this.data.articles = this.data.articles.filter(a => a.id !== id && a.slug !== id);
    if (this.data.articles.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Categories
  public getCategories(): Category[] {
    return [...this.data.categories].sort((a, b) => a.order - b.order);
  }

  public addCategory(cat: Omit<Category, 'id'>): Category {
    const id = 'cat-' + Date.now();
    const newCat: Category = {
      ...cat,
      id
    };
    this.data.categories.push(newCat);
    this.saveData();
    return newCat;
  }

  public deleteCategory(id: string): boolean {
    const initLen = this.data.categories.length;
    this.data.categories = this.data.categories.filter(c => c.id !== id && c.slug !== id);
    if (this.data.categories.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // Comments
  public getComments(articleId: string): Comment[] {
    return this.data.comments
      .filter(c => c.articleId === articleId && c.status === 'approved')
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public getAllCommentsAdmin(): Comment[] {
    return [...this.data.comments].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  public addComment(commentData: { articleId: string; authorName: string; content: string }): Comment {
    const newComment: Comment = {
      id: 'comm-' + Date.now(),
      articleId: commentData.articleId,
      authorName: commentData.authorName.trim() || 'Reader',
      content: commentData.content.trim(),
      createdAt: new Date().toISOString(),
      status: 'approved', // Auto-approve for seamless user experience, can be moderated in admin
      likes: 0
    };
    this.data.comments.unshift(newComment);
    this.saveData();
    return newComment;
  }

  public deleteComment(id: string): boolean {
    const initialLen = this.data.comments.length;
    this.data.comments = this.data.comments.filter(c => c.id !== id);
    if (this.data.comments.length !== initialLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  public updateCommentStatus(id: string, status: 'approved' | 'pending'): boolean {
    const comment = this.data.comments.find(c => c.id === id);
    if (comment) {
      comment.status = status;
      this.saveData();
      return true;
    }
    return false;
  }

  // Advertisements
  public getAds(position?: string): Advertisement[] {
    let ads = this.data.ads.filter(a => a.status === 'active');
    if (position) {
      ads = ads.filter(a => a.position === position);
    }
    return ads;
  }

  public getAllAdsAdmin(): Advertisement[] {
    return [...this.data.ads];
  }

  public addAd(adData: Omit<Advertisement, 'id' | 'impressions' | 'clicks'>): Advertisement {
    const newAd: Advertisement = {
      ...adData,
      id: 'ad-' + Date.now(),
      impressions: 0,
      clicks: 0
    };
    this.data.ads.push(newAd);
    this.saveData();
    return newAd;
  }

  public updateAd(id: string, updates: Partial<Advertisement>): Advertisement | null {
    const idx = this.data.ads.findIndex(a => a.id === id);
    if (idx === -1) return null;
    this.data.ads[idx] = { ...this.data.ads[idx], ...updates };
    this.saveData();
    return this.data.ads[idx];
  }

  public deleteAd(id: string): boolean {
    const initial = this.data.ads.length;
    this.data.ads = this.data.ads.filter(a => a.id !== id);
    if (this.data.ads.length !== initial) {
      this.saveData();
      return true;
    }
    return false;
  }

  public recordAdClick(id: string): void {
    const ad = this.data.ads.find(a => a.id === id);
    if (ad) {
      ad.clicks = (ad.clicks || 0) + 1;
      this.saveData();
    }
  }

  // Website Stats
  public getStats(): WebsiteStats {
    const categoryBreakdown: { [category: string]: number } = {};
    let publishedCount = 0;
    let draftCount = 0;
    let breakingNewsCount = 0;

    for (const art of this.data.articles) {
      if (art.status === 'published') publishedCount++;
      if (art.status === 'draft') draftCount++;
      if (art.isBreaking && art.status === 'published') breakingNewsCount++;
      categoryBreakdown[art.category] = (categoryBreakdown[art.category] || 0) + 1;
    }

    const totalViews = this.data.articles.reduce((acc, a) => acc + (a.views || 0), 0) + (this.data.stats.totalViews || 0);

    return {
      totalArticles: this.data.articles.length,
      totalViews,
      breakingNewsCount,
      totalComments: this.data.comments.length,
      publishedCount,
      draftCount,
      categoryBreakdown
    };
  }
}

export const db = new Database();
