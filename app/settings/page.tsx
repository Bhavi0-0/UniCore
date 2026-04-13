"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { User, Bell, LogOut, Moon, Mail, MessageSquare, ShoppingBag, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    events: true,
    marketplace: false,
  })

  const [userData, setUserData] = useState<any>(null)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  // ✅ FETCH USER
  useEffect(() => {
    const getUser = async () => {
      const { data: authData } = await supabase.auth.getUser()

      if (authData.user) {
        setEmail(authData.user.email || "")

        const { data } = await supabase
          .from("users")
          .select("*")
          .eq("id", authData.user.id)
          .single()

        setUserData(data)
        setName(data?.name || "")
      }
    }

    getUser()
  }, [])

  // ✅ UPDATE NAME
  const updateName = async () => {
    const { data: authData } = await supabase.auth.getUser()

    if (authData.user) {
      await supabase
        .from("users")
        .update({ name })
        .eq("id", authData.user.id)

      alert("Name updated!")
    }
  }

  // ✅ UPDATE EMAIL
  const updateEmail = async () => {
    const { error } = await supabase.auth.updateUser({
      email,
    })

    if (error) {
      alert(error.message)
    } else {
      alert("Check your new email to confirm change!")
    }
  }

  // ✅ LOGOUT FIXED
  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = "/"
  }

  return (
    <DashboardLayout title="Settings">
      <div className="max-w-2xl space-y-6">

        {/* ACCOUNT */}
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

            {/* NAME */}
            <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
              <Button size="sm" onClick={updateName}>
                Update Name
              </Button>
            </div>

            {/* EMAIL */}
            <div className="p-4 rounded-xl bg-secondary/30 space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
              <Button size="sm" variant="outline" onClick={updateEmail}>
                Change Email
              </Button>
            </div>

          </CardContent>
        </Card>

        {/* NOTIFICATIONS */}
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
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/30">
                <Label className="capitalize">{key} Notifications</Label>
                <Switch
                  checked={value}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, [key]: checked })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>

        {/* THEME */}
        <Card className="border-border/40">
          <CardHeader className="pb-4">
            <CardTitle>Appearance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between p-4 bg-secondary/30 rounded-xl">
              <Label>Dark Mode</Label>
              <Switch
                checked={theme === "dark"}
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        {/* LOGOUT */}
        <Card className="border-destructive/30 bg-destructive/5">
          <CardHeader>
            <CardTitle className="text-destructive">Logout</CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}