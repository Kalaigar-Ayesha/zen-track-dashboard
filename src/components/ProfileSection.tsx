
import { useState } from 'react';
import { User, Settings, Bell, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export const ProfileSection = () => {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(false);
  
  const stats = [
    { label: 'Tasks Completed', value: '127' },
    { label: 'Total Focus Time', value: '45.2h' },
    { label: 'Habit Streak', value: '12 days' },
    { label: 'Productivity Score', value: '89%' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="" alt="Profile" />
              <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                A
              </AvatarFallback>
            </Avatar>
            
            <div className="text-center md:text-left flex-1">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-2">
                Alex Johnson
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Productivity enthusiast • Joined March 2024
              </p>
              <Button variant="outline" className="mb-4">
                <Settings className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card
            key={stat.label}
            className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-lg transition-all duration-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {stat.label}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Settings */}
      <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center space-x-2">
            <Settings className="w-5 h-5" />
            <span>Preferences</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <div>
                <Label htmlFor="notifications" className="text-sm font-medium">
                  Push Notifications
                </Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Get notified about task reminders and focus sessions
                </p>
              </div>
            </div>
            <Switch
              id="notifications"
              checked={notifications}
              onCheckedChange={setNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <div>
                <Label htmlFor="sounds" className="text-sm font-medium">
                  Sound Effects
                </Label>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Play sounds for timer and task completion
                </p>
              </div>
            </div>
            <Switch
              id="sounds"
              checked={sounds}
              onCheckedChange={setSounds}
            />
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
            <h4 className="text-sm font-medium text-slate-800 dark:text-slate-100 mb-3">
              Data & Privacy
            </h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start text-sm">
                Export My Data
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start text-sm text-red-600 hover:text-red-700">
                Delete Account
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
