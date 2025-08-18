import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import NotFound from "./pages/NotFound";
import SettingsPreferences from './pages/settings-preferences';
import DashboardOverview from './pages/dashboard-overview';
import HealthRecordsTestResults from './pages/health-records-test-results';
import ActivityReportsAnalytics from './pages/activity-reports-analytics';
import UserRegistrationLogin from './pages/user-registration-login';
import ActivityLogging from './pages/activity-logging';

const Routes = () => {
    return (
        <BrowserRouter>
            <ErrorBoundary>
                <ScrollToTop />
                <RouterRoutes>
                    <Route path="/" element={<ActivityLogging />} />
                    <Route path={"/settings-preferences"} element={<SettingsPreferences/>} />
                    <Route path={"/dashboard-overview"} element={<DashboardOverview/>} />
                    <Route path="/health-records-test-results" element={<HealthRecordsTestResults />} />
                    <Route path="/activity-reports-analytics" element={<ActivityReportsAnalytics />} />
                    <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
                    <Route path="/activity-logging" element={<ActivityLogging />} />
                    <Route path="*" element={<NotFound />} />
                </RouterRoutes>
            </ErrorBoundary>
        </BrowserRouter>
    );
};

export default Routes;