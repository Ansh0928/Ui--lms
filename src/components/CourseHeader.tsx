
import React from 'react';
import { Menu, Share, MoreVertical, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CourseHeaderProps {
  courseName: string;
  toggleSidebar: () => void;
}

const CourseHeader: React.FC<CourseHeaderProps> = ({ courseName, toggleSidebar }) => {
  return (
    <header className="bg-[#1c1d1f] text-white h-[60px] px-4 flex items-center justify-between w-full">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white mr-2 md:hidden"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="hidden md:flex items-center mr-4">
          <Button variant="ghost" size="icon" className="text-white">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </div>
        <h1 className="text-xl font-medium truncate max-w-[600px]">{courseName}</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex items-center bg-gray-700 rounded-full px-4 py-1.5">
          <span className="text-sm font-medium">Your progress</span>
          <span className="ml-1 text-sm">▼</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white">
          <Share className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="text-white">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
};

export default CourseHeader;
