"use client"

import { useState, useRef, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, ImagePlus, MoreVertical, Phone, BookOpen, Laptop, Shirt, Package, ShoppingBag } from "lucide-react"

const mockProducts: Record<string, { title: string; price: number; condition: string; seller: string; sellerInitials: string; category: string; icon: typeof BookOpen }> = {
  "1": { title: "Engineering Mathematics (B.Tech)", price: 350, condition: "Good", seller: "Arjun S.", sellerInitials: "AS", category: "Books", icon: BookOpen },
  "2": { title: "Casio Scientific Calculator", price: 800, condition: "Like New", seller: "Priya P.", sellerInitials: "PP", category: "Electronics", icon: Laptop },
  "3": { title: "Lab Coat (Size M)", price: 250, condition: "Good", seller: "Rahul V.", sellerInitials: "RV", category: "Clothing", icon: Shirt },
  "4": { title: "Data Structures Book (Cormen)", price: 450, condition: "Fair", seller: "Sneha G.", sellerInitials: "SG", category: "Books", icon: BookOpen },
  "5": { title: "Drafter Set & Drawing Board", price: 600, condition: "New", seller: "Vikram S.", sellerInitials: "VS", category: "Supplies", icon: Package },
  "6": { title: "HC Verma Physics Vol 1 & 2", price: 400, condition: "Good", seller: "Neha K.", sellerInitials: "NK", category: "Books", icon: BookOpen },
}

interface Message {
  id: number
  text: string
  sender: "user" | "seller"
  timestamp: string
}

const initialMessages: Message[] = [
  { id: 1, text: "Hi! Is this item still available?", sender: "user", timestamp: "10:30 AM" },
  { id: 2, text: "Yes, it is! Are you interested?", sender: "seller", timestamp: "10:32 AM" },
  { id: 3, text: "Yes, can you share more details about the condition?", sender: "user", timestamp: "10:33 AM" },
]

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const product = mockProducts[productId] || mockProducts["1"]
  const IconComponent = product.icon || ShoppingBag
  
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = () => {
    if (!newMessage.trim()) return
    
    const message: Message = {
      id: messages.length + 1,
      text: newMessage,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }
    
    setMessages([...messages, message])
    setNewMessage("")

    setTimeout(() => {
      const reply: Message = {
        id: messages.length + 2,
        text: "Thanks for your interest! The item is in great condition. Would you like to meet on campus to see it?",
        sender: "seller",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, reply])
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <DashboardLayout title="Chat">
      <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            className="rounded-xl text-muted-foreground hover:text-foreground"
            onClick={() => router.push("/marketplace")}
          >
            <ArrowLeft className="size-5" />
          </Button>
          
          <Card className="flex-1 border-border/40 bg-gradient-to-r from-primary/5 to-transparent">
            <CardContent className="p-3">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-background shadow-sm text-primary">
                  <IconComponent className="size-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-sm truncate">{product.title}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-primary">₹{product.price}</span>
                    <Badge variant="secondary" className="text-xs">{product.condition}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="flex-1 flex flex-col border-border/40 overflow-hidden">
          <CardHeader className="py-3 px-4 border-b border-border/40 bg-secondary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="size-10 ring-2 ring-primary/20">
                  <AvatarFallback className="bg-primary/10 text-primary text-sm font-semibold">
                    {product.sellerInitials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-sm">{product.seller}</p>
                  <p className="text-xs text-emerald-500 flex items-center gap-1">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                  <Phone className="size-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${
                    message.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary/70 text-foreground rounded-bl-md"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className={`text-[10px] mt-1 ${
                      message.sender === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>

          <div className="p-4 border-t border-border/40 bg-background">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground shrink-0">
                <ImagePlus className="size-5" />
              </Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                className="h-11 bg-secondary/30 border-border/50 rounded-xl"
              />
              <Button 
                size="icon" 
                className="rounded-xl shadow-md shrink-0"
                onClick={handleSend}
                disabled={!newMessage.trim()}
              >
                <Send className="size-4" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
