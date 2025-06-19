
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
    },
    {
      title: 'Time Tracked',
      value: '5.2h',
      icon: Clock,
      color: 'text-green-600 dark:text-green-400',
      bgColor: 'bg-green-100 dark:bg-green-900/30',
    },
    {
      title: 'Habits Completed',
      value: '4/6',
      icon: Target,
      color: 'text-purple-600 dark:text-purple-400',
      bgColor: 'bg-purple-100 dark:bg-purple-900/30',
    },
    {
      title: 'Focus Sessions',
      value: '2',
      icon: Calendar,
      color: 'text-orange-600 dark:text-orange-400',
      bgColor: 'bg-orange-100 dark:bg-orange-900/30',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-slate-100">
          {getGreeting()}, {userName}!
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
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
              className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-4 text-center space-y-2">
                <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="space-y-1">
                  <p className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
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
