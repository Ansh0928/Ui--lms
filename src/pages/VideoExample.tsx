
import React from 'react';
import VideoSection from '@/components/VideoSection';

const VideoExample: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <VideoSection
        videoSrc="https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_1mb.mp4"
        title="Learn Web Development"
        description="This comprehensive course covers everything from HTML basics to advanced React concepts. Follow along as we build real-world projects and master modern web development techniques. Our expert instructors will guide you through each step with clear explanations and practical examples."
      />
      
      {/* Additional content to demonstrate scrolling */}
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="bg-gray-100 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Section {index + 1}</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam 
              auctor, nisl eget ultricies aliquam, nunc nisl aliquam nunc,
              vitae aliquam nisl nunc vitae nisl. Nullam auctor, nisl eget
              ultricies aliquam, nunc nisl aliquam nunc, vitae aliquam nisl
              nunc vitae nisl.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoExample;
