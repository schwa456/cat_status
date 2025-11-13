import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const Sidebar = ({ isCollapsed = false, onToggleCollapse }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      label: 'Dashboard', 
      path: '/dashboard-overview', 
      icon: 'LayoutDashboard',
      description: 'Overview & quick stats'
    },
    { 
      label: 'Log Activity', 
      path: '/activity-logging', 
      icon: 'Plus',
      description: 'Record daily activities'
    },
    { 
      label: 'Health Records', 
      path: '/health-records-test-results', 
      icon: 'FileText',
      description: 'Medical history & tests'
    },
    { 
      label: 'Reports', 
      path: '/activity-reports-analytics', 
      icon: 'BarChart3',
      description: 'Analytics & insights'
    },
    { 
      label: 'Settings', 
      path: '/settings-preferences', 
      icon: 'Settings',
      description: 'Preferences & account'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <aside className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <div className="flex items-center justify-end p-4 border-b border-border">
          <button
            onClick={onToggleCollapse}
            className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <Icon 
              name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
              size={20} 
              className="text-muted-foreground"
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg text-left transition-all duration-200 group ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              title={isCollapsed ? item?.label : ''}
            >
              <div className="flex-shrink-0">
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  className={isActivePath(item?.path) ? 'text-primary-foreground' : 'text-current'}
                />
              </div>
              
              {!isCollapsed && (
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item?.label}</p>
                  <p className={`text-xs truncate ${
                    isActivePath(item?.path) 
                      ? 'text-primary-foreground/80' 
                      : 'text-muted-foreground'
                  }`}>
                    {item?.description}
                  </p>
                </div>
              )}
            </button>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border">
          {!isCollapsed && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-foreground mb-2">Quick Actions</h3>
            </div>
          )}
          
          <div className="space-y-2">
            <button
              onClick={() => handleNavigation('/activity-logging')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 text-accent hover:bg-accent/10 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Quick log activity' : ''}
            >
              <Icon name="Zap" size={18} className="text-accent" />
              {!isCollapsed && <span className="text-sm font-medium">Quick Log</span>}
            </button>
            
            <button
              onClick={() => handleNavigation('/health-records-test-results')}
              className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 text-success hover:bg-success/10 ${
                isCollapsed ? 'justify-center' : ''
              }`}
              title={isCollapsed ? 'Add health record' : ''}
            >
              <Icon name="Heart" size={18} className="text-success" />
              {!isCollapsed && <span className="text-sm font-medium">Health Entry</span>}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          {!isCollapsed ? (
            <div className="text-center">
              <p className="text-xs text-muted-foreground">CatCare Tracker v1.0</p>
              <p className="text-xs text-muted-foreground">Caring for your feline friends</p>
            </div>
          ) : (
            <div className="flex justify-center">
              <Icon name="Heart" size={16} className="text-primary" />
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;