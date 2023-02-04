<script lang="ts">
  import { DateTime } from "luxon";
  import { PlusIcon, Edit3Icon } from "svelte-feather-icons";

  import { supabaseClient } from "$lib/db";
  import type { PageData } from "./$types";

  export let data: PageData;

  $: annotatedVods = data.annotatedVods;
  $: annotatedVodIds = annotatedVods?.map((x) => x.videoId);
  $: filteredVods = data.youtubeVods.filter((x) => !annotatedVodIds.some((id) => id === x.id));

  const createAnnotatedVod = async (vod: Vyneer.Vod) => {
    const { error } = await supabaseClient.from("AnnotatedVod").insert({
      videoId: vod.id,
      dateStreamed: vod.starttime,
      title: vod.title,
      imageUrl: vod.thumbnail
    });
    await refetchAnnotatedVods();
  };

  const refetchAnnotatedVods = async () => {
    const annotationsRes = await supabaseClient
      .from("AnnotatedVod")
      .select(`*, VodAnnotation:id(*)`);

    if (annotationsRes.error) {
      console.log("report this refetch error");
    } else {
      annotatedVods = annotationsRes.data.map((x) => {
        return { ...x, dataRows: [...x.VodAnnotation] };
      });
    }
  };
</script>

<div class={"container mx-auto flex flex-col text-center text-xl roboto-slab mt-5"}>
  <div>VOD Annotation Administrator</div>
  <div class={"mt-5 grid grid-cols-3 grid-flow-row gap-x-5"}>
    <div class={"col-span-2 flex flex-col"}>
      <div class={"col-span-1 flex flex-col rounded-md shadow-md bg-white"}>
        <div class={"my-3"}>Un-annotated VODs</div>
        <div class={"flex flex-col space-y-2"}>
          {#each filteredVods as vod (vod.id)}
            <div
              on:click={() => createAnnotatedVod(vod)}
              on:keydown={() => {}}
              class={"flex flex-col w-4/5 mx-auto shadow-md cursor-pointer translate-x-0 translate-y-0 hover:-translate-x-1 hover:-translate-y-1 transition-all text-sm rounded-sm"}
            >
              <div class={"flex flex-row my-auto"}>
                <img
                  src={vod.thumbnail}
                  class={"h-9 rounded-l-sm"}
                  alt={"youtube video thumbnail"}
                />
                <div class={"truncate text-left w-1/2 my-auto p-2"}>
                  {vod.title}
                </div>
                <a
                  target={"_blank"}
                  on:click|stopPropagation
                  href={`https://youtube.com/watch?v=${vod.id}`}
                  class={"ml-auto text-blue-600 underline my-auto"}>(source)</a
                >
                <div class={"my-auto p-2"}>
                  {DateTime.fromISO(vod.starttime).toFormat("y LLL, EEE dd")}
                </div>
                <PlusIcon
                  class={"ml-2 mr-1 bg-blue-500 text-white rounded-full my-auto"}
                  strokeWidth={2.5}
                />
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
    <div class={"col-span-1 flex flex-col"}>
      <div class={"flex flex-col rounded-md shadow-md bg-white"}>
        <div class={"my-3"}>Annotated VODs</div>
        <div class={"flex flex-col space-y-2 mb-2 select-none"}>
          {#if annotatedVods.length > 0}
            {#each annotatedVods as vod (vod.videoId)}
              <div
                class={"flex flex-col px-5 translate-x-0 translate-y-0 hover:-translate-x-1 hover:-translate-y-1 transition-all"}
              >
                <div class={"border-sm shadow-md flex flex-row space-x-1"}>
                  <div class={"rounded-l-sm w-2/12 h-full my-auto"}>
                    <img
                      class={"h-full rounded-l-sm"}
                      src={vod.imageUrl}
                      alt={"annotated vod thumbnail"}
                    />
                  </div>
                  <div class={"w-9/12 flex flex-col text-sm justify-center"}>
                    <div class={"flex flex-row"}>
                      <div class={"truncate"}>
                        {vod.title}
                      </div>
                      <a
                        target={"_blank"}
                        on:click|stopPropagation
                        href={`https://youtube.com/watch?v=${vod.videoId}`}
                        class={"ml-1 text-blue-600 underline"}
                        >(source)
                      </a>
                    </div>
                    <div class={"flex flex-row flex-wrap"}>
                      <div class={"w-1/2 text-left text-xs"}>
                        {DateTime.fromISO(vod.dateStreamed).toFormat("y LLL, EEE dd")}
                      </div>
                      <div class={"w-1/2 text-left text-xs"}>
                        Annotations:&nbsp;{vod.dataRows?.length}
                      </div>
                    </div>
                  </div>
                  <a
                    href={`/admin/vod/${vod.id}`}
                    class={"w-1/12 ml-2 mr-1 my-auto cursor-pointer"}
                  >
                    <Edit3Icon class={"text-blue-500 my-auto"} strokeWidth={2} />
                  </a>
                </div>
              </div>
            {/each}
          {:else}
            <div>none yet :(</div>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>
