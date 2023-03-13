<script lang="ts">
	import { copyToClipboard, isClipboardSupported } from '$lib/clipboard';
	import { onDestroy, onMount } from 'svelte';

	export let text: string;

	let copied = false;
	let supported = false;

	let timeout: number | undefined;

	onMount(() => {
		supported = isClipboardSupported();
	});

	onDestroy(() => {
		clearTimeout(timeout);
	});

	function copy() {
		copied = true;

		copyToClipboard(text).then(() => {
			timeout = setTimeout(() => {
				copied = false;
			}, 5000) as unknown as number;
		});
	}
</script>

<button
	type="button"
	class="btn btn-sm btn-secondary swap swap-active"
	disabled={!supported}
	class:hidden={!supported}
	on:click={copy}
>
	<span class:swap-off={copied}>Copy to clipboard 📋</span>
	<span class:swap-off={!copied} class:swap-on={copied}>Copied</span>
</button>
