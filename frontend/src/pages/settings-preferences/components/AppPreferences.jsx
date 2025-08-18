import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AppPreferences = ({ isExpanded, onToggle }) => {
  const [preferences, setPreferences] = useState({
    theme: 'light',
    units: 'imperial',
    dateFormat: 'MM/DD/YYYY',
    language: 'en',
    timeFormat: '12h',
    currency: 'USD'
  });

  const themeOptions = [
    { value: 'light', label: 'Light Mode' },
    { value: 'dark', label: 'Dark Mode' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const unitOptions = [
    { value: 'imperial', label: 'Imperial (lbs, °F)' },
    { value: 'metric', label: 'Metric (kg, °C)' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (US)' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (UK)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Español' },
    { value: 'fr', label: 'Français' },
    { value: 'de', label: 'Deutsch' },
    { value: 'it', label: 'Italiano' }
  ];

  const timeFormatOptions = [
    { value: '12h', label: '12-hour (AM/PM)' },
    { value: '24h', label: '24-hour' }
  ];

  const currencyOptions = [
    { value: 'USD', label: 'US Dollar ($)' },
    { value: 'EUR', label: 'Euro (€)' },
    { value: 'GBP', label: 'British Pound (£)' },
    { value: 'CAD', label: 'Canadian Dollar (C$)' },
    { value: 'AUD', label: 'Australian Dollar (A$)' }
  ];

  const handlePreferenceChange = (key, value) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  const getThemeIcon = () => {
    switch (preferences?.theme) {
      case 'dark': return 'Moon';
      case 'auto': return 'Monitor';
      default: return 'Sun';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="Palette" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">App Preferences</h3>
            <p className="text-sm text-muted-foreground">Customize theme, units, and display options</p>
          </div>
        </div>
        <Icon 
          name="ChevronDown" 
          size={20} 
          className={`text-muted-foreground transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
        />
      </button>
      {isExpanded && (
        <div className="px-6 pb-6 border-t border-border">
          <div className="space-y-6">
            {/* Theme Settings */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Appearance</h4>
              <div className="space-y-4">
                <Select
                  label="Theme"
                  description="Choose your preferred color theme"
                  options={themeOptions}
                  value={preferences?.theme}
                  onChange={(value) => handlePreferenceChange('theme', value)}
                />

                <div className="grid grid-cols-3 gap-3">
                  {themeOptions?.map((theme) => (
                    <button
                      key={theme?.value}
                      onClick={() => handlePreferenceChange('theme', theme?.value)}
                      className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                        preferences?.theme === theme?.value
                          ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className={`w-8 h-8 mx-auto mb-2 rounded-full flex items-center justify-center ${
                        theme?.value === 'light' ? 'bg-yellow-100' :
                        theme?.value === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-br from-yellow-100 to-gray-800'
                      }`}>
                        <Icon 
                          name={theme?.value === 'light' ? 'Sun' : theme?.value === 'dark' ? 'Moon' : 'Monitor'} 
                          size={16} 
                          className={theme?.value === 'dark' ? 'text-white' : 'text-gray-600'}
                        />
                      </div>
                      <p className="text-xs font-medium text-center">{theme?.label}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Units & Formats */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Units & Formats</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Select
                  label="Measurement Units"
                  description="Weight and temperature units"
                  options={unitOptions}
                  value={preferences?.units}
                  onChange={(value) => handlePreferenceChange('units', value)}
                />

                <Select
                  label="Date Format"
                  description="How dates are displayed"
                  options={dateFormatOptions}
                  value={preferences?.dateFormat}
                  onChange={(value) => handlePreferenceChange('dateFormat', value)}
                />

                <Select
                  label="Time Format"
                  description="12-hour or 24-hour clock"
                  options={timeFormatOptions}
                  value={preferences?.timeFormat}
                  onChange={(value) => handlePreferenceChange('timeFormat', value)}
                />

                <Select
                  label="Currency"
                  description="For veterinary costs and expenses"
                  options={currencyOptions}
                  value={preferences?.currency}
                  onChange={(value) => handlePreferenceChange('currency', value)}
                />
              </div>
            </div>

            {/* Language & Region */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Language & Region</h4>
              <div className="space-y-4">
                <Select
                  label="Language"
                  description="Choose your preferred language"
                  options={languageOptions}
                  value={preferences?.language}
                  onChange={(value) => handlePreferenceChange('language', value)}
                />

                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start space-x-3">
                    <Icon name="Info" size={16} className="text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Language Support</p>
                      <p className="text-xs text-muted-foreground">
                        Additional languages are being added. Contact support if you need a specific language.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Preview</h4>
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date:</span>
                    <span className="font-medium text-foreground">
                      {preferences?.dateFormat === 'MM/DD/YYYY' ? '08/14/2025' :
                       preferences?.dateFormat === 'DD/MM/YYYY' ? '14/08/2025' : '2025-08-14'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Time:</span>
                    <span className="font-medium text-foreground">
                      {preferences?.timeFormat === '12h' ? '5:37 AM' : '05:37'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Weight:</span>
                    <span className="font-medium text-foreground">
                      {preferences?.units === 'imperial' ? '12.5 lbs' : '5.7 kg'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Temperature:</span>
                    <span className="font-medium text-foreground">
                      {preferences?.units === 'imperial' ? '101.5°F' : '38.6°C'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Cost:</span>
                    <span className="font-medium text-foreground">
                      {preferences?.currency === 'USD' ? '$45.00' :
                       preferences?.currency === 'EUR' ? '€41.25' :
                       preferences?.currency === 'GBP' ? '£36.50' :
                       preferences?.currency === 'CAD' ? 'C$61.25' : 'A$67.50'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppPreferences;