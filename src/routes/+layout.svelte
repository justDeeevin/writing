<script lang="ts">
  import '$lib/css/app.css';
  import '$lib/css/layout.css';
  import '$lib/css/oxocarbon-hljs.css';

  import { theme } from '$lib/store';
  import { browser } from '$app/environment';
  import Background from '$lib/components/Background.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import hljs from 'highlight.js';
  import nix from 'highlight.js/lib/languages/nix';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

  injectSpeedInsights();

  page.subscribe(() => {
    if (browser) {
      hljs.highlightAll();
    }
  });

  onMount(() => {
    if (browser) {
      hljs.registerLanguage('nix', nix);
      hljs.highlightAll();
    }
  });

  let themeSwitch = $theme === 'light';
  let backgroundEnabled = browser
    ? window.localStorage.getItem('backgroundEnabled') !== 'false'
    : true;

  $: $theme = themeSwitch ? 'light' : 'dark';
  $: if (browser) {
    document.body.classList.toggle('light', themeSwitch);
  }
  $: if (browser) window.localStorage.setItem('backgroundEnabled', backgroundEnabled.toString());
</script>

<svelte:head>
</svelte:head>

<Background disable={!backgroundEnabled} />

<div style="position: absolute; top: 5px; right: 5px;">
  <Switch leftText="dark" rightText="light" bind:checked={themeSwitch} />
  <Switch leftText="background" bind:checked={backgroundEnabled} />
</div>

<div style="min-height: 100%; display: flex; flex-direction: column;">
  <div style="flex: 1">
    <slot />
  </div>
  <footer>
    {#if $page.url.pathname !== '/'}
      <a href="/">home</a>
    {/if}
    <p>
      copyright (c) <a href="https://justdeeevin.github.io">devin droddy</a>
      <i><a href="https://github.com/justdeeevin/writing">source</a></i>
    </p>
    <p>
      colors=<a href="https://github.com/nyoom-engineering/oxocarbon">oxocarbon</a>
    </p>
    <p>
      font=<a href="https://monaspace.githubnext.com">github monaspace</a>
      neon
    </p>
    <p>
      background=<a href="https://github.com/zuramai/starback.js">starback</a>
    </p>
    <p>
      mail=<a href="mailto:devin.droddy@gmail.com">devin.droddy@gmail.com</a>
    </p>
  </footer>
</div>

<style>
  footer > p {
    margin: 0;
  }
</style>
