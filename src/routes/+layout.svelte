<script>
	import '../app.postcss';
</script>

<section class="prose mx-auto my-4">
	<main>
		<slot />
	</main>
	<footer class="text-center mt-6 flex flex-wrap justify-between items-center gap-2">
		<p class="m-0">
			Made by <a href="https://umanggalaiya.in">Umang</a>
		</p>
		<a
			class="text-sm"
			href="https://github.com/umanghome/tiny-links/issues"
			target="_blank"
			rel="noopener noreferrer">Report an issue via GitHub</a
		>
	</footer>
</section>
