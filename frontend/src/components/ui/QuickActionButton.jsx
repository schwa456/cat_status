import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const QuickActionButton = ({ className = '' }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const quickActions = [
    {
      label: 'Log Feeding',
      icon: 'Utensils',
      color: 'text-success',
      bgColor: 'bg-success',
      action: () => navigate('/activity-logging?type=feeding')
    },
    {
      label: 'Log Medication',
      icon: 'Pill',
      color: 'text-warning',
      bgColor: 'bg-warning',
      action: () => navigate('/activity-logging?type=medication')
    },
    {
      label: 'Log Behavior',
      icon: 'Activity',
      color: 'text-primary',
      bgColor: 'bg-primary',
      action: () => navigate('/activity-logging?type=behavior')
    },
    {
      label: 'Health Check',
      icon: 'Stethoscope',
      color: 'text-secondary',
      bgColor: 'bg-secondary',
      action: () => navigate('/health-records-test-results?action=new')
    }
  ];

  const handleMainAction = () => {
    if (location?.pathname === '/activity-logging') {
      // If already on activity logging page, expand options
      setIsExpanded(!isExpanded);
    } else {
      // Navigate to activity logging page
      navigate('/activity-logging');
    }
  };

  const handleQuickAction = (action) => {
    action();
    setIsExpanded(false);
  };

  // Hide on desktop for certain pages where it's not needed
  const shouldHide = location?.pathname === '/user-registration-login';
  
  if (shouldHide) return null;

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Quick Action Options */}
      {isExpanded && (
        <div className="absolute bottom-16 right-0 space-y-3 mb-2">
          {quickActions?.map((action, index) => (
            <button
              key={action?.label}
              onClick={() => handleQuickAction(action?.action)}
              className={`flex items-center space-x-3 px-4 py-3 ${action?.bgColor} text-white rounded-full shadow-elevated hover:shadow-lg transform hover:scale-105 transition-all duration-200 animate-scale-up`}
              style={{ animationDelay: `${index * 50}ms` }}
              title={action?.label}
            >
              <Icon name={action?.icon} size={20} />
              <span className="hidden sm:block text-sm font-medium whitespace-nowrap">
                {action?.label}
              </span>
            </button>
          ))}
        </div>
      )}
      {/* Main Action Button */}
      <button
        onClick={handleMainAction}
        className={`w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-elevated hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center justify-center group ${
          isExpanded ? 'rotate-45' : ''
        }`}
        title="Quick Actions"
      >
        <Icon 
          name="Plus" 
          size={24} 
          className={`transition-transform duration-200 ${isExpanded ? 'rotate-45' : ''}`}
        />
      </button>
      {/* Backdrop for mobile */}
      {isExpanded && (
        <div 
          className="fixed inset-0 bg-black/20 -z-10 lg:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}
    </div>
  );
};

export default QuickActionButton;