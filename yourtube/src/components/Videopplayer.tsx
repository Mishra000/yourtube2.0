"use client";

import { useRef, useEffect } from "react";

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
  const rawPath = video?.filepath ? video.filepath.replace(/\\/g, "/") : "";
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
  const videoSrc = rawPath ? `${backendUrl}/${rawPath}` : "";

  return (
    <div className="aspect-video bg-black rounded-xl overflow-hidden flex items-center justify-center">
      {videoSrc ? (
        <video
          ref={videoRef}
          className="w-full h-full"
          controls
          autoPlay
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
