<script>
  import { useRegisterSW } from "virtual:pwa-register/svelte";
  import Modal from "./Modal.svelte";

  let open = false;

  const UPDATE_CHECK_INTERVAL = 1000 * 60 * 5; // 5 minutes

  const { needRefresh, updateServiceWorker } = useRegisterSW({
    onRegistered(r) {
      r &&
        setInterval(() => {
          r.update();
        }, UPDATE_CHECK_INTERVAL);
    },
  });

  const update = () => {
    updateServiceWorker();
    open = false;
  };

  $: open = $needRefresh;
</script>

<Modal bind:open>
  <h3 class="prose-2xl">Update</h3>
  <p class="">A new version is available.</p>
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
      Update Now
    </button>
  </div>
</Modal>
