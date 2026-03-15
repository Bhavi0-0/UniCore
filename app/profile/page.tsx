"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Pencil, Mail, Phone, GraduationCap, Calendar, FileText, Download, Users, Star } from "lucide-react"

const userProfile = {
  name: "Arjun Sharma",
  email: "arjun.sharma@college.ac.in",
  phone: "+91 98765 43210",
  branch: "Computer Science & Engineering",
  semester: "6th Semester",
  rollNo: "CSE2021045",
  joinedYear: "2021",
  avatar: "",
}

const stats = [
  { label: "Notes Uploaded", value: 12, icon: FileText, color: "text-blue-600 bg-blue-500/10" },
  { label: "Notes Downloaded", value: 45, icon: Download, color: "text-emerald-600 bg-emerald-500/10" },
  { label: "Groups Joined", value: 5, icon: Users, color: "text-purple-600 bg-purple-500/10" },
  { label: "Events Attended", value: 8, icon: Star, color: "text-orange-600 bg-orange-500/10" },
]

export default function ProfilePage() {
  return (
    <DashboardLayout title="Profile">
      <div className="space-y-6">
        <Card className="border-border/40 overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-primary/20 via-primary/10 to-accent/10" />
          <CardContent className="pt-0 -mt-12">
            <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end">
              <Avatar className="size-24 border-4 border-card shadow-lg">
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {userProfile.name.split(" ").map((n) => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-center sm:text-left pb-2">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">{userProfile.name}</h2>
                    <p className="text-muted-foreground">{userProfile.rollNo}</p>
                  </div>
                  <Button variant="outline" className="gap-2 shadow-sm">
                    <Pencil className="size-4" />
                    Edit Profile
                  </Button>
                </div>
                <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
                  <Badge className="bg-primary/10 text-primary border-0 font-medium">
                    {userProfile.branch}
                  </Badge>
                  <Badge variant="outline" className="font-medium">{userProfile.semester}</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border/40">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`flex size-12 items-center justify-center rounded-xl ${stat.color}`}>
                    <stat.icon className="size-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                <div className="flex size-11 items-center justify-center rounded-xl bg-background shadow-sm text-primary">
                  <Mail className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Email</p>
                  <p className="font-medium truncate">{userProfile.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                <div className="flex size-11 items-center justify-center rounded-xl bg-background shadow-sm text-primary">
                  <Phone className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Phone</p>
                  <p className="font-medium">{userProfile.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                <div className="flex size-11 items-center justify-center rounded-xl bg-background shadow-sm text-primary">
                  <GraduationCap className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Branch</p>
                  <p className="font-medium">{userProfile.branch}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-xl border border-border/50 bg-secondary/30 p-4 transition-colors hover:bg-secondary/50">
                <div className="flex size-11 items-center justify-center rounded-xl bg-background shadow-sm text-primary">
                  <Calendar className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Joined</p>
                  <p className="font-medium">{userProfile.joinedYear}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
