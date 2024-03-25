<script>
  import Icon from "./Icon.svelte";
  import {
    mdiAlertOutline,
    mdiCheckCircleOutline,
    mdiCloseOctagonOutline,
    mdiInformationOutline,
  } from "@mdi/js";
  export let message = "";
  export let type = "info";

  $: css = `alert alert-${type}`;
  $: fill = type === 'info' ? 'fill-blue-500' : type === 'success' ? 'fill-green-500' : type === 'error' ? 'fill-red-500' : 'fill-yellow-500';
  $: iconCss = `w-6 h-6 ${fill}`;

  $: console.log(`iconCss`, iconCss)
  $: console.log(`css`, css)
</script>

<div class="toast toast-end">
  <div role={type} class={css}>
    {#if type === "info"}
      <Icon path={mdiInformationOutline} css={iconCss} />
    {/if}
    {#if type === "success"}
      <Icon path={mdiCheckCircleOutline} css={iconCss} />
    {/if}
    {#if type === "error"}
      <Icon path={mdiCloseOctagonOutline} css={iconCss} />
    {/if}
    {#if type === "warning"}
      <Icon path={mdiAlertOutline} css={iconCss} />
    {/if}
    <span>{message}</span>
  </div>
</div>
