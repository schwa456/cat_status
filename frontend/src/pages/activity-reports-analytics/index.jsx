import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import DateRangeSelector from './components/DateRangeSelector';
import SummaryCards from './components/SummaryCards';
import FeedingChart from './components/FeedingChart';
import BathroomChart from './components/BathroomChart';
import PlayActivityChart from './components/PlayActivityChart';
import WeightTrendChart from './components/WeightTrendChart';
import FilterSidebar from './components/FilterSidebar';

const ActivityReportsAnalytics = () => {
  const [selectedCat, setSelectedCat] = useState(1);
  const [selectedRange, setSelectedRange] = useState('last7days');
  const [customDateRange, setCustomDateRange] = useState(null);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({
    activityTypes: [
      { id: 'feeding', label: 'Feeding', checked: true },
      { id: 'bathroom', label: 'Bathroom', checked: true },
      { id: 'play', label: 'Play Activity', checked: true },
      { id: 'weight', label: 'Weight', checked: true }
    ],
    healthMetrics: [
      { id: 'frequency', label: 'Frequency Patterns', checked: true },
      { id: 'trends', label: 'Trend Analysis', checked: true }
    ],
    chartType: 'all',
    timeGranularity: 'daily'
  });

  const handleRangeChange = (range, customRange = null) => {
    setSelectedRange(range);
    if (customRange) {
      setCustomDateRange(customRange);
    }
  };

  const handleCatChange = (catId) => {
    setSelectedCat(catId);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleExportReport = () => {
    // Mock export functionality
    console.log('Exporting report for cat:', selectedCat, 'range:', selectedRange);
    // In real implementation, this would generate and download a PDF
  };

  const handleShareReport = () => {
    // Mock share functionality
    console.log('Sharing report for cat:', selectedCat);
    // In real implementation, this would open share dialog
  };

  // Get active chart components based on filters
  const getActiveCharts = () => {
    const charts = [];
    const activeTypes = filters?.activityTypes?.filter(type => type?.checked)?.map(type => type?.id);
    
    if (activeTypes?.includes('feeding')) {
      charts?.push(
        <FeedingChart 
          key="feeding" 
          selectedCat={selectedCat} 
          dateRange={selectedRange} 
        />
      );
    }
    
    if (activeTypes?.includes('bathroom')) {
      charts?.push(
        <BathroomChart 
          key="bathroom" 
          selectedCat={selectedCat} 
          dateRange={selectedRange} 
        />
      );
    }
    
    if (activeTypes?.includes('play')) {
      charts?.push(
        <PlayActivityChart 
          key="play" 
          selectedCat={selectedCat} 
          dateRange={selectedRange} 
        />
      );
    }
    
    if (activeTypes?.includes('weight')) {
      charts?.push(
        <WeightTrendChart 
          key="weight" 
          selectedCat={selectedCat} 
          dateRange={selectedRange} 
        />
      );
    }
    
    return charts;
  };

  const activeCharts = getActiveCharts();

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedCat={{ id: selectedCat, name: selectedCat === 1 ? 'Whiskers' : selectedCat === 2 ? 'Luna' : 'Shadow' }}
        onCatChange={(cat) => handleCatChange(cat?.id)}
        showCatSelector={true}
      />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Page Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Activity Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Analyze your cat's activity patterns and health trends with interactive charts and insights.
            </p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 lg:mt-0">
            <Button
              variant="outline"
              iconName="Filter"
              iconPosition="left"
              onClick={() => setIsFilterSidebarOpen(true)}
              className="hidden lg:flex"
            >
              Advanced Filters
            </Button>
            <Button
              variant="outline"
              iconName="Download"
              iconPosition="left"
              onClick={handleExportReport}
            >
              Export Report
            </Button>
            <Button
              variant="outline"
              iconName="Share"
              iconPosition="left"
              onClick={handleShareReport}
            >
              Share
            </Button>
          </div>
        </div>

        {/* Date Range and Cat Selector */}
        <DateRangeSelector
          selectedRange={selectedRange}
          onRangeChange={handleRangeChange}
          selectedCat={selectedCat}
          onCatChange={handleCatChange}
        />

        {/* Summary Cards */}
        <SummaryCards 
          selectedCat={selectedCat}
          dateRange={selectedRange}
        />

        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button
            variant="outline"
            iconName="Filter"
            iconPosition="left"
            onClick={() => setIsFilterSidebarOpen(true)}
            fullWidth
          >
            Advanced Filters
          </Button>
        </div>

        {/* Charts Grid */}
        <div className="space-y-6">
          {activeCharts?.length > 0 ? (
            activeCharts?.map((chart, index) => (
              <div key={index} className="w-full">
                {chart}
              </div>
            ))
          ) : (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="BarChart3" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">No Charts Selected</h3>
              <p className="text-muted-foreground mb-4">
                Please select at least one activity type in the filters to view charts.
              </p>
              <Button
                variant="default"
                iconName="Filter"
                iconPosition="left"
                onClick={() => setIsFilterSidebarOpen(true)}
              >
                Open Filters
              </Button>
            </div>
          )}
        </div>

        {/* Insights Section */}
        {activeCharts?.length > 0 && (
          <div className="mt-8 bg-card border border-border rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Icon name="Lightbulb" size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">AI-Powered Insights</h3>
                <p className="text-sm text-muted-foreground">Automated pattern recognition and health recommendations</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="p-4 bg-success/5 border border-success/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="CheckCircle" size={20} className="text-success mt-0.5" />
                  <div>
                    <h4 className="font-medium text-success mb-1">Healthy Pattern Detected</h4>
                    <p className="text-sm text-muted-foreground">
                      Your cat's feeding schedule is consistent and within healthy ranges. 
                      Continue the current routine for optimal health.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-warning/5 border border-warning/20 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                  <div>
                    <h4 className="font-medium text-warning mb-1">Attention Needed</h4>
                    <p className="text-sm text-muted-foreground">
                      Play activity has decreased by 15% this week. Consider increasing 
                      interactive play sessions to maintain fitness levels.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
      {/* Filter Sidebar */}
      <FilterSidebar
        isOpen={isFilterSidebarOpen}
        onClose={() => setIsFilterSidebarOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />
      {/* Quick Action Button */}
      <QuickActionButton />
    </div>
  );
};

export default ActivityReportsAnalytics;