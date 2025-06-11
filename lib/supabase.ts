import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://giceecwuotndxavkvrqm.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdpY2VlY3d1b3RuZHhhdmt2cnFtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1MTE2NTcsImV4cCI6MjA2NTA4NzY1N30.Ox10-atCvKGvGYY95mmw3sbu2QWXE-kf37PRIsc2jko"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
