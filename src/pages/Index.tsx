
import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { WelcomeSection } from '@/components/WelcomeSection';
import { TasksSection } from '@/components/TasksSection';
import { HabitsSection } from '@/components/HabitsSection';
import { FocusSection } from '@/components/FocusSection';
import { ProfileSection } from '@/components/ProfileSection';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('zentrack-theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    } else {
      setDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('zentrack-theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <WelcomeSection />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TasksSection compact />
              <HabitsSection compact />
            </div>
            <FocusSection compact />
          </div>
        );
      case 'tasks':
        return <TasksSection />;
      case 'habits':
        return <HabitsSection />;
      case 'focus':
        return <FocusSection />;
      case 'profile':
        return <ProfileSection />;
      default:
        return (
          <div className="space-y-8">
            <WelcomeSection />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TasksSection compact />
              <HabitsSection compact />
            </div>
            <FocusSection compact />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-purple-900 transition-all duration-500">
      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
      
      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-fade-in">
          {renderActiveSection()}
        </div>
      </main>
    </div>
  );
};

export default Index;
