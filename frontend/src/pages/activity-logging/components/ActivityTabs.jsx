import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'feeding', label: 'Feeding', icon: 'Utensils', color: 'text-success' },
    { id: 'bathroom', label: 'Bathroom', icon: 'Droplets', color: 'text-primary' },
    { id: 'play', label: 'Play', icon: 'Zap', color: 'text-warning' },
    { id: 'health', label: 'Health', icon: 'Heart', color: 'text-secondary' }
  ];

  return (
    <div className="bg-card border-b border-border">
      {/* Mobile Tabs */}
      <div className="lg:hidden">
        <div className="flex overflow-x-auto scrollbar-hide">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex-shrink-0 flex items-center space-x-2 px-4 py-3 border-b-2 transition-all duration-200 ${
                activeTab === tab?.id
                  ? `border-primary ${tab?.color} bg-primary/5`
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={18} />
              <span className="text-sm font-medium whitespace-nowrap">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => onTabChange(tab?.id)}
              className={`flex items-center space-x-3 px-6 py-4 border-b-2 transition-all duration-200 ${
                activeTab === tab?.id
                  ? `border-primary ${tab?.color} bg-primary/5`
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span className="font-medium">{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityTabs;