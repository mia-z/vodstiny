import type { PageLoad } from "./$types";
import { supabaseClient } from "$lib/db";

export const load = (async ({ params: { vodId } }) => {
  const annotationsRes = await supabaseClient
    .from("AnnotatedVod")
    .select(`*, VodAnnotation:id(*)`)
    .eq(`id`, vodId)
    .limit(1)
    .single();

  return {
    annotatedVod: annotationsRes.data
      ? annotationsRes.data.map((x) => {
          return { ...x, dataRows: [...x.VodAnnotation] };
        })
      : []
  };
}) satisfies PageLoad;
