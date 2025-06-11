import { z } from 'zod';

export const getSignupSchema = () => {
  return z.object({
    first_name: z
      .string()
      .min(1, { message: 'First name is required.' }),
    last_name: z
      .string()
      .min(1, { message: 'Last name is required.' }),
    phone: z
      .string()
      .nonempty({ message: 'Phone number is required.' })
      .min(10, { message: 'Phone number must be at least 10 digits.' })
      .regex(/^\d+$/, { message: 'Phone number must contain only digits.' }),
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email address.' }),
    password: z.string().min(1, { message: 'Password is required.' }),
    rememberMe: z.boolean().optional(),
  });
};

export type SignupSchemaType = z.infer<ReturnType<typeof getSignupSchema>>;
