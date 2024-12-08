"use server";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validation/auth";

export async function forgotPassword(credentials: ResetPasswordValues): Promise<{
  error?: string;
  success?: boolean;
}> {
  try {
    const validatedData = resetPasswordSchema.parse(credentials);

    const { password } = validatedData;

    console.log(password);

    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again" };
  }
}