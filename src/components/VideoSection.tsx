
import React from 'react';

interface VideoSectionProps {
  videoSrc: string;
  title: string;
  description: string;
}

const VideoSection: React.FC<VideoSectionProps> = ({
  videoSrc,
  title,
  description,
}) => {
  return (
    <div className="relative w-full">
      {/* Video Section */}
      <div className="w-full bg-black">
        <video 
          className="w-full h-[400px] object-cover" 
          autoPlay 
          loop 
          muted 
          playsInline
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Content Section */}
      <div className="p-8 bg-white">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-4 text-gray-700">{description}</p>
      </div>
    </div>
  );
};

export default VideoSection;
