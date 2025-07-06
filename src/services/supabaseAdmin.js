import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = import.meta.env.VITE_PUBLIC_SUPABASE_URL;
const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const SupabaseAdmin = createClient(supabaseUrl, serviceRoleKey)

export default SupabaseAdmin;