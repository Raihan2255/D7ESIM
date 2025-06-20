import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useApiHandlers } from '@/hooks/useApiHandlers';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchemaType, getForgotPasswordSchema } from '../forms/forgot-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinners';
import { IApiResponse } from '@/types/global.types';
import { APP_APIS } from '@/core/apis';
import { toast } from 'sonner';
import ReCAPTCHA from "react-google-recaptcha";
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';
import { API_CONSTANTS } from '@/apis/api-constants';

type Props = {}

export default function ForgotPassword({ }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const sitekey = import.meta.env.VITE_SITE_KEY

  const { create } = useApiHandlers()

  const form = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(getForgotPasswordSchema()),
    mode: 'all',
    defaultValues: {
      user_email: ''
    },
  });


  async function onSubmit(values: forgotPasswordSchemaType) {
    if (!captchaToken) {
      setError("Please complete the captcha.");
      return;
    }
    try {
      setIsProcessing(true);
      const payload = {
        user_email: values?.user_email
      }
      const response = await create<IApiResponse<any>>(APP_APIS.forgotPassword, payload)

      if (response?.status) {
        toast.success(response?.message)
      }
    } catch (error) {
      setIsProcessing(false)
    } finally {
      setIsProcessing(false)
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    }
  }

  async function onCaptchaChange(value: string | null) {
    if (!value) return
    try {
      const payload = {
        token: value
      }
      const response = await create<IApiResponse<any>>(API_CONSTANTS.captcha, payload)
      if (response?.status) {
        setCaptchaToken(value);
        setError(null)
      } else {
        setError(String(response?.message))
      }
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="max-w-md mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold tracking-tight">
              Forgot Password
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
              name="user_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Email <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter your email" {...field} />
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
                  <Spinner className="h-4 w-4" /> Submitting...
                </span>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}