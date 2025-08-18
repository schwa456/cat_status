import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, isLoading }) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setError
  } = useForm();

  const password = watch('password');

  const handleFormSubmit = (data) => {
    if (!agreeToTerms) {
      setError('terms', { 
        type: 'manual', 
        message: 'Please agree to the terms and conditions' 
      });
      return;
    }
    
    onSubmit(data);
  };

  const handleGuestAccess = () => {
    navigate('/dashboard-overview');
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Pet Owner Name"
          type="text"
          placeholder="Enter your full name"
          description="Optional - helps personalize your experience"
          error={errors?.name?.message}
          {...register('name', {
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
        />

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
            placeholder="Create a strong password"
            description="Minimum 6 characters with letters and numbers"
            error={errors?.password?.message}
            required
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)/,
                message: 'Password must contain at least one letter and one number'
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

        <div className="relative">
          <Input
            label="Confirm Password"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="Confirm your password"
            error={errors?.confirmPassword?.message}
            required
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        </div>
      </div>
      <div className="space-y-4">
        <Checkbox
          label="I agree to the Terms of Service and Privacy Policy"
          description="Required to create your account"
          error={errors?.terms?.message}
          checked={agreeToTerms}
          onChange={(e) => setAgreeToTerms(e?.target?.checked)}
          required
        />

        <Checkbox
          label="Send me updates about new features and pet care tips"
          description="Optional - you can change this later in settings"
         
          onChange={() => {}}
        />
      </div>
      <div className="space-y-3">
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={isLoading}
          iconName="UserPlus"
          iconPosition="left"
        >
          Create Account
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
          <Icon name="Shield" size={14} className="inline mr-1" />
          Your data is encrypted and secure. We never share your information.
        </p>
      </div>
    </form>
  );
};

export default RegisterForm;