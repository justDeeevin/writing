<script lang="ts">
  import type { Article } from '$lib/types';

  export let data: any;

  const articles = data.articles as Article[];
</script>

<h1 style="margin-bottom: 0">tag search</h1>
<div class="row">
  <p>&num;{data.tags[0]}&nbsp;</p>
  {#each data.tags as tag, i}
    {#if i > 0}
      <p>&amp;&amp; &num;{tag}&nbsp;</p>
    {/if}
  {/each}
</div>

<ul>
  {#each articles as article}
    <li>
      <a href={`articles/${article.slug}`}>{article.title}</a>
    </li>
  {/each}
</ul>
