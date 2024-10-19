import React, { useState } from 'react';
import { User, Lock, Bell, Globe } from 'lucide-react';
import { User as UserType, updateUser } from '../utils/auth';

interface SettingsProps {
  user: UserType | null;
  onUpdateUser: (updatedUser: UserType) => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [settings, setSettings] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    businessName: user?.businessName || '',
    language: 'English',
    notifications: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = event.target;
    setSettings({
      ...settings,
      [name]: type === 'checkbox' ? (event.target as HTMLInputElement).checked : value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (user) {
      try {
        const updatedUserData: Partial<UserType> = {
          id: user.id,
          name: settings.fullName,
          businessName: settings.businessName,
        };

        const response = await updateUser(updatedUserData);
        if (response.success && response.user) {
          onUpdateUser(response.user);
          alert('Settings updated successfully');
        } else {
          setError(response.message);
        }
      } catch (err: any) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">Settings</h2>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <User size={24} className="mr-2 text-highlight" />
            Profile Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={settings.fullName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={settings.email}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">Business Name</label>
              <input
                type="text"
                id="businessName"
                name="businessName"
                value={settings.businessName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-highlight"
              />
            </div>
            <div>
              <label htmlFor="subscriptionPlan" className="block text-sm font-medium text-gray-700 mb-2">Subscription Plan</label>
              <input
                type="text"
                id="subscriptionPlan"
                name="subscriptionPlan"
                value={user?.subscriptionPlan || ''}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
              />
            </div>
          </div>
        </div>
        {/* Other sections (Security, Notifications, Language) remain unchanged */}
        <button 
          type="submit" 
          className="bg-highlight text-black font-semibold py-2 px-4 rounded hover:bg-opacity-80 transition-colors disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default Settings;