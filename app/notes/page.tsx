"use client"

import { useState, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Search, FileText, Download, Eye, TrendingUp } from "lucide-react"

const STORAGE_KEY = "notes_storage"

const subjectColors: Record<string, string> = {
  "Computer Science": "from-blue-500/10 to-blue-600/5 text-blue-600",
  "Mathematics": "from-purple-500/10 to-purple-600/5 text-purple-600",
  "Physics": "from-orange-500/10 to-orange-600/5 text-orange-600",
  "Chemistry": "from-emerald-500/10 to-emerald-600/5 text-emerald-600",
}

export default function NotesPage() {
  const [notes, setNotes] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [subjectFilter, setSubjectFilter] = useState("all")
  const [semesterFilter, setSemesterFilter] = useState("all")

  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    title: "",
    subject: "Computer Science",
    semester: "1st",
    author: "",
    cgpa: "",
  })

  // LOAD
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setNotes(JSON.parse(stored))
    }
  }, [])

  const save = (data: any) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }

  // UPLOAD
  const handleUpload = () => {
    if (!form.title || !form.author) return

    const newNote = {
      id: Date.now(),
      ...form,
      downloads: 0,
    }

    const updated = [newNote, ...notes]
    setNotes(updated)
    save(updated)

    setShowModal(false)
    setForm({
      title: "",
      subject: "Computer Science",
      semester: "1st",
      author: "",
      cgpa: "",
    })
  }

  const handleDelete = (id: number) => {
    const updated = notes.filter((n) => n.id !== id)
    setNotes(updated)
    save(updated)
  }

  const filteredNotes = notes.filter((note) => {
    return (
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (subjectFilter === "all" || note.subject === subjectFilter) &&
      (semesterFilter === "all" || note.semester === semesterFilter)
    )
  })

  return (
    <DashboardLayout title="Notes Hub">
      <div className="space-y-6">

        <div className="flex justify-between">
          <p className="text-muted-foreground">Upload and access study notes</p>

          <Button onClick={() => setShowModal(true)}>
            <Upload className="size-4 mr-1" />
            Upload Notes
          </Button>
        </div>

        <Input
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredNotes.map((note) => {
            const colorClass =
              subjectColors[note.subject] ||
              "from-slate-500/10 to-slate-600/5 text-slate-600"

            return (
              <Card key={note.id} className={`bg-gradient-to-br ${colorClass.split(" ").slice(0, 2).join(" ")}`}>

                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                  <CardDescription>
                    {note.subject} • {note.semester}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-3">

                  <p className="text-sm">
                    By <span className="font-semibold">{note.author}</span>
                  </p>

                  {/* 🔥 CGPA */}
                  <p className="text-xs text-muted-foreground">
                    CGPA: {note.cgpa || "N/A"}
                  </p>

                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Downloads: {note.downloads}</span>
                  </div>

                  <div className="flex gap-2">

                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="size-3.5" />
                      View
                    </Button>

                    <Button size="sm" className="flex-1">
                      <Download className="size-3.5" />
                      Download
                    </Button>

                    <button
                      onClick={() => handleDelete(note.id)}
                      className="text-red-400 text-xs"
                    >
                      ✕
                    </button>

                  </div>

                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

            <div className="bg-[#0f172a] p-6 rounded-xl w-[350px] space-y-4">

              <h2 className="text-white text-lg">Upload Notes</h2>

              <input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full p-2 bg-black text-white"
              />

              <input
                placeholder="Author"
                value={form.author}
                onChange={(e) => setForm({ ...form, author: e.target.value })}
                className="w-full p-2 bg-black text-white"
              />

              <input
                placeholder="CGPA"
                value={form.cgpa}
                onChange={(e) => setForm({ ...form, cgpa: e.target.value })}
                className="w-full p-2 bg-black text-white"
              />

              <div className="flex justify-between">
                <Button onClick={() => setShowModal(false)}>Cancel</Button>
                <Button onClick={handleUpload}>Upload</Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}