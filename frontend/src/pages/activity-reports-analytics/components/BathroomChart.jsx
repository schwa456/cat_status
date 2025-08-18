import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const BathroomChart = ({ selectedCat, dateRange }) => {
  const bathroomData = [
    { date: '08/07', urination: 4, bowelMovement: 2 },
    { date: '08/08', urination: 5, bowelMovement: 1 },
    { date: '08/09', urination: 3, bowelMovement: 2 },
    { date: '08/10', urination: 4, bowelMovement: 2 },
    { date: '08/11', urination: 6, bowelMovement: 3 },
    { date: '08/12', urination: 4, bowelMovement: 1 },
    { date: '08/13', urination: 5, bowelMovement: 2 },
    { date: '08/14', urination: 4, bowelMovement: 2 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value} times`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Droplets" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Bathroom Activity</h3>
            <p className="text-sm text-muted-foreground">Daily urination and bowel movement tracking</p>
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
          <LineChart data={bathroomData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Line 
              type="monotone" 
              dataKey="urination" 
              stroke="var(--color-primary)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
              name="Urination"
            />
            <Line 
              type="monotone" 
              dataKey="bowelMovement" 
              stroke="var(--color-accent)" 
              strokeWidth={3}
              dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              name="Bowel Movement"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Avg Urination</p>
          <p className="text-lg font-semibold text-primary">4.4/day</p>
          <p className="text-xs text-muted-foreground">Normal range: 3-5</p>
        </div>
        <div className="text-center p-3 bg-accent/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Avg Bowel Movement</p>
          <p className="text-lg font-semibold text-accent">1.9/day</p>
          <p className="text-xs text-muted-foreground">Normal range: 1-2</p>
        </div>
        <div className="text-center p-3 bg-success/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Health Status</p>
          <p className="text-lg font-semibold text-success">Normal</p>
          <p className="text-xs text-muted-foreground">Within healthy range</p>
        </div>
      </div>
    </div>
  );
};

export default BathroomChart;