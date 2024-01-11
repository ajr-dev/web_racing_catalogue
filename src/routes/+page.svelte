<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	// console.log(data.pigeonsCount);

	import '../app.css';
	import Search from '$lib/components/Search.svelte';
</script>

<main>
	<!-- header -->
	<svg
		height="172"
		viewBox="0 0 1779 172"
		fill="rgb(34, 34, 34)"
		class="text-neutral-800 font-bold inline w-full h-auto bg-gray-200"
	>
		<text
			class="text-[136px] hidden lg:block"
			x="50%"
			y="50%"
			dominant-baseline="middle"
			text-anchor="middle"
			fill="rgb(34, 34, 34)"
		>
			BERTIE RABIE RACING LOFT
		</text>
		<text
			class="text-[159px] block lg:hidden"
			x="50%"
			y="50%"
			dominant-baseline="middle"
			text-anchor="middle"
			fill="rgb(34, 34, 34)"
		>
			BERTIE R. RACING LOFT
		</text>
	</svg>

	<!-- right-to-left text -->
	<!-- <div class="text-neutral-800 font-light px-12 bg-gray-200 text-[2.50rem] leading-none">
		<div class="items-center justify-items-center flex marquee-container">
			<div class="pr-3 whitespace-nowrap marquee-text">
				<strong class="font-bold">War Thunder</strong> — Players Banned -
				<strong class="font-bold">TRACKING</strong> — January, 2024 —
			</div>
			<div class="pr-3 whitespace-nowrap marquee-text">
				<strong class="font-bold">War Thunder</strong> — Players Banned -
				<strong class="font-bold">6,324</strong> — December, 2023 —
			</div>
			<div class="pr-3 whitespace-nowrap marquee-text">
				<strong class="font-bold">War Thunder</strong> — Players Banned -
				<strong class="font-bold">4,124</strong> — November, 2023 —
			</div>
			<div class="pr-3 whitespace-nowrap marquee-text">
				<strong class="font-bold">War Thunder</strong> — Players Banned -
				<strong class="font-bold">REDACTED</strong> — October, 2023 —
			</div>
		</div>
	</div> -->

	<p class="flex w-full justify-center items-center text-lg lg:text-2xl content-center text-center">
		Cataloging all pigeons in Tulbagh, since 2024.
	</p>

	<!-- maybe an image here of the player search records -->
	<div class="mt-6 lg:mt-40 relative group">
		<img
			class="object-cover rounded-lg w-full h-64 lg:h-[700px]"
			alt="pigeons"
			src="catalogue_new.png"
		/>
		<div
			class="absolute inset-0 bg-black opacity-5 group-hover:opacity-20 duration-300 ease-in-out transition-opacity rounded-xl"
		></div>
		<div
			class="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
		>
			<a
				href="/pigeons/1/"
				class=" text-black border-[1px] border-black px-8 py-8 rounded-lg text-xl font-semibold leading-3 bg-white bg-opacity-20 hover:bg-white hover:bg-opacity-60 transition-colors duration-300 ease-in-out"
				>View Catalogue</a
			>
		</div>
	</div>

	<div
		class="flex flex-col gap-2 md:gap-0 md:flex-row text-lg w-full justify-center align-middle items-center mt-12"
	>
		<span>Look through over <strong> {data.pigeonsCount} </strong> pigeons on record</span>
		<a href="/pigeons/1/" class="flex flex-row justify-center align-middle items-center ml-5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="24"
				height="24"
				viewBox="0 0 24 24"
				{...$$props}
				><path
					fill="black"
					d="M16.175 13H4v-2h12.175l-5.6-5.6L12 4l8 8l-8 8l-1.425-1.4l5.6-5.6Z"
				/></svg
			>

			<strong id="linkanimation" class="ml-1">View Catalogue</strong>
		</a>
	</div>

	<!-- stats -->
	<!-- <table class="flex w-full mt-48">
		<tr class="flex w-full justify-center gap-6">
			<td><span class="font-semibold text-6xl">{data.pigeonsCount}</span> pigeons </td>
			<td><span class="font-semibold text-6xl">2</span> days ago updated </td>
			<td><span class="font-semibold text-6xl">20</span> last month </td>
		</tr>
	</table> -->
</main>

<style>
	@keyframes marquee {
		0% {
			transform: translateX(0%);
		}
		100% {
			transform: translateX(-100%);
		}
	}

	.marquee-container {
		overflow: hidden;
		position: relative;
	}

	.marquee-text {
		display: inline-block;
		white-space: nowrap;
		animation: marquee 10s linear infinite;
	}

	#linkanimation {
		text-decoration: none;
		color: black;
		position: relative;
	}
	#linkanimation::before {
		content: '';
		background: linear-gradient(to right, rgb(0, 0, 0) 45%, #b7b7b7 55%);
		background-size: 220% 100%;
		background-position: 100% 50%;
		width: 100%;
		height: 2px;
		position: absolute;
		left: 0;
		bottom: 0;
		background-repeat: no-repeat;
		transition: 0.3s ease-out;
	}
	#linkanimation:hover::before {
		background: linear-gradient(to right, rgb(0, 0, 0) 45%, #b7b7b7 55%);
		background-size: 220% 100%;
		background-position: 0% 50%;
		transition: 0.3s ease-out;
	}
</style>
