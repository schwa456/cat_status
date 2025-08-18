import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const HealthRecordFilters = ({ filters, onFiltersChange, onClearFilters }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const recordTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'blood-work', label: 'Blood Work' },
    { value: 'vaccination', label: 'Vaccination' },
    { value: 'vet-visit', label: 'Vet Visit' },
    { value: 'medication', label: 'Medication' },
    { value: 'symptom', label: 'Symptom' },
    { value: 'checkup', label: 'Checkup' }
  ];

  const priorityOptions = [
    { value: 'all', label: 'All Priorities' },
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const sortOptions = [
    { value: 'date-desc', label: 'Newest First' },
    { value: 'date-asc', label: 'Oldest First' },
    { value: 'type', label: 'By Type' },
    { value: 'priority', label: 'By Priority' }
  ];

  const handleFilterChange = (key, value) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters?.type && filters?.type !== 'all') count++;
    if (filters?.priority && filters?.priority !== 'all') count++;
    if (filters?.dateFrom) count++;
    if (filters?.dateTo) count++;
    if (filters?.search) count++;
    if (filters?.veterinarian) count++;
    if (filters?.showAbnormalOnly) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Filter Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-muted-foreground" />
          <h3 className="font-medium text-foreground">Filters</h3>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-1 text-xs font-medium bg-primary text-primary-foreground rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Clear All
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          >
            {isExpanded ? 'Less' : 'More'}
          </Button>
        </div>
      </div>
      {/* Basic Filters - Always Visible */}
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Search"
            type="search"
            placeholder="Search records..."
            value={filters?.search || ''}
            onChange={(e) => handleFilterChange('search', e?.target?.value)}
          />
          
          <Select
            label="Record Type"
            options={recordTypes}
            value={filters?.type || 'all'}
            onChange={(value) => handleFilterChange('type', value)}
          />
          
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters?.sortBy || 'date-desc'}
            onChange={(value) => handleFilterChange('sortBy', value)}
          />
        </div>
      </div>
      {/* Advanced Filters - Expandable */}
      {isExpanded && (
        <div className="border-t border-border p-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Priority"
              options={priorityOptions}
              value={filters?.priority || 'all'}
              onChange={(value) => handleFilterChange('priority', value)}
            />
            
            <Input
              label="Veterinarian"
              placeholder="Filter by veterinarian"
              value={filters?.veterinarian || ''}
              onChange={(e) => handleFilterChange('veterinarian', e?.target?.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="From Date"
              type="date"
              value={filters?.dateFrom || ''}
              onChange={(e) => handleFilterChange('dateFrom', e?.target?.value)}
            />
            
            <Input
              label="To Date"
              type="date"
              value={filters?.dateTo || ''}
              onChange={(e) => handleFilterChange('dateTo', e?.target?.value)}
            />
          </div>

          {/* Quick Date Filters */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Quick Date Filters</label>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Today', days: 0 },
                { label: 'Last 7 days', days: 7 },
                { label: 'Last 30 days', days: 30 },
                { label: 'Last 3 months', days: 90 },
                { label: 'Last 6 months', days: 180 },
                { label: 'This year', days: 365 }
              ]?.map((period) => (
                <Button
                  key={period?.label}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const today = new Date();
                    const fromDate = new Date(today);
                    fromDate?.setDate(today?.getDate() - period?.days);
                    
                    handleFilterChange('dateFrom', fromDate?.toISOString()?.split('T')?.[0]);
                    handleFilterChange('dateTo', today?.toISOString()?.split('T')?.[0]);
                  }}
                >
                  {period?.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Additional Options */}
          <div className="space-y-3">
            <Checkbox
              label="Show only abnormal test results"
              checked={filters?.showAbnormalOnly || false}
              onChange={(e) => handleFilterChange('showAbnormalOnly', e?.target?.checked)}
            />
            
            <Checkbox
              label="Show only records with attachments"
              checked={filters?.hasAttachments || false}
              onChange={(e) => handleFilterChange('hasAttachments', e?.target?.checked)}
            />
            
            <Checkbox
              label="Show upcoming vaccination due dates"
              checked={filters?.upcomingVaccinations || false}
              onChange={(e) => handleFilterChange('upcomingVaccinations', e?.target?.checked)}
            />
          </div>

          {/* Record Type Quick Filters */}
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Quick Type Filters</label>
            <div className="flex flex-wrap gap-2">
              {recordTypes?.slice(1)?.map((type) => (
                <Button
                  key={type?.value}
                  variant={filters?.type === type?.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleFilterChange('type', 
                    filters?.type === type?.value ? 'all' : type?.value
                  )}
                >
                  {type?.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* Active Filters Summary */}
      {activeFiltersCount > 0 && (
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
            </span>
            <div className="flex flex-wrap gap-2">
              {filters?.type && filters?.type !== 'all' && (
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full flex items-center space-x-1">
                  <span>Type: {recordTypes?.find(t => t?.value === filters?.type)?.label}</span>
                  <button onClick={() => handleFilterChange('type', 'all')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters?.priority && filters?.priority !== 'all' && (
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full flex items-center space-x-1">
                  <span>Priority: {filters?.priority}</span>
                  <button onClick={() => handleFilterChange('priority', 'all')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
              {filters?.search && (
                <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full flex items-center space-x-1">
                  <span>Search: "{filters?.search}"</span>
                  <button onClick={() => handleFilterChange('search', '')}>
                    <Icon name="X" size={12} />
                  </button>
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HealthRecordFilters;