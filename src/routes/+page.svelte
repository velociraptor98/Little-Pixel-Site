<script lang="ts">
	import Contact from '#lib/components/Contact.svelte';
	import Footer from '#lib/components/Footer.svelte';
	import Games from '#lib/components/Games.svelte';
	import Header from '#lib/components/Header.svelte';
	import Hero from '#lib/components/Hero.svelte';
	import Splash from '#lib/components/Splash.svelte';
	import Studio from '#lib/components/Studio.svelte';
	import Ticker from '#lib/components/Ticker.svelte';
</script>

<svelte:head>
	<title>little pixel · whimsical indie games</title>
	<meta
		name="description"
		content="little pixel is a tiny indie studio making cozy, whimsical games — one little pixel at a time."
	/>
	<meta property="og:title" content="little pixel" />
	<meta property="og:description" content="Tiny worlds, big feelings. Cozy, whimsical indie games." />
	<meta property="og:image" content="/img/logo.png" />
</svelte:head>

<Splash />
<Header />
<main>
	<Hero />
	<Ticker />
	<Games />
	<Studio />
	<Contact />
</main>
<Footer />
