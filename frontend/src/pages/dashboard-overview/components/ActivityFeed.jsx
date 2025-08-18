import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActivityFeed = ({ activities, onEditActivity, onDeleteActivity }) => {
  const [selectedDate, setSelectedDate] = useState(new Date()?.toISOString()?.split('T')?.[0]);

  const getActivityIcon = (type) => {
    const icons = {
      feeding: 'Utensils',
      bathroom: 'Droplets',
      play: 'Zap',
      medication: 'Pill',
      grooming: 'Scissors',
      sleep: 'Moon',
      behavior: 'Activity'
    };
    return icons?.[type] || 'Circle';
  };

  const getActivityColor = (type) => {
    const colors = {
      feeding: 'text-success bg-success/10',
      bathroom: 'text-primary bg-primary/10',
      play: 'text-accent bg-accent/10',
      medication: 'text-warning bg-warning/10',
      grooming: 'text-secondary bg-secondary/10',
      sleep: 'text-muted-foreground bg-muted',
      behavior: 'text-foreground bg-muted'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted';
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday?.setDate(yesterday?.getDate() - 1);

    if (date?.toDateString() === today?.toDateString()) {
      return 'Today';
    } else if (date?.toDateString() === yesterday?.toDateString()) {
      return 'Yesterday';
    } else {
      return date?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const filteredActivities = activities?.filter(activity => {
    const activityDate = new Date(activity.timestamp)?.toISOString()?.split('T')?.[0];
    return activityDate === selectedDate;
  });

  const groupedActivities = filteredActivities?.reduce((groups, activity) => {
    const date = formatDate(activity?.timestamp);
    if (!groups?.[date]) {
      groups[date] = [];
    }
    groups?.[date]?.push(activity);
    return groups;
  }, {});

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Activity Feed</h3>
        <div className="flex items-center space-x-2">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e?.target?.value)}
            className="px-3 py-1 text-sm border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <Button variant="outline" size="sm" iconName="Filter">
            Filter
          </Button>
        </div>
      </div>
      <div className="space-y-6">
        {Object.keys(groupedActivities)?.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Calendar" size={24} className="text-muted-foreground" />
            </div>
            <h4 className="text-lg font-medium text-foreground mb-2">No activities recorded</h4>
            <p className="text-muted-foreground mb-4">Start logging your cat's daily activities to see them here.</p>
            <Button variant="default" iconName="Plus">
              Log First Activity
            </Button>
          </div>
        ) : (
          Object.entries(groupedActivities)?.map(([date, dayActivities]) => (
            <div key={date}>
              <div className="flex items-center space-x-2 mb-4">
                <h4 className="text-sm font-medium text-foreground">{date}</h4>
                <div className="flex-1 h-px bg-border"></div>
                <span className="text-xs text-muted-foreground">
                  {dayActivities?.length} activities
                </span>
              </div>

              <div className="space-y-3">
                {dayActivities?.map((activity) => (
                  <div
                    key={activity?.id}
                    className="flex items-start space-x-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors duration-200"
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity?.type)}`}>
                      <Icon name={getActivityIcon(activity?.type)} size={18} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-foreground capitalize">
                          {activity?.type}
                        </h5>
                        <span className="text-sm text-muted-foreground">
                          {formatTime(activity?.timestamp)}
                        </span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {activity?.description}
                      </p>

                      {activity?.details && (
                        <div className="flex flex-wrap gap-2 mb-2">
                          {Object.entries(activity?.details)?.map(([key, value]) => (
                            <span
                              key={key}
                              className="inline-flex items-center px-2 py-1 bg-background rounded text-xs text-muted-foreground"
                            >
                              <span className="capitalize">{key}:</span>
                              <span className="ml-1 font-medium">{value}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => onEditActivity(activity)}
                          className="text-xs text-primary hover:text-primary/80 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <span className="text-xs text-muted-foreground">•</span>
                        <button
                          onClick={() => onDeleteActivity(activity?.id)}
                          className="text-xs text-error hover:text-error/80 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ActivityFeed;