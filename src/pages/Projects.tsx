import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { projects } from "../content/projects";
import { ProjectCard } from "../components/ProjectCard";

export default function Projects({ category }: { category: "capstone" | "mini" }) {
  const filteredProjects = projects
    .filter((p) => p.category === category)
    .sort((a, b) => a.priority - b.priority);

  const title = category === "capstone" ? "Capstone Projects" : "Mini Projects";
  const description = category === "capstone" 
    ? "Deep dives into distributed systems, architecture, and complex problem solving."
    : "Focused implementations of specific concepts, algorithms, and tools.";

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-100 mb-4">{title}</h1>
          <p className="text-lg text-zinc-400 max-w-2xl">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      
      {filteredProjects.length === 0 && (
        <div className="py-24 text-center text-zinc-500">
          No projects found in this category.
        </div>
      )}
    </div>
  );
}
