<script lang="ts">
  import '$lib/css/layout.css';

  interface Props {
    checked?: boolean;
    leftText?: string;
    rightText?: string;
  }

  let { checked = $bindable(false), leftText, rightText }: Props = $props();
</script>

<div class="row" style="margin: 5px;">
  {#if leftText}
    <p style="margin: 0;">{leftText}</p>
  {/if}
  <label class="switch">
    <input type="checkbox" bind:checked />
    <span class="slider"></span>
  </label>
  {#if rightText}
    <p style="margin: 0;">{rightText}</p>
  {/if}
</div>

<style>
  /* switch pulled from w3schools, slightly tweaked */

  /* The switch - the box around the slider */
  .switch {
    position: relative;
    display: inline-block;
    width: 46px;
    height: 20px;
    margin: 5px;
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--base01);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  .slider:before {
    position: absolute;
    content: '';
    height: 12px;
    width: 12px;
    left: 4px;
    bottom: 4px;
    background-color: var(--base06);
    -webkit-transition: 0.4s;
    transition: 0.4s;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(26px);
    -ms-transform: translateX(26px);
    transform: translateX(26px);
  }
</style>
