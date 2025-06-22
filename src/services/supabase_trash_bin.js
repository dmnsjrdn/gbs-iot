import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL2;
const supabaseKey = import.meta.env.VITE_PUBLIC_SUPABASE_ANON_KEY2;
const SupabaseTrashbin = createClient(supabaseUrl, supabaseKey)

export default SupabaseTrashbin;