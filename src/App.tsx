import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Studio from './components/Studio';
import Products from './components/Products';
import Campaigns from './components/Campaigns';
import Notifications from './components/Notifications';
import Settings from './components/Settings';
import AuthForms from './components/AuthForms';
import { User, getCurrentUser, logout } from './utils/auth';
import { ProductProvider } from './contexts/ProductContext';
import { supabase } from './lib/supabaseClient';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    checkUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const user = await getCurrentUser();
        setUser(user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleAuthSuccess = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'studio':
        return <Studio />;
      case 'products':
        return <Products />;
      case 'campaigns':
        return <Campaigns />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings user={user} onUpdateUser={setUser} />;
      default:
        return <Dashboard />;
    }
  };

  if (!user) {
    return <AuthForms onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <ProductProvider>
      <div className="flex h-screen bg-white text-black font-eina">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} user={user} />
        <main className="flex-1 overflow-y-auto p-8">
          {renderContent()}
        </main>
      </div>
    </ProductProvider>
  );
}

export default App;