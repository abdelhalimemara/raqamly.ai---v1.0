import React, { useState } from 'react';
import {
  Menu,
  X,
  Home,
  Palette,
  Package,
  Megaphone,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';
import Logo from '../assets/images/Logo.svg';
import { User } from '../utils/auth';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  user: User | null;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout, user }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'studio', icon: Palette, label: 'Studio' },
    { id: 'products', icon: Package, label: 'Products' },
    { id: 'campaigns', icon: Megaphone, label: 'Campaigns' },
    { id: 'notifications', icon: Bell, label: 'Notifications' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside
      className={`bg-white text-black border-r border-gray-200 transition-all duration-300 flex flex-col ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between p-4">
        {!isCollapsed && (
          <img src={Logo} alt="Raqamly.ai Logo" className="h-8" />
        )}
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>
      <nav className="flex-grow mt-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center p-4 hover:bg-gray-100 ${
              activeTab === item.id ? 'bg-highlight text-black' : ''
            }`}
          >
            <item.icon size={24} />
            {!isCollapsed && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
      </nav>
      <div
        className={`mt-auto p-4 border-t border-gray-200 flex items-center ${
          isCollapsed ? 'justify-center' : 'justify-between'
        }`}
      >
        <div className="flex items-center">
          <img
            src={user?.profilePicture || "https://source.unsplash.com/100x100/?portrait"}
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover"
          />
          {!isCollapsed && (
            <div className="ml-3">
              <p className="font-semibold text-sm">{user?.name || 'User'}</p>
              <p className="text-xs text-gray-500">{user?.subscriptionPlan || 'Free'} Plan</p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button onClick={onLogout} className="p-2 rounded-full hover:bg-gray-100">
            <LogOut size={20} />
          </button>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;