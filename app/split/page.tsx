"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import * as StellarSdk from "stellar-sdk"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const gradients = [
  "from-red-500/10 to-red-600/5",
  "from-blue-500/10 to-blue-600/5",
  "from-purple-500/10 to-purple-600/5",
  "from-emerald-500/10 to-emerald-600/5",
]

// 🔥 SAFE SPLIT FUNCTION
const splitAmount = (total: number, members: number) => {
  const base = Math.floor(total / members)
  const remainder = total % members

  return Array.from({ length: members }).map((_, i) => ({
    name: `User ${i + 1}`,
    amount: i === members - 1 ? base + remainder : base,
    paid: false,
  }))
}

export default function SplitExpensesPage() {
  const router = useRouter()

  const [groups, setGroups] = useState<any[]>([])
  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState({
    name: "",
    total: "",
    members: 2,
  })

  // 🔥 LOAD FROM STORAGE
  useEffect(() => {
    const stored = localStorage.getItem("groups")

    if (stored) {
      setGroups(JSON.parse(stored))
    } else {
      setGroups([])
    }
  }, [])

  const save = (data: any) => {
    localStorage.setItem("groups", JSON.stringify(data))
  }

  // 🚀 STELLAR
  const sendPayment = async () => {
    alert("Demo payment done ✅")
  }

  const handleCreateGroup = () => {
    if (!form.name || !form.total) return

    const total = Number(form.total)
    const members = Number(form.members)

    const newGroup = {
      id: Date.now(),
      name: form.name,
      total,
      members: splitAmount(total, members), // 🔥 FIXED
      color: gradients[Math.floor(Math.random() * gradients.length)], // 🔥 RANDOM
    }

    const updated = [newGroup, ...groups]

    setGroups(updated)
    save(updated)

    setShowModal(false)
    setForm({ name: "", total: "", members: 2 })
  }

  return (
    <DashboardLayout title="Split Expenses">
      <div className="space-y-6">

        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Manage shared subscriptions and split bills
          </p>

          <Button onClick={() => setShowModal(true)}>
            <Plus className="size-4 mr-1" />
            Create Group
          </Button>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const paidAmount = group.members
              .filter((m: any) => m.paid)
              .reduce((acc: number, m: any) => acc + m.amount, 0)

            const pendingAmount = group.total - paidAmount
            const progress = (paidAmount / group.total) * 100

            return (
              <Card key={group.id} className={`bg-gradient-to-br ${group.color}`}>
                <CardHeader>
                  <CardTitle>{group.name}</CardTitle>
                  <CardDescription>{group.members.length} members</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">

                  <Progress value={progress} />

                  <div className="flex justify-between text-sm">
                    <span>Total: ₹{group.total}</span>
                    <span>Pending: ₹{pendingAmount}</span>
                  </div>

                  <div className="flex gap-2">

                    <Button
                      variant="outline"
                      onClick={() => router.push(`/group/${group.id}`)}
                      className="flex-1"
                    >
                      View
                    </Button>

                    <Button
                      onClick={sendPayment}
                      className="flex-1 bg-black text-white"
                    >
                      Pay with Stellar 💫
                    </Button>

                  </div>

                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* MODAL */}
        {showModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center">

            <div className="bg-[#0f172a] p-6 rounded-xl w-[350px] space-y-4 border border-white/10">

              <h2 className="text-white text-lg font-semibold">
                Create Group
              </h2>

              <input
                placeholder="Group Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 bg-[#020817] text-white rounded"
              />

              <input
                type="number"
                placeholder="Total Amount"
                value={form.total}
                onChange={(e) => setForm({ ...form, total: e.target.value })}
                className="w-full p-2 bg-[#020817] text-white rounded"
              />

              <input
                type="number"
                placeholder="Members"
                value={form.members}
                onChange={(e) => setForm({ ...form, members: Number(e.target.value) })}
                className="w-full p-2 bg-[#020817] text-white rounded"
              />

              <div className="flex justify-between">
                <Button onClick={() => setShowModal(false)}>
                  Cancel
                </Button>

                <Button onClick={handleCreateGroup}>
                  Create
                </Button>
              </div>

            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  )
}