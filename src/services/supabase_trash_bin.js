import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = "https://vrqncbztporodhozcfcg.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZycW5jYnp0cG9yb2Rob3pjZmNnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY1MTI1NjksImV4cCI6MjA2MjA4ODU2OX0.VlF8OHvo7S1iYa9jDmQours_GcQ8qDZCt_4PeEUdhyI";
const SupabaseTrashbin = createClient(supabaseUrl, supabaseKey)

export default SupabaseTrashbin;