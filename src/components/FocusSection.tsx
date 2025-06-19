import { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface FocusSectionProps {
  compact?: boolean;
}

export const FocusSection = ({ compact = false }: FocusSectionProps) => {
  const [isRunning, setIsRunning] = useState(false);
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [initialTime] = useState(25 * 60);
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            // Auto-switch modes and update sessions
            if (mode === 'focus') {
              setSessionsCompleted(prev => prev + 1);
              setMode('break');
              setTimeLeft(5 * 60); // 5 minute break
            } else {
              setMode('focus');
              setTimeLeft(25 * 60); // Back to 25 minute focus
            }
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((initialTime - timeLeft) / initialTime) * 100;

  return (
    <Card className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-sm border-slate-200 dark:border-slate-700">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100 flex items-center justify-center space-x-2">
          <Clock className="w-5 h-5" />
          <span>Focus Timer</span>
        </CardTitle>
        <div className="flex justify-center space-x-4 text-sm text-slate-600 dark:text-slate-400">
          <span>Sessions: {sessionsCompleted}</span>
          <span>Mode: {mode === 'focus' ? 'Focus' : 'Break'}</span>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Timer Display */}
        <div className="text-center space-y-4">
          <div className={`text-6xl font-mono font-bold transition-colors duration-300 ${
            mode === 'focus' 
              ? 'text-purple-600 dark:text-purple-400' 
              : 'text-green-600 dark:text-green-400'
          }`}>
            {formatTime(timeLeft)}
          </div>
          
          <div className="space-y-2">
            <Progress 
              value={progress} 
              className={`h-3 ${mode === 'focus' ? '' : 'bg-green-100 dark:bg-green-900/30'}`}
            />
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {mode === 'focus' ? 'Focus time' : 'Break time'}
            </p>
          </div>
        </div>

        {/* Controls */}
        {!compact && (
          <div className="flex justify-center space-x-3">
            <Button
              onClick={toggleTimer}
              size="lg"
              className={`px-8 ${
                mode === 'focus'
                  ? 'bg-purple-600 hover:bg-purple-700'
                  : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              size="lg"
              className="px-6"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        )}

        {/* Mode Switcher */}
        {!compact && (
          <div className="flex justify-center space-x-2">
            <Button
              onClick={() => {
                setMode('focus');
                setTimeLeft(25 * 60);
                setIsRunning(false);
              }}
              variant={mode === 'focus' ? 'default' : 'outline'}
              size="sm"
              className={mode === 'focus' ? 'bg-purple-600 hover:bg-purple-700' : ''}
            >
              Focus (25m)
            </Button>
            <Button
              onClick={() => {
                setMode('break');
                setTimeLeft(5 * 60);
                setIsRunning(false);
              }}
              variant={mode === 'break' ? 'default' : 'outline'}
              size="sm"
              className={mode === 'break' ? 'bg-green-600 hover:bg-green-700' : ''}
            >
              Break (5m)
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
