<script lang="ts">
	import type { Conversion } from '../routes/proxy+page.server';

	export let content: string;
	export let conversions: Conversion[];

	type RenderableContent = {
		type: 'text' | 'url';
		content: string;
	};

	function getRenderableContent(content: string, urls: string[]): RenderableContent[] {
		let list: RenderableContent[] = [
			{
				type: 'text',
				content
			}
		];

		/**
		 * Convert `content` into a list of objects where each URL in `content`
		 * is a separate object and the rest of the text shards are separate objects.
		 */
		urls.forEach((url: string) => {
			list = list.flatMap((item) => {
				if (item.type !== 'text') {
					return item;
				}

				const { content } = item;

				const parts = content.split(url);

				if (parts.length === 1) {
					return {
						type: 'text' as const,
						content: parts[0]
					};
				}

				return parts.slice(0, -1).flatMap((item: string) => {
					return [
						{ type: 'text' as const, content: item },
						{ type: 'url' as const, content: url }
					].concat([{ type: 'text' as const, content: parts.slice(-1)[0] }]);
				});
			});
		});

		return list;
	}

	$: urls = conversions.map((item) => (item.error ? item.url : item.to)) as string[];
	$: renderableContentList = getRenderableContent(content, urls);
</script>

<p class="bg-primary-content rounded-xl px-6 py-4">
	{#each renderableContentList as renderableContent}
		{#if renderableContent.type === 'url'}
			<span
				><a href={renderableContent.content} target="_blank">{renderableContent.content}</a></span
			>
		{:else}
			<span>{renderableContent.content}</span>
		{/if}
	{/each}
</p>

<style>
	span {
		white-space: break-spaces;
	}
</style>
