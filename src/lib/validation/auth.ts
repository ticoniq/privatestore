import * as z from "zod";

/**
 * Base validator for required string fields
 * Trims whitespace and ensures non-empty value
 */
const requiredString = z.string().trim().min(1, "Required");

/**
 * Schema for validating login form data
 * @property {string} email - User's email address (required, must be valid email format)
 * @property {string} password - User's password (required, non-empty after trimming)
 *
 * @example
 * const result = loginSchema.safeParse({
 *   email: "user@example.com",
 *   password: "mypassword123"
 * });
 *
 * if (result.success) {
 *   // Data is valid
 *   const validatedData = result.data;
 * } else {
 *   // Handle validation errors
 *   console.log(result.error.errors);
 * }
 */
export const loginSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString,
});

/**
 * TypeScript type representing the shape of validated login data
 * Inferred from the loginSchema Zod definition
 *
 * @typedef {Object} LoginValues
 * @property {string} email - Validated email address
 * @property {string} password - Validated password
 *
 * @example
 * // Type-safe login values
 * const loginData: LoginValues = {
 *   email: "user@example.com",
 *   password: "mypassword123"
 * };
 */
export type LoginValues = z.infer<typeof loginSchema>;

/**
 * Schema for validating forgot password email form
 * @property {string} email - User's email address (required, must be valid email format)
 *
 * @example
 * const result = forgotPasswordSchema.safeParse({
 *   email: "user@example.com"
 * });
 *
 * if (result.success) {
 *   // Data is valid
 *   const validatedData = result.data;
 * }
 */
export const forgotPasswordSchema = z.object({
  email: requiredString
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(155, "Email must be less than 155 characters")
    .refine((email) => email.includes("@"), "Must contain @ symbol"),
});

/**
 * TypeScript type for forgot password form values
 * Inferred from the forgotPasswordSchema
 *
 * @typedef {Object} ForgotPasswordValues
 * @property {string} email - Validated email address
 */
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>;

/**
 * Schema for validating the new password during a password reset process.
 * Enforces a strong password policy to ensure security.
 */
export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long.")
    .max(50, "Password must not exceed 50 characters.")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter.")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter.")
    .regex(/[0-9]/, "Password must contain at least one number.")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character (e.g., !@#$%^&*).",
    ),
});

/**
 * Type definition for the reset password form values based on the schema.
 * @typedef {Object} ResetPasswordValues
 * @property {string} email - Validated password
 */
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

/**
 * OTP validation schema
 * Validates a 6-digit one-time password with specific rules
 * OTP Field
 * Validation rules:
 * - Must be exactly 6 digits
 * - Can only contain numbers
 * - No spaces or special characters allowed
 * - All positions must be filled
 */
export const otpSchema = z.object({
  otp: z
    .string()
    .min(6, "Please enter all 6 digits")
    .max(6, "OTP cannot exceed 6 digits")
    .regex(/^[0-9]+$/, "OTP can only contain numbers")
    .refine((val) => val.length === 6, {
      message: "OTP must be exactly 6 digits",
    }),
});

// Type definition for OTP form values
export type OTPValues = z.infer<typeof otpSchema>;
