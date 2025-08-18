import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Image from '../AppImage';

const Header = ({ selectedCat, onCatChange, showCatSelector = true }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard-overview', icon: 'LayoutDashboard' },
    { label: 'Log Activity', path: '/activity-logging', icon: 'Plus' },
    { label: 'Health Records', path: '/health-records-test-results', icon: 'FileText' },
    { label: 'Reports', path: '/activity-reports-analytics', icon: 'BarChart3' },
    { label: 'Settings', path: '/settings-preferences', icon: 'Settings' }
  ];

  const mockCats = [
    { id: 1, name: 'Whiskers', photo: '/assets/images/cat1.jpg', lastActivity: '2 hours ago' },
    { id: 2, name: 'Luna', photo: '/assets/images/cat2.jpg', lastActivity: '4 hours ago' },
    { id: 3, name: 'Shadow', photo: '/assets/images/cat3.jpg', lastActivity: '1 day ago' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsCatDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleCatSelect = (cat) => {
    onCatChange?.(cat);
    setIsCatDropdownOpen(false);
  };

  const isActivePath = (path) => location?.pathname === path;

  const currentCat = selectedCat || mockCats?.[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-soft">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <Icon name="Heart" size={24} color="white" />
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-semibold text-foreground">CatCare Tracker</h1>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActivePath(item?.path)
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Cat Selector */}
          {showCatSelector && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-primary/10">
                  <Image
                    src={currentCat?.photo}
                    alt={currentCat?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-foreground">{currentCat?.name}</p>
                  <p className="text-xs text-muted-foreground">Active {currentCat?.lastActivity}</p>
                </div>
                <Icon 
                  name="ChevronDown" 
                  size={16} 
                  className={`transition-transform duration-200 ${isCatDropdownOpen ? 'rotate-180' : ''}`}
                />
              </button>

              {isCatDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-elevated z-50">
                  <div className="p-2">
                    {mockCats?.map((cat) => (
                      <button
                        key={cat?.id}
                        onClick={() => handleCatSelect(cat)}
                        className={`w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-colors duration-200 ${
                          currentCat?.id === cat?.id
                            ? 'bg-primary/10 text-primary' :'hover:bg-muted text-foreground'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10">
                          <Image
                            src={cat?.photo}
                            alt={cat?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{cat?.name}</p>
                          <p className="text-sm text-muted-foreground">Active {cat?.lastActivity}</p>
                        </div>
                        {currentCat?.id === cat?.id && (
                          <Icon name="Check" size={16} className="text-primary" />
                        )}
                      </button>
                    ))}
                  </div>
                  <div className="border-t border-border p-2">
                    <button className="w-full flex items-center space-x-3 p-3 rounded-lg text-left hover:bg-muted transition-colors duration-200">
                      <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                        <Icon name="Plus" size={20} className="text-muted-foreground" />
                      </div>
                      <span className="font-medium text-foreground">Add New Cat</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors duration-200"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card">
          <nav className="p-4 space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                  isActivePath(item?.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span className="font-medium">{item?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;