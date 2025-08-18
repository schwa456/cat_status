import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AccountSettings = ({ isExpanded, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  });
  const [editData, setEditData] = useState({ ...profileData });
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleSave = () => {
    setProfileData({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profileData });
    setIsEditing(false);
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordSave = () => {
    // Mock password change
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    setShowPasswordChange(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="User" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Account Settings</h3>
            <p className="text-sm text-muted-foreground">Manage your profile and account information</p>
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
            {/* Profile Section */}
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-full overflow-hidden bg-muted">
                  <Image
                    src={profileData?.avatar}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-20"
                  iconName="Camera"
                  iconSize={16}
                >
                  Change
                </Button>
              </div>

              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <>
                    <Input
                      label="Full Name"
                      value={editData?.name}
                      onChange={(e) => setEditData(prev => ({ ...prev, name: e?.target?.value }))}
                      placeholder="Enter your full name"
                    />
                    <Input
                      label="Email Address"
                      type="email"
                      value={editData?.email}
                      onChange={(e) => setEditData(prev => ({ ...prev, email: e?.target?.value }))}
                      placeholder="Enter your email"
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      value={editData?.phone}
                      onChange={(e) => setEditData(prev => ({ ...prev, phone: e?.target?.value }))}
                      placeholder="Enter your phone number"
                    />
                    <Input
                      label="Location"
                      value={editData?.location}
                      onChange={(e) => setEditData(prev => ({ ...prev, location: e?.target?.value }))}
                      placeholder="Enter your location"
                    />
                    <div className="flex space-x-3">
                      <Button variant="default" onClick={handleSave}>
                        Save Changes
                      </Button>
                      <Button variant="outline" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                        <p className="text-foreground">{profileData?.name}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <p className="text-foreground">{profileData?.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Phone</label>
                        <p className="text-foreground">{profileData?.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">Location</label>
                        <p className="text-foreground">{profileData?.location}</p>
                      </div>
                    </div>
                    <Button variant="outline" onClick={handleEdit} iconName="Edit" iconPosition="left">
                      Edit Profile
                    </Button>
                  </>
                )}
              </div>
            </div>

            {/* Password Section */}
            <div className="border-t border-border pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-foreground">Password</h4>
                  <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setShowPasswordChange(!showPasswordChange)}
                  iconName="Key"
                  iconPosition="left"
                >
                  Change Password
                </Button>
              </div>

              {showPasswordChange && (
                <div className="space-y-4 bg-muted/30 p-4 rounded-lg">
                  <Input
                    label="Current Password"
                    type="password"
                    value={passwordData?.currentPassword}
                    onChange={(e) => handlePasswordChange('currentPassword', e?.target?.value)}
                    placeholder="Enter current password"
                  />
                  <Input
                    label="New Password"
                    type="password"
                    value={passwordData?.newPassword}
                    onChange={(e) => handlePasswordChange('newPassword', e?.target?.value)}
                    placeholder="Enter new password"
                    description="Must be at least 8 characters with numbers and symbols"
                  />
                  <Input
                    label="Confirm New Password"
                    type="password"
                    value={passwordData?.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e?.target?.value)}
                    placeholder="Confirm new password"
                  />
                  <div className="flex space-x-3">
                    <Button variant="default" onClick={handlePasswordSave}>
                      Update Password
                    </Button>
                    <Button variant="outline" onClick={() => setShowPasswordChange(false)}>
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Email Preferences */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Email Preferences</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Account Updates</p>
                    <p className="text-xs text-muted-foreground">Important account and security notifications</p>
                  </div>
                  <button className="w-12 h-6 bg-primary rounded-full relative transition-colors duration-200">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform duration-200"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Marketing Emails</p>
                    <p className="text-xs text-muted-foreground">Product updates and promotional content</p>
                  </div>
                  <button className="w-12 h-6 bg-muted rounded-full relative transition-colors duration-200">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 left-0.5 transition-transform duration-200"></div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AccountSettings;