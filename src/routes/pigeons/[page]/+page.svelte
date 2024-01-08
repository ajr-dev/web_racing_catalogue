<script lang="ts">
	import { goto, replaceState } from '$app/navigation';
	import { onMount } from 'svelte';
	import type { PageData } from '../$types';
	import * as Pagination from '$lib/components/ui/pagination';

	export let data: PageData;
	// console.log(data);

	const formatDate = (timestamp) => {
		if (timestamp) {
			const date = new Date(parseInt(timestamp) * 1000);
			const year = date.getFullYear();
			const month = String(date.getMonth() + 1).padStart(2, '0');
			const day = String(date.getDate()).padStart(2, '0');
			return `${year}/${month}/${day}`;
		} else {
			return '';
		}
	};
</script>

<main>
	<div class="flex w-full justify-between mb-10 mt-0 lg:mt-10">
		<h1 class="text-4xl leading-5 text-neutral-800 font-bold">Catalogue</h1>
	</div>

	<div class="relative overflow-x-auto shadow-md sm:rounded-lg group">
		<table class="w-full text-sm text-left rtl:text-right text-gray-800 dark:text-gray-500">
			<thead
				class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-[#D2D2D2] dark:text-gray-500"
			>
				<tr>
					<th scope="col" class="px-6 py-3"> Pigeon Ring </th>
					<th scope="col" class="px-6 py-3"> Strain </th>
					<th scope="col" class="px-6 py-3"> Color </th>
					<th scope="col" class="px-6 py-3"> Sex </th>
					<th scope="col" class="px-6 py-3"> Alias </th>
					<th scope="col" class="px-6 py-3"> D.O.B </th>
				</tr>
			</thead>
			<tbody>
				{#each data.body.results as pigeon}
					<tr
						on:click={() =>
							goto('/pigeons/id/' + pigeon['ring'].replaceAll(' ', '_'), { replaceState: false })}
						class="odd:bg-neutral-200 odd:dark:bg-white even:bg-gray-50 even:dark:bg-[#D2D2D2] transition-colors duration-300 ease-in-out group-hover:opacity-100 hover:odd:bg-[#222222] hover:even:bg-[#222222] hover:even:dark:bg-[#222222] cursor-pointer hover:text-white"
					>
						<th scope="row" class="px-6 py-4 font-medium whitespace-nowrap">
							{pigeon['ring']}
						</th>
						<td class="px-6 py-4"> {pigeon['strain']} </td>
						<td class="px-6 py-4 min-w-28"> {pigeon['color']} </td>
						<td class="px-6 py-4 relative">
							<svg
								class="{pigeon['sex'] == 0
									? 'hen-stroke'
									: 'cock-stroke'} w-9 pr-1 opacity-60 rounded-md"
								height="20"
								xmlns="http://www.w3.org/2000/svg"
								style="position: absolute; top: 50%; transform: translateY(-50%); z-index: 0;"
							>
								<path
									d="M5 10 Q25 5, 50 10 Q75 15, 95 10"
									fill="none"
									stroke={pigeon['sex'] == 0 ? '#ff99cc' : '#99ccff'}
									stroke-width="20"
									stroke-linecap="round"
								/>
							</svg>
							<span style="position: relative; z-index: 1;">
								{pigeon['sex'] == 0 ? 'Hen' : 'Cock'}
							</span>
						</td>
						<td class="px-6 py-4"> {pigeon['alias']} </td>
						<td class="px-6 py-4"> {formatDate(pigeon.dob)} </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- pagination -->
	<div class="mt-10 mb-10 w-full justify-center">
		<Pagination.Root
			count={data.body.totalPages * data.body.pigeonsPerPage}
			page={data.body.page}
			perPage={data.body.pigeonsPerPage}
			let:pages
			let:currentPage
		>
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton
						on:click={() => goto('/pigeons/' + (data.body.page - 1), { replaceState: true })}
					/>
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link
								{page}
								isActive={currentPage == page.value}
								on:click={() => goto('/pigeons/' + page.value)}
							>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton on:click={() => goto('/pigeons/' + data.body.nextPage)} />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</div>
</main>
