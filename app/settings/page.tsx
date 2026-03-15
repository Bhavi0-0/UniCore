"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, Bell, LogOut, Moon, Mail, MessageSquare, ShoppingBag, ArrowRight } from "lucide-react"

export default function SettingsPage() {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    events: true,
    marketplace: false,
  })

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-6">
        <Card className="border-border/40">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <User className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Account Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Email</Label>
                <p className="text-sm text-muted-foreground">arjun.sharma@college.ac.in</p>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm">Change</Button>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Password</Label>
                <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
              </div>
              <Button variant="outline" size="sm" className="shadow-sm">Update</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Bell className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Notifications</CardTitle>
                <CardDescription>Configure how you receive notifications</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-1">
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                  <Mail className="size-4" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Email Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={notifications.email}
                onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
              />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600">
                  <Bell className="size-4" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Push Notifications</Label>
                  <p className="text-xs text-muted-foreground">Receive push notifications</p>
                </div>
              </div>
              <Switch
                checked={notifications.push}
                onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
              />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
                  <MessageSquare className="size-4" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Event Reminders</Label>
                  <p className="text-xs text-muted-foreground">Get notified about upcoming events</p>
                </div>
              </div>
              <Switch
                checked={notifications.events}
                onCheckedChange={(checked) => setNotifications({ ...notifications, events: checked })}
              />
            </div>
            <Separator className="bg-border/50" />
            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30 transition-colors">
              <div className="flex items-center gap-4">
                <div className="flex size-9 items-center justify-center rounded-lg bg-orange-500/10 text-orange-600">
                  <ShoppingBag className="size-4" />
                </div>
                <div className="space-y-0.5">
                  <Label className="text-sm font-medium">Marketplace Updates</Label>
                  <p className="text-xs text-muted-foreground">Get notified about new listings</p>
                </div>
              </div>
              <Switch
                checked={notifications.marketplace}
                onCheckedChange={(checked) => setNotifications({ ...notifications, marketplace: checked })}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Moon className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold">Appearance</CardTitle>
                <CardDescription>Customize your app experience</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/30">
              <div className="space-y-0.5">
                <Label className="text-sm font-medium">Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Toggle dark mode theme</p>
              </div>
              <Switch 
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                <LogOut className="size-5" />
              </div>
              <div>
                <CardTitle className="text-base font-semibold text-destructive">Logout</CardTitle>
                <CardDescription>Sign out of your account</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleLogout} className="w-full sm:w-auto gap-2 shadow-sm">
              Logout
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
