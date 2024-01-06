<script lang="ts">
	export let month: String;
	export let bans: Number;

	export let jsonFileName: String;

	const formattedbans = bans.toLocaleString();
</script>

<a
	href="/{jsonFileName}"
	class="flex flex-col items-center justify-center py-10 relative group bg-black transition-colors duration-300 rounded text-white border-dashed border-white hover:border-pink-400 hover:border-solid border-2"
>
	<div>{month}</div>
	<div>{formattedbans}</div>
</a>
