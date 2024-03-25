<script>
  import Portal from "svelte-portal";
  export let open = false;
</script>

<Portal target="body">
  <dialog id="my_modal_3" class={`modal modal-botom sm:modal-middle ${open ? 'modal-open': 'modal-close'}`}>
    <div class="modal-box">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={() => open = false}>✕</button>
        <div class="max-h-96 overflow-y-auto">
          <slot />
        </div>
    </div>
</dialog>
</Portal>
