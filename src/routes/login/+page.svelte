<script>
	import { supabase } from '../../lib/supabaseClient';

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
	<img src="/pencil.png" alt="Pencil Image" class="pencil-image" />
	<h1>Welcome to ToDoApp</h1>
	<button on:click={signInWithGoogle}>Sign in with Google</button>
</div>

<style>
	.auth-container {
		max-width: 400px;
		margin: 2rem auto;
		padding: 2rem;
		background: #333;
		color: #eee;
		border-radius: 8px;
		text-align: center;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	}

	.pencil-image {
		width: 100px;
		margin-bottom: 1rem;
	}

	h1 {
		margin-bottom: 1rem;
		font-size: 1.5rem;
	}

	button {
		margin: 0.5rem;
		padding: 0.5rem 1rem;
		background-color: #4285f4;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #357ae8;
	}

	button:active {
		background-color: #2a65c7;
	}

	button:focus {
		outline: none;
		box-shadow: 0 0 0 3px rgba(66, 133, 244, 0.5);
	}
</style>
