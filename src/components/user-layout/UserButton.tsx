"use client";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { LogOutIcon, Settings } from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sidebarData } from "@/lib/constants";

interface UserButtonProps {
  className?: string;
}

export function UserButton({ className }: UserButtonProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={cn("rounded-full", className)}>
          <Avatar className="h-10 w-10 rounded-full">
            <AvatarImage src={sidebarData.user.avatar} alt={sidebarData.user.name} />
            <AvatarFallback className="rounded-lg text-black">SC</AvatarFallback>
          </Avatar>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-72 p-2 mr-5 mt-5 space-y-2">
        <DropdownMenuLabel
          className="bg-neutral-200 rounded-md flex flex-col justify-center items-center gap-y-4"
        >
          <div className="flex flex-col space-y-4 p-4 justify-center items-center">
            <Avatar className="h-10 w-10 rounded-full">
              <AvatarImage src={sidebarData.user.avatar} alt={sidebarData.user.name} />
              <AvatarFallback className="rounded-lg text-black">SC</AvatarFallback>
            </Avatar>
            <p className="text-base text-brand-hover dark:text-brand-surface">
              {sidebarData.user.name}
            </p>
          </div>
        </DropdownMenuLabel>
        <div className="py-1">
          <Link href="/account">
            <DropdownMenuItem className="cursor-pointer text-base text-brand-hover dark:text-brand-secondary2 focus:bg-brand-surface hover:dark:bg-brand-bg py-2">
              <Settings className="mr-2 size-4" />
              Settings
            </DropdownMenuItem>
          </Link>
        </div>
        <DropdownMenuSeparator />
        <div className="flex justify-end">
          <DropdownMenuItem
            onClick={() => {
              "ff"
            }}
            className="cursor-pointer px-3 text-base text-brand-critical focus:text-brand-critical w-fit dark:text-red-300 focus:bg-red-500/20 hover:dark:bg-red-600/20"
          >
            Logout
            <LogOutIcon className="ml-2 size-4 text-brand-critical" />
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}