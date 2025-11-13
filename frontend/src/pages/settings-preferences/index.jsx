import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Card from '../../components/ui/Card';
import { Icon } from '../../components/AppIcon';


import AccountSettings from './components/AccountSettings';
import NotificationSettings from './components/NotificationSettings';
import DataManagement from './components/DataManagement';
import AppPreferences from './components/AppPreferences';
import PrivacySecurity from './components/PrivacySecurity';
import SupportHelp from './components/SupportHelp';
import SettingsSearch from './components/SettingsSearch';


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
      <>
        <Helmet>
            <title>환경설정 - 고양이 건강 기록장</title>
            <meta name="description" content="계정, 개인 정보 보호 및 앱 환경설정을 관리합니다." />
        </Helmet>

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
        </div>

        {/* Search */}
        <Card>
          <SettingsSearch
            onSearchResults={handleSearchResults}
            allSettings={allSettings}
          />
        </Card>

        <Card>
          <NotificationSettings
            isExpanded={expandedSections?.notifications}
            onToggle={() => toggleSection('notifications')}
          />
        </Card>

        <Card>
          <DataManagement
            isExpanded={expandedSections?.data}
            onToggle={() => toggleSection('data')}
          />
        </Card>

        <Card>
          <AppPreferences
            isExpanded={expandedSections?.preferences}
            onToggle={() => toggleSection('preferences')}
          />
        </Card>

        <Card>
            <PrivacySecurity
              isExpanded={expandedSections?.privacy}
              onToggle={() => toggleSection('privacy')}
            />
        </Card>

        <Card>
            <SupportHelp
              isExpanded={expandedSections?.support}
              onToggle={() => toggleSection('support')}
            />
        </Card>

        <Card>
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
        </Card>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            CatCare Tracker • Version 1.2.3 • © {new Date()?.getFullYear()} All rights reserved
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Caring for your feline friends with love and technology
          </p>
        </div>
      </>
  );
};

export default SettingsPreferences;