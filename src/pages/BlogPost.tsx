import { useParams, Link, useLocation } from "react-router-dom";
import { ArrowLeft, ExternalLink, Clock, Calendar, Tag } from "lucide-react";
import { useHashnodePost } from "../hooks/useHashnodePost";
import { useHashnodePosts } from "../hooks/useHashnodePosts";
import { writings } from "../content/writings";
import { useEffect } from "react";

// Inlined prose CSS so we don't rely on @tailwindcss/typography
const proseStyles = `
  .blog-prose {
    color: #a1a1aa;
    line-height: 1.8;
    font-size: 1.0625rem;
  }
  .blog-prose h1,
  .blog-prose h2,
  .blog-prose h3,
  .blog-prose h4 {
    color: #f4f4f5;
    font-weight: 600;
    line-height: 1.3;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }
  .blog-prose h1 { font-size: 1.875rem; }
  .blog-prose h2 { font-size: 1.5rem; border-bottom: 1px solid #27272a; padding-bottom: 0.4rem; }
  .blog-prose h3 { font-size: 1.25rem; }
  .blog-prose h4 { font-size: 1.125rem; }

  .blog-prose p {
    margin-bottom: 1.25rem;
  }
  .blog-prose a {
    color: #60a5fa;
    text-decoration: underline;
    text-underline-offset: 3px;
    transition: color 0.2s;
  }
  .blog-prose a:hover { color: #93c5fd; }

  .blog-prose strong { color: #e4e4e7; font-weight: 600; }
  .blog-prose em { font-style: italic; }

  .blog-prose ul, .blog-prose ol {
    margin: 1rem 0 1.25rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .blog-prose ul { list-style: disc; }
  .blog-prose ol { list-style: decimal; }
  .blog-prose li { padding-left: 0.25rem; }

  .blog-prose blockquote {
    border-left: 3px solid #3b82f6;
    padding: 0.5rem 0 0.5rem 1.25rem;
    margin: 1.5rem 0;
    color: #71717a;
    font-style: italic;
    background: rgba(59,130,246,0.05);
    border-radius: 0 0.5rem 0.5rem 0;
  }

  .blog-prose pre {
    background: #18181b;
    border: 1px solid #27272a;
    border-radius: 0.75rem;
    padding: 1.25rem;
    overflow-x: auto;
    margin: 1.5rem 0;
    font-size: 0.875rem;
    line-height: 1.65;
  }
  .blog-prose code:not(pre code) {
    background: #27272a;
    color: #a78bfa;
    padding: 0.15em 0.4em;
    border-radius: 0.3rem;
    font-size: 0.875em;
    font-family: 'Fira Code', 'Cascadia Code', monospace;
  }
  .blog-prose pre code {
    background: none;
    color: #e4e4e7;
    padding: 0;
    border-radius: 0;
    font-size: inherit;
    font-family: 'Fira Code', 'Cascadia Code', ui-monospace, monospace;
  }

  .blog-prose img {
    max-width: 100%;
    border-radius: 0.75rem;
    border: 1px solid #27272a;
    margin: 1.5rem 0;
  }

  .blog-prose hr {
    border: none;
    border-top: 1px solid #27272a;
    margin: 2rem 0;
  }

  .blog-prose table {
    width: 100%;
    border-collapse: collapse;
    margin: 1.5rem 0;
    font-size: 0.9rem;
    overflow: hidden;
    border-radius: 0.5rem;
  }
  .blog-prose th {
    background: #27272a;
    color: #e4e4e7;
    padding: 0.6rem 1rem;
    text-align: left;
    font-weight: 600;
  }
  .blog-prose td {
    padding: 0.6rem 1rem;
    border-bottom: 1px solid #27272a;
    color: #a1a1aa;
  }
  .blog-prose tr:last-child td { border-bottom: none; }
`;

function sanitizeHtml(html: string): string {
  // Basic sanitization: remove script tags and event handlers
  // DOMPurify would be ideal, but this covers the main XSS vectors
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
    .replace(/\s+on\w+="[^"]*"/gi, "")
    .replace(/\s+on\w+='[^']*'/gi, "")
    .replace(/javascript:/gi, "");
}

