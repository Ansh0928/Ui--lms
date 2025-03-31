
import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  Video, 
  File, 
  Plus, 
  X,
  Edit,
  Save
} from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Collapsible, 
  CollapsibleTrigger, 
  CollapsibleContent 
} from '@/components/ui/collapsible';
import { toast } from 'sonner';

export interface Lecture {
  id: number;
  title: string;
  duration: string;
  isVideo: boolean;
  isCompleted: boolean;
}

export interface Section {
  id: number;
  title: string;
  lectures: Lecture[];
  duration: string;
  progress: string;
}

interface DynamicCourseContentProps {
  initialSections: Section[];
  onLectureSelect: (sectionId: number, lectureId: number) => void;
  activeLecture: { sectionId: number, lectureId: number } | null;
}

const DynamicCourseContent: React.FC<DynamicCourseContentProps> = ({ 
  initialSections, 
  onLectureSelect,
  activeLecture 
}) => {
  const [sections, setSections] = useState<Section[]>(initialSections);
  const [expandedSections, setExpandedSections] = useState<number[]>([1]);
  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [editingSectionTitle, setEditingSectionTitle] = useState('');
  const [isAddingLecture, setIsAddingLecture] = useState<number | null>(null);
  const [newLectureData, setNewLectureData] = useState({
    title: '',
    duration: '',
    isVideo: true
  });

  const toggleSection = (sectionId: number) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleAddSection = () => {
    if (newSectionTitle.trim() === '') {
      toast.error('Section title cannot be empty');
      return;
    }

    const newSection: Section = {
      id: Math.max(0, ...sections.map(s => s.id)) + 1,
      title: newSectionTitle,
      lectures: [],
      duration: '0min',
      progress: '0 / 0'
    };

    setSections([...sections, newSection]);
    setExpandedSections([...expandedSections, newSection.id]);
    setNewSectionTitle('');
    setIsAddingSection(false);
    toast.success('New section added');
  };

  const startEditingSection = (section: Section) => {
    setEditingSectionId(section.id);
    setEditingSectionTitle(section.title);
  };

  const saveEditedSection = (sectionId: number) => {
    if (editingSectionTitle.trim() === '') {
      toast.error('Section title cannot be empty');
      return;
    }

    setSections(sections.map(section => 
      section.id === sectionId 
        ? { ...section, title: editingSectionTitle } 
        : section
    ));
    setEditingSectionId(null);
    toast.success('Section updated');
  };

  const deleteSection = (sectionId: number) => {
    setSections(sections.filter(section => section.id !== sectionId));
    setExpandedSections(expandedSections.filter(id => id !== sectionId));
    toast.success('Section deleted');
  };

  const startAddingLecture = (sectionId: number) => {
    setIsAddingLecture(sectionId);
    setNewLectureData({
      title: '',
      duration: '',
      isVideo: true
    });
  };

  const handleAddLecture = (sectionId: number) => {
    if (newLectureData.title.trim() === '') {
      toast.error('Lecture title cannot be empty');
      return;
    }

    if (newLectureData.duration.trim() === '') {
      toast.error('Lecture duration cannot be empty');
      return;
    }

    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const newLectures = [...sections[sectionIndex].lectures];
    
    const newLecture: Lecture = {
      id: newLectures.length > 0 
        ? Math.max(...newLectures.map(l => l.id)) + 1 
        : 1,
      title: newLectureData.title,
      duration: newLectureData.duration,
      isVideo: newLectureData.isVideo,
      isCompleted: false
    };

    newLectures.push(newLecture);
    
    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      lectures: newLectures,
      progress: `0 / ${newLectures.length}`,
      duration: calculateTotalDuration(newLectures)
    };
    
    setSections(updatedSections);
    setIsAddingLecture(null);
    toast.success('New lecture added');
  };

  const deleteLecture = (sectionId: number, lectureId: number) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const updatedLectures = sections[sectionIndex].lectures.filter(
      lecture => lecture.id !== lectureId
    );

    const updatedSections = [...sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      lectures: updatedLectures,
      progress: `0 / ${updatedLectures.length}`,
      duration: calculateTotalDuration(updatedLectures)
    };

    setSections(updatedSections);
    toast.success('Lecture deleted');
  };

  const toggleLectureCompletion = (sectionId: number, lectureId: number) => {
    const sectionIndex = sections.findIndex(s => s.id === sectionId);
    if (sectionIndex === -1) return;

    const updatedSections = [...sections];
    const lectureIndex = updatedSections[sectionIndex].lectures.findIndex(l => l.id === lectureId);
    
    if (lectureIndex !== -1) {
      updatedSections[sectionIndex].lectures[lectureIndex].isCompleted = 
        !updatedSections[sectionIndex].lectures[lectureIndex].isCompleted;
      
      const completedCount = updatedSections[sectionIndex].lectures.filter(l => l.isCompleted).length;
      updatedSections[sectionIndex].progress = `${completedCount} / ${updatedSections[sectionIndex].lectures.length}`;
      
      setSections(updatedSections);
    }
  };

  // Helper function to calculate total duration from lectures
  const calculateTotalDuration = (lectures: Lecture[]): string => {
    let totalMinutes = 0;

    lectures.forEach(lecture => {
      const durationString = lecture.duration;
      const match = durationString.match(/(\d+)min/);
      if (match && match[1]) {
        totalMinutes += parseInt(match[1], 10);
      }
    });

    if (totalMinutes >= 60) {
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      return `${hours}hr ${minutes > 0 ? `${minutes}min` : ''}`;
    }
    
    return `${totalMinutes}min`;
  };

  return (
    <div className="course-content">
      {sections.map((section) => (
        <Collapsible
          key={section.id}
          open={expandedSections.includes(section.id)}
          onOpenChange={() => toggleSection(section.id)}
          className="border-b animate-accordion-down"
        >
          <div className="flex justify-between items-center p-4 hover:bg-gray-50">
            <CollapsibleTrigger className="flex-1 flex justify-between items-center">
              <div className="flex flex-col">
                {editingSectionId === section.id ? (
                  <Input
                    value={editingSectionTitle}
                    onChange={(e) => setEditingSectionTitle(e.target.value)}
                    className="font-bold"
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <h3 className="font-bold">Section {section.id}: {section.title}</h3>
                )}
                <div className="text-sm text-gray-500 mt-1">
                  {section.progress} • {section.duration}
                </div>
              </div>
              {expandedSections.includes(section.id) ? (
                <ChevronUp className="h-5 w-5 text-gray-500" />
              ) : (
                <ChevronDown className="h-5 w-5 text-gray-500" />
              )}
            </CollapsibleTrigger>
            
            <div className="flex ml-4 space-x-2" onClick={(e) => e.stopPropagation()}>
              {editingSectionId === section.id ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => saveEditedSection(section.id)}
                >
                  <Save className="h-4 w-4" />
                </Button>
              ) : (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => startEditingSection(section)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
              )}
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => deleteSection(section.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <CollapsibleContent className="bg-gray-50 animate-accordion-down">
            {section.lectures.map((lecture) => (
              <div 
                key={lecture.id}
                className={`content-section p-4 flex items-start cursor-pointer ${
                  activeLecture?.sectionId === section.id && activeLecture?.lectureId === lecture.id 
                    ? 'active' 
                    : ''
                }`}
              >
                <Checkbox 
                  id={`lecture-${section.id}-${lecture.id}`}
                  checked={lecture.isCompleted}
                  className="mr-3 mt-1"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLectureCompletion(section.id, lecture.id);
                  }}
                />
                <div 
                  className="flex-1"
                  onClick={() => onLectureSelect(section.id, lecture.id)}
                >
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
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteLecture(section.id, lecture.id);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            
            {isAddingLecture === section.id ? (
              <div className="p-4 bg-gray-100 animate-fade-in">
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <Input
                    value={newLectureData.title}
                    onChange={(e) => setNewLectureData({...newLectureData, title: e.target.value})}
                    placeholder="Enter lecture title"
                  />
                </div>
                <div className="mb-3">
                  <label className="block text-sm font-medium mb-1">Duration</label>
                  <Input
                    value={newLectureData.duration}
                    onChange={(e) => setNewLectureData({...newLectureData, duration: e.target.value})}
                    placeholder="e.g. 10min"
                  />
                </div>
                <div className="mb-3 flex items-center">
                  <label className="block text-sm font-medium mr-4">Type</label>
                  <div className="flex space-x-4">
                    <div 
                      className={`flex items-center cursor-pointer ${newLectureData.isVideo ? 'text-purple-700' : 'text-gray-500'}`}
                      onClick={() => setNewLectureData({...newLectureData, isVideo: true})}
                    >
                      <Video className="h-4 w-4 mr-1" />
                      <span>Video</span>
                    </div>
                    <div 
                      className={`flex items-center cursor-pointer ${!newLectureData.isVideo ? 'text-purple-700' : 'text-gray-500'}`}
                      onClick={() => setNewLectureData({...newLectureData, isVideo: false})}
                    >
                      <File className="h-4 w-4 mr-1" />
                      <span>Document</span>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setIsAddingLecture(null)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    size="sm"
                    onClick={() => handleAddLecture(section.id)}
                  >
                    Add Lecture
                  </Button>
                </div>
              </div>
            ) : (
              <div className="p-4 flex justify-center">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full bg-white"
                  onClick={() => startAddingLecture(section.id)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add new lecture
                </Button>
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>
      ))}
      
      {isAddingSection ? (
        <div className="p-4 border-b animate-fade-in">
          <Input
            value={newSectionTitle}
            onChange={(e) => setNewSectionTitle(e.target.value)}
            placeholder="Enter section title"
            className="mb-3"
          />
          <div className="flex justify-end space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAddingSection(false)}
            >
              Cancel
            </Button>
            <Button 
              size="sm"
              onClick={handleAddSection}
            >
              Add Section
            </Button>
          </div>
        </div>
      ) : (
        <div className="p-4 flex justify-center">
          <Button 
            variant="outline" 
            className="w-full bg-white" 
            onClick={() => setIsAddingSection(true)}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add new section
          </Button>
        </div>
      )}
    </div>
  );
};

export default DynamicCourseContent;
