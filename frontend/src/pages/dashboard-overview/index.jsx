import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import QuickActionButton from '../../components/ui/QuickActionButton';
import CatProfileCard from './components/CatProfileCard';
import ActivityFeed from './components/ActivityFeed';
import MetricsPanel from './components/MetricsPanel';
import RemindersPanel from './components/RemindersPanel';
import QuickActionsPanel from './components/QuickActionsPanel';

const DashboardOverview = () => {
  const navigate = useNavigate();
  const [selectedCat, setSelectedCat] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activities, setActivities] = useState([]);
  const [reminders, setReminders] = useState([]);

  // Mock data for cats
  const mockCats = [
    {
      id: 1,
      name: "Whiskers",
      photo: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop&crop=face",
      breed: "Persian",
      birthDate: "2020-03-15",
      weight: "12.5",
      todayMeals: 3,
      playTime: 45,
      healthScore: 95,
      lastActivity: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 2,
      name: "Luna",
      photo: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop&crop=face",
      breed: "Maine Coon",
      birthDate: "2019-07-22",
      weight: "15.2",
      todayMeals: 2,
      playTime: 30,
      healthScore: 92,
      lastActivity: new Date(Date.now() - 4 * 60 * 60 * 1000)?.toISOString()
    },
    {
      id: 3,
      name: "Shadow",
      photo: "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=400&fit=crop&crop=face",
      breed: "British Shorthair",
      birthDate: "2021-11-08",
      weight: "10.8",
      todayMeals: 3,
      playTime: 60,
      healthScore: 98,
      lastActivity: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000)?.toISOString()
    }
  ];

  // Mock activity data
  const mockActivities = [
    {
      id: 1,
      catId: 1,
      type: "feeding",
      description: "Morning breakfast - wet food",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)?.toISOString(),
      details: { amount: "1/2 cup", food_type: "wet" }
    },
    {
      id: 2,
      catId: 1,
      type: "bathroom",
      description: "Used litter box - normal",
      timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)?.toISOString(),
      details: { type: "urination", consistency: "normal" }
    },
    {
      id: 3,
      catId: 1,
      type: "play",
      description: "Interactive play session with feather toy",
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000)?.toISOString(),
      details: { duration: "15 minutes", toy: "feather wand" }
    },
    {
      id: 4,
      catId: 1,
      type: "medication",
      description: "Daily vitamin supplement",
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000)?.toISOString(),
      details: { medication: "multivitamin", dosage: "1 tablet" }
    },
    {
      id: 5,
      catId: 1,
      type: "grooming",
      description: "Self-grooming session observed",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000)?.toISOString(),
      details: { duration: "10 minutes", area: "face and paws" }
    }
  ];

  // Mock reminders data
  const mockReminders = [
    {
      id: 1,
      title: "Evening medication",
      type: "medication",
      time: "18:00",
      frequency: "daily",
      isActive: true,
      priority: "high"
    },
    {
      id: 2,
      title: "Dinner feeding",
      type: "feeding",
      time: "19:00",
      frequency: "daily",
      isActive: true,
      priority: "medium"
    },
    {
      id: 3,
      title: "Weekly grooming",
      type: "grooming",
      time: "10:00",
      frequency: "weekly",
      isActive: true,
      priority: "low"
    },
    {
      id: 4,
      title: "Overdue vaccination",
      type: "vaccination",
      time: "09:00",
      frequency: "yearly",
      isActive: false,
      isOverdue: true,
      overdueBy: "2 days"
    }
  ];

  // Mock weekly data for charts
  const weeklyData = [
    { day: 'Mon', meals: 3, bathroom: 4, play: 2 },
    { day: 'Tue', meals: 3, bathroom: 5, play: 1 },
    { day: 'Wed', meals: 2, bathroom: 3, play: 3 },
    { day: 'Thu', meals: 3, bathroom: 4, play: 2 },
    { day: 'Fri', meals: 3, bathroom: 4, play: 2 },
    { day: 'Sat', meals: 4, bathroom: 5, play: 4 },
    { day: 'Sun', meals: 3, bathroom: 4, play: 3 }
  ];

  // Mock monthly trends data
  const monthlyTrends = [
    { week: 'Week 1', healthScore: 92, activityLevel: 85 },
    { week: 'Week 2', healthScore: 94, activityLevel: 88 },
    { week: 'Week 3', healthScore: 96, activityLevel: 90 },
    { week: 'Week 4', healthScore: 95, activityLevel: 87 }
  ];

  useEffect(() => {
    // Set default selected cat
    setSelectedCat(mockCats?.[0]);
    setActivities(mockActivities);
    setReminders(mockReminders);
  }, []);

  const handleCatChange = (cat) => {
    setSelectedCat(cat);
    // Filter activities for selected cat
    const catActivities = mockActivities?.filter(activity => activity?.catId === cat?.id);
    setActivities(catActivities);
  };

  const handleEditProfile = (cat) => {
    navigate('/settings-preferences', { state: { editCat: cat } });
  };

  const handleEditActivity = (activity) => {
    navigate('/activity-logging', { state: { editActivity: activity } });
  };

  const handleDeleteActivity = (activityId) => {
    setActivities(prev => prev?.filter(activity => activity?.id !== activityId));
  };

  const handleCompleteReminder = (reminderId) => {
    setReminders(prev => prev?.map(reminder => 
      reminder?.id === reminderId 
        ? { ...reminder, isActive: false, completedAt: new Date()?.toISOString() }
        : reminder
    ));
  };

  const handleSnoozeReminder = (reminderId) => {
    setReminders(prev => prev?.map(reminder => 
      reminder?.id === reminderId 
        ? { ...reminder, snoozedUntil: new Date(Date.now() + 15 * 60 * 1000)?.toISOString() }
        : reminder
    ));
  };

  const handleAddReminder = (newReminder) => {
    setReminders(prev => [...prev, newReminder]);
  };

  const handleQuickLog = (logEntry) => {
    setActivities(prev => [logEntry, ...prev]);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        selectedCat={selectedCat}
        onCatChange={handleCatChange}
        showCatSelector={true}
      />
      
      <div className="flex">
        <Sidebar 
          isCollapsed={isSidebarCollapsed}
          onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <main className={`flex-1 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-16' : 'ml-64'
        }`}>
          <div className="p-6">
            {/* Mobile Layout */}
            <div className="lg:hidden space-y-6">
              {selectedCat && (
                <CatProfileCard 
                  cat={selectedCat}
                  onEditProfile={handleEditProfile}
                />
              )}
              
              <QuickActionsPanel 
                onQuickLog={handleQuickLog}
                selectedCat={selectedCat}
              />
              
              <ActivityFeed 
                activities={activities}
                onEditActivity={handleEditActivity}
                onDeleteActivity={handleDeleteActivity}
              />
              
              <RemindersPanel 
                reminders={reminders}
                onCompleteReminder={handleCompleteReminder}
                onSnoozeReminder={handleSnoozeReminder}
                onAddReminder={handleAddReminder}
              />
              
              <MetricsPanel 
                weeklyData={weeklyData}
                monthlyTrends={monthlyTrends}
              />
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-12 gap-6">
                {/* Left Column - Cat Profile & Quick Actions */}
                <div className="col-span-3 space-y-6">
                  {selectedCat && (
                    <CatProfileCard 
                      cat={selectedCat}
                      onEditProfile={handleEditProfile}
                    />
                  )}
                  
                  <QuickActionsPanel 
                    onQuickLog={handleQuickLog}
                    selectedCat={selectedCat}
                  />
                </div>

                {/* Center Column - Activity Feed */}
                <div className="col-span-6">
                  <ActivityFeed 
                    activities={activities}
                    onEditActivity={handleEditActivity}
                    onDeleteActivity={handleDeleteActivity}
                  />
                </div>

                {/* Right Column - Metrics & Reminders */}
                <div className="col-span-3 space-y-6">
                  <RemindersPanel 
                    reminders={reminders}
                    onCompleteReminder={handleCompleteReminder}
                    onSnoozeReminder={handleSnoozeReminder}
                    onAddReminder={handleAddReminder}
                  />
                  
                  <MetricsPanel 
                    weeklyData={weeklyData}
                    monthlyTrends={monthlyTrends}
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <QuickActionButton />
    </div>
  );
};

export default DashboardOverview;