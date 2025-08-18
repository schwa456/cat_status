import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError
  } = useForm();

  const mockCredentials = {
    email: "owner@catcare.com",
    password: "CatLover123"
  };

  const handleFormSubmit = (data) => {
    // Mock authentication validation
    if (data?.email !== mockCredentials?.email || data?.password !== mockCredentials?.password) {
      setError('email', { 
        type: 'manual', 
        message: `Invalid credentials. Use: ${mockCredentials?.email} / ${mockCredentials?.password}` 
      });
      return;
    }
    
    onSubmit(data);
  };

  const handleForgotPassword = () => {
    alert('Password reset link would be sent to your email address.');
  };

  const handleGuestAccess = () => {
    navigate('/dashboard-overview');
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          error={errors?.email?.message}
          required
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address'
            }
          })}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password"
            error={errors?.password?.message}
            required
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Checkbox
          label="Remember me"
          checked={rememberMe}
          onChange={(e) => setRememberMe(e?.target?.checked)}
        />
        
        <button
          type="button"
          onClick={handleForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-colors"
        >
          Forgot password?
        </button>
      </div>
      <div className="space-y-3">
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="LogIn"
          iconPosition="left"
        >
          Sign In
        </Button>

        <Button
          type="button"
          variant="outline"
          fullWidth
          onClick={handleGuestAccess}
          iconName="User"
          iconPosition="left"
        >
          Continue as Guest
        </Button>
      </div>
      <div className="mt-4 p-3 bg-muted/50 rounded-lg">
        <p className="text-xs text-muted-foreground text-center">
          <Icon name="Info" size={14} className="inline mr-1" />
          Demo credentials: {mockCredentials?.email} / {mockCredentials?.password}
        </p>
      </div>
    </form>
  );
};

export default LoginForm;