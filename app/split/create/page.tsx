"use client"

import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function CreateSplitGroup() {
  const router = useRouter()

  const [form, setForm] = useState({
    name: "",
    description: "",
    members: "",
    total: "",
  })

  return (
    <DashboardLayout title="Add Group">
      <div className="flex justify-center">
        <div className="w-full max-w-2xl space-y-6 bg-[#020817] border border-white/10 p-8 rounded-2xl">

          {/* HEADER */}
          <div>
            <h2 className="text-2xl font-semibold text-white">
              Create New Group
            </h2>
            <p className="text-muted-foreground text-sm mt-1">
              Split expenses with friends easily
            </p>
          </div>

          {/* NAME */}
          <div>
            <label className="text-sm text-muted-foreground">Group Title</label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. Goa Trip"
              className="mt-2 bg-[#020817] border-white/10 text-white"
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="text-sm text-muted-foreground">Description</label>
            <Textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe this group..."
              className="mt-2 bg-[#020817] border-white/10 text-white"
            />
          </div>

          {/* MEMBERS */}
          <div>
            <label className="text-sm text-muted-foreground">Members</label>
            <Input
              type="number"
              value={form.members}
              onChange={(e) => setForm({ ...form, members: e.target.value })}
              placeholder="Number of members"
              className="mt-2 bg-[#020817] border-white/10 text-white"
            />
          </div>

          {/* TOTAL */}
          <div>
            <label className="text-sm text-muted-foreground">Total Amount</label>
            <Input
              type="number"
              value={form.total}
              onChange={(e) => setForm({ ...form, total: e.target.value })}
              placeholder="₹ amount"
              className="mt-2 bg-[#020817] border-white/10 text-white"
            />
          </div>

          {/* ACTIONS */}
          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button className="bg-green-600 hover:bg-green-700">
              Create Group
            </Button>
          </div>

        </div>
      </div>
    </DashboardLayout>
  )
}