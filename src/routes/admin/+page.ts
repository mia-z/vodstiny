import type { PageLoad } from "./$types";
import { supabaseClient } from "$lib/db";
import axios from "axios";

export const load = (async () => {
	const annotationsRes = await supabaseClient.from("AnnotatedVod").select(`*, VodAnnotation:id(*)`);
	const youtubeVodsRes = await axios.get<Vyneer.Vod[]>("https://vyneer.me/tools/ytvods");

	return {
		youtubeVods: youtubeVodsRes.data,
		annotatedVods: annotationsRes.data
			? annotationsRes.data.map((x) => {
					return { ...x, dataRows: [...x.VodAnnotation] };
			  })
			: []
	};
}) satisfies PageLoad;
