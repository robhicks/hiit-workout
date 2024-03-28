<script>
  import { mdiDragVertical, mdiTrashCanOutline } from '@mdi/js';
  import Icon from './Icon.svelte'
  export let step
  export let steps
  console.log(`$steps`, $steps)

  function remove() {
    steps.update((s) => s.filter((st) => st.id !== step.id));
  }
</script>

<div class="flex items-center gap-2 mb-2">
  <Icon path={mdiDragVertical} css="w-8 h-8 fill-gray-500 cursor-move" />
  <input type="text" placeholder="Add Name" bind:value={step.name} class="input input-bordered w-full max-w-xs" />
  <input type="number" bind:value={step.duration} class="w-16 input input-bordered" />
  <button type="button"  on:click={remove}>
    <Icon path={mdiTrashCanOutline} css="w-6 h-6 fill-red-500" />
  </button>
</div>