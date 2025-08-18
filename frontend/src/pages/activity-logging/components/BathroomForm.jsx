import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Icon from '../../../components/AppIcon';

const BathroomForm = ({ selectedCat, onSubmit }) => {
  const [selectedType, setSelectedType] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      time: new Date()?.toTimeString()?.slice(0, 5),
      date: new Date()?.toISOString()?.split('T')?.[0],
      type: '',
      notes: ''
    }
  });

  const bathroomTypes = [
    { 
      id: 'urination', 
      label: 'Urination', 
      icon: 'Droplets', 
      color: 'text-primary',
      bgColor: 'bg-primary',
      description: 'Urine output'
    },
    { 
      id: 'bowel', 
      label: 'Bowel Movement', 
      icon: 'Circle', 
      color: 'text-warning',
      bgColor: 'bg-warning',
      description: 'Solid waste'
    },
    { 
      id: 'both', 
      label: 'Both', 
      icon: 'MoreHorizontal', 
      color: 'text-success',
      bgColor: 'bg-success',
      description: 'Urination & bowel'
    }
  ];

  const consistencyOptions = [
    { value: 'normal', label: 'Normal', color: 'text-success' },
    { value: 'soft', label: 'Soft', color: 'text-warning' },
    { value: 'loose', label: 'Loose', color: 'text-error' },
    { value: 'hard', label: 'Hard', color: 'text-muted-foreground' },
    { value: 'liquid', label: 'Liquid', color: 'text-error' }
  ];

  const onFormSubmit = (data) => {
    const bathroomData = {
      ...data,
      type: selectedType,
      catId: selectedCat?.id,
      catName: selectedCat?.name,
      timestamp: new Date(`${data.date}T${data.time}`),
      activityType: 'bathroom'
    };
    
    onSubmit(bathroomData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      reset();
      setSelectedType('');
    }, 2000);
  };

  const handleQuickLog = (type) => {
    setSelectedType(type);
    setValue('type', type);
  };

  return (
    <div className="p-4 lg:p-6">
      {showSuccess && (
        <div className="mb-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-success font-medium">Bathroom activity logged successfully!</span>
        </div>
      )}
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
        {/* Date and Time */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            {...register('date', { required: 'Date is required' })}
            error={errors?.date?.message}
          />
          <Input
            label="Time"
            type="time"
            {...register('time', { required: 'Time is required' })}
            error={errors?.time?.message}
          />
        </div>

        {/* Quick Type Selection */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-foreground">
            Activity Type *
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {bathroomTypes?.map((type) => (
              <button
                key={type?.id}
                type="button"
                onClick={() => handleQuickLog(type?.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedType === type?.id
                    ? `border-primary ${type?.bgColor}/10 ${type?.color}`
                    : 'border-border hover:border-primary/50 text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="flex flex-col items-center space-y-2">
                  <Icon name={type?.icon} size={24} />
                  <span className="font-medium">{type?.label}</span>
                  <span className="text-xs opacity-80">{type?.description}</span>
                </div>
              </button>
            ))}
          </div>
          {!selectedType && (
            <p className="text-sm text-error">Please select an activity type</p>
          )}
        </div>

        {/* Consistency (for bowel movements) */}
        {(selectedType === 'bowel' || selectedType === 'both') && (
          <div className="space-y-3">
            <label className="block text-sm font-medium text-foreground">
              Stool Consistency
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {consistencyOptions?.map((option) => (
                <button
                  key={option?.value}
                  type="button"
                  onClick={() => setValue('consistency', option?.value)}
                  className={`p-3 rounded-lg border text-sm font-medium transition-colors duration-200 ${option?.color} hover:bg-muted/50`}
                >
                  {option?.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Litter Box Location */}
        <Input
          label="Litter Box Location (Optional)"
          type="text"
          placeholder="e.g., Main bathroom, Basement, Living room"
          {...register('location')}
        />

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Observations (Optional)
          </label>
          <textarea
            {...register('notes')}
            placeholder="Any unusual observations, straining, blood, odor, or other concerns..."
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
          disabled={!selectedType}
        >
          Log Bathroom Activity
        </Button>
      </form>
    </div>
  );
};

export default BathroomForm;