
import React from 'react';
import { Play } from 'lucide-react';

interface VideoPlayerProps {
  videoTitle: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoTitle }) => {
  return (
    <div className="w-full bg-black z-10">
      <div className="video-player-container flex items-center justify-center">
        <div className="flex flex-col items-center">
          <button className="bg-white rounded-full p-5 shadow-lg hover:bg-gray-100 transition duration-200">
            <Play className="h-8 w-8 text-gray-800 ml-1" />
          </button>
          <p className="text-white mt-4 text-lg font-medium">{videoTitle}</p>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
