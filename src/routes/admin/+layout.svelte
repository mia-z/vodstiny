<script lang="ts">
	import { page } from "$app/stores";
	import { supabaseClient } from "$lib/db";
	import type { AuthError, AuthResponse } from "@supabase/supabase-js";
	import { redirect } from "@sveltejs/kit";
	import { stringify } from "postcss";

	const tryLogin = async () => {
		loginError = undefined;

		const res = await supabaseClient.auth.signInWithPassword({ email: email, password: password });
		if (res.error) {
			loginError = res.error;
		}
	};

	const onPasswordInputReturn = async (event: KeyboardEvent) => {
		if (event.key === "Enter") {
			await tryLogin();
		}
	};

	let email: string;
	let password: string;
	let loginError: AuthError | undefined;
</script>

{#if !$page.data.session}
	<div class={"w-full h-[100vh] flex"}>
		<div class={"flex flex-col rounded-sm shadow-md roboto m-auto bg-white"}>
			<div class={"p-4 text-center"}>Admin Login</div>
			<div class={"flex mb-2"}>
				<input
					bind:value={email}
					placeholder={"Email"}
					class={"placeholder:text-center text-center text-text-black h-8 mx-auto w-5/6 outline-none border-2 rounded-md active:border-blue-400 focus:border-blue-400 transition-all"}
				/>
			</div>
			<div class={"flex mb-2"}>
				<input
					on:keydown={onPasswordInputReturn}
					bind:value={password}
					placeholder={"Password"}
					type="password"
					class={"placeholder:text-center text-center -text-black h-8 mx-auto w-5/6 outline-none border-2 rounded-md active:border-blue-400 focus:border-blue-400 transition-all"}
				/>
			</div>
			<div class={"flex mb-2"}>
				<button
					on:click={tryLogin}
					class={"mx-auto mb-2 cursor-pointer hover:bg-blue-500 transition-colors active:bg-blue-400 w-5/6 h-8 text-white rounded-md outline-none bg-blue-400"}
					>Login</button
				>
			</div>
			{#if loginError}
				<div>
					{loginError.message}
				</div>
			{/if}
		</div>
	</div>
{:else}
	<slot />
{/if}
