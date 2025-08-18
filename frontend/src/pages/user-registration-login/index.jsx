import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import AuthTabs from './components/AuthTabs';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import AppLogo from './components/AppLogo';
import LoadingOverlay from './components/LoadingOverlay';

const UserRegistrationLogin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data) => {
    setIsLoading(true);
    
    // Mock authentication delay
    setTimeout(() => {
      setIsLoading(false);
      // Store user session (mock)
      localStorage.setItem('catcare_user', JSON.stringify({
        email: data?.email,
        name: data?.name || 'Cat Owner',
        loginTime: new Date()?.toISOString()
      }));
      
      // Redirect to dashboard
      navigate('/dashboard-overview');
    }, 2000);
  };

  const handleRegister = async (data) => {
    setIsLoading(true);
    
    // Mock registration delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Show success message
      alert(`Account created successfully! Welcome to CatCare Tracker, ${data?.name || 'Cat Owner'}!`);
      
      // Store user session (mock)
      localStorage.setItem('catcare_user', JSON.stringify({
        email: data?.email,
        name: data?.name || 'Cat Owner',
        registrationTime: new Date()?.toISOString()
      }));
      
      // Redirect to dashboard
      navigate('/dashboard-overview');
    }, 2500);
  };

  const handleSocialLogin = (provider) => {
    setIsLoading(true);
    
    // Mock social login delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Store user session (mock)
      localStorage.setItem('catcare_user', JSON.stringify({
        email: `user@${provider}.com`,
        name: `${provider} User`,
        provider: provider,
        loginTime: new Date()?.toISOString()
      }));
      
      navigate('/dashboard-overview');
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Sign In - CatCare Tracker</title>
        <meta name="description" content="Sign in to your CatCare Tracker account to monitor your cat's health and activities." />
      </Helmet>
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl shadow-elevated p-8 border border-border">
            <AppLogo />
            
            <AuthTabs activeTab={activeTab} onTabChange={setActiveTab} />
            
            <div className="space-y-6">
              {activeTab === 'login' ? (
                <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
              ) : (
                <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
              )}
              
              <SocialLogin onSocialLogin={handleSocialLogin} isLoading={isLoading} />
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} CatCare Tracker. All rights reserved.
            </p>
          </div>
        </div>
      </div>
      <LoadingOverlay 
        isVisible={isLoading} 
        message={activeTab === 'login' ? 'Signing you in...' : 'Creating your account...'} 
      />
    </>
  );
};

export default UserRegistrationLogin;