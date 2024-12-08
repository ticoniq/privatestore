"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { IconInput } from "@/components/ui/icon-input";
import { Search } from "lucide-react";

export function SearchField() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";
  
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
    router.push(`/search?q=${encodeURIComponent(q)}`); 
  }
  
  return (
    <form onSubmit={handleSubmit} method="GET" action="/search">
      <div className="relative">
        <IconInput
          name="q" 
          placeholder="Search here..." 
          className="h-10 w-full" 
          defaultValue={currentQuery}
          iconPosition="left"
          icon={<Search size={18} />}
        />
      </div>
    </form>
  );
}