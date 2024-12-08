"use server";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";

export async function login(credentials: LoginValues): Promise<{
  error?: string;
  success?: boolean;
}> {
  try {
    const validatedData = loginSchema.parse(credentials);

    const { email, password } = validatedData;

    console.log(email, password);

    return { success: true };
  } catch {
    return { error: "Something went wrong. Please try again" };
  }
}