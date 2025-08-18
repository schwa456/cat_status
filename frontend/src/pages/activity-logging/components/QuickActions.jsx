import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickActions = ({ selectedCat, onQuickLog, activeTab }) => {
  const quickActions = {
    feeding: [
      { 
        id: 'quick-breakfast', 
        label: 'Breakfast', 
        icon: 'Coffee',
        data: { foodType: 'dry-kibble', amount: 50, notes: 'Morning feeding' }
      },
      { 
        id: 'quick-dinner', 
        label: 'Dinner', 
        icon: 'Utensils',
        data: { foodType: 'wet-canned', amount: 75, notes: 'Evening feeding' }
      },
      { 
        id: 'quick-treats', 
        label: 'Treats', 
        icon: 'Heart',
        data: { foodType: 'treats', amount: 15, notes: 'Reward treats' }
      }
    ],
    bathroom: [
      { 
        id: 'quick-urination', 
        label: 'Urination', 
        icon: 'Droplets',
        data: { type: 'urination', location: 'Main litter box' }
      },
      { 
        id: 'quick-bowel', 
        label: 'Bowel Movement', 
        icon: 'Circle',
        data: { type: 'bowel', consistency: 'normal', location: 'Main litter box' }
      }
    ],
    play: [
      { 
        id: 'quick-play-15', 
        label: '15 min Play', 
        icon: 'Zap',
        data: { duration: 15, playType: 'interactive-toy', energyLevel: 3 }
      },
      { 
        id: 'quick-play-30', 
        label: '30 min Play', 
        icon: 'Activity',
        data: { duration: 30, playType: 'feather-wand', energyLevel: 4 }
      }
    ],
    health: [
      { 
        id: 'quick-weight', 
        label: 'Weight Check', 
        icon: 'Scale',
        data: { healthType: 'weight-check' }
      },
      { 
        id: 'quick-medication', 
        label: 'Medication', 
        icon: 'Pill',
        data: { healthType: 'medication' }
      }
    ]
  };

  const currentActions = quickActions?.[activeTab] || [];

  const handleQuickAction = (action) => {
    const quickData = {
      ...action?.data,
      catId: selectedCat?.id,
      catName: selectedCat?.name,
      timestamp: new Date(),
      activityType: activeTab,
      isQuickLog: true
    };
    
    onQuickLog(quickData);
  };

  if (currentActions?.length === 0) return null;

  return (
    <div className="bg-muted/30 border-t border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium text-foreground flex items-center space-x-2">
          <Icon name="Zap" size={16} className="text-accent" />
          <span>Quick Actions</span>
        </h3>
        <span className="text-xs text-muted-foreground">One-tap logging</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {currentActions?.map((action) => (
          <Button
            key={action?.id}
            variant="outline"
            size="sm"
            iconName={action?.icon}
            iconPosition="left"
            onClick={() => handleQuickAction(action)}
            className="justify-start text-xs"
          >
            {action?.label}
          </Button>
        ))}
      </div>
      <div className="mt-3 p-2 bg-accent/10 rounded-lg">
        <p className="text-xs text-accent flex items-center space-x-1">
          <Icon name="Info" size={12} />
          <span>Quick actions use default values. Use the form above for detailed logging.</span>
        </p>
      </div>
    </div>
  );
};

export default QuickActions;