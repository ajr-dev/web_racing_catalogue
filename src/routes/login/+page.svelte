<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="lg:p-8 absolute flex h-full w-full justify-center bg-[#E9E9E9]">
	<div class="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
		<div class="flex flex-col space-y-2 text-center">
			<h1 class="text-2xl font-semibold tracking-tight">Login to your account</h1>
			<p class="text-sm text-muted-foreground">Enter your email & password below to login</p>
		</div>
		<div class="grid gap-6">
			<form>
				<div class="grid gap-2">
					<div class="grid gap-1">
						<label
							data-melt-label=""
							data-label-root=""
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
							for="email">Email</label
						>
						<input
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							id="email"
							placeholder="name@example.com"
							type="email"
							autocapitalize="none"
							autocomplete="email"
							autocorrect="off"
						/>
						<label
							data-melt-label=""
							data-label-root=""
							class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 sr-only"
							for="email">Password</label
						>
						<input
							class="flex h-9 w-full rounded-md border border-input bg-background px-3 py-5 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
							id="password"
							placeholder="password"
							type="password"
							autocapitalize="none"
							autocomplete="current-password"
							autocorrect="off"
						/>
					</div>
					<button
						type="button"
						tabindex="0"
						class="inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
						data-button-root=""
					>
						Sign In</button
					>
				</div>
			</form>
			<div class="relative">
				<div class="absolute inset-0 flex items-center"><span class="w-full border-t"></span></div>
				<div class="relative flex justify-center text-xs uppercase">
					<span class="bg-background px-2 text-muted-foreground">Admins Only</span>
				</div>
			</div>
			<a
				href="/"
				type="button"
				tabindex="0"
				class="inline-flex items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
				data-button-root=""
			>
				Return Home</a
			>
		</div>
		<!-- <p class="px-8 text-center text-sm text-muted-foreground">
			By clicking continue, you agree to our <a
				href="/terms"
				class="underline underline-offset-4 hover:text-primary"
				>Terms of Service
			</a>
			and
			<a href="/privacy" class="underline underline-offset-4 hover:text-primary">Privacy Policy</a>
			.
		</p> -->
	</div>
</div>
