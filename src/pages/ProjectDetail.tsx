import { useRef, useState, useEffect } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { projects } from "../content/projects";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === id);

  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, [project?.architectureImages]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { clientWidth } = scrollRef.current;
      const scrollAmount = direction === 'left' ? -clientWidth : clientWidth;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!project) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="max-w-3xl mx-auto space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-8">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>
        
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-zinc-800/50 text-xs font-medium text-zinc-300 border border-zinc-700/50 capitalize">
              {project.status.replace("-", " ")}
            </span>
            {project.tags.map((tag) => (
              <span key={tag} className="text-xs font-mono text-zinc-500">
                #{tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-zinc-100">
            {project.title}
          </h1>
          
          <p className="text-xl text-zinc-400 leading-relaxed">
            {project.description}
          </p>

          <div className="flex items-center gap-4 pt-4">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors"
              >
                <Github className="w-4 h-4" /> Source Code
              </a>
            )}
            {project.hasLive && project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-zinc-900 text-zinc-300 font-medium border border-zinc-800 hover:border-zinc-700 hover:text-zinc-100 transition-colors"
              >
                <ExternalLink className="w-4 h-4" /> Live Demo
              </a>
            )}
          </div>
        </div>
      </div>

      {project.architectureImages && project.architectureImages.length > 0 && (
        <div className="relative group">
          {canScrollLeft && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-2.5 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700/50 backdrop-blur-md hover:bg-zinc-800 transition-all shadow-xl"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          <div 
            ref={scrollRef}
            onScroll={checkScroll}
            className="w-full overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar"
          >
            <div className="flex gap-4 w-max">
              {project.architectureImages.map((img, idx) => (
                <div key={idx} className="rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/20 w-[85vw] md:w-[80vw] max-w-3xl shrink-0 snap-center">
                  <img
                    src={img}
                    alt={`${project.title} Architecture ${idx + 1}`}
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {canScrollRight && project.architectureImages.length > 1 && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 p-2 md:p-2.5 rounded-full bg-zinc-900/90 text-zinc-100 border border-zinc-700/50 backdrop-blur-md hover:bg-zinc-800 transition-all shadow-xl"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}
        </div>
      )}

      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-zinc-100">Problem Statement</h2>
          <p className="text-zinc-400 leading-relaxed">
            {project.problemStatement}
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-zinc-100">Key Decisions</h2>
          <ul className="space-y-3">
            {project.keyDecisions.map((decision, index) => (
              <li key={index} className="flex items-start gap-3 text-zinc-400 leading-relaxed">
                <span className="text-blue-500 mt-1.5">•</span>
                <span>{decision}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-zinc-100">Challenges</h2>
          <ul className="space-y-3">
            {project.challenges.map((challenge, index) => (
              <li key={index} className="flex items-start gap-3 text-zinc-400 leading-relaxed">
                <span className="text-rose-500 mt-1.5">•</span>
                <span>{challenge}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-medium text-zinc-100">Learnings</h2>
          <ul className="space-y-3">
            {project.learnings.map((learning, index) => (
              <li key={index} className="flex items-start gap-3 text-zinc-400 leading-relaxed">
                <span className="text-emerald-500 mt-1.5">•</span>
                <span>{learning}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
