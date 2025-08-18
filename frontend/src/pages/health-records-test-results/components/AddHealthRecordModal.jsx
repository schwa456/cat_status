import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const AddHealthRecordModal = ({ isOpen, onClose, onSave, selectedCat }) => {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    date: new Date()?.toISOString()?.split('T')?.[0],
    time: new Date()?.toTimeString()?.slice(0, 5),
    summary: '',
    description: '',
    veterinarian: '',
    priority: 'medium',
    notes: '',
    testResults: [],
    vaccineDetails: {},
    medicationDetails: {},
    attachments: []
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [testResult, setTestResult] = useState({ name: '', value: '', unit: '', normalRange: '', status: 'normal' });

  const recordTypes = [
    { value: 'blood-work', label: 'Blood Work', description: 'Lab test results and blood analysis' },
    { value: 'vaccination', label: 'Vaccination', description: 'Immunization records' },
    { value: 'vet-visit', label: 'Vet Visit', description: 'General veterinary examination' },
    { value: 'medication', label: 'Medication', description: 'Prescription and treatment records' },
    { value: 'symptom', label: 'Symptom', description: 'Health observations and symptoms' },
    { value: 'checkup', label: 'Checkup', description: 'Routine health examination' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low', description: 'Routine or non-urgent' },
    { value: 'medium', label: 'Medium', description: 'Standard priority' },
    { value: 'high', label: 'High', description: 'Urgent attention needed' }
  ];

  const commonBloodTests = [
    { name: 'Glucose', unit: 'mg/dL', normalRange: '70-140' },
    { name: 'Total Protein', unit: 'g/dL', normalRange: '5.4-7.8' },
    { name: 'White Blood Cells', unit: 'K/μL', normalRange: '5.5-19.5' },
    { name: 'Red Blood Cells', unit: 'M/μL', normalRange: '5.0-10.0' },
    { name: 'Creatinine', unit: 'mg/dL', normalRange: '0.8-2.4' },
    { name: 'BUN', unit: 'mg/dL', normalRange: '16-36' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNestedInputChange = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev?.[section],
        [field]: value
      }
    }));
  };

  const addTestResult = () => {
    if (testResult?.name && testResult?.value) {
      setFormData(prev => ({
        ...prev,
        testResults: [...prev?.testResults, { ...testResult, id: Date.now() }]
      }));
      setTestResult({ name: '', value: '', unit: '', normalRange: '', status: 'normal' });
    }
  };

  const removeTestResult = (id) => {
    setFormData(prev => ({
      ...prev,
      testResults: prev?.testResults?.filter(test => test?.id !== id)
    }));
  };

  const handleSave = () => {
    const record = {
      id: Date.now(),
      catId: selectedCat?.id,
      catName: selectedCat?.name,
      ...formData,
      date: new Date(`${formData.date}T${formData.time}`),
      createdAt: new Date(),
      hasAttachments: formData?.attachments?.length > 0
    };

    onSave(record);
    onClose();
    
    // Reset form
    setFormData({
      type: '',
      title: '',
      date: new Date()?.toISOString()?.split('T')?.[0],
      time: new Date()?.toTimeString()?.slice(0, 5),
      summary: '',
      description: '',
      veterinarian: '',
      priority: 'medium',
      notes: '',
      testResults: [],
      vaccineDetails: {},
      medicationDetails: {},
      attachments: []
    });
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Add Health Record</h2>
            <p className="text-sm text-muted-foreground">
              Recording for {selectedCat?.name || 'Selected Cat'}
            </p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center space-x-4">
            {[1, 2, 3]?.map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-12 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>Basic Info</span>
            <span>Details</span>
            <span>Review</span>
          </div>
        </div>

        {/* Form Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Step 1: Basic Information */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <Select
                label="Record Type"
                required
                options={recordTypes}
                value={formData?.type}
                onChange={(value) => handleInputChange('type', value)}
                placeholder="Select record type"
              />

              <Input
                label="Title"
                required
                value={formData?.title}
                onChange={(e) => handleInputChange('title', e?.target?.value)}
                placeholder="Enter record title"
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  required
                  value={formData?.date}
                  onChange={(e) => handleInputChange('date', e?.target?.value)}
                />
                <Input
                  label="Time"
                  type="time"
                  required
                  value={formData?.time}
                  onChange={(e) => handleInputChange('time', e?.target?.value)}
                />
              </div>

              <Input
                label="Summary"
                required
                value={formData?.summary}
                onChange={(e) => handleInputChange('summary', e?.target?.value)}
                placeholder="Brief summary of the record"
              />

              <Input
                label="Veterinarian"
                value={formData?.veterinarian}
                onChange={(e) => handleInputChange('veterinarian', e?.target?.value)}
                placeholder="Dr. Smith, ABC Veterinary Clinic"
              />

              <Select
                label="Priority"
                options={priorityOptions}
                value={formData?.priority}
                onChange={(value) => handleInputChange('priority', value)}
              />
            </div>
          )}

          {/* Step 2: Specific Details */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <Input
                label="Description"
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Detailed description of the record"
              />

              {/* Blood Work Details */}
              {formData?.type === 'blood-work' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Blood Test Results</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Select
                      label="Test Name"
                      options={commonBloodTests?.map(test => ({ 
                        value: test?.name, 
                        label: test?.name,
                        description: `Normal: ${test?.normalRange} ${test?.unit}`
                      }))}
                      value={testResult?.name}
                      onChange={(value) => {
                        const test = commonBloodTests?.find(t => t?.name === value);
                        setTestResult(prev => ({
                          ...prev,
                          name: value,
                          unit: test?.unit || '',
                          normalRange: test?.normalRange || ''
                        }));
                      }}
                      searchable
                      placeholder="Select or type test name"
                    />
                    <Input
                      label="Value"
                      type="number"
                      step="0.01"
                      value={testResult?.value}
                      onChange={(e) => setTestResult(prev => ({ ...prev, value: e?.target?.value }))}
                      placeholder="Enter test value"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <Input
                      label="Unit"
                      value={testResult?.unit}
                      onChange={(e) => setTestResult(prev => ({ ...prev, unit: e?.target?.value }))}
                      placeholder="mg/dL"
                    />
                    <Input
                      label="Normal Range"
                      value={testResult?.normalRange}
                      onChange={(e) => setTestResult(prev => ({ ...prev, normalRange: e?.target?.value }))}
                      placeholder="70-140"
                    />
                    <Select
                      label="Status"
                      options={[
                        { value: 'normal', label: 'Normal' },
                        { value: 'high', label: 'High' },
                        { value: 'low', label: 'Low' }
                      ]}
                      value={testResult?.status}
                      onChange={(value) => setTestResult(prev => ({ ...prev, status: value }))}
                    />
                  </div>

                  <Button onClick={addTestResult} iconName="Plus" className="w-full">
                    Add Test Result
                  </Button>

                  {formData?.testResults?.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-foreground">Added Test Results:</h4>
                      {formData?.testResults?.map((test) => (
                        <div key={test?.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                          <div>
                            <span className="font-medium">{test?.name}: </span>
                            <span className={`${
                              test?.status === 'normal' ? 'text-green-600' :
                              test?.status === 'high' ? 'text-red-600' : 'text-orange-600'
                            }`}>
                              {test?.value} {test?.unit}
                            </span>
                            <span className="text-muted-foreground ml-2">({test?.normalRange})</span>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            iconName="Trash2"
                            onClick={() => removeTestResult(test?.id)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Vaccination Details */}
              {formData?.type === 'vaccination' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Vaccination Details</h3>
                  <Input
                    label="Vaccine Type"
                    value={formData?.vaccineDetails?.type || ''}
                    onChange={(e) => handleNestedInputChange('vaccineDetails', 'type', e?.target?.value)}
                    placeholder="FVRCP, Rabies, etc."
                  />
                  <Input
                    label="Batch Number"
                    value={formData?.vaccineDetails?.batchNumber || ''}
                    onChange={(e) => handleNestedInputChange('vaccineDetails', 'batchNumber', e?.target?.value)}
                    placeholder="Vaccine batch number"
                  />
                  <Input
                    label="Next Due Date"
                    type="date"
                    value={formData?.vaccineDetails?.nextDue || ''}
                    onChange={(e) => handleNestedInputChange('vaccineDetails', 'nextDue', e?.target?.value)}
                  />
                </div>
              )}

              {/* Medication Details */}
              {formData?.type === 'medication' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-foreground">Medication Details</h3>
                  <Input
                    label="Medication Name"
                    value={formData?.medicationDetails?.name || ''}
                    onChange={(e) => handleNestedInputChange('medicationDetails', 'name', e?.target?.value)}
                    placeholder="Medication name"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Dosage"
                      value={formData?.medicationDetails?.dosage || ''}
                      onChange={(e) => handleNestedInputChange('medicationDetails', 'dosage', e?.target?.value)}
                      placeholder="5mg, 1 tablet, etc."
                    />
                    <Input
                      label="Frequency"
                      value={formData?.medicationDetails?.frequency || ''}
                      onChange={(e) => handleNestedInputChange('medicationDetails', 'frequency', e?.target?.value)}
                      placeholder="Twice daily, Every 8 hours"
                    />
                  </div>
                  <Input
                    label="Duration"
                    value={formData?.medicationDetails?.duration || ''}
                    onChange={(e) => handleNestedInputChange('medicationDetails', 'duration', e?.target?.value)}
                    placeholder="7 days, 2 weeks, etc."
                  />
                </div>
              )}

              <Input
                label="Additional Notes"
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                placeholder="Any additional notes or observations"
              />
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-foreground">Review Record</h3>
              
              <div className="bg-muted p-4 rounded-lg space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-muted-foreground">Type:</span>
                    <p className="font-medium text-foreground capitalize">{formData?.type?.replace('-', ' ')}</p>
                  </div>
                  <div>
                    <span className="text-sm text-muted-foreground">Priority:</span>
                    <p className="font-medium text-foreground capitalize">{formData?.priority}</p>
                  </div>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Title:</span>
                  <p className="font-medium text-foreground">{formData?.title}</p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Date & Time:</span>
                  <p className="font-medium text-foreground">
                    {new Date(`${formData.date}T${formData.time}`)?.toLocaleString()}
                  </p>
                </div>
                
                <div>
                  <span className="text-sm text-muted-foreground">Summary:</span>
                  <p className="font-medium text-foreground">{formData?.summary}</p>
                </div>

                {formData?.veterinarian && (
                  <div>
                    <span className="text-sm text-muted-foreground">Veterinarian:</span>
                    <p className="font-medium text-foreground">{formData?.veterinarian}</p>
                  </div>
                )}

                {formData?.testResults?.length > 0 && (
                  <div>
                    <span className="text-sm text-muted-foreground">Test Results:</span>
                    <div className="mt-1 space-y-1">
                      {formData?.testResults?.map((test, index) => (
                        <p key={index} className="text-sm text-foreground">
                          {test?.name}: {test?.value} {test?.unit} ({test?.status})
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div className="flex space-x-2">
            {currentStep > 1 && (
              <Button variant="outline" onClick={prevStep} iconName="ChevronLeft">
                Previous
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
            {currentStep < 3 ? (
              <Button onClick={nextStep} iconName="ChevronRight" iconPosition="right">
                Next
              </Button>
            ) : (
              <Button onClick={handleSave} iconName="Save">
                Save Record
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddHealthRecordModal;