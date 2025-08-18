import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Icon from '../../../components/AppIcon';

const MetricsPanel = ({ weeklyData, monthlyTrends }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-elevated">
          <p className="text-sm font-medium text-foreground mb-1">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm text-muted-foreground">
              <span className="capitalize">{entry?.dataKey}:</span>
              <span className="ml-1 font-medium text-foreground">{entry?.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const MetricCard = ({ title, value, change, icon, color = 'text-primary' }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className={`w-8 h-8 rounded-lg ${color?.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
          <Icon name={icon} size={16} className={color} />
        </div>
        {change && (
          <div className={`flex items-center space-x-1 text-xs ${
            change > 0 ? 'text-success' : change < 0 ? 'text-error' : 'text-muted-foreground'
          }`}>
            <Icon 
              name={change > 0 ? 'TrendingUp' : change < 0 ? 'TrendingDown' : 'Minus'} 
              size={12} 
            />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div className="text-2xl font-semibold text-foreground mb-1">{value}</div>
      <div className="text-xs text-muted-foreground">{title}</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Quick Metrics */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <h3 className="text-lg font-semibold text-foreground mb-4">This Week</h3>
        <div className="grid grid-cols-2 gap-4">
          <MetricCard
            title="Total Meals"
            value="21"
            change={5}
            icon="Utensils"
            color="text-success"
          />
          <MetricCard
            title="Play Sessions"
            value="14"
            change={-2}
            icon="Zap"
            color="text-accent"
          />
          <MetricCard
            title="Bathroom Visits"
            value="28"
            change={0}
            icon="Droplets"
            color="text-primary"
          />
          <MetricCard
            title="Health Score"
            value="95"
            change={3}
            icon="Heart"
            color="text-secondary"
          />
        </div>
      </div>

      {/* Weekly Activity Chart */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Weekly Activity</h3>
          <div className="flex items-center space-x-2 text-xs text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span>Meals</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span>Bathroom</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span>Play</span>
            </div>
          </div>
        </div>
        
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="day" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="meals" fill="var(--color-success)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="bathroom" fill="var(--color-primary)" radius={[2, 2, 0, 0]} />
              <Bar dataKey="play" fill="var(--color-accent)" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Monthly Trends</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            View Details
          </button>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrends} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                dataKey="week" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="healthScore" 
                stroke="var(--color-secondary)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-secondary)', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="activityLevel" 
                stroke="var(--color-accent)" 
                strokeWidth={2}
                dot={{ fill: 'var(--color-accent)', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default MetricsPanel;