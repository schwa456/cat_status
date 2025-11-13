import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import QuickActionButton from '../../components/ui/QuickActionButton';
import ActivityTabs from './components/ActivityTabs';
import CatSelector from './components/CatSelector';
import FeedingForm from './components/FeedingForm';
import BathroomForm from './components/BathroomForm';
import PlayForm from './components/PlayForm';
import HealthForm from './components/HealthForm';
import QuickActions from './components/QuickActions';
import RecentActivities from './components/RecentActivities';
import { useCats } from "../../contexts/CatContext";

const ActivityLogging = () => {
  const [activeTab, setActiveTab] = useState('feeding');
  const [selectedCat, setSelectedCat] = useCats();

  const handleActivitySubmit = (activityData) => {
    console.log('Activity logged:', activityData);
    // Here you would typically save to your backend or local storage
    // For now, we'll just log it to console
  };

  const handleQuickLog = (quickData) => {
    console.log('Quick log:', quickData);
    // Handle quick logging with default values
    handleActivitySubmit(quickData);
  };

  const renderActiveForm = () => {
    const formProps = {
      selectedCat,
      onSubmit: handleActivitySubmit
    };

    switch (activeTab) {
      case 'feeding':
        return <FeedingForm {...formProps} />;
      case 'bathroom':
        return <BathroomForm {...formProps} />;
      case 'play':
        return <PlayForm {...formProps} />;
      case 'health':
        return <HealthForm {...formProps} />;
      default:
        return <FeedingForm {...formProps} />;
    }
  };

  return (
    <>
      <Helmet>
        <title>Activity Logging - CatCare Tracker</title>
        <meta name="description" content="Log your cat's daily activities including feeding, bathroom visits, play sessions, and health observations." />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header selectedCat={selectedCat} onCatChange={setSelectedCat} />
        
        <main className="container mx-auto px-4 py-6 max-w-6xl">
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Activity Logging
            </h1>
            <p className="text-muted-foreground">
              Record your cat's daily activities to maintain comprehensive health and wellness tracking.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cat Selector */}
              <CatSelector />

              {/* Activity Form */}
              <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
                <ActivityTabs 
                  activeTab={activeTab} 
                  onTabChange={setActiveTab} 
                />
                
                <div className="min-h-[500px]">
                  {renderActiveForm()}
                </div>

                <QuickActions 
                  selectedCat={selectedCat}
                  onQuickLog={handleQuickLog}
                  activeTab={activeTab}
                />
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <RecentActivities selectedCat={selectedCat} />
              
              {/* Activity Summary Card */}
              <div className="bg-card border border-border rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-3">Today's Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Meals</span>
                    <span className="text-sm font-medium text-success">2/3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Bathroom</span>
                    <span className="text-sm font-medium text-primary">4 visits</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Play Time</span>
                    <span className="text-sm font-medium text-warning">45 min</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Health Checks</span>
                    <span className="text-sm font-medium text-secondary">1</span>
                  </div>
                </div>
              </div>

              {/* Tips Card */}
              <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
                <h3 className="font-semibold text-foreground mb-2 flex items-center space-x-2">
                  <span>💡</span>
                  <span>Logging Tips</span>
                </h3>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• Log activities immediately for accuracy</li>
                  <li>• Use quick actions for routine activities</li>
                  <li>• Add notes for unusual behaviors</li>
                  <li>• Take photos for health observations</li>
                </ul>
              </div>
            </div>
          </div>
        </main>

        <QuickActionButton />
      </div>
    </>
  );
};

export default ActivityLogging;