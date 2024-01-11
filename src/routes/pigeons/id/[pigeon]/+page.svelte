<script lang="ts">
	import type { PageData } from './$types';
	import { page } from '$app/stores';
	import Download from '$lib/components/Download.svelte';

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

<Download pigeonData={data.pigeon}></Download>

<div class="bg-[#E5E5E5] rounded-lg p-6 mt-4">
	<div class="flex flex-col lg:flex-row">
		<div class="gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
			<!-- <svg
				xmlns="http://www.w3.org/2000/svg"
				width="120"
				height="120"
				viewBox="0 0 48 48"
				{...$$props}
				><g fill="none"
					><path
						stroke="#808080"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="4"
						d="M14 26c-1.04-1.793-2.15-5.551 2.008-10.244c1.213-1.141 2.806-2.64 5.716-3.423C24.842 10.867 26.401 8.52 24.323 5C25.882 5.978 29 9.693 29 16.733"
					/><path
						stroke="#808080"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="4"
						d="M16.253 27.93C8 23.57 4.51 30.195 4 33.755c4 0 8.679 2.911 10.721 5.823c3.676 4.66 9.36 3.56 11.742 2.427c7.352-3.883 9.87-3.56 10.21-2.912c.41 3.106 1.532 3.883 2.043 3.883c3.676.388 4.935-4.045 5.105-6.31c.817-9.319-1.361-9.707-2.552-8.736c-4.902 5.824-7.829 6.957-8.68 6.795c-3.675-.777-3.233-2.265-2.552-2.913C36.572 26.377 36.504 14.34 35.653 9c-2.45 5.825-6.467 8.251-8.169 8.737c-10.21 2.718-11.742 7.928-11.231 10.193Z"
					/><circle cx="12" cy="31.412" r="2" fill="#808080" /></g
				>
			</svg> -->

			<div
				class="flex flex-col gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
			>
				<p>
					Pigeon Ring: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
						>{data.pigeon[0]['ring']}</span
					>
				</p>
				<p>Strain: {data.pigeon[0]['strain']}</p>
				<p>Colour: {data.pigeon[0]['color']}</p>
			</div>

			<div
				class="flex flex-col gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
			>
				<p>Alias: {data.pigeon[0]['alias']}</p>
				<p>
					Sex: <span class="absolute ml-1">
						<svg
							class="{data.pigeon[0]['sex'] == 0
								? 'hen-stroke'
								: 'cock-stroke'} w-9 opacity-60 rounded-md"
							height="20"
							xmlns="http://www.w3.org/2000/svg"
							style="position: absolute; top: 50%; transform: translateY(-50%); z-index: 0;"
						>
							<path
								d="M5 10 Q25 5, 50 10 Q75 15, 95 10"
								fill="none"
								stroke={data.pigeon[0]['sex'] == 0 ? '#ff99cc' : '#99ccff'}
								stroke-width="20"
								stroke-linecap="round"
							/>
						</svg>
						<span style="position: relative; z-index: 1;">
							{data.pigeon[0]['sex'] == 0 ? 'Hen' : 'Cock'}
						</span>
					</span>
				</p>
				<p>
					Date of Birth: {formatDate(data.pigeon[0]['dob'])}
				</p>
			</div>

			<!-- <div class="flex flex-col mt-5 gap-3 text-gray-500 text-sm md:text-lg leading-5 font-semibold">
				<p>Sire: {data.pigeon[0]['sire']}</p>
				<p>Dam: {data.pigeon[0]['dam']}</p>
				<p>
					Offspring: {data.pigeon[0]['offspring']}
				</p>
			</div> -->
		</div>
	</div>

	<div
		class="flex flex-col mt-8 md:mt-12 gap-3 text-gray-500 text-sm md:text-lg leading-5 font-semibold max-w-[800px]"
	>
		<p>Comment: {data.pigeon[0]['comment']}</p>
	</div>
</div>

