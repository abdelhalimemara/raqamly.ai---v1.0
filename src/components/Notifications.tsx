import React from 'react';
import { Bell, MessageSquare, UserPlus, AlertTriangle } from 'lucide-react';

const Notifications: React.FC = () => {
  const notifications = [
    { id: 1, type: 'message', content: 'New message from John Doe', time: '5 minutes ago' },
    { id: 2, type: 'user', content: 'New user registered: Jane Smith', time: '1 hour ago' },
    { id: 3, type: 'alert', content: 'Campaign "Summer Sale" has ended', time: '3 hours ago' },
    { id: 4, type: 'message', content: 'New comment on your recent post', time: '1 day ago' },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare size={20} className="text-blue-500" />;
      case 'user':
        return <UserPlus size={20} className="text-green-500" />;
      case 'alert':
        return <AlertTriangle size={20} className="text-yellow-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Notifications</h2>
      <div className="bg-white rounded-lg shadow-md">
        {notifications.map((notification) => (
          <div key={notification.id} className="flex items-start p-4 border-b border-gray-200 last:border-b-0">
            <div className="flex-shrink-0 mr-4">
              {getIcon(notification.type)}
            </div>
            <div className="flex-grow">
              <p className="text-sm font-medium text-gray-900">{notification.content}</p>
              <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;