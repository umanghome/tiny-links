<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';
	import NewContent from './NewContent.svelte';

	export let form: ActionData;

	let loading = false;

	$: failedConversions = form?.conversions.filter((conversion) => conversion.error);
	$: successfulConversions = form?.conversions.filter((conversion) => !conversion.error);
	$: hasMetadata = failedConversions || successfulConversions;
</script>

<h2>Your content:</h2>
<form
	method="POST"
	action="?/convert"
	use:enhance={() => {
		loading = true;

		return async ({ update }) => {
			loading = false;
			update();
		};
	}}
>
	<textarea name="content" placeholder="Put your content here" required />
	<button type="submit">Convert</button>
</form>

{#if loading}
	<p>Loading...</p>
{/if}

{#if form?.content}
	<h2>Your new content:</h2>
	<NewContent content={form.content} conversions={form.conversions} />
{/if}

{#if hasMetadata}
	<h2>Metadata:</h2>
	{#if successfulConversions}
		<h3>Successful URL conversions</h3>
		<table>
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
							<a href={conversion.url} target="_blank" rel="noopener noreferrer">{conversion.url}</a
							>
						</td>
						<td>
							<a href={conversion.to} target="_blank" rel="noopener noreferrer">{conversion.to}</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
	{#if failedConversions}
		<h3>Failed URL conversions</h3>
		<table>
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
							<a href={conversion.url} target="_blank" rel="noopener noreferrer">{conversion.url}</a
							>
						</td>
						<td>
							{conversion.error}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
{/if}
