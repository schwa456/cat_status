import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';


const FeedingChart = ({ selectedCat, dateRange }) => {
  const feedingData = [
    { date: '08/07', breakfast: 1, lunch: 1, dinner: 1, treats: 2 },
    { date: '08/08', breakfast: 1, lunch: 1, dinner: 1, treats: 3 },
    { date: '08/09', breakfast: 1, lunch: 0, dinner: 1, treats: 1 },
    { date: '08/10', breakfast: 1, lunch: 1, dinner: 1, treats: 2 },
    { date: '08/11', breakfast: 1, lunch: 1, dinner: 1, treats: 4 },
    { date: '08/12', breakfast: 1, lunch: 1, dinner: 1, treats: 2 },
    { date: '08/13', breakfast: 1, lunch: 1, dinner: 1, treats: 3 },
    { date: '08/14', breakfast: 1, lunch: 1, dinner: 1, treats: 1 }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="font-medium text-foreground mb-2">{`Date: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.dataKey}: ${entry?.value}`}
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
          <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
            <Icon name="Utensils" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Feeding Patterns</h3>
            <p className="text-sm text-muted-foreground">Daily meal and treat distribution</p>
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
          <BarChart data={feedingData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
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
            <Bar 
              dataKey="breakfast" 
              stackId="a" 
              fill="var(--color-success)" 
              name="Breakfast"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="lunch" 
              stackId="a" 
              fill="var(--color-accent)" 
              name="Lunch"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="dinner" 
              stackId="a" 
              fill="var(--color-primary)" 
              name="Dinner"
              radius={[0, 0, 0, 0]}
            />
            <Bar 
              dataKey="treats" 
              stackId="a" 
              fill="var(--color-secondary)" 
              name="Treats"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-success/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Breakfast</p>
          <p className="text-lg font-semibold text-success">100%</p>
        </div>
        <div className="text-center p-3 bg-accent/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Lunch</p>
          <p className="text-lg font-semibold text-accent">87.5%</p>
        </div>
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Dinner</p>
          <p className="text-lg font-semibold text-primary">100%</p>
        </div>
        <div className="text-center p-3 bg-secondary/5 rounded-lg">
          <p className="text-sm text-muted-foreground">Avg Treats</p>
          <p className="text-lg font-semibold text-secondary">2.3/day</p>
        </div>
      </div>
    </div>
  );
};

export default FeedingChart;