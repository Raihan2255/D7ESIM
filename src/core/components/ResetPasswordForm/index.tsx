import { API_END_POINTS } from '@/apis/api-constants'
import { Button } from '@/components/ui/button'
import DialogContent, { Dialog, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useApiHandlers } from '@/hooks/useApiHandlers'
import { IApiResponse } from '@/types/global.types'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff } from 'lucide-react'
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
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

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
                    <div className="relative">
                      <Input
                        placeholder="Enter old password"
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
                    <div className="relative">
                      <Input
                        placeholder="Enter new password"
                        type={newPasswordVisible ? 'text' : 'password'} // Toggle input type
                        {...field}
                      />
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="ghost"
                            mode="icon"
                            onClick={() => setNewPasswordVisible(!newPasswordVisible)}
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          >
                            {newPasswordVisible ? (
                              <Eye className="text-muted-foreground" />
                            ) : (
                              <EyeOff className="text-muted-foreground" />
                            )}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">
                          {newPasswordVisible ? "Hide password" : "Show password"}
                        </TooltipContent>
                      </Tooltip>
                    </div>
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