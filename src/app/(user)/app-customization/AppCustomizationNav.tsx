"use client"
import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const sidebarNavItems = [
  {
    title: "App Overview",
    href: "/app-customization/app-overview",
    icon: "settings",
  },
  {
    title: "Template Session",
    href: "/app-customization/template",
    icon: "file-text",
  },
  {
    title: "Typography & Icons",
    href: "/app-customization/typography-icon",
    icon: "type",
  },
  {
    title: "Colors",
    href: "/app-customization/colors",
    icon: "palette",
  },
];

export function AppCustomizationNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col border-b lg:flex-row">
      {sidebarNavItems.map((item) => (
        <Button
          key={item.href}
          asChild
          variant="link"
          className="rounded-none"
        >
          <Link
            href={item.href}
            className={cn(
              pathname === item.href
                ? "border-b-[3px] border-primary-800 text-primary-700 hover:no-underline"
                : "hover:border-b-[3px] hover:border-primary-800 hover:no-underline",
              "justify-start"
            )}
          >
            {item.title}
          </Link>
        </Button>
      ))}
    </nav>
  );
}