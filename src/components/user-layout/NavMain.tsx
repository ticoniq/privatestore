"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { usePathname } from "next/navigation";
import { useParentAndChildPaths } from "@/hooks/useParentPathname"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}) {
  const pathname = usePathname();
  const { parent } = useParentAndChildPaths();

  const isActive = (url: string) => {
    return url.startsWith(`/${parent}`)
      ? pathname.startsWith(`/${parent}`)
      : pathname === url;
  }

  const isParentOrChildActive = (item: typeof items[number]) => {
    // Check if the current route is the item's route
    if (isActive(item.url)) return true

    // Check if any of the subitems are active
    if (item.items) {
      return item.items.some(subItem => pathname === subItem.url)
    }

    return false
  }


  return (
    <SidebarGroup>
      {items.map((item) => (
        <SidebarMenu key={item.title}>
          {item.items?.length ? (
            <Collapsible
              defaultOpen={isParentOrChildActive(item)}
            >
              <CollapsibleTrigger asChild>
                <SidebarMenuButton isActive={isParentOrChildActive(item)}>
                  <item.icon className="h-6 w-6 shrink-0" />
                  <span>{item.title}</span>
                  <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <SidebarMenuSub>
                  {item.items.map((subItem) => (
                    <SidebarMenuSubItem key={subItem.title}>
                      <SidebarMenuSubButton asChild isActive={pathname === subItem.url}>
                        <Link href={subItem.url}>
                          <span>{subItem.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <SidebarMenuItem>
              <Link href={item.url} className="w-full">
                <SidebarMenuButton
                  isActive={isActive(item.url)}
                >
                  {item.icon && (
                    <item.icon className="h-4 w-4 shrink-0" />
                  )}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      ))}
    </SidebarGroup>
  )
}
