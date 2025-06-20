import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinners";
import { useApiHandlers } from "@/hooks/useApiHandlers";
import { IApiResponse } from "@/types/global.types";
import { useNavigate, useSearchParams } from "react-router";
import { AlertCircle, Check } from 'lucide-react';
import { Alert, AlertIcon, AlertTitle } from '@/components/ui/alert';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from "react-hook-form";
import { otpSchema, OtpSchemaType } from "../forms/otp-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { APP_APIS } from "@/core/apis";
import { toast } from "sonner";

type Props = {}

export function Verify({ }: Props) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate()

  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { create } = useApiHandlers()

  const form = useForm<OtpSchemaType>({
    resolver: zodResolver(otpSchema),
    mode: 'all',
    defaultValues: {
      otp: ''
    },
  });

  const { setError: setServerErrors } = form

  const onSubmit = async (data: OtpSchemaType) => {
    try {
      setIsProcessing(true)
      const response = await create<IApiResponse<any>>(APP_APIS.verify, data, { requiresAuth: true })

      if (!response?.status) {
        // Iterate through each error field
        for (const key in response?.errors) {
          if (response.errors.hasOwnProperty(key)) {
            setServerErrors(key as keyof OtpSchemaType, {
              type: "manual",
              message: response.errors[key][0] // First error message for the field
            });
          }
        }
      }

      if (response?.status) {
        toast.success(response?.message ?? "Success")
        // Get the 'next' parameter from URL if it exists
        const nextPath = searchParams.get('next') || '/';
        // Use navigate for navigation
        navigate(nextPath);
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="block w-full space-y-5"
      >
        <div className="text-center space-y-1 pb-3">
          <h1 className="text-2xl font-semibold tracking-tight">Verify OTP</h1>
          {/* <p className="text-sm text-muted-foreground">
            Create your account to get started
          </p> */}
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
          name="otp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>OTP <span className="text-red-500">*</span></FormLabel>
              <FormControl>
                <Input placeholder="Enter the otp" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />


        <Button type="submit" className="w-full" disabled={isProcessing}>
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <Spinner className="h-4 w-4 animate-spin" />Verifying OTP...
            </span>
          ) : (
            'Verify OTP'
          )}
        </Button>
      </form>
    </Form>
  )
}