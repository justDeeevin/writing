<script lang="ts">
  import '$lib/css/app.css';
  import '$lib/css/layout.css';
  import '$lib/css/oxocarbon-starry-night.css';

  import store from '$lib/store.svelte';
  import { browser } from '$app/environment';
  import Background from '$lib/components/Background.svelte';
  import Switch from '$lib/components/Switch.svelte';
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  interface Props {
    children?: import('svelte').Snippet;
  }

  let { children }: Props = $props();

  onMount(() => {
    if (browser) {
      const links = document.querySelectorAll('a');
      links.forEach((link) => {
        if (
          link.href.includes('justdeeevin.dev') ||
          (import.meta.env.DEV && link.href.includes('localhost:5173'))
        ) {
          link.target = '_self';
        }
      });

      const code = document.querySelectorAll<HTMLElement>('pre.highlight');
      code.forEach((code) => {
        code.addEventListener('click', () => {
          navigator.clipboard.writeText(code.innerText);
          const copiedText = '<i>copied</i><br>';
          code.innerHTML = copiedText + code.innerHTML;
          setTimeout(() => {
            code.innerHTML = code.innerHTML.substring(copiedText.length);
          }, 800);
        });
      });
    }
  });

  let themeSwitch = $state(store.theme === 'light');
  let backgroundEnabled = $state(
    browser ? window.localStorage.getItem('backgroundEnabled') !== 'false' : true
  );

  $effect(() => {
    store.theme = themeSwitch ? 'light' : 'dark';
  });
  $effect(() => {
    document.body.classList.toggle('light', themeSwitch);
  });
  $effect(() => window.localStorage.setItem('backgroundEnabled', backgroundEnabled.toString()));
</script>

<svelte:head>
  <base target="_blank" />
</svelte:head>

<Background disable={!backgroundEnabled} />

<div style="position: absolute; top: 5px; right: 5px;">
  <Switch leftText="dark" rightText="light" bind:checked={themeSwitch} />
  <Switch leftText="snowfall" bind:checked={backgroundEnabled} />
</div>

<div style="min-height: 100%; display: flex; flex-direction: column;">
  <div style="flex: 1">
    {@render children?.()}
  </div>
  <footer>
    {#if $page.url.pathname !== '/'}
      <a href="/">home</a>
    {/if}
    <p>
      copyright (c) <a href="https://justdeeevin.dev">devin droddy</a>
      <i><a href="https://github.com/justdeeevin/writing">source</a></i>
    </p>
    <p>
      colors=<a href="https://github.com/nyoom-engineering/oxocarbon">oxocarbon</a>
    </p>
    <p>
      font=<a href="https://monaspace.githubnext.com">github monaspace</a>
      neon + krypton (for code)
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
