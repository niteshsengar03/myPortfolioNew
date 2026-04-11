import { useState } from "react";
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
import { cn } from "../lib/utils";

type ProjectTab = "capstone" | "mini";

export default function Home() {
  const [activeTab, setActiveTab] = useState<ProjectTab>("capstone");
  const [photoColored, setPhotoColored] = useState(false);

  const {
    posts: hashnodePosts,
    loading: hashnodeLoading,
    error: hashnodeError,
  } = useHashnodePosts("codecrafters.hashnode.dev");

  const capstoneProjects = projects
    .filter((p) => p.category === "capstone" && p.featured)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  const miniProjects = projects
    .filter((p) => p.category === "mini" && p.featured)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 3);

  const displayedProjects =
    activeTab === "capstone" ? capstoneProjects : miniProjects;

  const recentWritings = hashnodeError
    ? [...writings]
        .sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        )
        .slice(0, 4)
    : [...hashnodePosts]
        .filter((post) => post.isFeatured)
        .sort((a, b) => b.originalDate.getTime() - a.originalDate.getTime())
        .slice(0, 4);

  const featuredVideos = videos.filter((v) => v.featured).slice(0, 3);

  return (
    <div className="space-y-24">
      {/* ── 1. HERO ── */}
      <section className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
        {/*
          Desktop: two-column — text left, photo right
          Mobile:  photo on top (centered), text below
        */}
        <div className="flex flex-col-reverse md:flex-row md:items-center md:gap-12 lg:gap-20">
          {/* Left — text */}
          <div className="flex-1 space-y-7 mt-8 md:mt-0">
            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-zinc-100 leading-[1.1]">
                Backend Engineer building scalable systems
              </h1>
              <p className="text-lg md:text-xl text-zinc-400 max-w-xl">
                Focused on the work, not the outcome.
              </p>
            </div>

            <div className="border-l-2 border-blue-500/30 pl-4 py-1 space-y-1">
              <p className="text-base font-serif italic text-zinc-300">
                "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः।"
              </p>
              <p className="text-sm text-zinc-500">
                "For one who has conquered the mind, the mind is the best of friends."
              </p>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <Link
                to="/#videos"
                className="px-6 py-3 rounded-full bg-zinc-100 text-zinc-950 font-medium hover:bg-white transition-colors"
              >
                Learn in Public
              </Link>
              <Link
                to="/#writing"
                className="px-6 py-3 rounded-full bg-zinc-900 text-zinc-300 font-medium border border-zinc-800 hover:border-zinc-700 hover:text-zinc-100 transition-colors"
              >
                Read Writing
              </Link>
            </div>
          </div>

          {/* Right — photo */}
          <div className="flex justify-center md:justify-end shrink-0">
            {/* Outer ring — glows on color */}
            <div
              className={cn(
                "p-[3px] rounded-full transition-all duration-700",
                photoColored
                  ? "bg-gradient-to-br from-blue-500 via-violet-500 to-blue-400 shadow-[0_0_40px_rgba(99,102,241,0.4)]"
                  : "bg-zinc-800"
              )}
            >
              <div className="rounded-full overflow-hidden bg-zinc-950">
                <img
                  src="/my.jpeg"
                  alt="Nitesh Sengar"
                  /* Desktop: hover → color. Mobile: click → color */
                  onMouseEnter={() => setPhotoColored(true)}
                  onMouseLeave={() => setPhotoColored(false)}
                  onClick={() => setPhotoColored((v) => !v)}
                  className={cn(
                    "w-48 h-48 md:w-60 md:h-60 lg:w-72 lg:h-72 object-cover object-top select-none",
                    "transition-all duration-700 ease-in-out cursor-pointer",
                    photoColored
                      ? "grayscale-0 scale-[1.03]"
                      : "grayscale brightness-90"
                  )}
                  draggable={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. UNIFIED WORK SECTION ── */}
      <section id="work" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">Work</h2>
            <p className="text-zinc-400">
              {activeTab === "capstone"
                ? "Deep dives into distributed systems and architecture."
                : "Focused implementations of specific concepts."}
            </p>
          </div>
          <Link
            to={`/projects/${activeTab}`}
            className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Toggle pills */}
        <div className="flex items-center gap-2">
          {(["capstone", "mini"] as ProjectTab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 border",
                activeTab === tab
                  ? "bg-zinc-100 text-zinc-950 border-zinc-100"
                  : "bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300"
              )}
            >
              {tab === "capstone" ? "Capstone Projects" : "Mini Projects"}
            </button>
          ))}
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        <Link
          to={`/projects/${activeTab}`}
          className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
        >
          View All {activeTab === "capstone" ? "Capstone" : "Mini"} Projects{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* ── 3. WRITING & LEARNING ── */}
      <section id="writing" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">
              Writing &amp; Learning
            </h2>
            <p className="text-zinc-400">
              Documenting my journey and technical deep dives.
            </p>
          </div>
          <Link
            to="/writing"
            className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
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
        <Link
          to="/writing"
          className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
        >
          View All Writing{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      {/* ── 4. LEARN IN PUBLIC / YOUTUBE ── */}
      <section id="videos" className="space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-medium text-zinc-100 mb-2">
              I Learn in Public
            </h2>
            <p className="text-zinc-400">
              Documenting what I learn, as I learn it.
            </p>
          </div>
          <Link
            to="/videos"
            className="hidden md:flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {featuredVideos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
        <Link
          to="/videos"
          className="md:hidden inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors group"
        >
          View All Videos{" "}
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* ── 5. ACHIEVEMENTS ── */}
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-zinc-100">Achievements</h2>
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className="p-5 rounded-2xl border border-zinc-800/50 bg-zinc-900/10"
              >
                <h3 className="font-medium text-zinc-100 mb-1">
                  {achievement.title}
                </h3>
                <p className="text-sm text-zinc-400">{achievement.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 6. TECH STACK ── */}
        <section className="space-y-8">
          <h2 className="text-2xl font-medium text-zinc-100">Tech Stack</h2>
          <div className="space-y-8">
            {Object.entries(techStack).map(([category, skills]) => (
              <div key={category} className="space-y-3">
                <h3 className="text-sm font-medium text-zinc-500 uppercase tracking-wider">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-sm text-zinc-300 font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ── 7. CONTACT ── */}
      <ContactSection />
    </div>
  );
}
