import { useRef, useState } from 'react';
import { useAuth } from '@/auth/context/auth-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import {
  getResetRequestSchema,
  ResetRequestSchemaType,
} from '../forms/reset-password-schema';
import { useApiHandlers } from '@/hooks/useApiHandlers';
import { APP_APIS } from '@/core/apis';
import { useNavigate, useSearchParams } from 'react-router';
import { IApiResponse } from '@/types/global.types';
import { toast } from 'sonner';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export function ResetPasswordPage() {
  const { } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams] = useSearchParams()
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const sitekey = import.meta.env.VITE_SITE_KEY

  const { create } = useApiHandlers()
  const navigate = useNavigate()

  const form = useForm<ResetRequestSchemaType>({
    resolver: zodResolver(getResetRequestSchema()),
    mode: 'all',
    defaultValues: {
      confirm_password: '',
      new_password: ''
    },
  });

  async function onSubmit(values: ResetRequestSchemaType) {
    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }
    try {
      setIsProcessing(true);
      const uid = searchParams.get("uid")
      const token = searchParams.get("token")

      const payload = {
        new_password: values?.new_password,
        confirm_password: values?.confirm_password,
        token: token,
        uid: uid
      }
      const response = await create<IApiResponse<any>>(APP_APIS.resetPassword, payload)
      if (!response?.status) {
        toast.error(response?.message)
        return
      }

      if (response?.data && response?.status) {
        navigate('/auth/signin')
        form.reset();
        toast.success(response?.message ?? "Success")
      }

    } catch (err) {
      console.error('Password reset request error:', err);

    } finally {
      setIsProcessing(false);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  function onCaptchaChange(value: string | null) {
    setCaptchaToken(value);
    setError(null)
  }

  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Reset Password
            </h1>
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


          <div className="space-y-5">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <div className="relative">
                    <Input
                      placeholder="Enter new password"
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

            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Confirm Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Enter confirm password"
                        type={confirmPasswordVisible ? 'text' : 'password'} // Toggle input type
                        {...field}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            mode="icon"
                            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          >
                            {confirmPasswordVisible ? (
                              <Eye className="text-muted-foreground" />
                            ) : (
                              <EyeOff className="text-muted-foreground" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {confirmPasswordVisible ? "Hide password" : "Show password"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </FormControl>
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
                  <Spinner className="h-4 w-4" /> Reseting Password...
                </span>
              ) : (
                'Reset Password'
              )}
            </Button>
          </div>

          {/* <div className="text-center text-sm">
            <Link
              to="/auth/signin"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent-foreground hover:underline hover:underline-offset-2"
            >
              <MoveLeft className="size-3.5 opacity-70" /> Back to Sign In
            </Link>
          </div> */}
        </form>
      </Form>
    </div>
  );
}
