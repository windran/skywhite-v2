<script lang="ts">
	import favicon from '$lib/assets/favicon.svg';
	import { businessSchema } from '$lib/seo/business.js';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<script type="application/ld+json">
    {JSON.stringify(businessSchema)}
  </script>
</svelte:head>

{@render children()}
