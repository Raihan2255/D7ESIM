import { useState } from 'react';
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

export function ResetPasswordPage() {
  const { } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchParams] = useSearchParams()

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
    }
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

          <div className="space-y-5">
            <FormField
              control={form.control}
              name="new_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    New Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Enter new password" {...field} />
                  </FormControl>
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
                    <Input type="text" placeholder="Enter confirm password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
