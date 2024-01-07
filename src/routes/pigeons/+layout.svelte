<script lang="ts">
	import Search from '$lib/components/Search.svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;
</script>

<main>
	<!-- search -->
	<!-- <Search></Search> -->
	<slot />
</main>
