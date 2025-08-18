import React from 'react';
import Icon from '../../../components/AppIcon';

const LoadingOverlay = ({ isVisible, message = "Processing..." }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-card rounded-lg p-6 shadow-elevated max-w-sm mx-4">
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="animate-spin">
              <Icon name="Loader2" size={32} className="text-primary" />
            </div>
          </div>
          <div>
            <h3 className="font-medium text-foreground">{message}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Please wait a moment...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingOverlay;