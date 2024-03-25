<script>
  import { writable } from "svelte/store";

  export let startClock; // store
  export let seconds; // store

  let countdown = writable($seconds);

  $: countdown.set($seconds);

  $: if ($startClock && $seconds > 0) {
    const interval = setInterval(() => {
      countdown.update((n) => {
        if (n === 0) {
          clearInterval(interval);
          return 0;
        }
        return n - 1;
      });
    }, 1000);
  }

  $: color = $countdown < 10 ? "text-red-600" : "text-green-600";
  $: console.log(`$startClock`, $startClock)
  $: console.log(`$seconds`, $seconds)
</script>

<div>
  {#if $startClock}
    <p class={`text-7xl text-center ${color}`}>{$countdown}</p>
  {/if}
</div>
