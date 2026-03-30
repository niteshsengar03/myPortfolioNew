import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { projects } from "../content/projects";
import { writings } from "../content/writings";
import { videos } from "../content/videos";
import { achievements } from "../content/achievements";
import { techStack } from "../content/techStack";
import { ProjectCard } from "../components/ProjectCard";
import { WritingCard } from "../components/WritingCard";
import { VideoCard } from "../components/VideoCard";
import { ContactSection } from "../components/ContactSection";
import { useHashnodePosts } from "../hooks/useHashnodePosts";

export default function Home() {
  const { posts: hashnodePosts, loading: hashnodeLoading, error: hashnodeError } = useHashnodePosts("codecrafters.hashnode.dev");

  const capstoneProjects = projects
    .filter((p) => p.category === "capstone" && p.featured)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  const miniProjects = projects
    .filter((p) => p.category === "mini" && p.featured)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  // Fallback logic: If Hashnode API fails, use the local hardcoded writings
  const recentWritings = hashnodeError
    ? [...writings]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4)
    : [...hashnodePosts]
        .filter(post => post.isFeatured)
        .sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime())
        .slice(0, 4);

  const featuredVideos = videos.filter((v) => v.featured).slice(0, 3);

  return (
    <div className="space-y-32">
      {/* 1. HERO SECTION */}
      <section className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight text-zinc-100">
            Backend Engineer building scalable systems
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl">
            Focused on the work, not the outcome.
          </p>
        </div>

        <div className="space-y-2 border-l-2 border-blue-500/30 pl-4 py-1">
          <p className="text-lg font-serif italic text-zinc-300">
            "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।"
          </p>
          <p className="text-sm text-zinc-500">
            "For one who has conquered the mind, the mind is the best of friends."
          </p>
        </div>

        <div className="flex items-center gap-4 pt-4">
          <Link to="/projects/capstone" className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors">
            View Projects
          </Link>
          <Link to="/writing" className="px-6 py-3 rounded-full bg-zinc-900 text-zinc-300 font-medium border border-zinc-800 hover:border-zinc-700 hover:text-zinc-100 transition-colors">
            Read Writing
          </Link>
        </div>
      </section>

      {/* 2. CAPSTONE PROJECTS */}
      <section id="capstone" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">Capstone Projects</h2>
            <p className="text-zinc-400">Deep dives into distributed systems and architecture.</p>
          </div>
          <Link to="/projects/capstone" className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capstoneProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Link to="/projects/capstone" className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
          View All Capstone Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* 3. MINI PROJECTS */}
      <section id="mini" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">Mini Projects</h2>
            <p className="text-zinc-400">Focused implementations of specific concepts.</p>
          </div>
          <Link to="/projects/mini" className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Link to="/projects/mini" className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
          View All Mini Projects <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* 4. WRITING & LEARNING */}
      <section id="writing" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">Writing & Learning</h2>
            <p className="text-zinc-400">Documenting my journey and technical deep dives.</p>
          </div>
          <Link to="/writing" className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {hashnodeLoading ? (
            <div className="col-span-1 md:col-span-2 py-12 text-center text-zinc-500">
              Loading latest writings...
            </div>
          ) : recentWritings.length > 0 ? (
            recentWritings.map((writing) => (
              <WritingCard key={writing.id} writing={writing} />
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 py-12 text-center text-zinc-500">
              No recent writings found.
            </div>
          )}
        </div>
        <Link to="/writing" className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
          View All Writing <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* 5. YOUTUBE SECTION */}
      <section id="videos" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">I Learn in Public</h2>
            <p className="text-zinc-400">Documenting what I learn, as I learn it.</p>
          </div>
          <Link to="/videos" className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <Link to="/videos" className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group">
          View All Videos <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* 6. ACHIEVEMENTS */}
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-zinc-100">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="p-5 rounded-2xl border border-zinc-800/50 bg-zinc-900/10">
                <h3 className="font-medium text-zinc-100 mb-1">{achievement.title}</h3>
                <p className="text-sm text-zinc-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 7. TECH STACK */}
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-zinc-100">Tech Stack</h2>
          <div className="space-y-8">
            {Object.entries(techStack).map(([category, skills]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span key={skill} className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 8. CONNECT SECTION */}
      <ContactSection />
    </div>
  );
}
