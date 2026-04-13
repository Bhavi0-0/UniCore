import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  "https://rfbzcnckddukxkxjbwpd.supabase.co",
  "sb_publishable_Apk21LagDdF1kKNJRoI-dQ_4BnnWxWu"
)

// INSERT
async function addPost() {
  const { error } = await supabase.from("posts").insert([
    { title: "Test Post", content: "Backend working" }
  ])
  console.log("insert:", error)
}

// FETCH
async function getPosts() {
  const { data, error } = await supabase.from("posts").select("*")
  console.log("data:", data)
}

await addPost()
await getPosts()