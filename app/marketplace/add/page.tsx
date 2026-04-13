"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, ImagePlus, IndianRupee, Package, Tag, FileText, Layers } from "lucide-react"

const categories = [
  { value: "Books", label: "Books" },
  { value: "Electronics", label: "Electronics" },
  { value: "Clothing", label: "Clothing" },
  { value: "Supplies", label: "Supplies" },
  { value: "Other", label: "Other" },
]

const conditions = [
  { value: "New", label: "New" },
  { value: "Like New", label: "Like New" },
  { value: "Good", label: "Good" },
  { value: "Fair", label: "Fair" },
]

export default function AddListingPage() {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition: "",
  })

  const [images, setImages] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newListing = {
      id: Date.now(),
      title: formData.title,
      price: Number(formData.price),
      condition: formData.condition,
      seller: "You",
      category: formData.category,
      icon: "custom",
    }

    const existing = JSON.parse(localStorage.getItem("listings") || "[]")
    existing.unshift(newListing)

    localStorage.setItem("listings", JSON.stringify(existing))

    router.push("/marketplace")
  }

  const handleImageUpload = () => {
    if (images.length < 4) {
      setImages([...images, `/placeholder-${images.length + 1}.jpg`])
    }
  }

  return (
    <DashboardLayout title="Add Listing">
      <div className="max-w-2xl mx-auto space-y-6">

        <Button variant="ghost" onClick={() => router.push("/marketplace")}>
          <ArrowLeft className="size-4" />
          Back
        </Button>

        <Card>
          <CardHeader>
            <CardTitle>Create New Listing</CardTitle>
            <CardDescription>Fill details</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">

              <div>
                <Label>Images</Label>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {images.map((_, i) => (
                    <div key={i} className="h-16 bg-gray-800 rounded" />
                  ))}
                  <button type="button" onClick={handleImageUpload}>
                    +
                  </button>
                </div>
              </div>

              <Input
                placeholder="Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />

              <Textarea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />

              <Input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />

              <Select onValueChange={(v) => setFormData({ ...formData, category: v })}>
                <SelectTrigger><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {categories.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>

              <Select onValueChange={(v) => setFormData({ ...formData, condition: v })}>
                <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
                <SelectContent>
                  {conditions.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                </SelectContent>
              </Select>

              <Button type="submit" className="w-full">
                Publish Listing
              </Button>

            </form>
          </CardContent>
        </Card>

      </div>
    </DashboardLayout>
  )
}