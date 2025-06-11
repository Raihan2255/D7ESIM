import { API_END_POINTS } from '@/apis/api-constants'
import { Button } from '@/components/ui/button'
import DialogContent, { Dialog, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useApiHandlers } from '@/hooks/useApiHandlers'
import { IApiResponse } from '@/types/global.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  open: boolean
}

// 🧪 Schema using zod
const resetPasswordSchema = z.object({
  old_password: z.string().min(1, "Old password is required"),
  new_password: z.string().min(1, "New password is required"),
  confirm_password: z
    .string()
    .min(1, "Confirm password is required"),
}).refine((data) => data.new_password === data.confirm_password, {
  message: "Passwords do not match",
  path: ["confirm_password"],
});

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordForm({ open, setOpen }: Props) {

  const [isLoading, setIsLoading] = useState<boolean>(false)

  const { updateById } = useApiHandlers()



  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      confirm_password: '',
      new_password: '',
      old_password: ''
    }
  })

  const { setError: setServerErrors } = form

  const onSubmit = async (data: ResetPasswordForm) => {
    try {
      setIsLoading(true)
      const response = await updateById<IApiResponse<any>>(API_END_POINTS.reset.endPoint, data, { requiresAuth: true })
      if (!response?.status) {
        // Iterate through each error field
        for (const key in response?.errors) {
          if (response.errors.hasOwnProperty(key)) {
            setServerErrors(key as keyof ResetPasswordForm, {
              type: "manual",
              message: response.errors[key][0] // First error message for the field
            });
          }
        }
      }
      if (response?.status) {
        toast.success(response?.message ?? "Success")
        form.reset()
        setOpen(false)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent onInteractOutside={e => e.preventDefault()} className="">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
            <FormField
              control={form.control}
              name="old_password"

              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Old Password <span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter old password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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

            <DialogFooter>
              <Button onClick={() => setOpen(false)} variant="outline" type="button">Cancel</Button>
              <Button disabled={isLoading} type="submit">Submit</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}