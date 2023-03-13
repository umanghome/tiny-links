<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import CopyToClipboard from './CopyToClipboard.svelte';
	import NewContent from './NewContent.svelte';

	export let form: ActionData;

	let loading = false;

	$: failedConversions = form?.conversions.filter((conversion) => conversion.error) ?? [];
	$: successfulConversions = form?.conversions.filter((conversion) => !conversion.error) ?? [];
	$: hasFailedConversions = failedConversions.length > 0;
	$: hasSuccessfulConversions = successfulConversions.length > 0;
	$: hasMetadata = hasFailedConversions || hasSuccessfulConversions;
</script>

<h1>Make all links in your content tiny!</h1>

<form
	method="POST"
	action="?/convert"
	use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			update({ reset: false });
		};
	}}
>
	<textarea
		name="content"
		placeholder="Type your content here"
		required
		class="textarea textarea-bordered block w-full min-h-16"
		rows="3"
	/>
	<button
		type="submit"
		class="mt-2 btn btn-block max-w-full btn-sm btn-primary"
		disabled={loading}
		class:loading
	>
		{#if loading}
			Converting
		{:else}
			Convert 🪄
		{/if}
	</button>
</form>

{#if form?.content}
	<div class="divider" />
	<h2 class="mt-0">Your new content</h2>
	<NewContent content={form.content} conversions={form.conversions} />
	<CopyToClipboard text={form.content} />
{/if}

{#if hasMetadata}
	<div class="divider" />
	<h2 class="mt-0">Metadata</h2>
	{#if hasSuccessfulConversions}
		<h3>Successful URL conversions</h3>
		<div class="overflow-auto">
			<table class="table-auto">
				<thead>
					<tr>
						<th>URL</th>
						<th>Converted to</th>
					</tr>
				</thead>
				<tbody>
					{#each successfulConversions as conversion (conversion)}
						<tr>
							<td>
								<a href={conversion.url} target="_blank" rel="noopener noreferrer"
									>{conversion.url}</a
								>
							</td>
							<td>
								<a href={conversion.to} target="_blank" rel="noopener noreferrer">{conversion.to}</a
								>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
	{#if hasFailedConversions}
		<h3>Failed URL conversions</h3>
		<div class="overflow-auto">
			<table class="table-auto">
				<thead>
					<tr>
						<th>URL</th>
						<th>Error</th>
					</tr>
				</thead>
				<tbody>
					{#each failedConversions as conversion (conversion)}
						<tr>
							<td>
								<a href={conversion.url} target="_blank" rel="noopener noreferrer"
									>{conversion.url}</a
								>
							</td>
							<td>
								{conversion.error}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
{/if}
