"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

const classes: Record<string, { day: string; time: string; subject: string; room: string; color: string }[]> = {
  "Monday": [
    { day: "Monday", time: "9:00 AM", subject: "Data Structures", room: "Room 201", color: "bg-blue-500/10 border-blue-500/30 text-blue-700" },
    { day: "Monday", time: "11:00 AM", subject: "Mathematics", room: "Room 105", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700" },
    { day: "Monday", time: "2:00 PM", subject: "Physics Lab", room: "Lab 3", color: "bg-purple-500/10 border-purple-500/30 text-purple-700" },
  ],
  "Tuesday": [
    { day: "Tuesday", time: "10:00 AM", subject: "Database Systems", room: "Room 302", color: "bg-orange-500/10 border-orange-500/30 text-orange-700" },
    { day: "Tuesday", time: "1:00 PM", subject: "Software Engineering", room: "Room 201", color: "bg-pink-500/10 border-pink-500/30 text-pink-700" },
  ],
  "Wednesday": [
    { day: "Wednesday", time: "9:00 AM", subject: "Data Structures", room: "Room 201", color: "bg-blue-500/10 border-blue-500/30 text-blue-700" },
    { day: "Wednesday", time: "11:00 AM", subject: "Mathematics", room: "Room 105", color: "bg-emerald-500/10 border-emerald-500/30 text-emerald-700" },
    { day: "Wednesday", time: "3:00 PM", subject: "Computer Networks", room: "Room 401", color: "bg-teal-500/10 border-teal-500/30 text-teal-700" },
  ],
  "Thursday": [
    { day: "Thursday", time: "10:00 AM", subject: "Database Systems", room: "Room 302", color: "bg-orange-500/10 border-orange-500/30 text-orange-700" },
    { day: "Thursday", time: "2:00 PM", subject: "Physics Lab", room: "Lab 3", color: "bg-purple-500/10 border-purple-500/30 text-purple-700" },
  ],
  "Friday": [
    { day: "Friday", time: "9:00 AM", subject: "Software Engineering", room: "Room 201", color: "bg-pink-500/10 border-pink-500/30 text-pink-700" },
    { day: "Friday", time: "11:00 AM", subject: "Computer Networks", room: "Room 401", color: "bg-teal-500/10 border-teal-500/30 text-teal-700" },
  ],
}

export default function TimetablePage() {
  return (
    <DashboardLayout title="Timetable">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">View and manage your weekly class schedule</p>
          <Button className="gap-2 shadow-md">
            <Plus className="size-4" />
            Add Class
          </Button>
        </div>

        <Card className="border-border/40">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Clock className="size-5" />
              </div>
              <CardTitle className="text-base font-semibold">Weekly Schedule</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-0 overflow-auto">
            <div className="min-w-[800px]">
              <div className="grid grid-cols-6 border-b border-border/50">
                <div className="p-4 font-medium text-muted-foreground text-sm border-r border-border/50 bg-secondary/30">Time</div>
                {days.map((day) => (
                  <div key={day} className="p-4 font-semibold text-center text-sm border-r border-border/50 last:border-r-0 bg-secondary/30">
                    {day}
                  </div>
                ))}
              </div>
              {timeSlots.map((time, idx) => (
                <div key={time} className={`grid grid-cols-6 border-b border-border/50 last:border-b-0 ${idx % 2 === 0 ? 'bg-background' : 'bg-secondary/10'}`}>
                  <div className="p-4 text-sm text-muted-foreground border-r border-border/50 font-medium">
                    {time}
                  </div>
                  {days.map((day) => {
                    const classItem = classes[day]?.find((c) => c.time === time)
                    return (
                      <div key={`${day}-${time}`} className="p-2 border-r border-border/50 last:border-r-0 min-h-[72px] flex items-center justify-center">
                        {classItem && (
                          <div className={`w-full p-3 rounded-xl border text-xs transition-all hover:scale-[1.02] hover:shadow-sm ${classItem.color}`}>
                            <p className="font-semibold line-clamp-1">{classItem.subject}</p>
                            <p className="mt-1.5 opacity-70 text-[11px]">{classItem.room}</p>
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
