"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, Search, ShoppingBag, MessageCircle, Sparkles, BookOpen, Laptop, Shirt, Package } from "lucide-react"

const iconMap: any = {
  Books: BookOpen,
  Electronics: Laptop,
  Clothing: Shirt,
  Supplies: Package,
  Other: ShoppingBag,
}

const mockProducts = [
  { id: 1, title: "Engineering Mathematics (B.Tech)", price: 350, condition: "Good", seller: "Arjun S.", category: "Books", icon: BookOpen },
  { id: 2, title: "Casio Scientific Calculator", price: 800, condition: "Like New", seller: "Priya P.", category: "Electronics", icon: Laptop },
]

const conditionStyles: Record<string, { bg: string; text: string; icon?: boolean }> = {
  "New": { bg: "bg-emerald-500/10", text: "text-emerald-600", icon: true },
  "Like New": { bg: "bg-blue-500/10", text: "text-blue-600" },
  "Good": { bg: "bg-amber-500/10", text: "text-amber-600" },
  "Fair": { bg: "bg-orange-500/10", text: "text-orange-600" },
}

const categoryColors: Record<string, string> = {
  "Books": "from-blue-500/10 to-blue-600/5",
  "Electronics": "from-purple-500/10 to-purple-600/5",
  "Clothing": "from-pink-500/10 to-pink-600/5",
  "Supplies": "from-orange-500/10 to-orange-600/5",
  "Other": "from-slate-500/10 to-slate-600/5",
}

export default function MarketplacePage() {
  const router = useRouter()

  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<any[]>([])

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("listings") || "[]")

    const mapped = stored.map((item: any) => ({
      ...item,
      condition: item.condition || "Good",
      category: item.category || "Other",
      icon: iconMap[item.category] || ShoppingBag,
    }))

    setProducts([...mapped, ...mockProducts])
  }, [])

  const handleDelete = (id: number) => {
    const updated = products.filter((item) => item.id !== id)
    setProducts(updated)

    const stored = JSON.parse(localStorage.getItem("listings") || "[]")
    const updatedStorage = stored.filter((item: any) => item.id !== id)

    localStorage.setItem("listings", JSON.stringify(updatedStorage))
  }

  const filteredProducts = products.filter((product) =>
    product.title?.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <DashboardLayout title="Marketplace">
      <div className="space-y-6">

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-muted-foreground">
            Buy and sell books, electronics, and college essentials
          </p>

          <Button
            className="gap-2 shadow-md"
            onClick={() => router.push("/marketplace/add")}
          >
            <Plus className="size-4" />
            Add Listing
          </Button>
        </div>

        <Card className="border-border/40 bg-secondary/30">
          <CardContent className="p-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 h-11 bg-background border-border/50"
              />
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => {
            const style =
              conditionStyles[product.condition] || {
                bg: "bg-slate-500/10",
                text: "text-slate-500",
              }

            const colorClass =
              categoryColors[product.category] ||
              "from-slate-500/10 to-slate-600/5"

            const IconComponent = product.icon || ShoppingBag

            return (
              <Card
                key={product.id}
                className={`border-border/40 bg-gradient-to-br ${colorClass} transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 group`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-background/80 shadow-sm text-primary">
                      <IconComponent className="size-6" />
                    </div>

                    <div className="flex-1 space-y-1 min-w-0">
                      <CardTitle className="text-base line-clamp-2 leading-snug">
                        {product.title}
                      </CardTitle>

                      <CardDescription className="text-xs">
                        {product.category}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-foreground">
                      ₹{product.price}
                    </span>

                    <Badge
                      variant="secondary"
                      className={`${style.bg} ${style.text} border-0 gap-1`}
                    >
                      {style.icon && <Sparkles className="size-3" />}
                      {product.condition}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    Sold by{" "}
                    <span className="font-medium text-foreground">
                      {product.seller}
                    </span>
                  </p>

                  <div className="flex gap-2">

                    {/* CHAT */}
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 gap-1.5 bg-background/80 border-border/50"
                      onClick={() =>
                        router.push(`/marketplace/chat/${product.id}`)
                      }
                    >
                      <MessageCircle className="size-3.5" />
                      Chat
                    </Button>

                    {/* BUY */}
                    <Button size="sm" className="flex-1 shadow-sm">
                      Buy Now
                    </Button>

                    {/* DELETE */}
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
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