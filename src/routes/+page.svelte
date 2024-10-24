<script lang="ts">
  import type { Article } from '$lib/types';
  import store from '$lib/store.svelte';

  interface Props {
    data: { articles: Article[] };
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>devin's writing</title>
</svelte:head>

<h1>writing</h1>
<p>
  i write english about as well as i write rust or typescript. sometimes i want to publish my
  writing. that's what this is for.
</p>

<h2>recent</h2>
<ul>
  {#each data.articles as article}
    <li>
      <a href={`articles/${article.slug}`}>{article.title}</a> - {article.date}
    </li>
  {/each}
</ul>
