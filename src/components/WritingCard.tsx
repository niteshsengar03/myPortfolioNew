import { Link, useLocation } from "react-router-dom";
import { ExternalLink } from "lucide-react";

interface WritingCardProps {
  key?: string | number;
  writing: {
    id: string;
    title: string;
    description: string;
    type: string;
    tags: string[];
    date: string;
    readTime?: string;
    link: string;
  };
}

export function WritingCard({ writing }: WritingCardProps) {
  const location = useLocation();

  return (
    <div className="group relative block p-6 rounded-2xl border border-zinc-800/50 bg-zinc-900/20 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1">
      {/* Main clickable area → in-site reader */}
      <Link
        to={`/blog/${writing.id}`}
        state={{ from: location.pathname }}
        className="block"
      >
        <div className="flex items-center gap-3 mb-3">
          <span className="px-2.5 py-1 rounded-full bg-zinc-800/50 text-xs font-medium text-zinc-400 border border-zinc-700/50 capitalize">
            {writing.type}
          </span>
          <span className="text-xs text-zinc-500 font-mono">{writing.date}</span>
          {writing.readTime && (
            <>
              <span className="text-zinc-700">•</span>
              <span className="text-xs text-zinc-500 font-mono">
                {writing.readTime}
              </span>
            </>
          )}
        </div>

        <h3 className="text-lg font-medium text-zinc-100 mb-2 group-hover:text-blue-400 transition-colors pr-8">
          {writing.title}
        </h3>

        <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2 mb-4">
          {writing.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {writing.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-zinc-500">
              #{tag}
            </span>
          ))}
        </div>
      </Link>

      {/* Small external link to Hashnode — top-right corner */}
      <a
        href={writing.link}
        target="_blank"
        rel="noreferrer"
        onClick={(e) => e.stopPropagation()}
        title="Open on Hashnode"
        className="absolute top-5 right-5 p-1.5 rounded-md text-zinc-700 hover:text-zinc-300 hover:bg-zinc-800/50 transition-all opacity-0 group-hover:opacity-100"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </a>
    </div>
  );
}
