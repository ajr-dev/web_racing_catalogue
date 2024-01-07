<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	let inputValue = '';
	const searchResults = writable('');

	let timeout;

	const bodyClickHandler = (event) => {
		const searchInput = document.getElementById('search');
		const resultsPopup = document.getElementById('resultsPopup');

		if (resultsPopup && !resultsPopup.contains(event.target) && searchInput !== event.target) {
			searchResults.set('');
			inputValue = '';
		}
	};

	onMount(() => {
		if (typeof window !== 'undefined') {
			// Code inside this block will only run on the client side
			document.getElementById('search').addEventListener('keydown', handleKeyDown);
			document.getElementById('search').addEventListener('input', handleInput);
			document.body.addEventListener('click', bodyClickHandler);
		}
	});

	onDestroy(() => {
		if (typeof window !== 'undefined') {
			// Code inside this block will only run on the client side
			document.getElementById('search').removeEventListener('keydown', handleKeyDown);
			document.getElementById('search').removeEventListener('input', handleInput);
			document.body.removeEventListener('click', bodyClickHandler);
		}
	});

	const handleKeyDown = (event) => {
		if (event.key === 'Enter') {
			handleSubmit();
		}
	};

	const handleInput = () => {
		inputValue = document.getElementById('search').value.trim();
		clearTimeout(timeout);
		timeout = setTimeout(() => {
			handleSubmit();
		}, 1000);
	};

	const handleSubmit = async () => {
		// Make a request to the API route to get the 5 most similar results
		try {
			const response = await fetch(`/api/similarPigeons/${inputValue}`);
			const data = await response.json();
			console.log(data);

			// Update searchResults with the fetched data
			// searchResults = data.data;
			searchResults.set(data.data);
		} catch (error) {
			console.error('Error fetching similar pigeons:', error);
		}
	};
</script>

<form class="my-5 group" on:submit|preventDefault={handleSubmit}>
	<div class="relative">
		<div class="absolute inset-y-0 start-0 flex items-center ps-5 pointer-events-none">
			<svg
				class="w-4 h-4 text-gray-500 dark:text-gray-400"
				aria-hidden="true"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 20"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
				/>
			</svg>
		</div>
		<input
			type="search"
			id="search"
			bind:value={inputValue}
			class="block w-full p-3 ps-11 text-sm text-[#BEBEBE] rounded-lg bg-[#D2D2D2] focus:bg-[#222222] transition-colors duration-300 ease-in-out group-focus:opacity-100"
			placeholder="Search for a pigeon"
			required
		/>
	</div>

	<div class="relative">
		{#if $searchResults.length > 0}
			<div
				id="resultsPopup"
				class="w-full max-w-[1776px] bg-[#222222] rounded-lg text-white absolute flex flex-col mt-1 group p-3 pr-5 z-10"
			>
				{#each $searchResults as result}
					<a
						href="/pigeons/id/{result['ring'].replaceAll(' ', '_')}"
						on:click={() => ((inputValue = ''), ($searchResults = ''))}
						class="w-full rounded-lg p-3 m-1 bg-[#333333] hover:bg-[#444444] transition-colors duration-300 ease-in-out group-focus:opacity-100"
					>
						{result['ring']}
					</a>
				{/each}
			</div>
		{:else if inputValue !== ''}
			<div
				id="resultsPopup"
				class="w-full max-w-[1777px] bg-[#222222] rounded-lg text-white absolute flex flex-col mt-2 p-3"
			>
				<p>No results</p>
			</div>
		{/if}
	</div>
</form>
