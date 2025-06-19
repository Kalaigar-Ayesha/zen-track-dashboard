
import { useState, useEffect } from 'react';
import { CheckSquare, Clock, Target, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export const WelcomeSection = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userName] = useState('Alex'); // In a real app, this would come from user context

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const stats = [
    {
      title: 'Tasks Due Today',
      value: '3',
      icon: CheckSquare,
      color: 'text-blue-600 dark:text-blue-400',
      bgColor: 'bg-blue-100 dark:bg-blue-900/30',
      hoverColor: 'hover:shadow-blue-500/20',
    },
    {
      title: 'Time Tracked',
      value: '5.2h',
      icon: Clock,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
      hoverColor: 'hover:shadow-green-500/20',
    },
    {
      title: 'Habits Completed',
      value: '4/6',
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
      hoverColor: 'hover:shadow-purple-500/20',
    },
    {
      title: 'Focus Sessions',
      value: '2',
      icon: Calendar,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
      hoverColor: 'hover:shadow-orange-500/20',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2 animate-fade-in">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animate-scale-in">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          {currentTime.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.title}
              className={`bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer group ${stat.hoverColor} animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`w-6 h-6 ${stat.color} group-hover:animate-pulse`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 group-hover:scale-110 transition-transform duration-200">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors duration-200">
                    {stat.title}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
