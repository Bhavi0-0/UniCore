"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, Lock, ArrowRight } from "lucide-react"
import { supabase } from "@/lib/supabase"

export default function LoginCard() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (loading) return
    setLoading(true)

    if (!email.endsWith("bennett.edu.in")) {
      alert("Only college emails allowed")
      setLoading(false)
      return
    }

    const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (loginError) {
      if (loginError.message.includes("Invalid login credentials")) {
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password,
        })

        if (signupError) {
          alert(signupError.message)
        } else {
          const name = email.split("@")[0]

          await supabase.from("users").insert({
            id: signupData.user?.id,
            email: signupData.user?.email,
            name: name,
            branch: "CSE",
            year: "2021",
          })

          alert("Account created! Now login again.")
        }
      } else {
        alert(loginError.message)
      }
    } else {
      const { data: userData } = await supabase.auth.getUser()

      if (userData.user) {
        await supabase.from("users").upsert({
          id: userData.user.id,
          email: userData.user.email,
        })
      }

      window.location.href = "/dashboard"
    }

    setLoading(false)
  }

  return (
    <Card className="w-full max-w-md border-border/40 bg-card/80 backdrop-blur-xl shadow-2xl">
      <CardHeader className="text-center space-y-3 pb-8 pt-8">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground font-bold text-xl shadow-lg">
          U
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-foreground">
          Welcome to UniCore
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          Login with your college email
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6 px-8 pb-8">
        <form className="space-y-5" onSubmit={handleSubmit}>
          
          <div className="space-y-2">
            <Label>Email</Label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="you@bennett.edu.in"
                className="pl-11 h-12"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Password</Label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter password"
                className="pl-11 h-12"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button type="submit" className="w-full h-12 text-base font-semibold" disabled={loading}>
            {loading ? "Please wait..." : "Login / Sign Up"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}