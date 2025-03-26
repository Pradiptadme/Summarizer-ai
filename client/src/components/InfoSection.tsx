import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const InfoSection: React.FC = () => {
  return (
    <section id="how-it-works" className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="bg-white rounded-lg shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <span className="material-icons text-primary text-3xl">speed</span>
            <h3 className="ml-3 text-lg font-semibold">Fast Results</h3>
          </div>
          <p className="text-gray-600">
            Get concise summaries in seconds, saving you valuable time while retaining the key information.
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-lg shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <span className="material-icons text-primary text-3xl">psychology</span>
            <h3 className="ml-3 text-lg font-semibold">AI-Powered</h3>
          </div>
          <p className="text-gray-600">
            Advanced natural language processing algorithms extract meaningful insights from videos and text.
          </p>
        </CardContent>
      </Card>
      
      <Card className="bg-white rounded-lg shadow-sm border border-gray-100">
        <CardContent className="p-6">
          <div className="flex items-center mb-4">
            <span className="material-icons text-primary text-3xl">devices</span>
            <h3 className="ml-3 text-lg font-semibold">Works Everywhere</h3>
          </div>
          <p className="text-gray-600">
            Responsive design means you can use our tool on any device, from desktop to mobile.
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default InfoSection;
