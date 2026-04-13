"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Clock } from "lucide-react"

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"]

type ClassType = {
  day: string
  time: string
  subject: string
  room: string
  color: string
}

// 🔥 DUMMY DATA
const dummyData: ClassType[] = [
  { day: "Monday", time: "9:00 AM", subject: "DSA", room: "B101", color: "bg-blue-500/10 border-blue-500/30 text-blue-400" },
  { day: "Tuesday", time: "10:00 AM", subject: "Maths", room: "C202", color: "bg-purple-500/10 border-purple-500/30 text-purple-400" },
  { day: "Wednesday", time: "11:00 AM", subject: "Physics", room: "Lab-1", color: "bg-orange-500/10 border-orange-500/30 text-orange-400" },
]

export default function TimetablePage() {
  const [classes, setClasses] = useState<Record<string, ClassType[]>>({})
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    day: "Monday",
    time: "9:00 AM",
    subject: "",
    room: "",
  })

  // 🔥 LOAD FROM LOCAL STORAGE OR USE DUMMY
  useEffect(() => {
    const stored = localStorage.getItem("timetable")

    if (stored) {
      setClasses(JSON.parse(stored))
    } else {
      const grouped: Record<string, ClassType[]> = {}

      dummyData.forEach((c) => {
        if (!grouped[c.day]) grouped[c.day] = []
        grouped[c.day].push(c)
      })

      setClasses(grouped)
      localStorage.setItem("timetable", JSON.stringify(grouped))
    }
  }, [])

  // 🔥 SAVE TO LOCAL STORAGE
  const saveToStorage = (data: any) => {
    localStorage.setItem("timetable", JSON.stringify(data))
  }

  const handleAddClass = () => {
    if (!form.subject || !form.room) return

    if (classes[form.day]?.some((c) => c.time === form.time)) {
      alert("Slot already occupied")
      return
    }

    const newClass: ClassType = {
      ...form,
      color: "bg-blue-500/10 border-blue-500/30 text-blue-400",
    }

    const updated = {
      ...classes,
      [form.day]: [...(classes[form.day] || []), newClass],
    }

    setClasses(updated)
    saveToStorage(updated)

    setShowModal(false)
    setForm({ day: "Monday", time: "9:00 AM", subject: "", room: "" })
  }

  const handleDelete = (day: string, time: string) => {
    const updated = {
      ...classes,
      [day]: classes[day]?.filter((c) => c.time !== time),
    }

    setClasses(updated)
    saveToStorage(updated)
  }

  return (
    <DashboardLayout title="Timetable">
      <div className="space-y-6">

        <div className="flex justify-between">
          <p className="text-muted-foreground">Manage your timetable</p>

          <Button onClick={() => setShowModal(true)} className="gap-2">
            <Plus className="size-4" />
            Add Class
          </Button>
        </div>

        <Card className="border-border/40">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock /> Weekly Schedule
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0 overflow-auto">
            <div className="min-w-[800px]">

              {/* HEADER */}
              <div className="grid grid-cols-6 border-b border-border/50">
                <div className="p-4 text-muted-foreground">Time</div>
                {days.map((day) => (
                  <div key={day} className="p-4 text-center font-semibold text-muted-foreground">
                    {day}
                  </div>
                ))}
              </div>

              {/* ROWS */}
              {timeSlots.map((time, idx) => (
                <div
                  key={time}
                  className={`grid grid-cols-6 border-b border-border/50 ${
                    idx % 2 === 0 ? "bg-background" : "bg-secondary/10"
                  }`}
                >
                  <div className="p-4 text-muted-foreground">{time}</div>

                  {days.map((day) => {
                    const classItem = classes[day]?.find((c) => c.time === time)

                    return (
                      <div key={day + time} className="p-2 min-h-[72px] flex items-center justify-center">
                        {classItem && (
                          <div className={`w-full p-3 rounded-xl border ${classItem.color}`}>
                            <p className="font-semibold">{classItem.subject}</p>
                            <p className="text-xs opacity-70">{classItem.room}</p>

                            <button
                              onClick={() => handleDelete(day, time)}
                              className="text-red-400 text-xs mt-2 hover:underline"
                            >
                              Delete
                            </button>
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

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-[#0f172a] border border-white/10 p-6 rounded-xl w-[320px] space-y-4 shadow-2xl">

              <h2 className="text-lg font-semibold text-white">Add Class</h2>

              <select
                value={form.day}
                onChange={(e) => setForm({ ...form, day: e.target.value })}
                className="w-full bg-[#020817] border border-white/10 text-white p-2 rounded"
              >
                {days.map((d) => <option key={d}>{d}</option>)}
              </select>

              <select
                value={form.time}
                onChange={(e) => setForm({ ...form, time: e.target.value })}
                className="w-full bg-[#020817] border border-white/10 text-white p-2 rounded"
              >
                {timeSlots.map((t) => <option key={t}>{t}</option>)}
              </select>

              <input
                placeholder="Subject"
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full bg-[#020817] border border-white/10 text-white p-2 rounded"
              />

              <input
                placeholder="Room"
                value={form.room}
                onChange={(e) => setForm({ ...form, room: e.target.value })}
                className="w-full bg-[#020817] border border-white/10 text-white p-2 rounded"
              />

              <div className="flex justify-between pt-2">
                <Button variant="outline" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>

                <Button onClick={handleAddClass} className="bg-green-600">
                  Add
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}