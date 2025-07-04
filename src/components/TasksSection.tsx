
import { useState, useEffect } from 'react';
import { Plus, Check, X, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

interface TasksSectionProps {
  compact?: boolean;
}

export const TasksSection = ({ compact = false }: TasksSectionProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('zentrack-tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks).map((task: any) => ({
        ...task,
        createdAt: new Date(task.createdAt),
      })));
    } else {
      // Sample tasks
      const sampleTasks: Task[] = [
        {
          id: '1',
          title: 'Review project proposal',
          completed: false,
          priority: 'high',
          createdAt: new Date(),
        },
        {
          id: '2',
          title: 'Call client about meeting',
          completed: false,
          priority: 'medium',
          createdAt: new Date(),
        },
        {
          id: '3',
          title: 'Update portfolio website',
          completed: true,
          priority: 'low',
          createdAt: new Date(),
        },
      ];
      setTasks(sampleTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('zentrack-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask.trim()) {
      const task: Task = {
        id: Date.now().toString(),
        title: newTask.trim(),
        completed: false,
        priority: 'medium',
        createdAt: new Date(),
      };
      setTasks([task, ...tasks]);
      setNewTask('');
    }
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'pending') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const displayTasks = compact ? filteredTasks.slice(0, 5) : filteredTasks;

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 shadow-red-500/20';
      case 'medium': return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 shadow-yellow-500/20';
      case 'low': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 shadow-green-500/20';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  return (
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-500 animate-fade-in">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 animate-fade-in">
          Tasks
        </CardTitle>
        {!compact && (
          <div className="flex items-center space-x-2 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setFilter(filter === 'all' ? 'pending' : filter === 'pending' ? 'completed' : 'all')}
              className="text-xs hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <Filter className="w-4 h-4 mr-1 transition-transform duration-200 hover:rotate-180" />
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Add Task Input */}
        <div className="flex space-x-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <Input
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            className="flex-1 focus:scale-[1.02] transition-all duration-200 focus:shadow-lg"
          />
          <Button 
            onClick={addTask} 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 hover:scale-110 active:scale-95 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
          >
            <Plus className="w-4 h-4 hover:rotate-180 transition-transform duration-300" />
          </Button>
        </div>

        {/* Tasks List */}
        <div className="space-y-2 max-h-80 overflow-y-auto">
          {displayTasks.map((task, index) => (
            <div
              key={task.id}
              className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] animate-fade-in group ${
                task.completed
                  ? 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 opacity-80 hover:opacity-100'
                  : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 hover:shadow-xl'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-90 ${
                  task.completed
                    ? 'bg-green-500 border-green-500 shadow-lg shadow-green-500/30'
                    : 'border-slate-300 dark:border-slate-500 hover:border-green-400 hover:shadow-lg'
                }`}
              >
                {task.completed && <Check className="w-3 h-3 text-white animate-scale-in" />}
              </button>
              
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium truncate transition-all duration-300 ${
                  task.completed
                    ? 'text-slate-500 dark:text-slate-400 line-through'
                    : 'text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400'
                }`}>
                  {task.title}
                </p>
              </div>
              
              <Badge className={`text-xs transition-all duration-300 hover:scale-110 hover:shadow-lg ${getPriorityColor(task.priority)}`}>
                {task.priority}
              </Badge>
              
              {!compact && (
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-slate-400 hover:text-red-500 transition-all duration-200 hover:scale-110 active:scale-90 opacity-0 group-hover:opacity-100"
                >
                  <X className="w-4 h-4 hover:rotate-90 transition-transform duration-200" />
                </button>
              )}
            </div>
          ))}
          
          {displayTasks.length === 0 && (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400 animate-fade-in">
              <div className="animate-pulse">
                {filter === 'completed' ? 'No completed tasks yet' : 'No tasks yet. Add one above!'}
              </div>
            </div>
          )}
        </div>
        
        {compact && tasks.length > 5 && (
          <p className="text-sm text-slate-500 dark:text-slate-400 text-center animate-fade-in hover:text-purple-600 transition-colors duration-200">
            +{tasks.length - 5} more tasks
          </p>
        )}
      </CardContent>
    </Card>
  );
};
