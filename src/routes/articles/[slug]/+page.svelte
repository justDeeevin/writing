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
    <h1 style="margin-bottom: 12px; margin-top: 64px; font-size: 3rem; line-height: 4rem;">
      {data.meta.title}
    </h1>
    <p style="margin-top: 0; margin-bottom: 28px;">{data.meta.date}</p>

    <div class="row">
      {#each data.meta.categories as category}
        <p style="margin-top: 0">
          <a
            href="/articles?init=&lbrace;&quot;tags&quot;: &lbrack;&quot;{category}&quot;&rbrack;&rbrace;"
            >&num;{category}</a
          >&nbsp;
        </p>
      {/each}
    </div>
  </hgroup>

  <data.content />
</div>
