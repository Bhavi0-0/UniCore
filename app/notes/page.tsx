"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, FileText, Download, Eye, TrendingUp } from "lucide-react"

const mockNotes = [
  { id: 1, title: "Data Structures Notes", subject: "Computer Science", semester: "3rd", author: "Arjun Sharma", downloads: 45 },
  { id: 2, title: "Engineering Mathematics II", subject: "Mathematics", semester: "2nd", author: "Priya Patel", downloads: 32 },
  { id: 3, title: "Physics Lab Manual", subject: "Physics", semester: "1st", author: "Rahul Verma", downloads: 28 },
  { id: 4, title: "DBMS Notes (AKTU)", subject: "Computer Science", semester: "4th", author: "Sneha Gupta", downloads: 56 },
  { id: 5, title: "Organic Chemistry", subject: "Chemistry", semester: "3rd", author: "Vikram Singh", downloads: 19 },
]

const subjectColors: Record<string, string> = {
  "Computer Science": "from-blue-500/10 to-blue-600/5 text-blue-600",
  "Mathematics": "from-purple-500/10 to-purple-600/5 text-purple-600",
  "Physics": "from-orange-500/10 to-orange-600/5 text-orange-600",
  "Chemistry": "from-emerald-500/10 to-emerald-600/5 text-emerald-600",
}

export default function NotesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")

  const filteredNotes = mockNotes.filter((note) => {
    const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSubject = subjectFilter === "all" || note.subject === subjectFilter
    const matchesSemester = semesterFilter === "all" || note.semester === semesterFilter
    return matchesSearch && matchesSubject && matchesSemester
  })

  return (
    <DashboardLayout title="Notes Hub">
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">Upload and access study notes from your peers</p>
          <Button className="gap-2 shadow-md">
            <Upload className="size-4" />
            Upload Notes
          </Button>
        </div>

        <Card className="border-border/40 bg-secondary/30">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
                <Input
                  placeholder="Search notes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-11 h-11 bg-background border-border/50"
                />
              </div>
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-full sm:w-48 h-11 bg-background border-border/50">
                  <SelectValue placeholder="Filter by subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="Computer Science">Computer Science</SelectItem>
                  <SelectItem value="Mathematics">Mathematics</SelectItem>
                  <SelectItem value="Physics">Physics</SelectItem>
                  <SelectItem value="Chemistry">Chemistry</SelectItem>
                </SelectContent>
              </Select>
              <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                <SelectTrigger className="w-full sm:w-40 h-11 bg-background border-border/50">
                  <SelectValue placeholder="Semester" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Semesters</SelectItem>
                  <SelectItem value="1st">1st Semester</SelectItem>
                  <SelectItem value="2nd">2nd Semester</SelectItem>
                  <SelectItem value="3rd">3rd Semester</SelectItem>
                  <SelectItem value="4th">4th Semester</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => {
            const colorClass = subjectColors[note.subject] || "from-slate-500/10 to-slate-600/5 text-slate-600"
            const iconColorClass = colorClass.split(" ")[2] || "text-primary"
            
            return (
              <Card key={note.id} className={`border-border/40 bg-gradient-to-br ${colorClass.split(" ").slice(0, 2).join(" ")} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5`}>
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className={`flex size-11 items-center justify-center rounded-xl bg-background/80 shadow-sm ${iconColorClass}`}>
                      <FileText className="size-5" />
                    </div>
                    <div className="flex-1 space-y-1 min-w-0">
                      <CardTitle className="text-base line-clamp-1">{note.title}</CardTitle>
                      <CardDescription className="text-xs">
                        {note.subject} • {note.semester} Sem
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>By {note.author}</span>
                    <span className="flex items-center gap-1">
                      <TrendingUp className="size-3" />
                      {note.downloads}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1 gap-1.5 bg-background/80 border-border/50">
                      <Eye className="size-3.5" />
                      View
                    </Button>
                    <Button size="sm" className="flex-1 gap-1.5 shadow-sm">
                      <Download className="size-3.5" />
                      Download
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </DashboardLayout>
  )
}