// Skeleton card while loading
function BlogSkeleton() {
  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-pulse">
      <div className="h-4 w-24 bg-zinc-800 rounded-full" />
      <div className="h-10 w-3/4 bg-zinc-800 rounded-xl" />
      <div className="h-5 w-1/2 bg-zinc-800 rounded-xl" />
      <div className="h-48 bg-zinc-800/50 rounded-2xl" />
      {[...Array(6)].map((_, i) => (
        <div key={i} className="h-4 bg-zinc-800/40 rounded-full" style={{ width: `${85 - i * 5}%` }} />
      ))}
    </div>
  );
}

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();

  // Try to get post from Hashnode
  const { post, loading, error } = useHashnodePost(id || "");

  // Also load list posts to find fallback data matching this ID
  const { posts: allPosts } = useHashnodePosts("codecrafters.hashnode.dev");

  // Find a matching local writing as final fallback metadata
  const localWriting = writings.find((w) => w.id === id);
  const hashnodeListPost = allPosts.find((p) => p.id === id);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [id]);

  if (loading) {
    return (
      <div className="py-8 animate-in fade-in duration-500">
        <BlogSkeleton />
      </div>
    );
  }

  // If we have a real Hashnode post with HTML content
  if (post && post.content?.html) {
    const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const displayTags = post.tags
      .filter((t) => !t.slug.toLowerCase().includes("portfolio-"))
      .map((t) => t.name);

    return (
      <>
        <style>{proseStyles}</style>
        <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Back */}
          <div className="flex items-center justify-between">
            <Link
              to={location.state?.from || "/writing"}
              className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-300 transition-colors border border-zinc-800 hover:border-zinc-600 rounded-full px-3 py-1.5"
            >
              <ExternalLink className="w-3 h-3" /> View on Hashnode
            </a>
          </div>

          {/* Header */}
          <div className="space-y-5">
            <h1 className="text-3xl md:text-5xl font-semibold tracking-tight text-zinc-100 leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {publishedDate}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readTimeInMinutes} min read
              </span>
              {displayTags.length > 0 && (
                <span className="flex items-center gap-1.5 flex-wrap">
                  <Tag className="w-3.5 h-3.5 shrink-0" />
                  {displayTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded-full bg-zinc-800/60 border border-zinc-700/50 text-xs text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              )}
            </div>

            {post.brief && (
              <p className="text-lg text-zinc-400 leading-relaxed border-l-2 border-blue-500/40 pl-4">
                {post.brief}
              </p>
            )}
          </div>

          {/* Cover image */}
          {post.coverImage?.url && (
            <div className="rounded-2xl overflow-hidden border border-zinc-800/50">
              <img
                src={post.coverImage.url}
                alt={post.title}
                className="w-full h-auto object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          {/* Divider */}
          <hr className="border-zinc-800/50" />

          {/* Content */}
          <article
            className="blog-prose"
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(post.content.html) }}
          />

          {/* Footer */}
          <div className="border-t border-zinc-800/50 pt-8 flex items-center justify-between gap-4 flex-wrap">
            <Link
              to={location.state?.from || "/writing"}
              className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Writing
            </Link>
            <a
              href={post.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ExternalLink className="w-4 h-4" /> Read on Hashnode
            </a>
          </div>
        </div>
      </>
    );
  }

  // Fallback: if we have a local or list post but Hashnode fetch failed
  const fallback = hashnodeListPost || localWriting;
  if (fallback || error) {
    const fallbackTitle = fallback?.title || "Blog Post";
    const fallbackDesc = (fallback as any)?.description || (fallback as any)?.brief || "";
    const fallbackLink = (fallback as any)?.link || (fallback as any)?.url || "https://hashnode.com";

    return (
      <div className="max-w-3xl mx-auto space-y-10 animate-in fade-in duration-700">
        <Link
          to={location.state?.from || "/writing"}
          className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-100">
            {fallbackTitle}
          </h1>
          {fallbackDesc && (
            <p className="text-lg text-zinc-400 leading-relaxed">{fallbackDesc}</p>
          )}
        </div>

        <div className="p-6 rounded-2xl border border-amber-800/30 bg-amber-950/10 space-y-3">
          <p className="text-sm text-zinc-400">
            The full article content couldn't be loaded. You can read it directly on Hashnode:
          </p>
          <a
            href={fallbackLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-950 text-sm font-medium hover:bg-white transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Open on Hashnode
          </a>
        </div>
      </div>
    );
  }

  // Nothing found at all
  return (
    <div className="max-w-3xl mx-auto py-24 text-center space-y-4">
      <p className="text-zinc-400">Post not found.</p>
      <Link to="/writing" className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
        ← Back to Writing
      </Link>
    </div>
  );
}
