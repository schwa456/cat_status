import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RemindersPanel = ({ reminders, onCompleteReminder, onSnoozeReminder, onAddReminder }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newReminder, setNewReminder] = useState({
    title: '',
    type: 'medication',
    time: '',
    frequency: 'daily'
  });

  const getReminderIcon = (type) => {
    const icons = {
      medication: 'Pill',
      feeding: 'Utensils',
      grooming: 'Scissors',
      checkup: 'Stethoscope',
      vaccination: 'Shield',
      exercise: 'Zap'
    };
    return icons?.[type] || 'Bell';
  };

  const getReminderColor = (type, priority) => {
    if (priority === 'high') return 'text-error bg-error/10 border-error/20';
    if (priority === 'medium') return 'text-warning bg-warning/10 border-warning/20';
    
    const colors = {
      medication: 'text-warning bg-warning/10 border-warning/20',
      feeding: 'text-success bg-success/10 border-success/20',
      grooming: 'text-secondary bg-secondary/10 border-secondary/20',
      checkup: 'text-primary bg-primary/10 border-primary/20',
      vaccination: 'text-accent bg-accent/10 border-accent/20',
      exercise: 'text-accent bg-accent/10 border-accent/20'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted border-border';
  };

  const formatReminderTime = (time) => {
    return new Date(`2000-01-01T${time}`)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getTimeUntilReminder = (time) => {
    const now = new Date();
    const reminderTime = new Date();
    const [hours, minutes] = time?.split(':');
    reminderTime?.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    
    if (reminderTime < now) {
      reminderTime?.setDate(reminderTime?.getDate() + 1);
    }
    
    const diffInMinutes = Math.floor((reminderTime - now) / (1000 * 60));
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes} 분 후`;
    } else if (diffInMinutes < 1440) {
      const hours = Math.floor(diffInMinutes / 60);
      return `${hours} 시간 후`;
    } else {
      return '내일';
    }
  };

  const handleAddReminder = () => {
    if (newReminder?.title && newReminder?.time) {
      onAddReminder({
        ...newReminder,
        id: Date.now(),
        isActive: true,
        nextDue: new Date()?.toISOString()
      });
      setNewReminder({ title: '', type: 'medication', time: '', frequency: 'daily' });
      setShowAddForm(false);
    }
  };

  const upcomingReminders = reminders?.filter(r => r?.isActive);
  const overdueReminders = reminders?.filter(r => r?.isOverdue);

  return (
    <div className="space-y-6">
      {/* Overdue Reminders */}
      {overdueReminders?.length > 0 && (
        <div className="bg-error/5 border border-error/20 rounded-xl p-6">
          <div className="flex items-center space-x-2 mb-4">
            <Icon name="AlertTriangle" size={20} className="text-error" />
            <h3 className="text-lg font-semibold text-error">경과한 알림</h3>
          </div>
          
          <div className="space-y-3">
            {overdueReminders?.map((reminder) => (
              <div
                key={reminder?.id}
                className="flex items-center justify-between p-3 bg-card border border-error/20 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-error/10 flex items-center justify-center">
                    <Icon name={getReminderIcon(reminder?.type)} size={16} className="text-error" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{reminder?.title}</p>
                    <p className="text-sm text-error">{reminder?.overdueBy} 전</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onCompleteReminder(reminder?.id)}
                  >
                    완료
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Upcoming Reminders */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">다가오는 알림</h3>
          <Button
            variant="outline"
            size="sm"
            iconName="Plus"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            추가
          </Button>
        </div>

        {showAddForm && (
          <div className="mb-6 p-4 bg-muted/30 rounded-lg border border-border">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">제목</label>
                <input
                  type="text"
                  value={newReminder?.title}
                  onChange={(e) => setNewReminder({ ...newReminder, title: e?.target?.value })}
                  placeholder="예) 약 먹이기"
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">종류</label>
                <select
                  value={newReminder?.type}
                  onChange={(e) => setNewReminder({ ...newReminder, type: e?.target?.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="medication">약 주기</option>
                  <option value="feeding">밥 주기</option>
                  <option value="grooming">털 관리하기</option>
                  <option value="checkup">건강 검진 하기</option>
                  <option value="vaccination">백신 맞추기</option>
                  <option value="exercise">운동 하기</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">시간</label>
                <input
                  type="time"
                  value={newReminder?.time}
                  onChange={(e) => setNewReminder({ ...newReminder, time: e?.target?.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">주기</label>
                <select
                  value={newReminder?.frequency}
                  onChange={(e) => setNewReminder({ ...newReminder, frequency: e?.target?.value })}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                >
                  <option value="daily">매일</option>
                  <option value="weekly">매주</option>
                  <option value="monthly">매월</option>
                  <option value="once">한 번</option>
                </select>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="default" size="sm" onClick={handleAddReminder}>
                알림 추가
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowAddForm(false)}>
                취소
              </Button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {upcomingReminders?.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto mb-3">
                <Icon name="Bell" size={20} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">다가오는 알림이 없습니다.</p>
            </div>
          ) : (
            upcomingReminders?.map((reminder) => (
              <div
                key={reminder?.id}
                className={`flex items-center justify-between p-4 border rounded-lg ${getReminderColor(reminder?.type, reminder?.priority)}`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-current/10 flex items-center justify-center">
                    <Icon name={getReminderIcon(reminder?.type)} size={18} />
                  </div>
                  <div>
                    <p className="font-medium text-current">{reminder?.title}</p>
                    <div className="flex items-center space-x-2 text-sm opacity-80">
                      <span>{formatReminderTime(reminder?.time)}</span>
                      <span>•</span>
                      <span>{getTimeUntilReminder(reminder?.time)}</span>
                      <span>•</span>
                      <span className="capitalize">{reminder?.frequency}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onSnoozeReminder(reminder?.id)}
                    className="p-2 rounded-lg hover:bg-current/10 transition-colors duration-200"
                    title="Snooze for 15 minutes"
                  >
                    <Icon name="Clock" size={16} />
                  </button>
                  <button
                    onClick={() => onCompleteReminder(reminder?.id)}
                    className="p-2 rounded-lg hover:bg-current/10 transition-colors duration-200"
                    title="Mark as complete"
                  >
                    <Icon name="Check" size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default RemindersPanel;