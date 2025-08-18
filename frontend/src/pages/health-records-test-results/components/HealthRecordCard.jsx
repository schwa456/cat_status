import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import Button from '../../../components/ui/Button';

const HealthRecordCard = ({ record, onEdit, onDelete, onViewDetails }) => {
  const [isExpanded, setIsExpanded] = useState(false);

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
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatTime = (date) => {
    return new Date(date)?.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft hover:shadow-elevated transition-all duration-200">
      {/* Card Header */}
      <div 
        className="p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className={`p-2 rounded-lg ${getRecordTypeColor(record?.type)}`}>
              <Icon name={getRecordTypeIcon(record?.type)} size={20} />
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-foreground">{record?.title}</h3>
                {record?.priority && (
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(record?.priority)}`}>
                    {record?.priority}
                  </span>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-2">{record?.summary}</p>
              
              <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                <span className="flex items-center space-x-1">
                  <Icon name="Calendar" size={14} />
                  <span>{formatDate(record?.date)}</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Clock" size={14} />
                  <span>{formatTime(record?.date)}</span>
                </span>
                {record?.veterinarian && (
                  <span className="flex items-center space-x-1">
                    <Icon name="User" size={14} />
                    <span>{record?.veterinarian}</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {record?.hasAttachments && (
              <Icon name="Paperclip" size={16} className="text-muted-foreground" />
            )}
            <Icon 
              name={isExpanded ? "ChevronUp" : "ChevronDown"} 
              size={20} 
              className="text-muted-foreground"
            />
          </div>
        </div>
      </div>
      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-border">
          <div className="p-4 space-y-4">
            {/* Detailed Information */}
            <div className="space-y-3">
              {record?.description && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Description</h4>
                  <p className="text-sm text-muted-foreground">{record?.description}</p>
                </div>
              )}

              {/* Blood Work Results */}
              {record?.type === 'blood-work' && record?.testResults && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Test Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {record?.testResults?.map((test, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="text-sm font-medium text-foreground">{test?.name}</p>
                          <p className="text-xs text-muted-foreground">{test?.normalRange}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-semibold ${
                            test?.status === 'normal' ? 'text-green-600' :
                            test?.status === 'high' ? 'text-red-600' :
                            test?.status === 'low' ? 'text-orange-600' : 'text-foreground'
                          }`}>
                            {test?.value} {test?.unit}
                          </p>
                          {test?.trend && (
                            <Icon 
                              name={test?.trend === 'up' ? 'TrendingUp' : 'TrendingDown'} 
                              size={14} 
                              className={test?.trend === 'up' ? 'text-red-500' : 'text-green-500'}
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vaccination Details */}
              {record?.type === 'vaccination' && record?.vaccineDetails && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Vaccination Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Vaccine Type:</span>
                      <span className="text-sm font-medium text-foreground">{record?.vaccineDetails?.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Batch Number:</span>
                      <span className="text-sm font-medium text-foreground">{record?.vaccineDetails?.batchNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Next Due:</span>
                      <span className="text-sm font-medium text-foreground">{formatDate(record?.vaccineDetails?.nextDue)}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Medication Details */}
              {record?.type === 'medication' && record?.medicationDetails && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Medication Details</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Medication:</span>
                      <span className="text-sm font-medium text-foreground">{record?.medicationDetails?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Dosage:</span>
                      <span className="text-sm font-medium text-foreground">{record?.medicationDetails?.dosage}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Frequency:</span>
                      <span className="text-sm font-medium text-foreground">{record?.medicationDetails?.frequency}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Duration:</span>
                      <span className="text-sm font-medium text-foreground">{record?.medicationDetails?.duration}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {record?.notes && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-1">Notes</h4>
                  <p className="text-sm text-muted-foreground">{record?.notes}</p>
                </div>
              )}

              {/* Attachments */}
              {record?.attachments && record?.attachments?.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-foreground mb-2">Attachments</h4>
                  <div className="space-y-2">
                    {record?.attachments?.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-3 p-2 bg-muted rounded-lg">
                        <Icon name="FileText" size={16} className="text-muted-foreground" />
                        <span className="text-sm text-foreground flex-1">{attachment?.name}</span>
                        <Button variant="ghost" size="sm" iconName="Download">
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-border">
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Eye"
                onClick={() => onViewDetails?.(record)}
              >
                View Details
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Edit"
                onClick={() => onEdit?.(record)}
              >
                Edit
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                iconName="Trash2"
                onClick={() => onDelete?.(record)}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecordCard;