import { z } from "zod";

export const otpSchema = z.object({
  otp: z
    .string()
    .min(1, "OTP is required")
    .length(4, "OTP must be 4 digits")
    .regex(/^\d+$/, "OTP must contain only numbers"),
});

export type OtpSchemaType = z.infer<typeof otpSchema>;