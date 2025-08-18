import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const PlayActivityChart = ({ selectedCat, dateRange }) => {
  const playData = [
    { date: '08/07', morning: 45, afternoon: 60, evening: 90 },
    { date: '08/08', morning: 30, afternoon: 75, evening: 120 },
    { date: '08/09', morning: 60, afternoon: 45, evening: 80 },
    { date: '08/10', morning: 40, afternoon: 90, evening: 100 },
    { date: '08/11', morning: 55, afternoon: 30, evening: 110 },
    { date: '08/12', morning: 35, afternoon: 85, evening: 95 },
    { date: '08/13', morning: 50, afternoon: 70, evening: 105 },
    { date: '08/14', morning: 45, afternoon: 55, evening: 85 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const total = payload?.reduce((sum, entry) => sum + entry?.value, 0);
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value} min`}
            </p>
          ))}
          <div className="border-t border-border mt-2 pt-2">
            <p className="text-sm font-medium text-foreground">Total: {total} min</p>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
            <Icon name="Activity" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Play Activity Duration</h3>
            <p className="text-sm text-muted-foreground">Daily play time by period (minutes)</p>
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
          <AreaChart data={playData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="colorMorning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-success)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-success)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorAfternoon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-accent)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-accent)" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorEvening" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-secondary)" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="var(--color-secondary)" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis 
              dataKey="date" 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <YAxis 
              stroke="var(--color-muted-foreground)"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area
              type="monotone"
              dataKey="morning"
              stackId="1"
              stroke="var(--color-success)"
              fillOpacity={1}
              fill="url(#colorMorning)"
              name="Morning"
            />
            <Area
              type="monotone"
              dataKey="afternoon"
              stackId="1"
              stroke="var(--color-accent)"
              fillOpacity={1}
              fill="url(#colorAfternoon)"
              name="Afternoon"
            />
            <Area
              type="monotone"
              dataKey="evening"
              stackId="1"
              stroke="var(--color-secondary)"
              fillOpacity={1}
              fill="url(#colorEvening)"
              name="Evening"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-success/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Morning Avg</p>
          <p className="text-lg font-semibold text-success">45 min</p>
        </div>
        <div className="text-center p-3 bg-accent/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Afternoon Avg</p>
          <p className="text-lg font-semibold text-accent">64 min</p>
        </div>
        <div className="text-center p-3 bg-secondary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Evening Avg</p>
          <p className="text-lg font-semibold text-secondary">98 min</p>
        </div>
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Daily Total</p>
          <p className="text-lg font-semibold text-primary">3.4 hrs</p>
        </div>
      </div>
    </div>
  );
};

export default PlayActivityChart;