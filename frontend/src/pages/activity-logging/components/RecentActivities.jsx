import React from 'react';
import Icon from '../../../components/AppIcon';
import { format } from 'date-fns';

const RecentActivities = ({ selectedCat }) => {
  const mockRecentActivities = [
    {
      id: 1,
      type: 'feeding',
      icon: 'Utensils',
      color: 'text-success',
      bgColor: 'bg-success/10',
      title: 'Breakfast - Dry Kibble',
      details: '50g • Normal appetite',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      catName: selectedCat?.name || 'Whiskers'
    },
    {
      id: 2,
      type: 'bathroom',
      icon: 'Droplets',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Urination',
      details: 'Main litter box • Normal',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 hours ago
      catName: selectedCat?.name || 'Whiskers'
    },
    {
      id: 3,
      type: 'play',
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      title: 'Play Session - Feather Wand',
      details: '15 minutes • High energy',
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      catName: selectedCat?.name || 'Whiskers'
    },
    {
      id: 4,
      type: 'health',
      icon: 'Heart',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      title: 'Weight Check',
      details: '12.3 lbs • Body condition: 5/9',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      catName: selectedCat?.name || 'Whiskers'
    },
    {
      id: 5,
      type: 'feeding',
      icon: 'Utensils',
      color: 'text-success',
      bgColor: 'bg-success/10',
      title: 'Dinner - Wet Food',
      details: '75g • Ate everything',
      timestamp: new Date(Date.now() - 26 * 60 * 60 * 1000), // 1 day, 2 hours ago
      catName: selectedCat?.name || 'Whiskers'
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInHours = Math.floor((now - timestamp) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - timestamp) / (1000 * 60));
      return `${diffInMinutes}m ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours}h ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}d ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <div className="p-4 border-b border-border">
        <h3 className="font-semibold text-foreground flex items-center space-x-2">
          <Icon name="Clock" size={18} className="text-primary" />
          <span>Recent Activities</span>
        </h3>
        <p className="text-sm text-muted-foreground mt-1">
          Latest logged activities for {selectedCat?.name || 'your cat'}
        </p>
      </div>
      <div className="p-4">
        {mockRecentActivities?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Calendar" size={48} className="mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No recent activities logged</p>
            <p className="text-sm text-muted-foreground mt-1">
              Start logging activities to see them here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {mockRecentActivities?.map((activity) => (
              <div
                key={activity?.id}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              >
                <div className={`w-10 h-10 rounded-lg ${activity?.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={activity?.icon} size={18} className={activity?.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-medium text-foreground text-sm">
                        {activity?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {activity?.details}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {getTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {format(activity?.timestamp, 'MMM dd, h:mm a')}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {mockRecentActivities?.length > 0 && (
          <div className="mt-4 pt-3 border-t border-border">
            <button className="w-full text-sm text-primary hover:text-primary/80 font-medium transition-colors duration-200">
              View All Activities →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;