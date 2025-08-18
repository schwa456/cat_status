import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin, isLoading }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-600',
      bgColor: 'hover:bg-red-50'
    },
    {
      id: 'apple',
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-900',
      bgColor: 'hover:bg-gray-50'
    }
  ];

  const handleSocialLogin = (provider) => {
    // Mock social login
    alert(`${provider?.name} login would redirect to ${provider?.name} authentication.`);
    onSocialLogin?.(provider?.id);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {socialProviders?.map((provider) => (
          <Button
            key={provider?.id}
            variant="outline"
            onClick={() => handleSocialLogin(provider)}
            disabled={isLoading}
            className={`${provider?.bgColor} transition-colors duration-200`}
          >
            <Icon 
              name={provider?.icon} 
              size={20} 
              className={`mr-2 ${provider?.color}`} 
            />
            <span className="hidden sm:inline">{provider?.name}</span>
            <span className="sm:hidden">{provider?.name?.[0]}</span>
          </Button>
        ))}
      </div>
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;