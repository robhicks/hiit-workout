<script>
  import { writable } from "svelte/store";
  import Alert from "../lib/Alert.svelte";
  import Entry from "../lib/Entry.svelte";
  import { steps } from "../lib/store.js";
  import { isSpeechSynthesisSupported } from "$lib/is";
  import { v4 as uuid } from "uuid";
  import { dndzone } from "svelte-dnd-action";
  import Clock from "$lib/Clock.svelte";
  import CopyPaste from "$lib/CopyPaste.svelte";

  let currentStep = 0;
  let running = false;
  const message = isSpeechSynthesisSupported && new SpeechSynthesisUtterance();
  const startClock = writable(false);
  const seconds = writable(0);

  let day = 1;

  const flipDurationMs = 300;

  function start() {
    running = true;
  }

  function pause() {
    running = false;
  }

  function stop() {
    currentStep = 0;
    running = false;
  }

  async function add() {
    const step = { duration: 30, name: "", id: uuid(), day }
    steps.update((items) => [...items, step])
  }

  function handleDndConsider(e) {
    $steps = e.detail.items;
  }
  function handleDndFinalize(e) {
    $steps = e.detail.items;
  }

  $: startCss =
    !$steps?.length || running
      ? "btn btn-primary capitalize btn-disabled"
      : "btn capitalize btn-primary";
  $: addCss = running
    ? "btn btn-disabled btn-primary capitalize mt-6"
    : "btn btn-primary capitalize mt-6";
  $: pauseCss = !running ? "btn btn-disabled capitalize" : "btn capitalize";
  $: stopCss = !running
    ? "btn btn-disabled capitalize"
    : "btn capitalize btn-secondary";
  $: showNoSpeechSupport = !isSpeechSynthesisSupported;

  if (message) {
    message.onend = () => {
      const step = $steps[currentStep];
      $startClock = true;
      seconds.set(step.duration);
      if (running) {
        setTimeout(() => {
          currentStep++;
        }, 1000 * step.duration);
      } else {
        $startClock = false;
      }
    };
  }

  $: if (running) {
    const step = filteredSteps[currentStep];
    if (step) {
      message.text = `start ${step.name} for ${step.duration} seconds`;
      message.rate = 1;
      message.pitch = 1;
      message.volume = 1;
      message.lang = "en-US";
      speechSynthesis.speak(message);
    } else {
      running = false;
      message.text = "workout complete! congratulations!";
      message.rate = 1;
      message.pitch = 1;
      message.volume = 1;
      message.lang = "en-US";
      speechSynthesis.speak(message);
      currentStep = 0;
    }
  }

  $: filteredSteps = $steps.filter((step) => step.day === day);

  $: console.log(`filteredSteps`, filteredSteps)

</script>

<div class="container p-6">
  <h1 class="text-3xl flex items-center gap-1">
    HIIT Workout Assistant
    <CopyPaste />
  </h1>
  <p class="mb-6">
    This is a simple HIIT workout assistant. It will guide you through a workout
    with voice prompts. You can set the duration of the workout and the duration
    of the rest periods.
  </p>

  <select class="select select-bordered w-full mb-2" bind:value={day}>
  <option disabled selected>Pick Day</option>
  <option value={1} >First Day</option>
  <option value={2}>Second Day</option>
</select >
  <section
    use:dndzone={{ items: $steps, flipDurationMs }}
    on:consider={handleDndConsider}
    on:finalize={handleDndFinalize}
  >
    {#each filteredSteps as step (step.id)}
      <Entry bind:step {steps} />
    {/each}
  </section>
  <Clock {seconds} {startClock} />
  <div class="grid grid-cols-1 gap-2 max-w-[500px]">
    <button class={addCss} type="button" on:click={add}>add step</button>
    <button class={startCss} type="button" on:click={start}
      >start workout</button
    >
    <button class={pauseCss} type="button" on:click={pause}
      >pause workout</button
    >
    <button class={stopCss} type="button" on:click={stop}>stop workout</button>
  </div>
  {#if showNoSpeechSupport}
    <Alert
      message="Your browser does not support speech synthesis"
      type="error"
    />
  {/if}
</div>
