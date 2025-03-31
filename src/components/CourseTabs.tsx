import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Globe } from 'lucide-react';

interface CourseTabsProps {
  courseDuration: string;
  lastUpdated: string;
  languages: string[];
  contentTab?: React.ReactNode;
}

const CourseTabs: React.FC<CourseTabsProps> = ({ 
  courseDuration, 
  lastUpdated, 
  languages,
  contentTab
}) => {
  return (
    <div className="border-t">
      <Tabs defaultValue="overview" className="w-full">
        <div className="border-b">
          <TabsList className="h-auto bg-transparent p-0">
            <TabsTrigger 
              value="content" 
              className="px-6 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:shadow-none"
            >
              Course content
            </TabsTrigger>
            <TabsTrigger 
              value="overview" 
              className="px-6 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:shadow-none"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="notes" 
              className="px-6 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:shadow-none"
            >
              Notes
            </TabsTrigger>
            <TabsTrigger 
              value="announcements" 
              className="px-6 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:shadow-none"
            >
              Announcements
            </TabsTrigger>
            <TabsTrigger 
              value="reviews" 
              className="px-6 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:shadow-none"
            >
              Reviews
            </TabsTrigger>
            <TabsTrigger 
              value="tools" 
              className="px-6 py-4 rounded-none data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-purple-700 data-[state=active]:shadow-none"
            >
              Learning tools
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="content" className="p-0">
          {contentTab || (
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-4">Course Content</h3>
              <p>This content is also available in the sidebar.</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="overview" className="p-6">
          <h2 className="text-3xl font-bold mb-8">
            Beginners, Zero to Hero. AWS EC2 web server, NodeJS Server, AWS RDS database server, S3, SES & CloudWatch. FREE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="text-xl font-bold">4.5 ⭐</div>
              <div className="text-sm text-gray-600">9,022 ratings</div>
            </div>
            <div>
              <div className="text-xl font-bold">417,662</div>
              <div className="text-sm text-gray-600">Students</div>
            </div>
            <div>
              <div className="text-xl font-bold">{courseDuration}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
          </div>
          
          <div className="mb-8">
            <div className="flex items-center mb-2">
              <span className="inline-block mr-2">⏱️</span>
              <span>Last updated {lastUpdated}</span>
            </div>
            
            <div className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              <span className="font-medium mr-2">Languages:</span>
              <span>{languages.join(', ')}</span>
              {languages.length > 2 && (
                <a href="#" className="text-purple-700 ml-2 hover:underline">
                  23 more
                </a>
              )}
            </div>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">What you'll learn</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Deploy EC2 instances and configure security groups</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Set up RDS databases and connect them to applications</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Configure S3 buckets for file storage and distribution</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Implement monitoring and logging with CloudWatch</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Deploy full stack applications on AWS</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✓</span>
                <span>Set up basic cloud architecture for web applications</span>
              </li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-bold mb-4">Course Description</h3>
            <p className="mb-4">
              This AWS course is designed for absolute beginners who want to learn how to deploy and manage web applications in the AWS cloud environment. From setting up your first EC2 instance to configuring complex database systems with RDS, this course covers all the fundamentals you need to get started with AWS.
            </p>
            <p>
              By the end of this course, you'll be able to deploy full-stack applications on AWS, set up proper security configurations, implement storage solutions with S3, and monitor your applications with CloudWatch.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="notes" className="p-6">
          <h3 className="text-2xl font-bold mb-4">Notes</h3>
          <p>You haven't taken any notes yet.</p>
        </TabsContent>

        <TabsContent value="announcements" className="p-6">
          <h3 className="text-2xl font-bold mb-4">Announcements</h3>
          <p>No announcements at this time.</p>
        </TabsContent>

        <TabsContent value="reviews" className="p-6">
          <h3 className="text-2xl font-bold mb-4">Reviews</h3>
          <p>Course reviews will appear here.</p>
        </TabsContent>

        <TabsContent value="tools" className="p-6">
          <h3 className="text-2xl font-bold mb-4">Learning Tools</h3>
          <p>Additional learning resources and tools will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CourseTabs;
