import { cn } from "@/lib/utils";
import { GridPattern } from "@/components/ui/grid-pattern";

export default async function Layout({ children }: { children: React.ReactNode }) {

  return (
    <main className="relative min-h-screen py-12 max-w-full flex w-full items-center justify-center bg-black">
      <GridPattern
        width={130}
        height={130}
        x={-1}
        y={-1}
        className={cn(
          "[mask-image:radial-gradient(900px_circle_at_center,white,transparent)]",
        )}
      />
      {children}
    </main>
  );
}