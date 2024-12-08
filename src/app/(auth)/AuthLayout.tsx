import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/user-layout/Logo";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  title?: string;
  description?: string;
  showLogo?: boolean;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  cardClassName?: string;
  headerClassName?: string;
  contentClassName?: string;
}

export function AuthLayout({
  title,
  description,
  showLogo = true,
  children,
  icon,
  className,
  cardClassName,
  headerClassName,
  contentClassName,
}: AuthLayoutProps) {
  return (
    <section className={cn("container space-y-8 z-10", className)}>
      {showLogo && <Logo className="flex justify-center" />}
      <Card className={cn("mx-auto h-fit max-w-md", cardClassName)}>
        <CardHeader className={cn("flex flex-col justify-center items-center space-y-3 text-center", headerClassName)}>
          {icon && (
            <div className="bg-green-800 text-white w-24 h-24 rounded-full flex justify-center items-center">
              {icon}
            </div>
          )}
          {title && (
            <CardTitle className="text-[28px] font-bold">
              {title}
            </CardTitle>
          )}
          {description && (
            <CardDescription className="font-medium">
              {description}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className={cn(contentClassName)}>
          {children}
        </CardContent>
      </Card>
    </section>
  );
}