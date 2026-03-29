import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { videos } from "../content/videos";
import { VideoCard } from "../components/VideoCard";

export default function Videos() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="space-y-6">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div>
          <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-zinc-100 mb-4">I Learn in Public</h1>
          <p className="text-lg text-zinc-400 max-w-2xl">
            Video documentation of my learning process, system design breakdowns, and deep dives.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}
