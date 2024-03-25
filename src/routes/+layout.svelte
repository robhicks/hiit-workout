<script>
  import "../app.pcss";
  import { browser } from "$app/environment";
  import { pwaInfo } from "virtual:pwa-info";
  import ReloadPrompt from "../lib/ReloadPrompt.svelte";

  $: webManifestLink = pwaInfo ? pwaInfo.webManifest.linkTag : "";

</script>

<svelte:head>
  <meta
    name="description"
    content="HIIT workout timer with voice guidance."
  />
  <link rel="apple-touch-icon" href="/512x512.svg" sizes="180x180" />
  <link rel="mask-icon" href="/512x512.svg" color="#FFFFFF" />
  <meta name="theme-color" content="#ffffff" />
  <title>HIIT Me!</title>
  {@html webManifestLink}
</svelte:head>

{#if browser}
  <ReloadPrompt />
{/if}

<slot />
