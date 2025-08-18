import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const PlayForm = ({ selectedCat, onSubmit }) => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    defaultValues: {
      date: new Date()?.toISOString()?.split('T')?.[0],
      startTime: new Date()?.toTimeString()?.slice(0, 5),
      duration: '',
      playType: '',
      energyLevel: 3,
      notes: ''
    }
  });

  const playTypes = [
    { value: 'interactive-toy', label: 'Interactive Toy' },
    { value: 'laser-pointer', label: 'Laser Pointer' },
    { value: 'feather-wand', label: 'Feather Wand' },
    { value: 'ball-chase', label: 'Ball Chase' },
    { value: 'catnip-toy', label: 'Catnip Toy' },
    { value: 'climbing', label: 'Climbing/Scratching' },
    { value: 'hunting-simulation', label: 'Hunting Simulation' },
    { value: 'other', label: 'Other' }
  ];

  const energyLevels = [
    { value: 1, label: 'Very Low', color: 'text-error', description: 'Barely interested' },
    { value: 2, label: 'Low', color: 'text-warning', description: 'Mild interest' },
    { value: 3, label: 'Moderate', color: 'text-primary', description: 'Normal activity' },
    { value: 4, label: 'High', color: 'text-success', description: 'Very active' },
    { value: 5, label: 'Very High', color: 'text-accent', description: 'Extremely playful' }
  ];

  // Timer functionality
  useEffect(() => {
    let interval = null;
    if (isTimerActive) {
      interval = setInterval(() => {
        setTimerSeconds(seconds => seconds + 1);
      }, 1000);
    } else if (!isTimerActive && timerSeconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerActive, timerSeconds]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins?.toString()?.padStart(2, '0')}:${secs?.toString()?.padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsTimerActive(true);
    setTimerSeconds(0);
  };

  const stopTimer = () => {
    setIsTimerActive(false);
    const minutes = Math.floor(timerSeconds / 60);
    setValue('duration', minutes?.toString());
  };

  const resetTimer = () => {
    setIsTimerActive(false);
    setTimerSeconds(0);
    setValue('duration', '');
  };

  const onFormSubmit = (data) => {
    const playData = {
      ...data,
      energyLevel,
      duration: parseInt(data?.duration) || Math.floor(timerSeconds / 60),
      catId: selectedCat?.id,
      catName: selectedCat?.name,
      timestamp: new Date(`${data.date}T${data.startTime}`),
      activityType: 'play'
    };
    
    onSubmit(playData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      reset();
      resetTimer();
      setEnergyLevel(3);
    }, 2000);
  };

  return (
    <div className="p-4 lg:p-6">
      {showSuccess && (
        <div className="mb-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-success font-medium">Play session logged successfully!</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Date and Start Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            error={errors?.date?.message}
          />
          <Input
            label="Start Time"
            type="time"
            {...register('startTime', { required: 'Start time is required' })}
            error={errors?.startTime?.message}
          />
        </div>

        {/* Timer Section */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Duration Tracking
          </label>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-4">
            {/* Timer Display */}
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-foreground mb-2">
                {formatTime(timerSeconds)}
              </div>
              <div className="flex justify-center space-x-2">
                {!isTimerActive ? (
                  <Button
                    type="button"
                    variant="success"
                    size="sm"
                    iconName="Play"
                    iconPosition="left"
                    onClick={startTimer}
                  >
                    Start Timer
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="warning"
                    size="sm"
                    iconName="Pause"
                    iconPosition="left"
                    onClick={stopTimer}
                  >
                    Stop Timer
                  </Button>
                )}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  onClick={resetTimer}
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Manual Duration Input */}
            <div className="border-t border-border pt-4">
              <Input
                label="Or enter duration manually (minutes)"
                type="number"
                placeholder="e.g., 15"
                min="1"
                max="120"
                {...register('duration')}
              />
            </div>
          </div>
        </div>

        {/* Play Type */}
        <Select
          label="Play Type"
          placeholder="Select play activity"
          options={playTypes}
          {...register('playType', { required: 'Play type is required' })}
          error={errors?.playType?.message}
          required
        />

        {/* Energy Level */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Energy Level
          </label>
          
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {energyLevels?.map((level) => (
              <button
                key={level?.value}
                type="button"
                onClick={() => {
                  setEnergyLevel(level?.value);
                  setValue('energyLevel', level?.value);
                }}
                className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${
                  energyLevel === level?.value
                    ? `border-primary bg-primary/10 ${level?.color}`
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-bold text-lg">{level?.value}</span>
                  <span className="text-xs font-medium">{level?.label}</span>
                  <span className="text-xs opacity-80">{level?.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Play Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            placeholder="How engaged was your cat? Any favorite toys or behaviors observed..."
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="default"
          fullWidth
          iconName="Plus"
          iconPosition="left"
          className="mt-6"
        >
          Log Play Session
        </Button>
      </form>
    </div>
  );
};

export default PlayForm;