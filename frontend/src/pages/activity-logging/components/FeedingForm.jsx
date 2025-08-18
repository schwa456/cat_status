import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FeedingForm = ({ selectedCat, onSubmit }) => {
  const [amount, setAmount] = useState(50);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      time: new Date()?.toTimeString()?.slice(0, 5),
      date: new Date()?.toISOString()?.split('T')?.[0],
      foodType: '',
      amount: 50,
      notes: ''
    }
  });

  const foodTypes = [
    { value: 'dry-kibble', label: 'Dry Kibble' },
    { value: 'wet-canned', label: 'Wet/Canned Food' },
    { value: 'raw-food', label: 'Raw Food' },
    { value: 'treats', label: 'Treats' },
    { value: 'prescription', label: 'Prescription Diet' },
    { value: 'homemade', label: 'Homemade Food' }
  ];

  const quickAmounts = [25, 50, 75, 100, 150];

  const onFormSubmit = (data) => {
    const feedingData = {
      ...data,
      amount,
      catId: selectedCat?.id,
      catName: selectedCat?.name,
      timestamp: new Date(`${data.date}T${data.time}`),
      type: 'feeding'
    };
    
    onSubmit(feedingData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      reset();
      setAmount(50);
    }, 2000);
  };

  const handleQuickAmount = (value) => {
    setAmount(value);
    setValue('amount', value);
  };

  return (
    <div className="p-4 lg:p-6">
      {showSuccess && (
        <div className="mb-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-success font-medium">Feeding logged successfully!</span>
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

        {/* Food Type */}
        <Select
          label="Food Type"
          placeholder="Select food type"
          options={foodTypes}
          {...register('foodType', { required: 'Food type is required' })}
          error={errors?.foodType?.message}
          required
        />

        {/* Amount */}
        <div className="space-y-4">
          <label className="block text-sm font-medium text-foreground">
            Amount (grams)
          </label>
          
          {/* Quick Amount Buttons */}
          <div className="flex flex-wrap gap-2">
            {quickAmounts?.map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => handleQuickAmount(value)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  amount === value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {value}g
              </button>
            ))}
          </div>

          {/* Amount Slider */}
          <div className="space-y-2">
            <input
              type="range"
              min="10"
              max="200"
              value={amount}
              onChange={(e) => {
                const value = parseInt(e?.target?.value);
                setAmount(value);
                setValue('amount', value);
              }}
              className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>10g</span>
              <span className="font-medium text-foreground">{amount}g</span>
              <span>200g</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Notes (Optional)
          </label>
          <textarea
            {...register('notes')}
            placeholder="Any observations about appetite, behavior, or food preferences..."
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
          Log Feeding
        </Button>
      </form>
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
        
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: var(--color-primary);
          cursor: pointer;
          border: 2px solid white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
        }
      `}</style>
    </div>
  );
};

export default FeedingForm;