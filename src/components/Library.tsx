import React from 'react';
import { Book } from 'lucide-react';

const Library: React.FC = () => {
  const aiModels = [
    { id: 1, name: 'Text Generation', description: 'Generate human-like text for various applications.' },
    { id: 2, name: 'Image Recognition', description: 'Identify objects and scenes in images.' },
    { id: 3, name: 'Sentiment Analysis', description: 'Analyze the sentiment of text data.' },
    { id: 4, name: 'Chatbot', description: 'Create conversational AI for customer support.' },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">AI Model Library</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {aiModels.map((model) => (
          <div key={model.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Book size={24} className="text-highlight mr-2" />
              <h3 className="text-xl font-semibold">{model.name}</h3>
            </div>
            <p className="text-gray-600">{model.description}</p>
            <button className="mt-4 bg-highlight text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors">
              Use Model
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;