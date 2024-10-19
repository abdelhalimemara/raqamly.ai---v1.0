import React from 'react';
import { Book, Image, Video, Users } from 'lucide-react';

const Studio: React.FC = () => {
  const services = [
    { id: 1, name: 'HUMAIN Model Library', icon: Book, description: 'Access our advanced AI models for various applications.' },
    { id: 2, name: 'Product Image Generator', icon: Image, description: 'Generate high-quality product images using AI.' },
    { id: 3, name: 'HUMAIN Video Generator', icon: Video, description: 'Create engaging videos with AI-powered technology.' },
    { id: 4, name: 'MY HUMAINS', icon: Users, description: 'Manage and customize your AI-powered virtual assistants.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Studio</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center mb-4">
              <service.icon size={32} className="text-highlight mr-4" />
              <h3 className="text-xl font-semibold">{service.name}</h3>
            </div>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <button className="w-full bg-highlight text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors">
              Explore
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Studio;