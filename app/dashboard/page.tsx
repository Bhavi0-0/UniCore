"use client"

import Link from "next/link"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  FileText,
  Wallet,
  ShoppingBag,
  User,
  Calendar,
  PartyPopper,
  ArrowUpRight,
} from "lucide-react"

const featureCards = [
  {
    icon: FileText,
    title: "Notes Hub",
    description: "Upload and access study notes from your peers",
    href: "/notes",
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-600",
  },
  {
    icon: Wallet,
    title: "Split Expenses",
    description: "Manage shared subscriptions and payments easily",
    href: "/split",
    color: "from-emerald-500/10 to-emerald-600/5",
    iconColor: "text-emerald-600",
  },
  {
    icon: ShoppingBag,
    title: "Marketplace",
    description: "Buy and sell books or college items",
    href: "/marketplace",
    color: "from-orange-500/10 to-orange-600/5",
    iconColor: "text-orange-600",
  },
  {
    icon: Calendar,
    title: "Timetable",
    description: "View and manage your class schedule",
    href: "/timetable",
    color: "from-purple-500/10 to-purple-600/5",
    iconColor: "text-purple-600",
  },
  {
    icon: PartyPopper,
    title: "Events",
    description: "Discover and join campus events",
    href: "/events",
    color: "from-pink-500/10 to-pink-600/5",
    iconColor: "text-pink-600",
  },
  {
    icon: User,
    title: "Profile",
    description: "Manage your account and preferences",
    href: "/profile",
    color: "from-slate-500/10 to-slate-600/5",
    iconColor: "text-slate-600",
  },
]

export default function DashboardPage() {
  return (
    <DashboardLayout title="Dashboard">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground tracking-tight">Welcome back, Arjun</h2>
        <p className="text-muted-foreground mt-1">Here&apos;s what&apos;s happening on campus today.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featureCards.map((card) => (
          <Link key={card.title} href={card.href} className="group">
            <Card className={`h-full border-border/40 bg-gradient-to-br ${card.color} backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5 hover:border-border`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className={`flex size-11 items-center justify-center rounded-xl bg-background/80 shadow-sm ${card.iconColor}`}>
                    <card.icon className="size-5" />
                  </div>
                  <ArrowUpRight className="size-4 text-muted-foreground opacity-0 -translate-x-1 translate-y-1 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0" />
                </div>
                <CardTitle className="text-base font-semibold mt-4">{card.title}</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <CardDescription className="text-sm leading-relaxed">
                  {card.description}
                </CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">12</p>
                <p className="text-xs text-muted-foreground mt-1">Notes Shared</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">3</p>
                <p className="text-xs text-muted-foreground mt-1">Active Groups</p>
              </div>
              <div className="text-center p-4 rounded-xl bg-secondary/50">
                <p className="text-2xl font-bold text-foreground">5</p>
                <p className="text-xs text-muted-foreground mt-1">Upcoming Events</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="text-base font-semibold">Upcoming Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                <div className="size-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Data Structures</p>
                  <p className="text-xs text-muted-foreground">9:00 AM - Room 301</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                <div className="size-2 rounded-full bg-emerald-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">Computer Networks</p>
                  <p className="text-xs text-muted-foreground">11:00 AM - Room 205</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50">
                <div className="size-2 rounded-full bg-orange-500" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">DBMS Lab</p>
                  <p className="text-xs text-muted-foreground">2:00 PM - Lab 102</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
