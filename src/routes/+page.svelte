<script lang="ts">
  import { getArticles } from '$lib';

  const articles = getArticles().slice(0, 8);
</script>

<svelte:head>
  <title>devin's writing</title>
</svelte:head>

<h1 style="margin-bottom: 32px; margin-top: 48px; font-size: 3rem; line-height: 4rem;">writing</h1>
<p style="margin-bottom: 32px;">
  i write english about as well as i write rust or typescript. sometimes i want to publish my
  writing. that's what this is for.
</p>

<h2>recent</h2>
<ul>
  {#each articles as article}
    <li>
      <a href={`articles/${article.slug}`}>{article.title}</a> - {article.date}
    </li>
  {/each}
</ul>
<a href="/articles">all</a>
