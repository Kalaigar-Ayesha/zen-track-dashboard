
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
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Habits
        </CardTitle>
        <div className="space-y-2">
          <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
            <span>Today's Progress</span>
            <span>{completedCount}/{totalCount}</span>
          </div>
          <Progress value={completionRate} className="h-2" />
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Habit Input */}
        {!compact && (
          <div className="flex space-x-2">
            <Input
              placeholder="Add a new habit..."
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
              className="flex-1"
            />
            <Button onClick={addHabit} size="sm" className="bg-purple-600 hover:bg-purple-700">
              <Plus className="w-4 h-4" />
            </Button>
          </div>
        )}

        {/* Habits List */}
        <div className="space-y-3">
          {displayHabits.map((habit, index) => (
            <div
              key={habit.id}
              className="flex items-center space-x-3 p-3 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 transition-all duration-200 hover:shadow-sm"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleHabit(habit.id)}
                className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                  habit.completedToday
                    ? 'bg-green-500 border-green-500 scale-110'
                    : 'border-slate-300 dark:border-slate-500 hover:border-green-400'
                }`}
              >
                {habit.completedToday && <Check className="w-4 h-4 text-white" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate ${
                  habit.completedToday
                    ? 'text-slate-800 dark:text-slate-200'
                    : 'text-slate-600 dark:text-slate-300'
                }`}>
                  {habit.title}
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className="text-right">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {habit.streak} day streak
                  </p>
                </div>
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(habit.streak, 7) }).map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-green-400 rounded-full"
                      style={{ animationDelay: `${i * 100}ms` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {displayHabits.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              No habits yet. Add one to get started!
            </div>
          )}
        </div>
        
        {compact && habits.length > 4 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
            +{habits.length - 4} more habits
          </p>
        )}
      </CardContent>
    </Card>
  );
};
