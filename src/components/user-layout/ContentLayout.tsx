import { AppSidebar } from "@/components/user-layout/AppSidebar"
import { Bell, type LucideIcon } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { UserButton } from "@/components/user-layout/UserButton"
import { Button } from "@/components/ui/button"
import { SearchField } from "@/components/user-layout/SearchField"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface ContentLayoutProps {
  title: string;
  subtitle?: string,
  children: React.ReactNode;
  icon?: LucideIcon
}

export function ContentLayout({
  title,
  subtitle,
  children,
  icon: Icon,
}: ContentLayoutProps) {
  return (
    <SidebarProvider className="flex w-full">
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 z-10 bg-background md:rounded-t-2xl border-b h-16 shrink-0 items-center gap-2">
          <section className="flex justify-between items-center w-full">
            <div className="flex items-center gap-2 px-4 md:px-6">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-1 h-6" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink className="flex justify-center text-foreground font-medium items-center gap-2">
                      {Icon && <Icon className="h-5 w-5 shrink-0" />}
                      {title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {subtitle && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink>
                          {subtitle}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 md:px-6">
              <SearchField />
              <div className="flex items-center space-x-2">
                <Label htmlFor="offline">Offline</Label>
                <Switch />
                <Label htmlFor="online">Online</Label>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <UserButton />
            </div>
          </section>
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}