import adapter from '@sveltejs/adapter-cloudflare';
import preprocess from 'svelte-preprocess';

export default {
	preprocess: preprocess({
		/* options */
	}), // Pass options if needed
	kit: {
		adapter: adapter()
	}
};
