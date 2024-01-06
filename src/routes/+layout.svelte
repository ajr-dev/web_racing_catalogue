<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	import '../app.css';
</script>

<main class="min-w-screen min-h-screen flex text-black bg-[#E9E9E9]">
	<div class="w-full flex flex-col px-3 max-w-[1800px] mx-auto relative">
		<slot />
	</div>
</main>
