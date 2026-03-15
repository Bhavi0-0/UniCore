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
  { value: "books", label: "Books" },
  { value: "electronics", label: "Electronics" },
  { value: "clothing", label: "Clothing" },
  { value: "supplies", label: "Supplies" },
  { value: "other", label: "Other" },
]

const conditions = [
  { value: "new", label: "New" },
  { value: "like-new", label: "Like New" },
  { value: "good", label: "Good" },
  { value: "fair", label: "Fair" },
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
        <Button 
          variant="ghost" 
          className="gap-2 -ml-2 text-muted-foreground hover:text-foreground"
          onClick={() => router.push("/marketplace")}
        >
          <ArrowLeft className="size-4" />
          Back to Marketplace
        </Button>

        <Card className="border-border/40 bg-gradient-to-br from-primary/5 to-primary/0">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Create New Listing</CardTitle>
            <CardDescription>Fill in the details to list your item for sale</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="images" className="flex items-center gap-2 text-sm font-medium">
                  <ImagePlus className="size-4 text-muted-foreground" />
                  Product Images
                </Label>
                <div className="grid grid-cols-4 gap-3">
                  {images.map((_, index) => (
                    <div 
                      key={index}
                      className="aspect-square rounded-xl bg-secondary/50 border border-border/50 flex items-center justify-center"
                    >
                      <ImagePlus className="size-6 text-muted-foreground" />
                    </div>
                  ))}
                  {images.length < 4 && (
                    <button
                      type="button"
                      onClick={handleImageUpload}
                      className="aspect-square rounded-xl border-2 border-dashed border-border/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:border-primary/50 hover:text-primary transition-colors"
                    >
                      <ImagePlus className="size-6" />
                      <span className="text-xs">Add</span>
                    </button>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">Add up to 4 images. First image will be the cover.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="flex items-center gap-2 text-sm font-medium">
                  <Tag className="size-4 text-muted-foreground" />
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Engineering Mathematics Textbook"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="h-11 bg-background border-border/50"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="size-4 text-muted-foreground" />
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe your item, including any wear, edition details, or extras included..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[100px] bg-background border-border/50 resize-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="flex items-center gap-2 text-sm font-medium">
                    <Layers className="size-4 text-muted-foreground" />
                    Category
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                    required
                  >
                    <SelectTrigger className="h-11 bg-background border-border/50">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="condition" className="flex items-center gap-2 text-sm font-medium">
                    <Package className="size-4 text-muted-foreground" />
                    Condition
                  </Label>
                  <Select
                    value={formData.condition}
                    onValueChange={(value) => setFormData({ ...formData, condition: value })}
                    required
                  >
                    <SelectTrigger className="h-11 bg-background border-border/50">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditions.map((condition) => (
                        <SelectItem key={condition.value} value={condition.value}>
                          {condition.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price" className="flex items-center gap-2 text-sm font-medium">
                  <IndianRupee className="size-4 text-muted-foreground" />
                  Price
                </Label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
                  <Input
                    id="price"
                    type="number"
                    placeholder="0"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-11 pl-8 bg-background border-border/50"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1 h-11 bg-background border-border/50"
                  onClick={() => router.push("/marketplace")}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1 h-11 shadow-md">
                  Publish Listing
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
