<script>
	import { supabase } from '../lib/supabaseClient';

	let email = '';
	let password = '';
	let errorMessage = '';

	async function signUp() {
		const { user, error } = await supabase.auth.signUp({ email, password });
		if (error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Sign up successful! Please check your email to confirm your account.';
		}
	}

	async function signIn() {
		const { user, error } = await supabase.auth.signIn({ email, password });
		if (error) {
			errorMessage = error.message;
		} else {
			errorMessage = 'Login successful!';
			window.location.href = '/'; // Redirect to the home page
		}
	}

	async function signInWithGoogle() {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: 'google'
		});
		if (error) {
			console.error('Error signing in with Google:', error);
		}
	}

	supabase.auth.onAuthStateChange((event, session) => {
		if (event === 'SIGNED_IN') {
			window.location.href = '/'; // Redirect to the home page
		}
	});
</script>

<div class="auth-container">
	<h1>Login / Sign Up</h1>
	<input type="email" placeholder="Email" bind:value={email} />
	<input type="password" placeholder="Password" bind:value={password} />
	<button on:click={signUp}>Sign Up</button>
	<button on:click={signIn}>Login</button>
	<button on:click={signInWithGoogle}>Sign in with Google</button>
	{#if errorMessage}
		<p class="error">{errorMessage}</p>
	{/if}
</div>

<style>
	.auth-container {
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		background: var(--background-color);
		color: var(--text-color);
		border-radius: 8px;
		text-align: center;
	}
	input {
		display: block;
		width: 100%;
		margin: 1rem 0;
		padding: 0.5rem;
		background-color: var(--background-color);
		color: var(--text-color);
		border: 1px solid var(--border-color);
	}
	button {
		margin: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: var(--primary-color);
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
	}
	button:hover {
		background-color: var(--primary-hover-color);
	}
	.error {
		color: var(--secondary-color);
	}
</style>
