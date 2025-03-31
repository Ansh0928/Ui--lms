
import React, { useState } from 'react';
import CourseHeader from './CourseHeader';
import VideoPlayer from './VideoPlayer';
import CourseSidebar from './CourseSidebar';
import CourseTabs from './CourseTabs';
import DynamicCourseContent, { Section } from './DynamicCourseContent';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { ChevronLeft, ChevronRight, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ResizablePanelGroup, ResizablePanel } from '@/components/ui/resizable';
import { ScrollArea } from '@/components/ui/scroll-area';

const courseData = {
  name: "Amazon Web Services (AWS) - Zero to Hero",
  duration: "3 hours",
  lastUpdated: "July 2019",
  languages: ["English", "Arabic"],
  sections: [
    {
      id: 1,
      title: "Introduction",
      progress: "0 / 5",
      duration: "1hr 23min",
      lectures: [
        {
          id: 1,
          title: "Introduction",
          duration: "9min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 2,
          title: "Lab Session - Intro to Storage Services",
          duration: "22min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 3,
          title: "Lab Session - Intro to Database Services",
          duration: "18min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 4,
          title: "Lab Session - Intro to Compute and Networking Services",
          duration: "24min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 5,
          title: "Lab Session - Intro to Management Services",
          duration: "10min",
          isVideo: true,
          isCompleted: false
        }
      ]
    },
    {
      id: 2,
      title: "AWS EC2 Basics",
      progress: "0 / 5",
      duration: "45min",
      lectures: [
        {
          id: 1,
          title: "EC2 Overview",
          duration: "8min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 2,
          title: "Launching Your First EC2 Instance",
          duration: "12min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 3,
          title: "EC2 Instance Types",
          duration: "7min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 4,
          title: "Security Groups",
          duration: "10min",
          isVideo: true,
          isCompleted: false
        },
        {
          id: 5,
          title: "SSH Access to EC2",
          duration: "8min",
          isVideo: true,
          isCompleted: false
        }
      ]
    }
  ]
};

const CourseViewer: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeLecture, setActiveLecture] = useState<{ sectionId: number, lectureId: number }>({ 
    sectionId: 1, 
    lectureId: 1 
  });
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLectureClick = (sectionId: number, lectureId: number) => {
    setActiveLecture({ sectionId, lectureId });
    setShowMobileSidebar(false);
  };

  // Find the active lecture title
  const getActiveLectureTitle = () => {
    const section = courseData.sections.find(s => s.id === activeLecture.sectionId);
    if (!section) return "Introduction";
    
    const lecture = section.lectures.find(l => l.id === activeLecture.lectureId);
    if (!lecture) return "Introduction";
    
    return lecture.title;
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <CourseHeader 
        courseName={courseData.name} 
        toggleSidebar={toggleSidebar}
      />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar with toggle button */}
        <div className="hidden md:flex relative">
          <div className={`h-full transition-all duration-300 ${sidebarOpen ? 'w-[340px]' : 'w-0'} overflow-hidden`}>
            <CourseSidebar 
              sections={courseData.sections}
              isOpen={true}
              onLectureClick={handleLectureClick}
              activeLecture={activeLecture}
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={toggleSidebar}
            className="absolute top-4 -right-4 z-20 h-8 w-8 rounded-full border bg-background shadow-md"
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        {/* Mobile Sidebar */}
        <div className="md:hidden">
          <Sheet open={showMobileSidebar} onOpenChange={setShowMobileSidebar}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="fixed z-10 top-16 left-2" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-4/5">
              <CourseSidebar 
                sections={courseData.sections}
                isOpen={true}
                onLectureClick={handleLectureClick}
                activeLecture={activeLecture}
              />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main content area with scrollable region */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <VideoPlayer videoTitle={getActiveLectureTitle()} />
          
          <ScrollArea className="flex-1">
            <div className="p-4">
              <CourseTabs 
                courseDuration={courseData.duration}
                lastUpdated={courseData.lastUpdated}
                languages={courseData.languages}
                contentTab={
                  <DynamicCourseContent 
                    initialSections={courseData.sections} 
                    onLectureSelect={handleLectureClick}
                    activeLecture={activeLecture}
                  />
                }
              />
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default CourseViewer;
