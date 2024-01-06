<script>
	import { onMount } from 'svelte';
	import { MongoClient, ServerApiVersion } from 'mongodb';
	import { writable } from 'svelte/store';

	import '../../app.css';

	const uri =
		'mongodb+srv://ajr:hamNyNEGRXWyGVHQ@cluster0.zhssbg0.mongodb.net/?retryWrites=true&w=majority';

	export let queryFilter = {}; // You can pass any query filter you want

	// Create a writable store for isLoading
	const isLoading = writable(true);

	let pigeons = [];

	const client = new MongoClient(uri, {
		serverApi: {
			version: ServerApiVersion.v1,
			strict: true,
			deprecationErrors: true
		}
	});

	onMount(async () => {
		console.log('mounted');
		try {
			await client.connect();

			const database = client.db('pigeondb');
			const collection = database.collection('pigeons');

			pigeons = await collection.find(queryFilter, { projection: { _id: 0 } }).toArray();
			console.log(pigeons);
		} catch (error) {
			console.error('Error during onMount:', error);
		} finally {
			isLoading.set(false); // Update the store to false when done
			await client.close();
		}
	});
</script>

{#if $isLoading}
	<div class="loading">
		<!-- Show loading circle here -->
		Loading...
	</div>
{:else}
	<!-- If done connecting, show slot -->
	<slot {pigeons} />
{/if}

<style>
	.loading {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
