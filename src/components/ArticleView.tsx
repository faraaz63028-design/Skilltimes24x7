import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  Eye, 
  Share2, 
  MessageSquare, 
  ThumbsUp, 
  Send, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ZoomIn, 
  Printer, 
  Bookmark,
  Calendar,
  User,
  ShieldCheck,
  Play
} from 'lucide-react';
import { NewsArticle, Comment } from '../types';
import { api } from '../services/api';

interface ArticleViewProps {
  article: NewsArticle;
  allArticles: NewsArticle[];
  onBack: () => void;
  onOpenArticle: (article: NewsArticle) => void;
  darkMode: boolean;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  allArticles,
  onBack,
  onOpenArticle,
  darkMode
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [submittingComment, setSubmittingComment] = useState(false);
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [fontSizeLevel, setFontSizeLevel] = useState<number>(1); // 0 = small, 1 = normal, 2 = large
  const [activeGalleryImage, setActiveGalleryImage] = useState<string | null>(null);

  // Load comments
  useEffect(() => {
    let mounted = true;
    api.getComments(article.id)
      .then(data => {
        if (mounted) setComments(data);
      })
      .catch(() => {});
    return () => { mounted = false; };
  }, [article.id]);

  // Find related articles (same category or common tags)
  const relatedArticles = allArticles
    .filter(a => a.id !== article.id && (a.category === article.category || (a.subArea && a.subArea === article.subArea)))
    .slice(0, 4);

