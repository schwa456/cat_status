import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DataManagement = ({ isExpanded, onToggle }) => {
  const [backupStatus, setBackupStatus] = useState({
    lastBackup: '2025-08-10 14:30:00',
    autoBackup: true,
    cloudStorage: 'Google Drive',
    backupSize: '2.4 MB'
  });

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [exportProgress, setExportProgress] = useState(null);

  const handleBackupNow = () => {
    // Mock backup process
    setBackupStatus(prev => ({
      ...prev,
      lastBackup: new Date()?.toISOString()?.replace('T', ' ')?.slice(0, 19)
    }));
  };

  const handleExport = (type) => {
    setExportProgress({ type, progress: 0 });
    
    // Mock export progress
    const interval = setInterval(() => {
      setExportProgress(prev => {
        if (prev?.progress >= 100) {
          clearInterval(interval);
          setTimeout(() => setExportProgress(null), 1000);
          return { ...prev, progress: 100 };
        }
        return { ...prev, progress: prev?.progress + 20 };
      });
    }, 500);
  };

  const handleDeleteData = () => {
    // Mock data deletion
    setShowDeleteConfirm(false);
  };

  const toggleAutoBackup = () => {
    setBackupStatus(prev => ({ ...prev, autoBackup: !prev?.autoBackup }));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Database" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Data Management</h3>
            <p className="text-sm text-muted-foreground">Backup, export, and manage your pet data</p>
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
            {/* Backup & Restore */}
            <div>
              <h4 className="font-medium text-foreground mb-4">Backup & Restore</h4>
              <div className="bg-muted/30 p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">Automatic Backup</p>
                    <p className="text-xs text-muted-foreground">Backup data daily to cloud storage</p>
                  </div>
                  <button
                    onClick={toggleAutoBackup}
                    className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                      backupStatus?.autoBackup ? 'bg-success' : 'bg-muted'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                      backupStatus?.autoBackup ? 'right-0.5' : 'left-0.5'
                    }`}></div>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Last Backup:</span>
                    <p className="font-medium text-foreground">{new Date(backupStatus.lastBackup)?.toLocaleString()}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Storage:</span>
                    <p className="font-medium text-foreground">{backupStatus?.cloudStorage}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Backup Size:</span>
                    <p className="font-medium text-foreground">{backupStatus?.backupSize}</p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Status:</span>
                    <p className="font-medium text-success">Up to date</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <Button
                    variant="default"
                    onClick={handleBackupNow}
                    iconName="Upload"
                    iconPosition="left"
                  >
                    Backup Now
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Download"
                    iconPosition="left"
                  >
                    Restore Data
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Settings"
                    iconPosition="left"
                  >
                    Storage Settings
                  </Button>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Export Data</h4>
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Export your pet's health records and activity data for veterinary visits or personal records.
                </p>

                {exportProgress && (
                  <div className="bg-primary/10 p-4 rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Download" size={16} className="text-primary" />
                      <span className="text-sm font-medium text-primary">
                        Exporting {exportProgress?.type}...
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ width: `${exportProgress?.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{exportProgress?.progress}% complete</p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="FileText" size={20} className="text-primary" />
                      <h5 className="font-medium text-foreground">Health Records</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete medical history, test results, and veterinary notes
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => handleExport('Health Records')}
                      disabled={exportProgress !== null}
                    >
                      Export as PDF
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Activity" size={20} className="text-accent" />
                      <h5 className="font-medium text-foreground">Activity Data</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Daily activities, feeding logs, and behavior patterns
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => handleExport('Activity Data')}
                      disabled={exportProgress !== null}
                    >
                      Export as CSV
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="BarChart3" size={20} className="text-secondary" />
                      <h5 className="font-medium text-foreground">Analytics Report</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Comprehensive health trends and activity analytics
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => handleExport('Analytics Report')}
                      disabled={exportProgress !== null}
                    >
                      Export Report
                    </Button>
                  </div>

                  <div className="p-4 border border-border rounded-lg">
                    <div className="flex items-center space-x-3 mb-2">
                      <Icon name="Package" size={20} className="text-success" />
                      <h5 className="font-medium text-foreground">Complete Backup</h5>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Full data export including all records and settings
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      fullWidth
                      onClick={() => handleExport('Complete Backup')}
                      disabled={exportProgress !== null}
                    >
                      Export All Data
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Data Deletion */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Data Deletion</h4>
              <div className="bg-error/5 border border-error/20 p-4 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
                  <div className="flex-1">
                    <h5 className="font-medium text-error mb-1">Delete All Data</h5>
                    <p className="text-sm text-muted-foreground mb-4">
                      Permanently delete all pet records, activities, and health data. This action cannot be undone.
                    </p>
                    
                    {showDeleteConfirm ? (
                      <div className="space-y-3">
                        <p className="text-sm font-medium text-error">
                          Are you sure you want to delete all data? This action is irreversible.
                        </p>
                        <div className="flex space-x-3">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={handleDeleteData}
                          >
                            Yes, Delete All Data
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setShowDeleteConfirm(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => setShowDeleteConfirm(true)}
                        iconName="Trash2"
                        iconPosition="left"
                      >
                        Delete All Data
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

export default DataManagement;