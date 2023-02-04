import type { LayoutLoad, LayoutLoadEvent } from "./$types";
import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export const load: LayoutLoad = async (event: LayoutLoadEvent) => {
  const { session } = await getSupabase(event);
  return { session };
};
