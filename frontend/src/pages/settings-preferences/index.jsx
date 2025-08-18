import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import DataManagement from './components/DataManagement';
import AppPreferences from './components/AppPreferences';
import PrivacySecurity from './components/PrivacySecurity';
import SupportHelp from './components/SupportHelp';
import SettingsSearch from './components/SettingsSearch';
import Icon from '../../components/AppIcon';

const SettingsPreferences = () => {
  const [expandedSections, setExpandedSections] = useState({
    account: false,
    notifications: false,
    data: false,
    preferences: false,
    privacy: false,
    support: false
  });

  const [searchResults, setSearchResults] = useState([]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const handleSearchResults = (results) => {
    setSearchResults(results);
    
    // Auto-expand sections that have search results
    if (results?.length > 0) {
      const sectionsToExpand = {};
      results?.forEach(result => {
        sectionsToExpand[result.section] = true;
      });
      setExpandedSections(prev => ({ ...prev, ...sectionsToExpand }));
    }
  };

  const allSettings = [
    {
      key: 'account',
      title: 'Account Settings',
      description: 'Manage your profile and account information',
      searchableContent: [
        'profile', 'name', 'email', 'phone', 'password', 'avatar', 'personal information',
        'account details', 'contact information', 'profile picture', 'change password'
      ]
    },
    {
      key: 'notifications',
      title: 'Notifications',
      description: 'Customize reminder schedules and alerts',
      searchableContent: [
        'feeding reminders', 'medication alerts', 'health check prompts', 'activity reminders',
        'weekly reports', 'emergency alerts', 'push notifications', 'email notifications',
        'feeding schedule', 'medication schedule', 'notification methods'
      ]
    },
    {
      key: 'data',
      title: 'Data Management',
      description: 'Backup, export, and manage your pet data',
      searchableContent: [
        'backup', 'restore', 'export', 'cloud storage', 'data deletion', 'health records export',
        'activity data export', 'analytics report', 'complete backup', 'automatic backup'
      ]
    },
    {
      key: 'preferences',
      title: 'App Preferences',
      description: 'Customize theme, units, and display options',
      searchableContent: [
        'theme', 'dark mode', 'light mode', 'units', 'metric', 'imperial', 'date format',
        'language', 'time format', 'currency', 'appearance', 'measurement units'
      ]
    },
    {
      key: 'privacy',
      title: 'Privacy & Security',
      description: 'Manage data permissions and security settings',
      searchableContent: [
        'privacy', 'security', 'data sharing', 'veterinary access', 'analytics tracking',
        'crash reporting', 'location services', 'biometric authentication', 'two-factor authentication',
        'account deletion', 'data rights', 'privacy policy', 'terms of service'
      ]
    },
    {
      key: 'support',
      title: 'Support & Help',
      description: 'Get help, contact support, and find answers',
      searchableContent: [
        'help', 'support', 'faq', 'contact', 'email support', 'live chat', 'phone support',
        'getting started', 'health records', 'data privacy', 'app information', 'version'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header 
        showCatSelector={false} 
        selectedCat={null}
        onCatChange={() => {}}
      />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Settings" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings & Preferences</h1>
              <p className="text-muted-foreground">Manage your account, privacy, and app preferences</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <SettingsSearch 
            onSearchResults={handleSearchResults}
            allSettings={allSettings}
          />
        </div>

        {/* Settings Sections */}
        <div className="space-y-6">
          <div id="settings-account">
            <AccountSettings
              isExpanded={expandedSections?.account}
              onToggle={() => toggleSection('account')}
            />
          </div>

          <div id="settings-notifications">
            <NotificationSettings
              isExpanded={expandedSections?.notifications}
              onToggle={() => toggleSection('notifications')}
            />
          </div>

          <div id="settings-data">
            <DataManagement
              isExpanded={expandedSections?.data}
              onToggle={() => toggleSection('data')}
            />
          </div>

          <div id="settings-preferences">
            <AppPreferences
              isExpanded={expandedSections?.preferences}
              onToggle={() => toggleSection('preferences')}
            />
          </div>

          <div id="settings-privacy">
            <PrivacySecurity
              isExpanded={expandedSections?.privacy}
              onToggle={() => toggleSection('privacy')}
            />
          </div>

          <div id="settings-support">
            <SupportHelp
              isExpanded={expandedSections?.support}
              onToggle={() => toggleSection('support')}
            />
          </div>
        </div>

        {/* Quick Actions Info */}
        <div className="mt-12 p-6 bg-muted/30 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Lightbulb" size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-medium text-foreground mb-2">Quick Tips</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Use the search bar above to quickly find specific settings</li>
                <li>• Enable automatic backups to keep your pet's data safe</li>
                <li>• Set up feeding reminders to maintain consistent meal schedules</li>
                <li>• Export health records before veterinary visits for easy sharing</li>
                <li>• Review privacy settings to control how your data is used</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            CatCare Tracker • Version 1.2.3 • © {new Date()?.getFullYear()} All rights reserved
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Caring for your feline friends with love and technology
          </p>
        </div>
      </div>
      <QuickActionButton />
    </div>
  );
};

export default SettingsPreferences;