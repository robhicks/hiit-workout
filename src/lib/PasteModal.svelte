<script>
  import Modal from "./Modal.svelte";
  import { steps } from "./store.js";

  export let open = false;
  let ref;

  const update = () => {
    open = false;
    console.log(`ref.value`, ref.value);
    try {
      steps.set(JSON.parse(ref.value));
    } catch (error) {
      console.error(error);
    }
  };
</script>

<Modal bind:open>
  <h3 class="prose-2xl">Paste Data Model</h3>
  <div class="modal-body">
    <textarea
      bind:this={ref}
      class="input input-bordered w-full h-44"
      placeholder="Paste here"
    ></textarea>
  </div>
  <div class="modal-action">
    <button
      type="button"
      class="px-2 py-1 mr-2 text-white rounded-md btn-link"
      on:click={close}
    >
      Later
    </button>
    <button
      type="button"
      class="btn border-blue-10 bg-blue-10"
      on:click={update}
    >
      Paste
    </button>
  </div>
</Modal>
