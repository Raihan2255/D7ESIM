import { z } from 'zod';

// Schema for requesting a password reset email
export const getResetRequestSchema = () => {
  return z.object({
    new_password: z.string().min(1, "New password is required"),
    confirm_password: z
      .string()
      .min(1, "Confirm password is required"),
  }).refine((data) => data.new_password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  })
};

// Schema for setting a new password
export const getNewPasswordSchema = () => {
  return z
    .object({
      password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters.' })
        .regex(/[A-Z]/, {
          message: 'Password must contain at least one uppercase letter.',
        })
        .regex(/[0-9]/, {
          message: 'Password must contain at least one number.',
        }),
      confirmPassword: z
        .string()
        .min(1, { message: 'Please confirm your password.' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    });
};

export type ResetRequestSchemaType = z.infer<
  ReturnType<typeof getResetRequestSchema>
>;
export type NewPasswordSchemaType = z.infer<
  ReturnType<typeof getNewPasswordSchema>
>;
