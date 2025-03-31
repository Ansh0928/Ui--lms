
import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Video, File } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

interface Lecture {
  id: number;
  title: string;
  duration: string;
  isVideo: boolean;
  isCompleted: boolean;
}

interface Section {
  id: number;
  title: string;
  lectures: Lecture[];
  duration: string;
  progress: string;
}

interface CourseSidebarProps {
  sections: Section[];
  isOpen: boolean;
  onLectureClick: (sectionId: number, lectureId: number) => void;
  activeLecture: { sectionId: number, lectureId: number } | null;
}

const CourseSidebar: React.FC<CourseSidebarProps> = ({ 
  sections, 
  isOpen, 
  onLectureClick,
  activeLecture 
}) => {
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <div className={`h-full bg-white border-r overflow-y-auto transition-all duration-300 ${isOpen ? 'sidebar-expanded' : 'sidebar-collapsed'}`}>
      <div className="p-4 border-b">
        <h2 className="font-bold text-lg">Course content</h2>
      </div>
      <div className="course-content">
        {sections.map((section) => (
          <div key={section.id} className="border-b">
            <div 
              className="p-4 cursor-pointer hover:bg-gray-50 flex justify-between items-center"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex flex-col">
                <h3 className="font-bold">Section {section.id}: {section.title}</h3>
                <div className="text-sm text-gray-500 mt-1">
                  {section.progress} • {section.duration}
                </div>
              </div>
              <div>
                {expandedSections.includes(section.id) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </div>
            
            {expandedSections.includes(section.id) && (
              <div className="bg-gray-50">
                {section.lectures.map((lecture) => (
                  <div 
                    key={lecture.id}
                    className={`content-section p-4 flex items-start cursor-pointer ${
                      activeLecture?.sectionId === section.id && activeLecture?.lectureId === lecture.id 
                        ? 'active' 
                        : ''
                    }`}
                    onClick={() => onLectureClick(section.id, lecture.id)}
                  >
                    <Checkbox 
                      id={`lecture-${section.id}-${lecture.id}`}
                      checked={lecture.isCompleted}
                      className="mr-3 mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-start">
                        {lecture.isVideo ? (
                          <Video className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                        ) : (
                          <File className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                        )}
                        <span className="text-sm">{lecture.id}. {lecture.title}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1 ml-6">
                        {lecture.duration}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
