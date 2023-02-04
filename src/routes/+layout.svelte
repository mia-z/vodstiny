<script lang="ts">
	import "../styles/index.css";
	import "../styles/globals.scss";

	import { supabaseClient } from "$lib/db";
	import { onMount } from "svelte";
	import { invalidate } from "$app/navigation";
	import { SettingsIcon } from "svelte-feather-icons";
	import { page } from "$app/stores";

	onMount(() => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate("supabase:auth");
		});

		return () => {
			subscription.unsubscribe();
		};
	});
</script>

{#if !$page.data.session}
	<div class={"absolute top-5 right-5"}>
		<a href={"/admin"} class={"text-sm"}>
			<SettingsIcon
				class={"text-blue-500 hover:text-blue-400 active:text-blue-500 transition-all"}
			/>
		</a>
	</div>
{:else}
	<button
		class={"absolute top-5 right-5 border-2 py-1 px-2 rounded-md text-black roboto"}
		on:click={() => supabaseClient.auth.signOut()}
	>
		Logout
	</button>
{/if}

<slot />

<style>
	:root {
		background-color: whitesmoke;
	}
</style>
