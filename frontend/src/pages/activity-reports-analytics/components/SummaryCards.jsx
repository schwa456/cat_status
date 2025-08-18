import React from 'react';
import Icon from '../../../components/AppIcon';

const SummaryCards = ({ selectedCat, dateRange }) => {
  const summaryData = [
    {
      title: 'Average Meals/Day',
      value: '3.2',
      change: '+0.3',
      changeType: 'positive',
      icon: 'Utensils',
      color: 'text-success',
      bgColor: 'bg-success/10',
      description: 'vs previous period'
    },
    {
      title: 'Bathroom Frequency',
      value: '4.1',
      change: '-0.2',
      changeType: 'negative',
      icon: 'Droplets',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'times per day'
    },
    {
      title: 'Play Activity',
      value: '2.8 hrs',
      change: '+0.5',
      changeType: 'positive',
      icon: 'Activity',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      description: 'daily average'
    },
    {
      title: 'Weight Trend',
      value: '12.3 lbs',
      change: '+0.1',
      changeType: 'neutral',
      icon: 'TrendingUp',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      description: 'current weight'
    }
  ];

  const getChangeColor = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getChangeIcon = (changeType) => {
    switch (changeType) {
      case 'positive':
        return 'TrendingUp';
      case 'negative':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {summaryData?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-shadow duration-200"
        >
          <div className="flex items-start justify-between mb-3">
            <div className={`w-10 h-10 rounded-lg ${item?.bgColor} flex items-center justify-center`}>
              <Icon name={item?.icon} size={20} className={item?.color} />
            </div>
            <div className={`flex items-center space-x-1 ${getChangeColor(item?.changeType)}`}>
              <Icon name={getChangeIcon(item?.changeType)} size={14} />
              <span className="text-sm font-medium">{item?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">{item?.title}</h3>
            <p className="text-2xl font-bold text-foreground">{item?.value}</p>
            <p className="text-xs text-muted-foreground">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;