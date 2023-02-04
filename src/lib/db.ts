import { createClient } from "@supabase/auth-helpers-sveltekit";
import { PUBLIC_SUPABASE_ENDPOINT, PUBLIC_SUPABASE_PUBLIC_KEY } from "$env/static/public";

export const supabaseClient = createClient(PUBLIC_SUPABASE_ENDPOINT, PUBLIC_SUPABASE_PUBLIC_KEY);
