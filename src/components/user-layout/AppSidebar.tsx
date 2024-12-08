"use client"

import { NavMain } from "@/components/user-layout/NavMain"
import { NavUser } from "@/components/user-layout/NavUser"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Logo } from "./Logo"
import { sidebarData } from "@/lib/constants"
import { SidebarPlan } from "@/components/user-layout/SidebarPlan"
import { Separator } from "@/components/ui/separator"


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="hover:bg-transparent py-5">
              <Logo
                link="/dashboard"
             />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={sidebarData.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarPlan />
        <Separator className="my-4" />
        <NavUser user={sidebarData.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
