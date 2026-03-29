import { Play } from "lucide-react";

interface VideoCardProps {
  key?: string | number;
  video: {
    id: string;
    title: string;
    youtubeId: string;
    duration: string;
  };
}

export function VideoCard({ video }: VideoCardProps) {
  const thumbnailUrl = `https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`;
  const videoUrl = `https://youtube.com/watch?v=${video.youtubeId}`;

  return (
    <a
      href={videoUrl}
      target="_blank"
      rel="noreferrer"
      className="group flex flex-col rounded-2xl overflow-hidden border border-zinc-800/50 bg-zinc-900/20 hover:border-zinc-700/50 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-zinc-950/40 transition-colors flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-zinc-900/80 backdrop-blur-sm flex items-center justify-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
            <Play className="w-5 h-5 text-zinc-100 fill-zinc-100 ml-1" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-zinc-950/80 backdrop-blur-sm text-xs font-mono text-zinc-300">
          {video.duration}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-zinc-100 group-hover:text-blue-400 transition-colors line-clamp-2">
          {video.title}
        </h3>
      </div>
    </a>
  );
}
