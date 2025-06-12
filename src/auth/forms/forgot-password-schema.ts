import { z } from 'zod';

export const getForgotPasswordSchema = () => {
  return z.object({
    user_email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Please enter a valid email address.' })

  });
};

export type forgotPasswordSchemaType = z.infer<ReturnType<typeof getForgotPasswordSchema>>;