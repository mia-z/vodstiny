import type { PageLoad } from "./$types";
import { supabaseClient } from "$lib/db";

export const load = (async () => {
	const res = await supabaseClient.from("annotated_vod").select(`*, vod_annotation:id(*)`);
	return {
		annotatedVods: res.data
	};
}) satisfies PageLoad;
