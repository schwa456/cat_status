import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const WeightTrendChart = ({ selectedCat, dateRange }) => {
  const weightData = [
    { date: '07/14', weight: 12.1, idealMin: 11.5, idealMax: 13.0 },
    { date: '07/21', weight: 12.0, idealMin: 11.5, idealMax: 13.0 },
    { date: '07/28', weight: 12.2, idealMin: 11.5, idealMax: 13.0 },
    { date: '08/04', weight: 12.3, idealMin: 11.5, idealMax: 13.0 },
    { date: '08/11', weight: 12.4, idealMin: 11.5, idealMax: 13.0 },
    { date: '08/14', weight: 12.3, idealMin: 11.5, idealMax: 13.0 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const weightEntry = payload?.find(p => p?.dataKey === 'weight');
      if (weightEntry) {
        return (
          <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
            <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
            <p className="text-sm text-secondary">Weight: {weightEntry?.value} lbs</p>
            <p className="text-xs text-muted-foreground mt-1">Ideal range: 11.5 - 13.0 lbs</p>
          </div>
        );
      }
    }
    return null;
  };

  const getWeightStatus = (weight) => {
    if (weight < 11.5) return { status: 'Underweight', color: 'text-warning' };
    if (weight > 13.0) return { status: 'Overweight', color: 'text-error' };
    return { status: 'Healthy', color: 'text-success' };
  };

  const currentWeight = weightData?.[weightData?.length - 1]?.weight;
  const weightStatus = getWeightStatus(currentWeight);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-secondary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weight Trend</h3>
            <p className="text-sm text-muted-foreground">Weekly weight monitoring (lbs)</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" iconName="Download">
            Export
          </Button>
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={weightData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              domain={['dataMin - 0.5', 'dataMax + 0.5']}
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            
            {/* Ideal weight range */}
            <ReferenceLine 
              y={11.5} 
              stroke="var(--color-success)" 
              strokeDasharray="5 5" 
              strokeOpacity={0.6}
            />
            <ReferenceLine 
              y={13.0} 
              stroke="var(--color-success)" 
              strokeDasharray="5 5" 
              strokeOpacity={0.6}
            />
            
            <Line 
              type="monotone" 
              dataKey="weight" 
              stroke="var(--color-secondary)" 
              strokeWidth={4}
              dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, stroke: 'var(--color-secondary)', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-secondary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Current Weight</p>
          <p className="text-lg font-semibold text-secondary">{currentWeight} lbs</p>
        </div>
        <div className="text-center p-3 bg-muted rounded-lg">
          <p className="text-sm text-muted-foreground">Weight Status</p>
          <p className={`text-lg font-semibold ${weightStatus?.color}`}>{weightStatus?.status}</p>
        </div>
        <div className="text-center p-3 bg-success/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Ideal Range</p>
          <p className="text-lg font-semibold text-success">11.5 - 13.0</p>
        </div>
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Monthly Change</p>
          <p className="text-lg font-semibold text-primary">+0.2 lbs</p>
        </div>
      </div>
    </div>
  );
};

export default WeightTrendChart;