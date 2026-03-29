import { Link } from "react-router-dom";
import { Github, ExternalLink } from "lucide-react";

interface ProjectCardProps {
  key?: string | number;
  project: {
    id: string;
    title: string;
    description: string;
    tags: string[];
    thumbnail: string;
    githubUrl?: string;
    liveUrl?: string;
    hasLive: boolean;
    status: string;
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group flex flex-col rounded-2xl border border-zinc-800/50 bg-zinc-900/20 overflow-hidden hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1">
      <Link to={`/projects/${project.id}`} className="block overflow-hidden aspect-[16/9]">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-4 mb-4">
          <Link to={`/projects/${project.id}`}>
            <h3 className="text-xl font-medium text-zinc-100 group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
          </Link>
          <span className="px-2.5 py-1 rounded-full bg-zinc-800/50 text-xs font-medium text-zinc-400 border border-zinc-700/50 capitalize whitespace-nowrap">
            {project.status.replace("-", " ")}
          </span>
        </div>
        <p className="text-zinc-400 text-sm leading-relaxed mb-6 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span key={tag} className="text-xs font-mono text-zinc-500 bg-zinc-900 px-2 py-1 rounded-md">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-4 mt-auto pt-4 border-t border-zinc-800/50">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Source</span>
            </a>
          )}
          {project.hasLive && project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
