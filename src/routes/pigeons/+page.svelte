<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;

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
	<div class="flex w-full justify-between my-20">
		<h1 class="text-5xl leading-5 text-neutral-800 font-bold">Showing Results</h1>
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
				{#each data.pigeons as pigeon}
					<tr
						on:click={() =>
							goto('/pigeons/' + pigeon['ring'].replaceAll(' ', '_'), { replaceState: false })}
						class="odd:bg-white odd:dark:bg-white even:bg-gray-50 even:dark:bg-[#D2D2D2] transition-colors duration-300 ease-in-out group-hover:opacity-100 hover:odd:bg-[#222222] hover:even:dark:bg-[#222222] cursor-pointer hover:text-white"
					>
						<th
							scope="row"
							class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-gray-900 transition-colors duration-300 ease-in-out group-hover:opacity-100 hover:text-white hover:dark:text-white"
						>
							{pigeon['ring']}
						</th>
						<td class="px-6 py-4"> {pigeon['strain']} </td>
						<td class="px-6 py-4"> {pigeon['color']} </td>
						<td class="px-6 py-4"> {pigeon['sex'] == 0 ? 'Hen' : 'Cock'} </td>
						<td class="px-6 py-4"> {pigeon['alias']} </td>
						<td class="px-6 py-4"> {formatDate(pigeon.dob)} </td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</main>
