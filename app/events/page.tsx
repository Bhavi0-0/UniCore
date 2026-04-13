"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, ArrowRight, Sparkles } from "lucide-react"

const mockEvents = [
  // 🔥 YOUR EVENT (FIRST)
  {
    id: 0,
    title: "Hackaccino 4.0 🚀",
    date: "31st March, 2026",
    time: "24 Hour Hackathon",
    location: "Open for All Colleges",
    description:
      "⏳ FINAL CALL! Registrations close on 31st March. 24-hour hackathon with 15+ Lakh prize pool, free food, unlimited coffee, internships, and certificates for all. Open for Web Dev, AI/ML, App Dev, Blockchain.",
    category: "Technology",
    attendees: 1000,
    featured: true,
    link: "https://hackculture.io/hackathon/hackaccino?ref=devops",
  },

  // ORIGINAL EVENTS (UNCHANGED)
  {
    id: 1,
    title: "Technospark 2026",
    date: "15th March, 2026",
    time: "10:00 AM",
    location: "Main Auditorium",
    description: "Annual technical fest featuring hackathons, coding competitions, robotics, and tech talks by industry experts.",
    category: "Technology",
    attendees: 350,
    featured: true,
  },
  {
    id: 2,
    title: "Rang Tarang - Cultural Fest",
    date: "20th March, 2026",
    time: "6:00 PM",
    location: "Open Air Theatre",
    description: "Celebrate with music, dance, drama, and cultural performances including classical and folk traditions.",
    category: "Cultural",
    attendees: 280,
    featured: false,
  },
  {
    id: 3,
    title: "Campus Placement Drive",
    date: "25th March, 2026",
    time: "9:00 AM",
    location: "Placement Cell, Block A",
    description: "Connect with top companies like TCS, Infosys, Wipro and explore internship and job opportunities.",
    category: "Career",
    attendees: 600,
    featured: true,
  },
  {
    id: 4,
    title: "Khel Mahotsav",
    date: "1st April, 2026",
    time: "8:00 AM",
    location: "Sports Complex",
    description: "Inter-branch sports competition featuring cricket, football, badminton, and athletics.",
    category: "Sports",
    attendees: 400,
    featured: false,
  },
  {
    id: 5,
    title: "Workshop: AI & ML with Python",
    date: "5th April, 2026",
    time: "2:00 PM",
    location: "Computer Lab 1",
    description: "Hands-on workshop on artificial intelligence and machine learning using TensorFlow and Keras.",
    category: "Workshop",
    attendees: 60,
    featured: false,
  },
]

const categoryStyles: Record<string, { bg: string; text: string; gradient: string }> = {
  "Technology": { bg: "bg-blue-500/10", text: "text-blue-600", gradient: "from-blue-500/10 to-blue-600/5" },
  "Cultural": { bg: "bg-purple-500/10", text: "text-purple-600", gradient: "from-purple-500/10 to-purple-600/5" },
  "Career": { bg: "bg-emerald-500/10", text: "text-emerald-600", gradient: "from-emerald-500/10 to-emerald-600/5" },
  "Sports": { bg: "bg-orange-500/10", text: "text-orange-600", gradient: "from-orange-500/10 to-orange-600/5" },
  "Workshop": { bg: "bg-pink-500/10", text: "text-pink-600", gradient: "from-pink-500/10 to-pink-600/5" },
}

export default function EventsPage() {
  return (
    <DashboardLayout title="Campus Events">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">Discover and register for upcoming campus events</p>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {mockEvents.map((event) => {
            const style = categoryStyles[event.category]

            return (
              <Card key={event.id} className={`border-border/40 bg-gradient-to-br ${style.gradient} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group overflow-hidden`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CardTitle className="text-lg">{event.title}</CardTitle>
                        {event.featured && (
                          <Badge variant="secondary" className="bg-amber-500/10 text-amber-600 border-0 gap-1">
                            <Sparkles className="size-3" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <Badge variant="secondary" className={`${style.bg} ${style.text} border-0`}>
                        {event.category}
                      </Badge>
                    </div>
                    <div className={`flex size-12 items-center justify-center rounded-xl bg-background/80 shadow-sm ${style.text}`}>
                      <Calendar className="size-6" />
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <CardDescription className="line-clamp-2 leading-relaxed">{event.description}</CardDescription>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2.5 text-muted-foreground p-2.5 rounded-lg bg-background/50">
                      <Calendar className="size-4 shrink-0" />
                      <span className="truncate">{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground p-2.5 rounded-lg bg-background/50">
                      <Clock className="size-4 shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground p-2.5 rounded-lg bg-background/50">
                      <MapPin className="size-4 shrink-0" />
                      <span className="truncate">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-muted-foreground p-2.5 rounded-lg bg-background/50">
                      <Users className="size-4 shrink-0" />
                      <span>{event.attendees} attending</span>
                    </div>
                  </div>

                  {/* 🔥 REGISTER BUTTON WITH LINK */}
                  <Button
                    className="w-full shadow-sm group-hover:shadow-md transition-shadow"
                    onClick={() => {
                      if (event.link) {
                        window.open(event.link, "_blank")
                      }
                    }}
                  >
                    Register Now
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