import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const NotificationSettings = ({ isExpanded, onToggle }) => {
  const [notifications, setNotifications] = useState({
    feedingReminders: true,
    medicationAlerts: true,
    healthCheckPrompts: true,
    activityReminders: false,
    weeklyReports: true,
    emergencyAlerts: true
  });

  const [feedingTimes, setFeedingTimes] = useState([
    { id: 1, time: '08:00', enabled: true, label: 'Morning' },
    { id: 2, time: '18:00', enabled: true, label: 'Evening' },
    { id: 3, time: '22:00', enabled: false, label: 'Night' }
  ]);

  const [medicationSchedule, setMedicationSchedule] = useState([
    { id: 1, name: 'Flea Prevention', time: '09:00', frequency: 'Monthly', nextDue: '2025-09-14' },
    { id: 2, name: 'Heartworm Prevention', time: '09:00', frequency: 'Monthly', nextDue: '2025-09-20' }
  ]);

  const toggleNotification = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev?.[key] }));
  };

  const toggleFeedingTime = (id) => {
    setFeedingTimes(prev => prev?.map(time => 
      time?.id === id ? { ...time, enabled: !time?.enabled } : time
    ));
  };

  const updateFeedingTime = (id, newTime) => {
    setFeedingTimes(prev => prev?.map(time => 
      time?.id === id ? { ...time, time: newTime } : time
    ));
  };

  const addFeedingTime = () => {
    const newId = Math.max(...feedingTimes?.map(t => t?.id)) + 1;
    setFeedingTimes(prev => [...prev, {
      id: newId,
      time: '12:00',
      enabled: true,
      label: 'Custom'
    }]);
  };

  const removeFeedingTime = (id) => {
    setFeedingTimes(prev => prev?.filter(time => time?.id !== id));
  };

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-muted/50 transition-colors duration-200"
      >
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
            <p className="text-sm text-muted-foreground">Customize reminder schedules and alerts</p>
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
            {/* General Notifications */}
            <div>
              <h4 className="font-medium text-foreground mb-4">General Notifications</h4>
              <div className="space-y-4">
                {[
                  { key: 'feedingReminders', label: 'Feeding Reminders', desc: 'Get notified when it\'s time to feed your cats' },
                  { key: 'medicationAlerts', label: 'Medication Alerts', desc: 'Reminders for scheduled medications and treatments' },
                  { key: 'healthCheckPrompts', label: 'Health Check Prompts', desc: 'Regular reminders to monitor your cat\'s health' },
                  { key: 'activityReminders', label: 'Activity Reminders', desc: 'Prompts to log daily activities and behaviors' },
                  { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Summary of your cat\'s weekly health and activity data' },
                  { key: 'emergencyAlerts', label: 'Emergency Alerts', desc: 'Critical health alerts and urgent notifications' }
                ]?.map((item) => (
                  <div key={item?.key} className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{item?.label}</p>
                      <p className="text-xs text-muted-foreground">{item?.desc}</p>
                    </div>
                    <button
                      onClick={() => toggleNotification(item?.key)}
                      className={`w-12 h-6 rounded-full relative transition-colors duration-200 ${
                        notifications?.[item?.key] ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform duration-200 ${
                        notifications?.[item?.key] ? 'right-0.5' : 'left-0.5'
                      }`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Feeding Schedule */}
            {notifications?.feedingReminders && (
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">Feeding Schedule</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addFeedingTime}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Time
                  </Button>
                </div>
                <div className="space-y-3">
                  {feedingTimes?.map((feeding) => (
                    <div key={feeding?.id} className="flex items-center space-x-4 p-3 bg-muted/30 rounded-lg">
                      <button
                        onClick={() => toggleFeedingTime(feeding?.id)}
                        className={`w-6 h-6 rounded-full relative transition-colors duration-200 ${
                          feeding?.enabled ? 'bg-success' : 'bg-muted'
                        }`}
                      >
                        {feeding?.enabled && (
                          <Icon name="Check" size={14} className="text-white absolute top-1 left-1" />
                        )}
                      </button>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-foreground">{feeding?.label} Feeding</p>
                      </div>
                      <Input
                        type="time"
                        value={feeding?.time}
                        onChange={(e) => updateFeedingTime(feeding?.id, e?.target?.value)}
                        className="w-32"
                      />
                      {feedingTimes?.length > 2 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFeedingTime(feeding?.id)}
                          iconName="Trash2"
                          iconSize={16}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Medication Schedule */}
            {notifications?.medicationAlerts && (
              <div className="border-t border-border pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-foreground">Medication Schedule</h4>
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Medication
                  </Button>
                </div>
                <div className="space-y-3">
                  {medicationSchedule?.map((med) => (
                    <div key={med?.id} className="p-4 bg-muted/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-medium text-foreground">{med?.name}</h5>
                        <span className="text-xs text-muted-foreground">{med?.frequency}</span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>{med?.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Next: {new Date(med.nextDue)?.toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notification Methods */}
            <div className="border-t border-border pt-6">
              <h4 className="font-medium text-foreground mb-4">Notification Methods</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Smartphone" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Push Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive notifications on this device</p>
                    </div>
                  </div>
                  <button className="w-12 h-6 bg-primary rounded-full relative transition-colors duration-200">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 transition-transform duration-200"></div>
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Email Notifications</p>
                      <p className="text-xs text-muted-foreground">Receive notifications via email</p>
                    </div>
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

export default NotificationSettings;