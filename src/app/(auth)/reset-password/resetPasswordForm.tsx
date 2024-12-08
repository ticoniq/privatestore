"use client";
import { AuthLayout } from "../AuthLayout";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { resetPasswordSchema, type ResetPasswordValues } from "@/lib/validation/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CircleCheck } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { forgotPassword } from "./actions";
import { PasswordInput } from "@/components/ui/password-input";

export function ResetPasswordForm() {
  const [error, setError] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  async function onSubmit(values: ResetPasswordValues) {
    setError(undefined);
    startTransition(async () => {
      const { error, success } = await forgotPassword(values);
      if (error) {
        setError(error);
      }
      if (success) {
        setIsSuccess(true);
      }
    });
  }

  if (isSuccess) {
    return (
      <AuthLayout
        icon={<CircleCheck size={40} />}
      >
        <div className="flex flex-col items-center text-center font-Mulish space-y-4">
          <div className="space-y-2">
            <p className="font-semibold">Password Reset Complete</p>
            <p className="text-muted-foreground">
              Your password has been changed to the new one.
            </p>
          </div>

          <Button
            variant="gooeyLeft"
            className="w-full"
            asChild
          >
            <Link href="/">Log In</Link>
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Change Password"
      description="Enter your new password"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Password</FormLabel>
                <FormControl>
                  <PasswordInput
                    {...field}
                    placeholder="Enter Password"
                    disabled={isPending}
                    aria-describedby="password-error"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {error && (
            <div className="text-sm text-red-500" role="alert">
              {error}
            </div>
          )}

          <LoadingButton
            loading={isPending}
            className="w-full"
            variant="gooeyLeft"
          >
            Reset Password
          </LoadingButton>
        </form>
      </Form>
    </AuthLayout>
  );
}