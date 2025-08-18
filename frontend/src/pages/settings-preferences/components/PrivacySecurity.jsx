import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PrivacySecurity = ({ isExpanded, onToggle }) => {
  const [privacySettings, setPrivacySettings] = useState({
    dataSharing: false,
    veterinaryAccess: true,
    analyticsTracking: false,
    crashReporting: true,
    locationServices: false,
    biometricAuth: false
  });

  const [showAccountDeletion, setShowAccountDeletion] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const togglePrivacySetting = (key) => {
    setPrivacySettings(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const handleAccountDeletion = () => {
    // Mock account deletion process
    setShowAccountDeletion(false);
  };

  const handleTwoFactorSetup = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  const privacyOptions = [
    {
      key: 'dataSharing',
      title: 'Data Sharing',
      description: 'Share anonymized data to improve pet health research',
      icon: 'Share2',
      critical: false
    },
    {
      key: 'veterinaryAccess',
      title: 'Veterinary Access',
      description: 'Allow veterinarians to access your pet\'s health records',
      icon: 'Stethoscope',
      critical: false
    },
    {
      key: 'analyticsTracking',
      title: 'Analytics Tracking',
      description: 'Help improve the app with usage analytics',
      icon: 'BarChart3',
      critical: false
    },
    {
      key: 'crashReporting',
      title: 'Crash Reporting',
      description: 'Automatically send crash reports to improve stability',
      icon: 'AlertTriangle',
      critical: false
    },
    {
      key: 'locationServices',
      title: 'Location Services',
      description: 'Use location for nearby veterinary services',
      icon: 'MapPin',
      critical: false
    },
    {
      key: 'biometricAuth',
      title: 'Biometric Authentication',
      description: 'Use fingerprint or face recognition to secure the app',
      icon: 'Fingerprint',
      critical: true
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-error/10 rounded-lg flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Privacy & Security</h3>
            <p className="text-sm text-muted-foreground">Manage data permissions and security settings</p>
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
            {/* Privacy Controls */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Privacy Controls</h4>
              <div className="space-y-4">
                {privacyOptions?.map((option) => (
                  <div key={option?.key} className="flex items-center justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        option?.critical ? 'bg-error/10' : 'bg-muted'
                      }`}>
                        <Icon 
                          name={option?.icon} 
                          size={16} 
                          className={option?.critical ? 'text-error' : 'text-muted-foreground'}
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <p className="text-sm font-medium text-foreground">{option?.title}</p>
                          {option?.critical && (
                            <span className="px-2 py-0.5 bg-error/10 text-error text-xs rounded-full">
                              Security
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">{option?.description}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => togglePrivacySetting(option?.key)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        privacySettings?.[option?.key] ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                        privacySettings?.[option?.key] ? 'right-0.5' : 'left-0.5'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Security Settings */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Security Settings</h4>
              <div className="space-y-4">
                {/* Two-Factor Authentication */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-success/10 rounded-lg flex items-center justify-center">
                        <Icon name="Smartphone" size={16} className="text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-xs text-muted-foreground">
                          {twoFactorEnabled ? 'Enabled' : 'Add an extra layer of security'}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={twoFactorEnabled ? "outline" : "default"}
                      size="sm"
                      onClick={handleTwoFactorSetup}
                    >
                      {twoFactorEnabled ? 'Disable' : 'Enable'}
                    </Button>
                  </div>
                  {twoFactorEnabled && (
                    <div className="bg-success/5 p-3 rounded-lg">
                      <div className="flex items-center space-x-2">
                        <Icon name="CheckCircle" size={16} className="text-success" />
                        <p className="text-sm text-success">Two-factor authentication is active</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Backup codes: 8 remaining
                      </p>
                    </div>
                  )}
                </div>

                {/* Session Management */}
                <div className="p-4 border border-border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Icon name="Monitor" size={16} className="text-warning" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Active Sessions</p>
                        <p className="text-xs text-muted-foreground">Manage your logged-in devices</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Smartphone" size={14} className="text-muted-foreground" />
                        <span>iPhone 15 Pro</span>
                        <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full">Current</span>
                      </div>
                      <span className="text-xs text-muted-foreground">San Francisco, CA</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon name="Monitor" size={14} className="text-muted-foreground" />
                        <span>MacBook Pro</span>
                      </div>
                      <span className="text-xs text-muted-foreground">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Rights */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Data Rights</h4>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Download"
                  iconPosition="left"
                >
                  Download My Data
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="FileText"
                  iconPosition="left"
                >
                  Privacy Policy
                </Button>
                <Button
                  variant="outline"
                  fullWidth
                  iconName="Scale"
                  iconPosition="left"
                >
                  Terms of Service
                </Button>
              </div>
            </div>

            {/* Account Deletion */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Danger Zone</h4>
              <div className="bg-error/5 border border-error/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-error mb-1">Delete Account</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete your account and all associated data. This action cannot be undone.
                    </p>
                    
                    {showAccountDeletion ? (
                      <div className="space-y-3">
                        <div className="bg-error/10 p-3 rounded-lg">
                          <p className="text-sm font-medium text-error mb-2">
                            Before deleting your account:
                          </p>
                          <ul className="text-xs text-muted-foreground space-y-1">
                            <li>• Export your pet's health records</li>
                            <li>• Cancel any active subscriptions</li>
                            <li>• Inform your veterinarian about data access changes</li>
                          </ul>
                        </div>
                        <div className="flex space-x-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleAccountDeletion}
                          >
                            Yes, Delete My Account
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowAccountDeletion(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setShowAccountDeletion(true)}
                        iconName="Trash2"
                        iconPosition="left"
                      >
                        Delete Account
                      </Button>
                    )}
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

export default PrivacySecurity;