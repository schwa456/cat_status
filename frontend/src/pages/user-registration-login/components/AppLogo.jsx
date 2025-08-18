import React from 'react';
import Icon from '../../../components/AppIcon';

const AppLogo = () => {
  return (
    <div className="text-center mb-8">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-primary rounded-2xl shadow-elevated">
          <Icon name="Heart" size={32} color="white" />
        </div>
      </div>
      
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-foreground">CatCare Tracker</h1>
        <p className="text-muted-foreground text-sm max-w-sm mx-auto">
          Keep your feline friends healthy and happy with comprehensive health monitoring
        </p>
      </div>
    </div>
  );
};

export default AppLogo;