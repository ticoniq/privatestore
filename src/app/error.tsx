'use client';

import { Button } from '@/components/ui/button';
import { RotateCcw, Home, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const ErrorPage = function ErrorPage({ error, reset }: ErrorProps) {
  const router = useRouter();
  const { toast } = useToast();

  const handleReset = () => {
    try {
      reset();
      toast({
        title: "Reset successful",
        description: "The page has been refreshed.",
      });
    } catch {
      toast({
        title: "Reset failed",
        description: "Trying alternative refresh method...",
        variant: "destructive",
      });
      router.refresh();
    }
  };

  const handleNavigateHome = () => {
    router.push('/');
    router.refresh();
  };

  const handleNavigateBack = () => {
    router.back();
  };

  return (
    <main className="container relative min-h-screen py-12 max-w-full flex w-full items-center justify-center bg-black">
      <GridPattern
        width={130}
        height={130}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
        )}
      />
      <div className="flex flex-col gap-8 justify-center items-center z-10">
        <div className="text-center space-y-5 text-white">
          <p className="text-sm">There was a problem with this page.</p>
          <h5 className="text-2xl leading-8 font-bold">{error.message}</h5>
          <p className="text-sm">Please try again later or contact support if the problem persists.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <Button
            onClick={handleReset}
            variant="gooeyLeft"
            size="lg"
            className="w-full gap-2"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </Button>
          <Button
            onClick={handleNavigateHome}
            variant="shine"
            size="lg"
            className="w-full gap-2"
          >
            <Home className="h-4 w-4" aria-hidden="true" />
            Go back home
          </Button>
          <Button
            onClick={handleNavigateBack}
            variant="shine"
            size="lg"
            className="w-full gap-2"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
};

export default ErrorPage;
