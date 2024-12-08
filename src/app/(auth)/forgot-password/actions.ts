"use server";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation/auth";

export async function forgotPassword(credentials: ForgotPasswordValues): Promise<{
  error?: string;
  success?: boolean;
}> {
  try {
    const validatedData = forgotPasswordSchema.parse(credentials);

    const { email } = validatedData;

    console.log(email);

    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again" };
  }
}