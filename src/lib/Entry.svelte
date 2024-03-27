<script>
  import { mdiDragVertical, mdiTrashCanOutline } from '@mdi/js';
  import { store } from '$lib/store'
  import Icon from './Icon.svelte'
  export let step

  function remove() {
    const index = $store.steps.findIndex((s) => s.id === step.id)
    $store.steps.splice(index, 1)
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