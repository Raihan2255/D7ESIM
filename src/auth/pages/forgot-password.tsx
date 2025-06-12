import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useApiHandlers } from '@/hooks/useApiHandlers';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { forgotPasswordSchemaType, getForgotPasswordSchema } from '../forms/forgot-password-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinners';
import { IApiResponse } from '@/types/global.types';
import { APP_APIS } from '@/core/apis';
import { toast } from 'sonner';

type Props = {}

export default function ForgotPassword({ }: Props) {
  const [isProcessing, setIsProcessing] = useState(false);

  const { create } = useApiHandlers()

  const form = useForm<forgotPasswordSchemaType>({
    resolver: zodResolver(getForgotPasswordSchema()),
    mode: 'all',
    defaultValues: {
      user_email: ''
    },
  });


  async function onSubmit(values: forgotPasswordSchemaType) {
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
  )
}