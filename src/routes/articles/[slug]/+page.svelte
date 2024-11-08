<script lang="ts">
  import type { Article } from '$lib/types';

  interface Props {
    data: { content: any; meta: Article };
  }

  let { data }: Props = $props();
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
</svelte:head>

<div style="margin-left: 10px; margin-right: 10px; margin-bottom: 10px;">
  <hgroup>
    <h1 style="margin-bottom: 0">{data.meta.title}</h1>
    <p style="margin-top: 0">{data.meta.date}</p>

    <div class="row">
      {#each data.meta.categories as category}
        <p style="margin-top: 0">
          <a href="/articles?tags=[&quot;{category}&quot;]">&num;{category}</a>&nbsp;
        </p>
      {/each}
    </div>
  </hgroup>

  <data.content />
</div>
