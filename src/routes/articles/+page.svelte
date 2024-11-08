<script lang="ts">
  import type { Article } from '$lib/types';
  import Fuse from 'fuse.js';
  import { SvelteSet } from 'svelte/reactivity';

  interface Props {
    data: {
      articles: Article[];
      filters: { tags?: string[]; title?: string };
    };
  }

  let { data }: Props = $props();

  const available_tags = new Set(data.articles.flatMap((article) => article.categories));

  let selected_tag = $state('');

  let tags = new SvelteSet(data.filters.tags ?? []);
  let title = $state(data.filters.title);

  const unused_tags = $derived(tags.symmetricDifference(available_tags));

  const sorted_articles = $derived(
    (!title
      ? data.articles
      : new Fuse(data.articles, { keys: ['title'] }).search(title).map((item) => item.item)
    ).filter((article) =>
      tags.size === 0 ? true : article.categories.some((tag) => tags.has(tag))
    )
  );
</script>

<svelte:head>
  {#if tags.size !== 0 || title}
    <title>article search</title>
  {:else}
    <title>articles</title>
  {/if}
</svelte:head>

<h1 style="margin-bottom: 0">articles</h1>
<div class="row">
  <p>
    tags:&nbsp;{#each tags as tag}<span
        class="tag"
        role="button"
        tabindex="0"
        onclick={() => tags.delete(tag)}
        onkeydown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') tags.delete(tag);
        }}>#{tag}</span
      >&nbsp;{/each}
  </p>
  {#if unused_tags.size > 0}
    <input
      type="text"
      bind:value={selected_tag}
      list="tags"
      onkeypress={(e) => {
        if (e.key === 'Enter' && selected_tag !== '' && !tags.has(selected_tag)) {
          tags.add(selected_tag);
          selected_tag = '';
        }
      }}
    />&nbsp;
    <datalist id="tags">
      {#each unused_tags as tag}
        <option value={tag}>{tag}</option>
      {/each}
    </datalist>
    <button
      onclick={() => {
        tags.add(selected_tag);
        selected_tag = '';
      }}
      disabled={selected_tag === '' || tags.has(selected_tag)}>add</button
    >
  {/if}
</div>
<label for="title">title:</label>
<input type="text" name="title" bind:value={title} />

{#if sorted_articles.length === 0}
  <h3>no results</h3>
{:else}
  <ul>
    {#each sorted_articles as article}
      <li>
        <a href={`articles/${article.slug}`}>{article.title}</a>
      </li>
    {/each}
  </ul>
{/if}

<style>
  span.tag:hover,
  span.tag:focus {
    text-decoration: line-through;
  }
  span.tag:hover {
    cursor: pointer;
  }
</style>
