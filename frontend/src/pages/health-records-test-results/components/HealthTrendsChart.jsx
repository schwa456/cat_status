import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HealthTrendsChart = ({ records, selectedCat }) => {
  const [selectedMetric, setSelectedMetric] = useState('glucose');
  const [chartType, setChartType] = useState('line');
  const [timeRange, setTimeRange] = useState('6months');

  const metricOptions = [
    { value: 'glucose', label: 'Glucose', unit: 'mg/dL', normalRange: [70, 140] },
    { value: 'protein', label: 'Total Protein', unit: 'g/dL', normalRange: [5.4, 7.8] },
    { value: 'wbc', label: 'White Blood Cells', unit: 'K/μL', normalRange: [5.5, 19.5] },
    { value: 'rbc', label: 'Red Blood Cells', unit: 'M/μL', normalRange: [5.0, 10.0] },
    { value: 'creatinine', label: 'Creatinine', unit: 'mg/dL', normalRange: [0.8, 2.4] },
    { value: 'bun', label: 'BUN', unit: 'mg/dL', normalRange: [16, 36] }
  ];

  const timeRangeOptions = [
    { value: '3months', label: 'Last 3 Months' },
    { value: '6months', label: 'Last 6 Months' },
    { value: '1year', label: 'Last Year' },
    { value: '2years', label: 'Last 2 Years' },
    { value: 'all', label: 'All Time' }
  ];

  const chartTypeOptions = [
    { value: 'line', label: 'Line Chart', icon: 'TrendingUp' },
    { value: 'bar', label: 'Bar Chart', icon: 'BarChart3' }
  ];

  // Process data for charts
  const processChartData = () => {
    const bloodWorkRecords = records?.filter(record => 
      record?.type === 'blood-work' && 
      record?.testResults && 
      record?.testResults?.length > 0
    );

    // Filter by time range
    const now = new Date();
    const timeRangeMap = {
      '3months': 3 * 30 * 24 * 60 * 60 * 1000,
      '6months': 6 * 30 * 24 * 60 * 60 * 1000,
      '1year': 365 * 24 * 60 * 60 * 1000,
      '2years': 2 * 365 * 24 * 60 * 60 * 1000,
      'all': Infinity
    };

    const filteredRecords = bloodWorkRecords?.filter(record => {
      const recordDate = new Date(record.date);
      return now - recordDate <= timeRangeMap?.[timeRange];
    });

    // Extract data for selected metric
    const chartData = [];
    const selectedMetricInfo = metricOptions?.find(m => m?.value === selectedMetric);

    filteredRecords?.forEach(record => {
      const testResult = record?.testResults?.find(test => 
        test?.name?.toLowerCase()?.includes(selectedMetric) ||
        (selectedMetric === 'wbc' && test?.name?.toLowerCase()?.includes('white blood')) ||
        (selectedMetric === 'rbc' && test?.name?.toLowerCase()?.includes('red blood')) ||
        (selectedMetric === 'protein' && test?.name?.toLowerCase()?.includes('protein'))
      );

      if (testResult) {
        chartData?.push({
          date: new Date(record.date)?.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: timeRange === 'all' || timeRange === '2years' ? 'numeric' : undefined
          }),
          value: parseFloat(testResult?.value),
          status: testResult?.status,
          fullDate: new Date(record.date),
          normalMin: selectedMetricInfo?.normalRange?.[0],
          normalMax: selectedMetricInfo?.normalRange?.[1],
          unit: testResult?.unit || selectedMetricInfo?.unit
        });
      }
    });

    return chartData?.sort((a, b) => a?.fullDate - b?.fullDate);
  };

  const chartData = processChartData();
  const selectedMetricInfo = metricOptions?.find(m => m?.value === selectedMetric);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-card border border-border rounded-lg shadow-elevated p-3">
          <p className="font-medium text-foreground">{label}</p>
          <p className={`text-sm ${
            data?.status === 'normal' ? 'text-green-600' :
            data?.status === 'high' ? 'text-red-600' : 'text-orange-600'
          }`}>
            {selectedMetricInfo?.label}: {data?.value} {data?.unit}
          </p>
          <p className="text-xs text-muted-foreground">
            Normal: {data?.normalMin}-{data?.normalMax} {data?.unit}
          </p>
          <p className="text-xs text-muted-foreground capitalize">
            Status: {data?.status}
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData?.length === 0) {
    return (
      <div className="bg-card border border-border rounded-lg shadow-soft p-8">
        <div className="text-center">
          <Icon name="TrendingUp" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Trend Data Available</h3>
          <p className="text-muted-foreground mb-4">
            Add blood work records to see health trends and patterns over time.
          </p>
          <Button iconName="Plus">Add Blood Work Record</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft">
      {/* Chart Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Health Trends</h3>
            <p className="text-sm text-muted-foreground">
              Tracking {selectedMetricInfo?.label} levels for {selectedCat?.name}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            {chartTypeOptions?.map((type) => (
              <Button
                key={type?.value}
                variant={chartType === type?.value ? "default" : "outline"}
                size="sm"
                iconName={type?.icon}
                onClick={() => setChartType(type?.value)}
              >
                {type?.label}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Metric"
            options={metricOptions?.map(metric => ({
              value: metric?.value,
              label: metric?.label,
              description: `Normal: ${metric?.normalRange?.[0]}-${metric?.normalRange?.[1]} ${metric?.unit}`
            }))}
            value={selectedMetric}
            onChange={setSelectedMetric}
          />
          
          <Select
            label="Time Range"
            options={timeRangeOptions}
            value={timeRange}
            onChange={setTimeRange}
          />
        </div>
      </div>
      {/* Chart Content */}
      <div className="p-6">
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                {/* Normal range area */}
                <Line
                  type="monotone"
                  dataKey="normalMin"
                  stroke="var(--color-success)"
                  strokeDasharray="5 5"
                  dot={false}
                  name="Normal Min"
                />
                <Line
                  type="monotone"
                  dataKey="normalMax"
                  stroke="var(--color-success)"
                  strokeDasharray="5 5"
                  dot={false}
                  name="Normal Max"
                />
                
                {/* Actual values */}
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--color-primary)"
                  strokeWidth={3}
                  dot={{ fill: 'var(--color-primary)', strokeWidth: 2, r: 4 }}
                  name={selectedMetricInfo?.label}
                />
              </LineChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="date" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                  domain={['dataMin - 10', 'dataMax + 10']}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                
                <Bar 
                  dataKey="value" 
                  fill="var(--color-primary)"
                  name={selectedMetricInfo?.label}
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Summary */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="TrendingUp" size={16} className="text-success" />
              <span className="text-sm font-medium text-foreground">Latest Value</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {chartData?.[chartData?.length - 1]?.value} {chartData?.[chartData?.length - 1]?.unit}
            </p>
            <p className={`text-xs ${
              chartData?.[chartData?.length - 1]?.status === 'normal' ? 'text-success' :
              chartData?.[chartData?.length - 1]?.status === 'high' ? 'text-error' : 'text-warning'
            }`}>
              {chartData?.[chartData?.length - 1]?.status?.toUpperCase()}
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="BarChart3" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Average</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {(chartData?.reduce((sum, item) => sum + item?.value, 0) / chartData?.length)?.toFixed(1)} {selectedMetricInfo?.unit}
            </p>
            <p className="text-xs text-muted-foreground">
              Over {chartData?.length} readings
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Activity" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">Normal Range</span>
            </div>
            <p className="text-lg font-semibold text-foreground">
              {selectedMetricInfo?.normalRange?.[0]}-{selectedMetricInfo?.normalRange?.[1]} {selectedMetricInfo?.unit}
            </p>
            <p className="text-xs text-muted-foreground">
              Reference range
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthTrendsChart;