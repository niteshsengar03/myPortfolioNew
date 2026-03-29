import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { writings } from "../content/writings";
import { WritingCard } from "../components/WritingCard";
import { cn } from "../lib/utils";

export default function Writing() {
  const [filter, setFilter] = useState<"all" | "blog" | "learning">("all");

  const filteredWritings = [...writings]
    .filter((w) => {
      if (filter === "all") return true;
      return w.type === filter;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-100 mb-4">Writing & Learning</h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Documenting my journey, technical deep dives, and notes on systems engineering.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-zinc-800/50 pb-4">
        {(["all", "blog", "learning"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors capitalize",
              filter === f
                ? "bg-zinc-100 text-zinc-950"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
            )}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredWritings.map((writing) => (
          <WritingCard key={writing.id} writing={writing} />
        ))}
      </div>

      {filteredWritings.length === 0 && (
        <div className="py-24 text-center text-zinc-500">
          No entries found for this category.
        </div>
      )}
    </div>
  );
}
