"use client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { loginSchema, type LoginValues } from "@/lib/validation/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/password-input";
import { IconInput } from "@/components/ui/icon-input";
import { MailIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LoadingButton } from "@/components/ui/loading-button";
import { login } from "./actions";
import { AuthLayout } from "../AuthLayout";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setError(undefined);
    startTransition(async () => {
      const { error, success } = await login(values);
      if (error) {
        setError(error);
      }
      if (success) {
        router.push("/app-customization");
      }
    });
  }

  return (
    <AuthLayout
      title="Log In"
      description="Enter your credentials to access your account"
    >
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Email Address</FormLabel>
                <FormControl>
                  <IconInput
                    {...field}
                    id="email"
                    placeholder="Enter Email"
                    icon={<MailIcon size={20} />}
                    disabled={isPending}
                    aria-describedby="email-error"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <Input
                id="remember"
                aria-describedby="remember"
                type="checkbox"
                className="w-5 h-5 border border-gray-300 rounded bg-gray-50"
              />
              <Label className="ml-2 text-sm" htmlFor="remember">Remember me</Label>
            </div>
            <Button
              variant="linkHover2"
              asChild
              size="none"
            >
              <Link href="/forgot-password">
                Forgot password?
              </Link>
            </Button>
          </div>

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
            Log in to your Account
          </LoadingButton>
        </form>
      </Form>
    </AuthLayout>
  );
}