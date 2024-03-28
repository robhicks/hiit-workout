<script>
  import { mdiContentCopy, mdiContentPaste, mdiFruitPear } from "@mdi/js";
  import Icon from "./Icon.svelte";
  import { steps } from "./store.js";
  import copy from 'copy-to-clipboard';
  import PasteModal from "./PasteModal.svelte";
  import { isDarkMode } from './is.js'

  let open = false;

  let copyButtonCss = `w-5 h-5 ${isDarkMode ? 'fill-white' : 'fill-black'}`
  let pasteButtonCss = `w-5 h-5  ${isDarkMode ? 'fill-white' : 'fill-black'}`

  const copyToClipboard = () => {
    copy(JSON.stringify($steps));
    copyButtonCss = 'w-5 h-5 fill-green-500'
    setTimeout(() => {
        copyButtonCss = `w-5 h-5 ${isDarkMode ? 'fill-white' : 'fill-black'}`
    }, 1500);
  }
  
</script>

<span class="flex gap-2">
  <button on:click={copyToClipboard}><Icon path={mdiContentCopy} css={copyButtonCss} /></button>
  <button on:click={() => open = true}><Icon path={mdiContentPaste} css={pasteButtonCss} /></button>
</span>
<PasteModal bind:open />

