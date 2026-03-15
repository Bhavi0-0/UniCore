"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
  SidebarTrigger,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  FileText,
  Wallet,
  ShoppingBag,
  User,
  Settings,
  LogOut,
  Calendar,
  PartyPopper,
  Bell,
} from "lucide-react"

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FileText, label: "Notes Hub", href: "/notes" },
  { icon: Wallet, label: "Split Expenses", href: "/split" },
  { icon: ShoppingBag, label: "Marketplace", href: "/marketplace" },
  { icon: Calendar, label: "Timetable", href: "/timetable" },
  { icon: PartyPopper, label: "Events", href: "/events" },
  { icon: User, label: "Profile", href: "/profile" },
  { icon: Settings, label: "Settings", href: "/settings" },
]

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <SidebarProvider>
      <Sidebar className="border-r border-sidebar-border/50">
        <SidebarHeader className="px-6 py-5">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg shadow-md">
              U
            </div>
            <span className="text-xl font-bold text-sidebar-foreground tracking-tight">UniCore</span>
          </Link>
        </SidebarHeader>
        <SidebarContent className="px-3">
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className="gap-1">
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={pathname === item.href}
                      className="h-11 px-4 rounded-xl transition-all"
                    >
                      <Link href={item.href}>
                        <item.icon className="size-[18px]" />
                        <span className="font-medium">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="px-6 py-4 border-t border-sidebar-border/50">
          <div className="flex items-center gap-3">
            <Avatar className="size-9 ring-2 ring-sidebar-border/50">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
              <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">AS</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">Arjun Sharma</p>
              <p className="text-xs text-muted-foreground truncate">CSE 2021</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/50 bg-background/80 backdrop-blur-xl px-6">
          <div className="flex items-center gap-4">
            <SidebarTrigger className="text-muted-foreground hover:text-foreground" />
            <div className="h-6 w-px bg-border/50 hidden sm:block" />
            <h1 className="text-lg font-semibold text-foreground hidden sm:block">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground rounded-xl"
            >
              <Bell className="size-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-muted-foreground hover:text-foreground rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="size-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </div>
        </header>

        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
