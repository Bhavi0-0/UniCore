"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Plus, Users, IndianRupee, CheckCircle2, Clock, ArrowRight } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const mockGroups = [
  {
    id: 1,
    name: "Netflix Subscription",
    members: [
      { name: "Arjun", amount: 150, paid: true },
      { name: "Priya", amount: 150, paid: true },
      { name: "Rahul", amount: 150, paid: false },
      { name: "Sneha", amount: 150, paid: true },
    ],
    total: 600,
    color: "from-red-500/10 to-red-600/5",
    iconColor: "text-red-500",
  },
  {
    id: 2,
    name: "Goa Trip Expenses",
    members: [
      { name: "Arjun", amount: 2500, paid: true },
      { name: "Vikram", amount: 2500, paid: false },
      { name: "Neha", amount: 2500, paid: true },
    ],
    total: 7500,
    color: "from-blue-500/10 to-blue-600/5",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    name: "Farewell Party",
    members: [
      { name: "Arjun", amount: 500, paid: true },
      { name: "Priya", amount: 500, paid: true },
      { name: "Rahul", amount: 500, paid: true },
      { name: "Sneha", amount: 500, paid: true },
      { name: "Amit", amount: 500, paid: false },
    ],
    total: 2500,
    color: "from-purple-500/10 to-purple-600/5",
    iconColor: "text-purple-500",
  },
]

export default function SplitExpensesPage() {
  return (
    <DashboardLayout title="Split Expenses">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">Manage shared subscriptions and split bills with friends</p>
          <Button className="gap-2 shadow-md">
            <Plus className="size-4" />
            Create Group
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockGroups.map((group) => {
            const paidAmount = group.members
              .filter((m) => m.paid)
              .reduce((acc, m) => acc + m.amount, 0)
            const pendingAmount = group.total - paidAmount
            const paidCount = group.members.filter((m) => m.paid).length
            const progress = (paidAmount / group.total) * 100

            return (
              <Card key={group.id} className={`border-border/40 bg-gradient-to-br ${group.color} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1.5">
                      <CardTitle className="text-lg font-semibold">{group.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1.5 text-xs">
                        <Users className="size-3.5" />
                        {group.members.length} members
                      </CardDescription>
                    </div>
                    <div className={`flex size-11 items-center justify-center rounded-xl bg-background/80 shadow-sm ${group.iconColor}`}>
                      <IndianRupee className="size-5" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-medium">{paidCount}/{group.members.length} paid</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-background/60">
                      <p className="text-xs text-muted-foreground mb-1">Total</p>
                      <p className="text-lg font-bold text-foreground">₹{group.total.toLocaleString()}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-background/60">
                      <p className="text-xs text-muted-foreground mb-1">Pending</p>
                      <p className={`text-lg font-bold ${pendingAmount > 0 ? "text-orange-500" : "text-emerald-500"}`}>
                        ₹{pendingAmount.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {group.members.slice(0, 4).map((member, idx) => (
                        <Avatar key={idx} className="size-8 border-2 border-card ring-0">
                          <AvatarFallback className={`text-xs font-medium ${member.paid ? "bg-emerald-100 text-emerald-700" : "bg-orange-100 text-orange-700"}`}>
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                      {group.members.length > 4 && (
                        <Avatar className="size-8 border-2 border-card">
                          <AvatarFallback className="text-xs bg-muted font-medium">
                            +{group.members.length - 4}
                          </AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {pendingAmount > 0 ? (
                        <>
                          <Clock className="size-3.5 text-orange-500" />
                          <span>Pending</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="size-3.5 text-emerald-500" />
                          <span>Settled</span>
                        </>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full bg-background/80 border-border/50 group-hover:bg-background">
                    View Details
                    <ArrowRight className="ml-2 size-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
