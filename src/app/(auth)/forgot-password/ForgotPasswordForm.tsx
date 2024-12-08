"use client";
import { AuthLayout } from "../AuthLayout";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { forgotPasswordSchema, type ForgotPasswordValues } from "@/lib/validation/auth";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { IconInput } from "@/components/ui/icon-input";
import { CircleCheck, MailIcon } from "lucide-react";
import { LoadingButton } from "@/components/ui/loading-button";
import { forgotPassword } from "./actions";

function getMailtoUrl(email: string): string {
  return `mailto:${email}`;
}

function getWebmailUrl(email: string): string | null {
  const domain = email.split("@")[1]?.toLowerCase();

  // Generate provider URLs dynamically
  const knownProviders: Record<string, string> = {
    "gmail.com": "https://mail.google.com",
    "yahoo.com": "https://mail.yahoo.com",
    "outlook.com": "https://outlook.live.com",
    "hotmail.com": "https://outlook.live.com",
  };

  if (!domain) {
    return null;
  }
  return knownProviders[domain] ?? null;
}

export function ForgotPasswordForm() {
  const [error, setError] = useState<string>();
  const [isSuccess, setIsSuccess] = useState(false);
  const [emailSent, setEmailSent] = useState<string>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(values: ForgotPasswordValues) {
    setError(undefined);
    startTransition(async () => {
      const { error, success } = await forgotPassword(values);
      if (error) {
        setError(error);
      }
      if (success) {
        setIsSuccess(true);
        setEmailSent(values.email);
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
            <p className="font-semibold">Reset LInk Sent to Mail</p>
            <p className="text-muted-foreground">
              A reset link has been sent to your email
            </p>
          </div>

          <Button
            variant="gooeyLeft"
            className="w-full"
            onClick={() => {
              if (emailSent) {
                const webmailUrl = getWebmailUrl(emailSent);
                if (webmailUrl) {
                  window.open(webmailUrl, "_blank");
                } else {
                  window.open(getMailtoUrl(emailSent), "_blank");
                }
              }
            }}
          >
            Open Mail
          </Button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Forgot Password"
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
            Send Link to Mail
          </LoadingButton>
        </form>
      </Form>

      <div className="mt-4 text-center text-sm">
        Or{" "}
        <Button
          variant="linkHover2"
          asChild
          size="none"
        >
          <Link href="/">
            sign in to your account
          </Link>
        </Button>
      </div>
    </AuthLayout>
  );
}