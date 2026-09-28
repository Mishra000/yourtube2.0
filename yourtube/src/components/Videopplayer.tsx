import { useRef } from "react";
import { getVideoUrl } from "@/lib/axiosinstance";

interface VideoPlayerProps {
  video: {
    _id: string;
    videotitle?: string;
    filepath?: string;
    filetype?: string;
  };
}

export default function VideoPlayer({ video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = getVideoUrl(video?.filepath);

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          playsInline
        >
          <source src={videoSrc} type={video?.filetype || "video/mp4"} />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="text-white text-sm">Video source unavailable</div>
      )}
    </div>
  );
}
