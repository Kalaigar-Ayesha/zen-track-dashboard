
import { useState, useEffect } from 'react';
import { Plus, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface Habit {
  id: string;
  title: string;
  streak: number;
  completedToday: boolean;
  createdAt: Date;
}

interface HabitsSectionProps {
  compact?: boolean;
}

export const HabitsSection = ({ compact = false }: HabitsSectionProps) => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [newHabit, setNewHabit] = useState('');

  useEffect(() => {
    const savedHabits = localStorage.getItem('zentrack-habits');
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits).map((habit: any) => ({
        ...habit,
        createdAt: new Date(habit.createdAt),
      })));
    } else {
      // Sample habits
      const sampleHabits: Habit[] = [
        {
          id: '1',
          title: 'Morning meditation',
          streak: 7,
          completedToday: true,
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Read for 30 minutes',
          streak: 3,
          completedToday: false,
          createdAt: new Date(),
        },
        {
          id: '3',
          title: 'Drink 8 glasses of water',
          streak: 12,
          completedToday: true,
          createdAt: new Date(),
        },
        {
          id: '4',
          title: 'Exercise',
          streak: 5,
          completedToday: false,
          createdAt: new Date(),
        },
      ];
      setHabits(sampleHabits);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('zentrack-habits', JSON.stringify(habits));
  }, [habits]);

  const addHabit = () => {
    if (newHabit.trim()) {
      const habit: Habit = {
        id: Date.now().toString(),
        title: newHabit.trim(),
        streak: 0,
        completedToday: false,
        createdAt: new Date(),
      };
      setHabits([habit, ...habits]);
      setNewHabit('');
    }
  };

  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === id) {
        const newCompleted = !habit.completedToday;
        return {
          ...habit,
          completedToday: newCompleted,
          streak: newCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
        };
      }
      return habit;
    }));
  };

  const displayHabits = compact ? habits.slice(0, 4) : habits;
  const completedCount = habits.filter(h => h.completedToday).length;
  const totalCount = habits.length;
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-500 animate-fade-in">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 animate-fade-in">
          Habits
        </CardTitle>
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Today's Progress</span>
            <span className="font-semibold text-purple-600 dark:text-purple-400">{completedCount}/{totalCount}</span>
          </div>
          <div className="relative overflow-hidden rounded-full">
            <Progress value={completionRate} className="h-2 transition-all duration-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-30 rounded-full transition-all duration-500" 
                 style={{ width: `${completionRate}%` }} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Habit Input */}
        {!compact && (
          <div className="flex space-x-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <Input
              placeholder="Add a new habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              className="flex-1 focus:scale-[1.02] transition-all duration-200 focus:shadow-lg"
            />
            <Button 
              onClick={addHabit} 
              size="sm" 
              className="bg-purple-600 hover:bg-purple-700 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
            >
              <Plus className="w-4 h-4 hover:rotate-180 transition-transform duration-300" />
            </Button>
          </div>
        )}

        {/* Habits List */}
        <div className="space-y-3">
          {displayHabits.map((habit, index) => (
            <div
              key={habit.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in group"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 ${
                  habit.completedToday
                    ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30 animate-pulse'
                    : 'border-slate-300 dark:border-slate-500 hover:border-green-400 hover:shadow-lg'
                }`}
              >
                {habit.completedToday && <Check className="w-4 h-4 text-white animate-scale-in" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate transition-all duration-300 ${
                  habit.completedToday
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-600 dark:text-slate-300 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                }`}>
                  {habit.title}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-200">
                    {habit.streak} day streak
                  </p>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(habit.streak, 7) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-400 rounded-full animate-scale-in hover:scale-150 transition-all duration-300"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {displayHabits.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 animate-fade-in">
              <div className="animate-pulse">
                No habits yet. Add one to get started!
              </div>
            </div>
          )}
        </div>
        
        {compact && habits.length > 4 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center animate-fade-in hover:text-purple-600 transition-colors duration-200">
            +{habits.length - 4} more habits
          </p>
        )}
      </CardContent>
    </Card>
  );
};
