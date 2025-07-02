import type { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
  onPlay?: (id: number) => void;
}

export default function VideoCard({ video, onPlay }: VideoCardProps) {
  return (
    <div 
      className="relative group cursor-pointer"
      onClick={() => onPlay?.(video.id)}
    >
      <img 
        src={video.thumbnailUrl}
        alt={video.title}
        className="w-full h-56 object-cover rounded-xl"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40 rounded-xl flex items-center justify-center group-hover:bg-opacity-60 transition-all duration-300">
        <div className="bg-club-gold rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <i className="fas fa-play text-club-black text-xl"></i>
        </div>
      </div>
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-semibold text-lg mb-1">
          {video.title}
        </h3>
        <p className="text-gray-200 text-sm">
          {video.description}
        </p>
      </div>
    </div>
  );
}
