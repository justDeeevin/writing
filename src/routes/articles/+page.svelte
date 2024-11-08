<script lang="ts">
  import type { Article } from '$lib/types';

  interface Props {
    data: { articles: Article[]; tags: string[] };
  }

  let { data }: Props = $props();

  const articles = data.articles;
  const tagsString = data.tags.map((tag) => `#${tag}`).join(' ');
</script>

<svelte:head>
  <title>tag search</title>
</svelte:head>

<h1 style="margin-bottom: 0">tag search</h1>
<p>{tagsString}</p>

<ul>
  {#each articles as article}
    <li>
      <a href={`articles/${article.slug}`}>{article.title}</a>
    </li>
  {/each}
</ul>
