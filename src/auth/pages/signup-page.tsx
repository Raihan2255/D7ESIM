import { useRef, useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, Check, Eye, EyeOff } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinners';
import { getSignupSchema, SignupSchemaType } from '../forms/signup-schema';
import { useApiHandlers } from '@/hooks/useApiHandlers';
import { IApiResponse } from '@/types/global.types';
import { API_END_POINTS } from '@/apis/api-constants';
import { appRoutes } from '@/routes/app-routes';
import auth from '@/utils/auth';
import { toast } from 'sonner';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import ReCAPTCHA from "react-google-recaptcha";

export function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  const navigate = useNavigate();
  const { create } = useApiHandlers()

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const sitekey = import.meta.env.VITE_SITE_KEY

  const form = useForm<SignupSchemaType>({
    resolver: zodResolver(getSignupSchema()),
    mode: 'all',
    defaultValues: {
      email: '',
      password: '',
      rememberMe: true,
      first_name: '',
      last_name: '',
      phone: ''
    },
  });

  const { setError: setServerErrors } = form

  async function onSubmit(values: SignupSchemaType) {
    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }
    try {
      setIsProcessing(true);
      setError(null);

      const response = await create<IApiResponse<any>>(API_END_POINTS.register?.endPoint, values, { requiresAuth: true })


      if (!response?.status) {
        // Iterate through each error field
        for (const key in response?.errors) {
          if (response.errors.hasOwnProperty(key)) {
            setServerErrors(key as keyof SignupSchemaType, {
              type: "manual",
              message: response.errors[key][0] // First error message for the field
            });
          }
        }
      }

      // if (response)
      if (response?.status) {
        // auth.set(response.data, USER_INFO, true);
        auth.setToken(response.data?.token, true);
        auth.setRefreshToken(response.data?.refresh, true);

        // Use navigate for navigation
        navigate(appRoutes.verify);
        toast.success(response?.message)

        // Set success message and metadata
        setSuccessMessage(
          'Registration successful! Please check your email to confirm your account.',
        );
      }
    } catch (err) {
      console.error('Registration error:', err);
    } finally {
      setIsProcessing(false);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  function onCaptchaChange(value: string | null) {
    setCaptchaToken(value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
          <p className="text-sm text-muted-foreground">
            Create your account to get started
          </p>
        </div>

        {error && (
          <Alert
            variant="destructive"
            appearance="light"
            onClose={() => setError(null)}
          >
            <AlertIcon>
              <AlertCircle />
            </AlertIcon>
            <AlertTitle>{error}</AlertTitle>
          </Alert>
        )}

        {successMessage && (
          <Alert appearance="light" onClose={() => setSuccessMessage(null)}>
            <AlertIcon>
              <Check />
            </AlertIcon>
            <AlertTitle>{successMessage}</AlertTitle>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your first name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter your phone" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between items-center gap-2.5">
                <FormLabel>Password <span className="text-red-500">*</span></FormLabel>
              </div>
              <div className="relative">
                <Input
                  placeholder="Enter your password"
                  type={passwordVisible ? 'text' : 'password'} // Toggle input type
                  {...field}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      mode="icon"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    >
                      {passwordVisible ? (
                        <Eye className="text-muted-foreground" />
                      ) : (
                        <EyeOff className="text-muted-foreground" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="top">
                    {passwordVisible ? "Hide password" : "Show password"}
                  </TooltipContent>
                </Tooltip>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-1">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={sitekey}
            onChange={onCaptchaChange}
          />
        </div>

        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" /> Creating account...
            </span>
          ) : (
            'Create Account'
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            to="/auth/signin"
            className="text-sm font-semibold text-foreground hover:text-primary"
          >
            Sign In
          </Link>
        </div>
      </form>
    </Form>
  );
}