<div class="grid grid-cols-1 md:grid-cols-2 mb-10 gap-[16px]">
	{#if data.sire[0]}
		<div class="bg-[#E5E5E5] rounded-lg p-6 mt-4">
			<div>
				<div
					class="flex flex-col gap-3 text-neutral-800 text-4xl leading-5 font-semibold max-w-[800px]"
				>
					<p>Sire</p>
				</div>

				<div
					class="mt-7 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3"
				>
					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>
							Pigeon Ring: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{data.sire[0]['ring'].replaceAll(' ', '_')}"
									>{data.sire[0]['ring']}</a
								></span
							>
						</p>
						<p>Strain: {data.sire[0]['strain']}</p>
						<p>Colour: {data.sire[0]['color']}</p>
					</div>

					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>Alias: {data.sire[0]['alias']}</p>
						<p>
							Sex: <span class="absolute ml-1">
								<svg
									class="{data.sire[0]['sex'] == 0
										? 'hen-stroke'
										: 'cock-stroke'} w-9 opacity-60 rounded-md"
									height="20"
									xmlns="http://www.w3.org/2000/svg"
									style="position: absolute; top: 50%; transform: translateY(-50%); z-index: 0;"
								>
									<path
										d="M5 10 Q25 5, 50 10 Q75 15, 95 10"
										fill="none"
										stroke={data.sire[0]['sex'] == 0 ? '#ff99cc' : '#99ccff'}
										stroke-width="20"
										stroke-linecap="round"
									/>
								</svg>
								<span style="position: relative; z-index: 1;">
									{data.sire[0]['sex'] == 0 ? 'Hen' : 'Cock'}
								</span>
							</span>
						</p>
						<p>
							Date of Birth: {formatDate(data.sire[0]['dob'])}
						</p>
					</div>

					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>
							Sire: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{data.sire[0]['sire'].replaceAll(' ', '_')}"
									>{data.sire[0]['sire']}</a
								></span
							>
						</p>
						<p>
							Dam: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{data.sire[0]['dam'].replaceAll(' ', '_')}"
									>{data.sire[0]['dam']}</a
								></span
							>
						</p>
					</div>
				</div>
				<div
					class="flex flex-col mt-12 gap-3 text-gray-500 text-sm md:text-lg leading-5 font-semibold max-w-72 lg:max-w-96"
				>
					<p>Comment: {data.sire[0]['comment']}</p>
				</div>
			</div>
		</div>
	{/if}

	{#if data.dam[0]}
		<div class="bg-[#E5E5E5] rounded-lg p-6 mt-4">
			<div>
				<div
					class="flex flex-col gap-3 text-neutral-800 text-4xl leading-5 font-semibold max-w-[800px]"
				>
					<p>Dam</p>
				</div>

				<div
					class="mt-7 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3"
				>
					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>
							Pigeon Ring: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{data.sire[0]['ring'].replaceAll(' ', '_')}"
									>{data.dam[0]['ring']}</a
								></span
							>
						</p>
						<p>Strain: {data.dam[0]['strain']}</p>
						<p>Colour: {data.dam[0]['color']}</p>
					</div>

					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>Alias: {data.dam[0]['alias']}</p>
						<p>
							Sex: <span class="absolute ml-1">
								<svg
									class="{data.dam[0]['sex'] == 0
										? 'hen-stroke'
										: 'cock-stroke'} w-9 opacity-60 rounded-md"
									height="20"
									xmlns="http://www.w3.org/2000/svg"
									style="position: absolute; top: 50%; transform: translateY(-50%); z-index: 0;"
								>
									<path
										d="M5 10 Q25 5, 50 10 Q75 15, 95 10"
										fill="none"
										stroke={data.dam[0]['sex'] == 0 ? '#ff99cc' : '#99ccff'}
										stroke-width="20"
										stroke-linecap="round"
									/>
								</svg>
								<span style="position: relative; z-index: 1;">
									{data.dam[0]['sex'] == 0 ? 'Hen' : 'Cock'}
								</span>
							</span>
						</p>
						<p>
							Date of Birth: {formatDate(data.dam[0]['dob'])}
						</p>
					</div>

					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>
							Sire: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{data.dam[0]['sire'].replaceAll(' ', '_')}"
									>{data.dam[0]['sire']}</a
								></span
							>
						</p>
						<p>
							Dam: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{data.dam[0]['dam'].replaceAll(' ', '_')}"
									>{data.dam[0]['dam']}</a
								></span
							>
						</p>
					</div>
				</div>
				<div
					class="flex flex-col mt-12 gap-3 text-gray-500 text-sm md:text-lg leading-5 font-semibold max-w-72 lg:max-w-96"
				>
					<p>Comment: {data.dam[0]['comment']}</p>
				</div>
			</div>
		</div>
	{/if}

	{#if data.offspring[0]}
		{#each data.offspring as offspring}
			<div class="bg-[#E5E5E5] rounded-lg p-6 mt-4">
				<div
					class="flex flex-col gap-3 text-neutral-800 text-4xl leading-5 font-semibold max-w-[800px]"
				>
					<p class={offspring['ring'] == data.offspring[0]['ring'] ? 'visible' : 'opacity-0'}>
						Offspring
					</p>
				</div>

				<div
					class="mt-7 gap-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 xl:grid-cols-2 3xl:grid-cols-3"
				>
					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>
							Pigeon Ring: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{offspring['ring'].replaceAll(' ', '_')}"
									>{offspring['ring']}</a
								></span
							>
						</p>
						<p>Strain: {offspring['strain']}</p>
						<p>Colour: {offspring['color']}</p>
					</div>

					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>Alias: {offspring['alias']}</p>
						<p>
							Sex: <span class="absolute ml-1">
								<svg
									class="{offspring['sex'] == 0
										? 'hen-stroke'
										: 'cock-stroke'} w-9 opacity-60 rounded-md"
									height="20"
									xmlns="http://www.w3.org/2000/svg"
									style="position: absolute; top: 50%; transform: translateY(-50%); z-index: 0;"
								>
									<path
										d="M5 10 Q25 5, 50 10 Q75 15, 95 10"
										fill="none"
										stroke={offspring['sex'] == 0 ? '#ff99cc' : '#99ccff'}
										stroke-width="20"
										stroke-linecap="round"
									/>
								</svg>
								<span style="position: relative; z-index: 1;">
									{offspring['sex'] == 0 ? 'Hen' : 'Cock'}
								</span>
							</span>
						</p>
						<p>
							Date of Birth: {formatDate(offspring['dob'])}
						</p>
					</div>

					<div
						class="flex flex-col mt-5 gap-1 md:gap-2 text-gray-500 text-sm md:text-lg leading-5 font-semibold"
					>
						<p>
							Sire: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{offspring['sire'].replaceAll(' ', '_')}"
									>{offspring['sire']}</a
								></span
							>
						</p>
						<p>
							Dam: <span class="py-[2px] px-2 bg-black rounded-lg text text-neutral-100"
								><a href="/pigeons/id/{offspring['dam'].replaceAll(' ', '_')}">{offspring['dam']}</a
								></span
							>
						</p>
						<p class="flex flex-row gap-1">
							Offspring: <span class="flex flex-col lg:flex-row xl:flex-col 2xl:flex-row gap-1">
								{#each offspring['offspring'] as spring}
									<span class="py-[1px] px-2 bg-black rounded-lg text text-neutral-100"
										><a href="/pigeons/id/{spring.replaceAll(' ', '_')}">{spring}</a></span
									>
								{/each}
							</span>
						</p>
					</div>
				</div>
				<div
					class="flex flex-col mt-12 gap-3 text-gray-500 text-sm md:text-lg leading-5 font-semibold max-w-72 lg:max-w-96"
				>
					<p>Comment: {offspring['comment']}</p>
				</div>
			</div>
		{/each}
	{/if}
</div>
