import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const FilterSidebar = ({ isOpen, onClose, filters, onFiltersChange }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const activityTypes = [
    { id: 'feeding', label: 'Feeding', checked: true },
    { id: 'bathroom', label: 'Bathroom', checked: true },
    { id: 'play', label: 'Play Activity', checked: true },
    { id: 'weight', label: 'Weight', checked: true },
    { id: 'medication', label: 'Medication', checked: false },
    { id: 'grooming', label: 'Grooming', checked: false }
  ];

  const healthMetrics = [
    { id: 'frequency', label: 'Frequency Patterns', checked: true },
    { id: 'trends', label: 'Trend Analysis', checked: true },
    { id: 'anomalies', label: 'Anomaly Detection', checked: false },
    { id: 'correlations', label: 'Activity Correlations', checked: false }
  ];

  const chartTypes = [
    { value: 'all', label: 'All Chart Types' },
    { value: 'line', label: 'Line Charts Only' },
    { value: 'bar', label: 'Bar Charts Only' },
    { value: 'area', label: 'Area Charts Only' }
  ];

  const timeGranularity = [
    { value: 'daily', label: 'Daily View' },
    { value: 'weekly', label: 'Weekly View' },
    { value: 'monthly', label: 'Monthly View' }
  ];

  const handleActivityTypeChange = (id, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      activityTypes: prev?.activityTypes?.map(type => 
        type?.id === id ? { ...type, checked } : type
      )
    }));
  };

  const handleHealthMetricChange = (id, checked) => {
    setLocalFilters(prev => ({
      ...prev,
      healthMetrics: prev?.healthMetrics?.map(metric => 
        metric?.id === id ? { ...metric, checked } : metric
      )
    }));
  };

  const handleApplyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const handleResetFilters = () => {
    const resetFilters = {
      activityTypes: activityTypes,
      healthMetrics: healthMetrics,
      chartType: 'all',
      timeGranularity: 'daily'
    };
    setLocalFilters(resetFilters);
    onFiltersChange(resetFilters);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />
      {/* Sidebar */}
      <div className={`fixed right-0 top-0 h-full w-80 bg-card border-l border-border z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Advanced Filters</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
            >
              <Icon name="X" size={20} />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {/* Activity Types */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Activity Types</h3>
              <div className="space-y-2">
                {activityTypes?.map((type) => (
                  <Checkbox
                    key={type?.id}
                    label={type?.label}
                    checked={localFilters?.activityTypes?.find(t => t?.id === type?.id)?.checked || type?.checked}
                    onChange={(e) => handleActivityTypeChange(type?.id, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Health Metrics */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Health Metrics</h3>
              <div className="space-y-2">
                {healthMetrics?.map((metric) => (
                  <Checkbox
                    key={metric?.id}
                    label={metric?.label}
                    checked={localFilters?.healthMetrics?.find(m => m?.id === metric?.id)?.checked || metric?.checked}
                    onChange={(e) => handleHealthMetricChange(metric?.id, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>

            {/* Chart Type */}
            <div>
              <Select
                label="Chart Type"
                options={chartTypes}
                value={localFilters?.chartType || 'all'}
                onChange={(value) => setLocalFilters(prev => ({ ...prev, chartType: value }))}
              />
            </div>

            {/* Time Granularity */}
            <div>
              <Select
                label="Time Granularity"
                options={timeGranularity}
                value={localFilters?.timeGranularity || 'daily'}
                onChange={(value) => setLocalFilters(prev => ({ ...prev, timeGranularity: value }))}
              />
            </div>

            {/* Quick Presets */}
            <div>
              <h3 className="text-sm font-medium text-foreground mb-3">Quick Presets</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    // Health Focus preset
                    setLocalFilters({
                      activityTypes: activityTypes?.map(t => ({ ...t, checked: ['feeding', 'bathroom', 'weight']?.includes(t?.id) })),
                      healthMetrics: healthMetrics?.map(m => ({ ...m, checked: true })),
                      chartType: 'line',
                      timeGranularity: 'weekly'
                    });
                  }}
                >
                  Health Focus
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  fullWidth
                  onClick={() => {
                    // Activity Focus preset
                    setLocalFilters({
                      activityTypes: activityTypes?.map(t => ({ ...t, checked: ['play', 'feeding']?.includes(t?.id) })),
                      healthMetrics: healthMetrics?.map(m => ({ ...m, checked: ['frequency', 'trends']?.includes(m?.id) })),
                      chartType: 'bar',
                      timeGranularity: 'daily'
                    });
                  }}
                >
                  Activity Focus
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border space-y-2">
            <Button
              variant="default"
              fullWidth
              onClick={handleApplyFilters}
            >
              Apply Filters
            </Button>
            <Button
              variant="outline"
              fullWidth
              onClick={handleResetFilters}
            >
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;