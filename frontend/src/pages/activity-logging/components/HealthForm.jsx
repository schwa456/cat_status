import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const HealthForm = ({ selectedCat, onSubmit }) => {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm({
    defaultValues: {
      date: new Date()?.toISOString()?.split('T')?.[0],
      time: new Date()?.toTimeString()?.slice(0, 5),
      healthType: '',
      weight: '',
      temperature: '',
      medicationName: '',
      medicationDosage: '',
      notes: ''
    }
  });

  const healthTypes = [
    { value: 'weight-check', label: 'Weight Check' },
    { value: 'medication', label: 'Medication Administration' },
    { value: 'symptom-observation', label: 'Symptom Observation' },
    { value: 'temperature-check', label: 'Temperature Check' },
    { value: 'grooming', label: 'Grooming Session' },
    { value: 'dental-care', label: 'Dental Care' },
    { value: 'other', label: 'Other Health Activity' }
  ];

  const commonSymptoms = [
    { id: 'lethargy', label: 'Lethargy', color: 'text-warning' },
    { id: 'vomiting', label: 'Vomiting', color: 'text-error' },
    { id: 'diarrhea', label: 'Diarrhea', color: 'text-error' },
    { id: 'loss-appetite', label: 'Loss of Appetite', color: 'text-warning' },
    { id: 'excessive-drinking', label: 'Excessive Drinking', color: 'text-primary' },
    { id: 'difficulty-breathing', label: 'Difficulty Breathing', color: 'text-error' },
    { id: 'limping', label: 'Limping', color: 'text-warning' },
    { id: 'excessive-scratching', label: 'Excessive Scratching', color: 'text-accent' },
    { id: 'hiding', label: 'Hiding Behavior', color: 'text-muted-foreground' },
    { id: 'vocalization', label: 'Unusual Vocalization', color: 'text-secondary' }
  ];

  const medicationTypes = [
    { value: 'antibiotic', label: 'Antibiotic' },
    { value: 'pain-relief', label: 'Pain Relief' },
    { value: 'flea-tick', label: 'Flea/Tick Prevention' },
    { value: 'heartworm', label: 'Heartworm Prevention' },
    { value: 'supplement', label: 'Supplement/Vitamin' },
    { value: 'prescription', label: 'Prescription Medication' },
    { value: 'other', label: 'Other' }
  ];

  const handleSymptomToggle = (symptomId) => {
    setSelectedSymptoms(prev => {
      const updated = prev?.includes(symptomId)
        ? prev?.filter(id => id !== symptomId)
        : [...prev, symptomId];
      setValue('symptoms', updated);
      return updated;
    });
  };

  const onFormSubmit = (data) => {
    const healthData = {
      ...data,
      symptoms: selectedSymptoms,
      catId: selectedCat?.id,
      catName: selectedCat?.name,
      timestamp: new Date(`${data.date}T${data.time}`),
      activityType: 'health'
    };
    
    onSubmit(healthData);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      reset();
      setSelectedSymptoms([]);
    }, 2000);
  };

  const watchHealthType = register('healthType')?.name;

  return (
    <div className="p-4 lg:p-6">
      {showSuccess && (
        <div className="mb-4 p-4 bg-success/10 border border-success/20 rounded-lg flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-success" />
          <span className="text-success font-medium">Health record logged successfully!</span>
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

        {/* Health Activity Type */}
        <Select
          label="Health Activity Type"
          placeholder="Select health activity"
          options={healthTypes}
          {...register('healthType', { required: 'Health activity type is required' })}
          error={errors?.healthType?.message}
          required
        />

        {/* Weight Check Fields */}
        {watchHealthType === 'weight-check' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Weight (lbs)"
              type="number"
              step="0.1"
              placeholder="e.g., 12.5"
              {...register('weight')}
            />
            <Input
              label="Body Condition (1-9 scale)"
              type="number"
              min="1"
              max="9"
              placeholder="5 = ideal"
              {...register('bodyCondition')}
            />
          </div>
        )}

        {/* Temperature Check */}
        {watchHealthType === 'temperature-check' && (
          <Input
            label="Temperature (°F)"
            type="number"
            step="0.1"
            placeholder="Normal: 100.5-102.5°F"
            {...register('temperature')}
          />
        )}

        {/* Medication Fields */}
        {watchHealthType === 'medication' && (
          <div className="space-y-4">
            <Select
              label="Medication Type"
              placeholder="Select medication type"
              options={medicationTypes}
              {...register('medicationType')}
            />
            <Input
              label="Medication Name"
              type="text"
              placeholder="e.g., Amoxicillin"
              {...register('medicationName')}
            />
            <Input
              label="Dosage"
              type="text"
              placeholder="e.g., 50mg twice daily"
              {...register('medicationDosage')}
            />
          </div>
        )}

        {/* Symptom Observation */}
        {watchHealthType === 'symptom-observation' && (
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">
              Observed Symptoms
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {commonSymptoms?.map((symptom) => (
                <div key={symptom?.id} className="flex items-center space-x-3">
                  <Checkbox
                    checked={selectedSymptoms?.includes(symptom?.id)}
                    onChange={() => handleSymptomToggle(symptom?.id)}
                  />
                  <label className={`text-sm font-medium ${symptom?.color}`}>
                    {symptom?.label}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Photo Upload */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground">
            Photo (Optional)
          </label>
          <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-colors duration-200">
            <Icon name="Camera" size={32} className="mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">
              Upload a photo to document the health observation
            </p>
            <input
              type="file"
              accept="image/*"
              {...register('photo')}
              className="hidden"
              id="photo-upload"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => document.getElementById('photo-upload')?.click()}
            >
              Choose Photo
            </Button>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Health Notes
          </label>
          <textarea
            {...register('notes')}
            placeholder="Detailed observations, behavior changes, or any other relevant health information..."
            rows={4}
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
          Log Health Record
        </Button>
      </form>
    </div>
  );
};

export default HealthForm;