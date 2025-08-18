import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';


const DateRangeSelector = ({ selectedRange, onRangeChange, selectedCat, onCatChange }) => {
  const [showCustomRange, setShowCustomRange] = useState(false);
  const [customStartDate, setCustomStartDate] = useState('');
  const [customEndDate, setCustomEndDate] = useState('');

  const dateRangeOptions = [
    { value: 'last7days', label: 'Last 7 Days' },
    { value: 'last30days', label: 'Last 30 Days' },
    { value: 'last3months', label: 'Last 3 Months' },
    { value: 'last6months', label: 'Last 6 Months' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const catOptions = [
    { value: 1, label: 'Whiskers' },
    { value: 2, label: 'Luna' },
    { value: 3, label: 'Shadow' },
    { value: 'all', label: 'All Cats' }
  ];

  const handleRangeChange = (value) => {
    onRangeChange(value);
    setShowCustomRange(value === 'custom');
  };

  const handleCustomRangeApply = () => {
    if (customStartDate && customEndDate) {
      onRangeChange('custom', { start: customStartDate, end: customEndDate });
      setShowCustomRange(false);
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Date Range Selection */}
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <div className="flex-1">
            <Select
              label="Date Range"
              options={dateRangeOptions}
              value={selectedRange}
              onChange={handleRangeChange}
              className="w-full"
            />
          </div>
          
          <div className="flex-1">
            <Select
              label="Cat Selection"
              options={catOptions}
              value={selectedCat}
              onChange={onCatChange}
              className="w-full"
            />
          </div>
        </div>

        {/* Export Actions */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
            size="sm"
          >
            Export PDF
          </Button>
          <Button
            variant="outline"
            iconName="Share"
            iconPosition="left"
            size="sm"
          >
            Share
          </Button>
        </div>
      </div>
      {/* Custom Date Range Modal */}
      {showCustomRange && (
        <div className="mt-4 p-4 bg-muted rounded-lg border border-border">
          <h3 className="text-sm font-medium text-foreground mb-3">Custom Date Range</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              label="Start Date"
              type="date"
              value={customStartDate}
              onChange={(e) => setCustomStartDate(e?.target?.value)}
              className="flex-1"
            />
            <Input
              label="End Date"
              type="date"
              value={customEndDate}
              onChange={(e) => setCustomEndDate(e?.target?.value)}
              className="flex-1"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              variant="default"
              size="sm"
              onClick={handleCustomRangeApply}
              disabled={!customStartDate || !customEndDate}
            >
              Apply Range
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowCustomRange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangeSelector;