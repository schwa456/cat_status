import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CatProfileCard = ({ cat, onEditProfile }) => {
  const getAgeDisplay = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths = (today?.getFullYear() - birth?.getFullYear()) * 12 + today?.getMonth() - birth?.getMonth();
    
    if (ageInMonths < 12) {
      return `${ageInMonths} months old`;
    } else {
      const years = Math.floor(ageInMonths / 12);
      const months = ageInMonths % 12;
      return months > 0 ? `${years}y ${months}m old` : `${years} years old`;
    }
  };

  const getLastActivityColor = (timestamp) => {
    const now = new Date();
    const lastActivity = new Date(timestamp);
    const hoursDiff = (now - lastActivity) / (1000 * 60 * 60);
    
    if (hoursDiff < 2) return 'text-success';
    if (hoursDiff < 6) return 'text-warning';
    return 'text-error';
  };

  const formatLastActivity = (timestamp) => {
    const now = new Date();
    const lastActivity = new Date(timestamp);
    const diffInMinutes = Math.floor((now - lastActivity) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
      const days = Math.floor(diffInMinutes / 1440);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
              <Image
                src={cat?.photo}
                alt={cat?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-card flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-semibold text-foreground mb-1">{cat?.name}</h2>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Calendar" size={14} />
                <span>{getAgeDisplay(cat?.birthDate)}</span>
              </span>
              <span className="flex items-center space-x-1">
                <Icon name="Tag" size={14} />
                <span>{cat?.breed}</span>
              </span>
            </div>
          </div>
        </div>
        
        <button
          onClick={() => onEditProfile(cat)}
          className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          title="Edit profile"
        >
          <Icon name="Edit2" size={18} className="text-muted-foreground" />
        </button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-foreground">{cat?.weight}</div>
          <div className="text-xs text-muted-foreground">Weight (lbs)</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-primary">{cat?.todayMeals}</div>
          <div className="text-xs text-muted-foreground">Meals Today</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-accent">{cat?.playTime}</div>
          <div className="text-xs text-muted-foreground">Play Time (min)</div>
        </div>
        <div className="text-center p-3 bg-muted/50 rounded-lg">
          <div className="text-lg font-semibold text-secondary">{cat?.healthScore}</div>
          <div className="text-xs text-muted-foreground">Health Score</div>
        </div>
      </div>
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Last activity:</span>
          <span className={`text-sm font-medium ${getLastActivityColor(cat?.lastActivity)}`}>
            {formatLastActivity(cat?.lastActivity)}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-xs text-muted-foreground">Active</span>
        </div>
      </div>
    </div>
  );
};

export default CatProfileCard;