  // Find prev and next articles
  const currentIndex = allArticles.findIndex(a => a.id === article.id);
  const prevArticle = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextArticle = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const formatDate = (dateString: string) => {
    try {
      const d = new Date(dateString);
      return d.toLocaleDateString('en-IN', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return dateString;
    }
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmittingComment(true);
    try {
      const newComment = await api.addComment({
        articleId: article.id,
        authorName: commentName.trim() || 'Reader',
        content: commentText.trim()
      });
      setComments([newComment, ...comments]);
      setCommentText('');
      setCommentSuccess(true);
      setTimeout(() => setCommentSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingComment(false);
    }
  };

  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://skilltimes24x7.com/news/${article.slug}`;

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(`*${article.headline}*\n\n${article.summary}\n\nRead more on SkillTimes24x7: ${articleUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const shareOnTwitter = () => {
    const text = encodeURIComponent(`${article.headline} - SkillTimes24x7`);
    window.open(`https://twitter.com/intent/tweet?text=${text}&url=${encodeURIComponent(articleUrl)}`, '_blank');
  };

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(articleUrl)}`, '_blank');
  };

  const copyLink = () => {
    navigator.clipboard.writeText(articleUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const getFontSizeClass = () => {
    if (fontSizeLevel === 0) return 'text-sm sm:text-base leading-relaxed';
    if (fontSizeLevel === 2) return 'text-lg sm:text-xl leading-loose';
    return 'text-base sm:text-lg leading-relaxed';
  };

  return (
    <article className="max-w-4xl mx-auto pb-16">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex items-center justify-between py-4 border-b border-neutral-200 dark:border-neutral-800 mb-6">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-neutral-600 dark:text-neutral-300 hover:text-red-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-neutral-400">Home</span>
          <span className="text-neutral-400">/</span>
          <span className="font-bold text-red-600 uppercase">{article.category}</span>
          {article.subArea && (
            <>
              <span className="text-neutral-400">/</span>
              <span className="font-semibold text-neutral-700 dark:text-neutral-300">{article.subArea}</span>
            </>
          )}
        </div>
      </div>

      {/* Category Badge & Breaking Alert */}
      <div className="flex items-center gap-2 mb-3">
        <span className="bg-red-600 text-white font-extrabold text-xs uppercase px-3 py-1 rounded shadow-xs tracking-wider">
          {article.category}
        </span>
        {article.isBreaking && (
          <span className="bg-black text-amber-400 font-extrabold text-xs uppercase px-2.5 py-1 rounded tracking-wider border border-amber-500/30">
            • Breaking News
          </span>
        )}
        {article.subArea && (
          <span className="bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 text-xs font-bold px-2.5 py-1 rounded">
            📍 {article.subArea}
          </span>
        )}
      </div>

      {/* Main Headline */}
      <h1 className={`text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3 leading-tight ${
        darkMode ? 'text-white' : 'text-neutral-950'
      } ${article.language === 'ur' ? 'font-urdu text-right text-3xl sm:text-4xl' : article.language === 'hi' ? 'font-hindi' : ''}`}>
        {article.headline}
      </h1>

      {/* Subheadline */}
      {article.subheadline && (
        <h2 className="text-base sm:text-lg font-semibold text-neutral-600 dark:text-neutral-300 mb-5 leading-snug">
          {article.subheadline}
        </h2>
      )}

      {/* Reporter Byline & Metadata Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-3.5 border-y border-neutral-200 dark:border-neutral-800 mb-6 text-xs">
        {/* Reporter info */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-red-600 text-white font-bold flex items-center justify-center text-sm shadow-sm">
            {article.reporterName.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`font-bold text-sm ${darkMode ? 'text-white' : 'text-neutral-900'}`}>
                {article.reporterName}
              </span>
              <ShieldCheck className="w-3.5 h-3.5 text-blue-500" title="Verified Journalist" />
            </div>
            <span className="text-neutral-500 block">
              {article.reporterRole || 'Senior News Desk'} • SkillTimes24x7
            </span>
          </div>
        </div>

        {/* Date, Time & Reading Controls */}
        <div className="flex items-center gap-3 sm:gap-4 text-neutral-500 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="w-3.5 h-3.5 text-red-500" />
            <span>{article.views?.toLocaleString()} Views</span>
          </div>

          {/* Font Size Tuner */}
          <div className="flex items-center border border-neutral-300 dark:border-neutral-700 rounded px-1.5 py-0.5 bg-neutral-50 dark:bg-neutral-800">
            <button
              onClick={() => setFontSizeLevel(Math.max(0, fontSizeLevel - 1))}
              className="px-1 font-bold hover:text-red-600"
              title="Decrease Font Size"
            >
              A-
            </button>
            <span className="text-[10px] px-1 text-neutral-400">|</span>
            <button
              onClick={() => setFontSizeLevel(Math.min(2, fontSizeLevel + 1))}
              className="px-1 font-bold hover:text-red-600"
              title="Increase Font Size"
            >
              A+
            </button>
          </div>

          <button
            onClick={() => window.print()}
            title="Print Article"
            className="p-1 hover:text-red-600"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Social Sharing Floating Bar */}
      <div className="flex items-center gap-2 mb-6 p-2.5 bg-neutral-100 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 flex-wrap">
        <span className="text-xs font-bold text-neutral-600 dark:text-neutral-400 flex items-center gap-1.5 mr-1">
          <Share2 className="w-3.5 h-3.5 text-red-600" />
          <span>Share:</span>
        </span>

        {/* WhatsApp Share Button */}
        <button
          id="btn-share-whatsapp"
          onClick={shareOnWhatsApp}
          className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold px-3 py-1.5 rounded text-xs transition-colors shadow-xs"
        >
          <span>WhatsApp</span>
        </button>

        {/* X / Twitter */}
        <button
          id="btn-share-x"
          onClick={shareOnTwitter}
          className="flex items-center gap-1.5 bg-black hover:bg-neutral-800 text-white font-bold px-3 py-1.5 rounded text-xs transition-colors shadow-xs"
        >
          <span>X (Twitter)</span>
        </button>

        {/* Facebook */}
        <button
          id="btn-share-facebook"
          onClick={shareOnFacebook}
          className="flex items-center gap-1.5 bg-[#1877F2] hover:bg-[#1565cc] text-white font-bold px-3 py-1.5 rounded text-xs transition-colors shadow-xs"
        >
          <span>Facebook</span>
        </button>

        {/* Copy Link */}
        <button
          id="btn-copy-article-link"
          onClick={copyLink}
          className="flex items-center gap-1.5 bg-neutral-800 hover:bg-neutral-700 text-white font-semibold px-2.5 py-1.5 rounded text-xs transition-colors ml-auto"
        >
          {copiedLink ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copiedLink ? 'Link Copied!' : 'Copy Link'}</span>
        </button>
      </div>

      {/* Main Featured Image */}
      <div className="mb-6 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-900 shadow-md">
        <div className="relative aspect-16/9">
          <img
            src={article.featuredImage}
            alt={article.headline}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-2.5 text-xs text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 italic">
          Featured: {article.headline} • SkillTimes24x7 News Bureau
        </div>
      </div>

      {/* Video Embed Section if available */}
      {article.videoUrl && (
        <div className="mb-8 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-black">
          <div className="p-3 bg-neutral-950 text-white flex items-center gap-2 border-b border-neutral-800">
            <Play className="w-4 h-4 text-red-600 fill-red-600" />
            <span className="text-xs font-bold uppercase tracking-wider">Video Coverage & Report</span>
          </div>
          <div className="aspect-video w-full">
            <iframe
              src={article.videoUrl.includes('watch?v=') 
                ? `https://www.youtube.com/embed/${article.videoUrl.split('v=')[1]?.split('&')[0]}`
                : article.videoUrl}
              title={article.headline}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* Article Body Content */}
      <div className={`prose max-w-none mb-8 ${getFontSizeClass()} ${
        darkMode ? 'text-neutral-200' : 'text-neutral-800'
      } ${article.language === 'ur' ? 'font-urdu text-right text-xl' : article.language === 'hi' ? 'font-hindi' : ''}`}>
        {article.content.split('\n\n').map((para, idx) => (
          <p key={idx} className="mb-4 text-justify leading-relaxed whitespace-pre-line">
            {para}
          </p>
        ))}
      </div>

      {/* Image Gallery Section if multiple images available */}
      {article.imageGallery && article.imageGallery.length > 0 && (
        <div className="mb-8 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-neutral-900 dark:text-white mb-3 flex items-center gap-2">
            <span>Photo Gallery ({article.imageGallery.length} Photos)</span>
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {article.imageGallery.map((imgUrl, idx) => (
              <div
                key={idx}
                onClick={() => setActiveGalleryImage(imgUrl)}
                className="group cursor-pointer relative aspect-4/3 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-300 dark:border-neutral-700"
              >
                <img
                  src={imgUrl}
                  alt={`Gallery image ${idx + 1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <ZoomIn className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Gallery Lightbox Modal */}
      {activeGalleryImage && (
        <div 
          onClick={() => setActiveGalleryImage(null)}
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <img
            src={activeGalleryImage}
            alt="Enlarged view"
            referrerPolicy="no-referrer"
            className="max-h-[90vh] max-w-[90vw] object-contain rounded-lg shadow-2xl"
          />
        </div>
      )}

      {/* Tags Cloud */}
      {article.tags && article.tags.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap py-4 border-y border-neutral-200 dark:border-neutral-800 mb-8">
          <span className="text-xs font-bold text-neutral-500 uppercase">Tags:</span>
          {article.tags.map(tag => (
            <span
              key={tag}
              className="text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950 text-neutral-700 dark:text-neutral-300 px-3 py-1 rounded-full transition-colors"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Prev / Next Article Navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
        {prevArticle ? (
          <div
            onClick={() => onOpenArticle(prevArticle)}
            className={`group cursor-pointer p-4 rounded-lg border transition-all hover:shadow-md ${
              darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <span className="text-xs font-bold text-red-600 flex items-center gap-1 mb-1">
              <ChevronLeft className="w-4 h-4" /> Previous Article
            </span>
            <h4 className="text-sm font-bold line-clamp-2 group-hover:text-red-600 transition-colors">
              {prevArticle.headline}
            </h4>
          </div>
        ) : <div />}

        {nextArticle && (
          <div
            onClick={() => onOpenArticle(nextArticle)}
            className={`group cursor-pointer p-4 rounded-lg border text-right transition-all hover:shadow-md ${
              darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
            }`}
          >
            <span className="text-xs font-bold text-red-600 flex items-center justify-end gap-1 mb-1">
              Next Article <ChevronRight className="w-4 h-4" />
            </span>
            <h4 className="text-sm font-bold line-clamp-2 group-hover:text-red-600 transition-colors">
              {nextArticle.headline}
            </h4>
          </div>
        )}
      </div>

      {/* Interactive Comments Section */}
      <section className={`rounded-xl border p-5 sm:p-6 mb-12 ${
        darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
      }`}>
        <div className="flex items-center justify-between pb-3 mb-5 border-b border-neutral-200 dark:border-neutral-800">
          <h3 className="text-lg font-bold flex items-center gap-2 text-neutral-900 dark:text-white">
            <MessageSquare className="w-5 h-5 text-red-600" />
            <span>Reader Comments ({comments.length})</span>
          </h3>
          <span className="text-xs text-neutral-500">Express Your Viewpoint</span>
        </div>

        {/* Comment Input Form */}
        <form onSubmit={handlePostComment} className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            <input
              type="text"
              placeholder="Your Name (Optional)"
              value={commentName}
              onChange={e => setCommentName(e.target.value)}
              className={`px-3 py-2 text-xs rounded border focus:outline-hidden focus:border-red-600 transition-colors ${
                darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
              }`}
            />
          </div>
          <textarea
            rows={3}
            placeholder="Share your thoughts on this news development..."
            value={commentText}
            onChange={e => setCommentText(e.target.value)}
            required
            className={`w-full p-3 text-xs rounded border focus:outline-hidden focus:border-red-600 transition-colors mb-3 ${
              darkMode ? 'bg-neutral-800 border-neutral-700 text-white' : 'bg-neutral-50 border-neutral-300 text-neutral-900'
            }`}
          />
          <div className="flex items-center justify-between">
            {commentSuccess ? (
              <span className="text-xs text-green-600 font-bold flex items-center gap-1">
                <Check className="w-4 h-4" /> Comment posted successfully!
              </span>
            ) : <span className="text-[11px] text-neutral-500">Comments are moderated for constructive discussion</span>}

            <button
              type="submit"
              disabled={submittingComment || !commentText.trim()}
              className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold px-4 py-2 rounded text-xs transition-colors shadow-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{submittingComment ? 'Posting...' : 'Post Comment'}</span>
            </button>
          </div>
        </form>

        {/* Comments Feed */}
        <div className="space-y-4 divide-y divide-neutral-200 dark:divide-neutral-800">
          {comments.map((c) => (
            <div key={c.id} className="pt-3 first:pt-0">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 font-bold text-xs flex items-center justify-center">
                    {c.authorName.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-neutral-900 dark:text-white">
                    {c.authorName}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400">
                  {new Date(c.createdAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300 pl-8">
                {c.content}
              </p>
            </div>
          ))}
          {comments.length === 0 && (
            <p className="text-xs text-neutral-400 text-center py-4">
              Be the first to share your opinion on this news story.
            </p>
          )}
        </div>
      </section>

      {/* Related News / Read More News Section */}
      {relatedArticles.length > 0 && (
        <section>
          <div className="border-b-2 border-red-600 pb-2 mb-4">
            <h3 className="text-lg font-black uppercase tracking-tight text-neutral-900 dark:text-white">
              Related News Stories
            </h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => onOpenArticle(rel)}
                className={`group cursor-pointer rounded-lg overflow-hidden border transition-all hover:shadow-md ${
                  darkMode ? 'bg-neutral-900 border-neutral-800' : 'bg-white border-neutral-200'
                }`}
              >
                <div className="aspect-16/10 overflow-hidden bg-neutral-800">
                  <img
                    src={rel.featuredImage}
                    alt={rel.headline}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="p-3">
                  <span className="text-[10px] font-bold text-red-600 uppercase block mb-1">
                    {rel.category}
                  </span>
                  <h4 className="text-xs font-bold line-clamp-2 group-hover:text-red-600 transition-colors">
                    {rel.headline}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </article>
  );
};
