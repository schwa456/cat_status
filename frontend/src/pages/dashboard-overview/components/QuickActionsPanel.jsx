import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsPanel = ({ onQuickLog, selectedCat }) => {
  const [showQuickLogModal, setShowQuickLogModal] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);
  const [quickLogData, setQuickLogData] = useState({
    type: '',
    notes: '',
    amount: '',
    duration: ''
  });

  const quickActions = [
    {
      id: 'feeding',
      label: '식사량 기록',
      icon: 'Utensils',
      color: 'text-success bg-success/10 hover:bg-success/20',
      description: '식사 시간과 양을 기록하세요.'
    },
    {
      id: 'bathroom',
      label: '화장실',
      icon: 'Droplets',
      color: 'text-primary bg-primary/10 hover:bg-primary/20',
      description: '화장실 사용량을 기록하세요.'
    },
    {
      id: 'play',
      label: '놀이 시간',
      icon: 'Zap',
      color: 'text-accent bg-accent/10 hover:bg-accent/20',
      description: '놀이 시간과 활동 정도를 기록하세요.'
    },
    {
      id: 'medication',
      label: '약 복용',
      icon: 'Pill',
      color: 'text-warning bg-warning/10 hover:bg-warning/20',
      description: '약 복용 내역을 기록하세요.'
    },
    {
      id: 'grooming',
      label: '그루밍',
      icon: 'Scissors',
      color: 'text-secondary bg-secondary/10 hover:bg-secondary/20',
      description: '그루밍 활동을 기록하세요.'
    },
    {
      id: 'behavior',
      label: '특이사항',
      icon: 'Activity',
      color: 'text-foreground bg-muted hover:bg-muted/80',
      description: '특이사항을 기록하세요.'
    }
  ];

  const handleQuickAction = (action) => {
    setSelectedAction(action);
    setQuickLogData({ ...quickLogData, type: action?.id });
    setShowQuickLogModal(true);
  };

  const handleQuickLog = () => {
    if (quickLogData?.type) {
      const logEntry = {
        id: Date.now(),
        catId: selectedCat?.id,
        type: quickLogData?.type,
        timestamp: new Date()?.toISOString(),
        description: quickLogData?.notes || `${selectedAction?.label} logged`,
        details: {}
      };

      // Add specific details based on type
      if (quickLogData?.amount) {
        logEntry.details.amount = quickLogData?.amount;
      }
      if (quickLogData?.duration) {
        logEntry.details.duration = quickLogData?.duration;
      }

      onQuickLog(logEntry);
      setShowQuickLogModal(false);
      setQuickLogData({ type: '', notes: '', amount: '', duration: '' });
      setSelectedAction(null);
    }
  };

  const getFieldsForType = (type) => {
    switch (type) {
      case 'feeding':
        return [
          { key: 'amount', label: '식사량', placeholder: 'e.g., 1/2 cup, 50g', type: 'text' }
        ];
      case 'play':
        return [
          { key: 'duration', label: '놀이 시간 (분)', placeholder: 'e.g., 15', type: 'number' }
        ];
      case 'medication':
        return [
          { key: 'amount', label: '투여량', placeholder: 'e.g., 1 tablet, 5ml', type: 'text' }
        ];
      default:
        return [];
    }
  };

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">빠른 기록</h3>
          <div className="text-xs text-muted-foreground">
            {selectedCat ? `${selectedCat?.name}` : '고양이를 선택하세요.'}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
          {quickActions?.map((action) => (
            <button
              key={action?.id}
              onClick={() => handleQuickAction(action)}
              disabled={!selectedCat}
              className={`flex items-center space-x-3 p-4 rounded-lg border border-border transition-all duration-200 text-left ${
                selectedCat 
                  ? `${action?.color} hover:scale-[1.02] hover:shadow-soft` 
                  : 'bg-muted/50 text-muted-foreground cursor-not-allowed'
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                selectedCat ? 'bg-current/10' : 'bg-muted'
              }`}>
                <Icon name={action?.icon} size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{action?.label}</p>
                <p className="text-xs opacity-80 truncate">{action?.description}</p>
              </div>
            </button>
          ))}
        </div>

        {!selectedCat && (
          <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2">
              <Icon name="Info" size={16} className="text-warning" />
              <p className="text-sm text-warning">고양이를 선택해주세요.</p>
            </div>
          </div>
        )}
      </div>
      {/* Quick Log Modal */}
      {showQuickLogModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-xl p-6 w-full max-w-md shadow-elevated">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${selectedAction?.color}`}>
                  <Icon name={selectedAction?.icon} size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{selectedAction?.label}</h3>
                  <p className="text-sm text-muted-foreground">For {selectedCat?.name}</p>
                </div>
              </div>
              <button
                onClick={() => setShowQuickLogModal(false)}
                className="p-2 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <Icon name="X" size={18} className="text-muted-foreground" />
              </button>
            </div>

            <div className="space-y-4">
              {getFieldsForType(quickLogData?.type)?.map((field) => (
                <div key={field?.key}>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    {field?.label}
                  </label>
                  <input
                    type={field?.type}
                    value={quickLogData?.[field?.key]}
                    onChange={(e) => setQuickLogData({ ...quickLogData, [field?.key]: e?.target?.value })}
                    placeholder={field?.placeholder}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  특이사항 (선택)
                </label>
                <textarea
                  value={quickLogData?.notes}
                  onChange={(e) => setQuickLogData({ ...quickLogData, notes: e?.target?.value })}
                  placeholder="추가적으로 기록할 내용이 있으면 작성하세요."
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none"
                />
              </div>

              <div className="flex items-center space-x-3 pt-4">
                <Button
                  variant="default"
                  onClick={handleQuickLog}
                  className="flex-1"
                >
                  활동내역 기록
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowQuickLogModal(false)}
                >
                  취소
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuickActionsPanel;