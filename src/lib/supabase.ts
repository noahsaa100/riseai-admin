import { createClient } from '@supabase/supabase-js'
import type { Database } from './database.types'

const env = import.meta.env as Record<string, string | undefined>

const SUPABASE_URL =
	env.VITE_SUPABASE_URL ??
	env.NEXT_PUBLIC_SUPABASE_URL ??
	env.EXPO_PUBLIC_SUPABASE_URL ??
	''

const SUPABASE_KEY =
	env.VITE_SUPABASE_PUBLISHABLE_KEY ??
	env.VITE_SUPABASE_ANON_KEY ??
	env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
	env.EXPO_PUBLIC_SUPABASE_ANON_KEY ??
	''

if (!SUPABASE_URL || !SUPABASE_KEY) {
	throw new Error(
		'Missing Supabase config. Set VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY).',
	)
}

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_KEY)
