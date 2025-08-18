import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const HealthRecordDetailModal = ({ isOpen, onClose, record }) => {
  const [activeTab, setActiveTab] = useState('details');

  if (!isOpen || !record) return null;

  const getRecordTypeIcon = (type) => {
    const icons = {
      'blood-work': 'Droplets',
      'vaccination': 'Shield',
      'vet-visit': 'Stethoscope',
      'medication': 'Pill',
      'symptom': 'AlertTriangle',
      'checkup': 'Heart'
    };
    return icons?.[type] || 'FileText';
  };

  const getRecordTypeColor = (type) => {
    const colors = {
      'blood-work': 'text-red-600 bg-red-50',
      'vaccination': 'text-green-600 bg-green-50',
      'vet-visit': 'text-blue-600 bg-blue-50',
      'medication': 'text-purple-600 bg-purple-50',
      'symptom': 'text-orange-600 bg-orange-50',
      'checkup': 'text-pink-600 bg-pink-50'
    };
    return colors?.[type] || 'text-gray-600 bg-gray-50';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'text-red-600 bg-red-100',
      'medium': 'text-yellow-600 bg-yellow-100',
      'low': 'text-green-600 bg-green-100'
    };
    return colors?.[priority] || 'text-gray-600 bg-gray-100';
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: 'FileText' },
    { id: 'results', label: 'Test Results', icon: 'BarChart3', show: record?.type === 'blood-work' && record?.testResults?.length > 0 },
    { id: 'attachments', label: 'Attachments', icon: 'Paperclip', show: record?.attachments?.length > 0 },
    { id: 'timeline', label: 'Timeline', icon: 'Clock' }
  ]?.filter(tab => tab?.show !== false);

  const handleExport = () => {
    // Mock export functionality
    const exportData = {
      recordId: record?.id,
      catName: record?.catName,
      type: record?.type,
      title: record?.title,
      date: record?.date,
      summary: record?.summary,
      description: record?.description,
      veterinarian: record?.veterinarian,
      priority: record?.priority,
      notes: record?.notes,
      testResults: record?.testResults,
      vaccineDetails: record?.vaccineDetails,
      medicationDetails: record?.medicationDetails
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `health-record-${record?.id}.json`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-elevated w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <div className={`p-3 rounded-lg ${getRecordTypeColor(record?.type)}`}>
              <Icon name={getRecordTypeIcon(record?.type)} size={24} />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{record?.title}</h2>
              <div className="flex items-center space-x-3 mt-1">
                <p className="text-sm text-muted-foreground">{record?.catName}</p>
                <span className="text-muted-foreground">•</span>
                <p className="text-sm text-muted-foreground">{formatDate(record?.date)}</p>
                {record?.priority && (
                  <>
                    <span className="text-muted-foreground">•</span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(record?.priority)}`}>
                      {record?.priority} priority
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" iconName="Download" onClick={handleExport}>
              Export
            </Button>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Summary</h3>
                    <p className="text-foreground">{record?.summary}</p>
                  </div>
                  
                  {record?.description && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Description</h3>
                      <p className="text-foreground">{record?.description}</p>
                    </div>
                  )}

                  {record?.veterinarian && (
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-1">Veterinarian</h3>
                      <p className="text-foreground">{record?.veterinarian}</p>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Record Type</h3>
                    <p className="text-foreground capitalize">{record?.type?.replace('-', ' ')}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Date & Time</h3>
                    <p className="text-foreground">{formatDate(record?.date)}</p>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Priority</h3>
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(record?.priority)}`}>
                      {record?.priority}
                    </span>
                  </div>
                </div>
              </div>

              {/* Specific Details Based on Type */}
              {record?.type === 'vaccination' && record?.vaccineDetails && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-3">Vaccination Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Vaccine Type</span>
                      <p className="font-medium text-foreground">{record?.vaccineDetails?.type}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Batch Number</span>
                      <p className="font-medium text-foreground">{record?.vaccineDetails?.batchNumber}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Next Due</span>
                      <p className="font-medium text-foreground">
                        {new Date(record.vaccineDetails.nextDue)?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {record?.type === 'medication' && record?.medicationDetails && (
                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium text-foreground mb-3">Medication Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-muted-foreground">Medication</span>
                      <p className="font-medium text-foreground">{record?.medicationDetails?.name}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Dosage</span>
                      <p className="font-medium text-foreground">{record?.medicationDetails?.dosage}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Frequency</span>
                      <p className="font-medium text-foreground">{record?.medicationDetails?.frequency}</p>
                    </div>
                    <div>
                      <span className="text-sm text-muted-foreground">Duration</span>
                      <p className="font-medium text-foreground">{record?.medicationDetails?.duration}</p>
                    </div>
                  </div>
                </div>
              )}

              {record?.notes && (
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Additional Notes</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-foreground">{record?.notes}</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Test Results Tab */}
          {activeTab === 'results' && record?.testResults && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Blood Test Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {record?.testResults?.map((test, index) => (
                  <div key={index} className="bg-muted p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-foreground">{test?.name}</h4>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        test?.status === 'normal' ? 'bg-green-100 text-green-600' :
                        test?.status === 'high'? 'bg-red-100 text-red-600' : 'bg-orange-100 text-orange-600'
                      }`}>
                        {test?.status}
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Value:</span>
                        <span className="text-sm font-medium text-foreground">
                          {test?.value} {test?.unit}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Normal Range:</span>
                        <span className="text-sm text-muted-foreground">{test?.normalRange}</span>
                      </div>
                      {test?.trend && (
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Trend:</span>
                          <div className="flex items-center space-x-1">
                            <Icon 
                              name={test?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                              size={14} 
                              className={test?.trend === 'up' ? 'text-red-500' : 'text-green-500'}
                            />
                            <span className="text-sm text-muted-foreground capitalize">{test?.trend}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Attachments Tab */}
          {activeTab === 'attachments' && record?.attachments && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Attachments</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {record?.attachments?.map((attachment, index) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-muted rounded-lg">
                        <Icon name="FileText" size={20} className="text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-foreground">{attachment?.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {attachment?.size} • {attachment?.type}
                        </p>
                      </div>
                      <Button variant="outline" size="sm" iconName="Download">
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-foreground">Record Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">Record Created</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.createdAt || record.date)?.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-muted rounded-full mt-2"></div>
                  <div>
                    <p className="font-medium text-foreground">Record Date</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(record?.date)}
                    </p>
                  </div>
                </div>

                {record?.type === 'vaccination' && record?.vaccineDetails?.nextDue && (
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-foreground">Next Vaccination Due</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(record.vaccineDetails.nextDue)?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button iconName="Edit">
            Edit Record
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HealthRecordDetailModal;