import type { Article } from '$lib/types';

export async function load({ fetch }: { fetch: (url: string) => Promise<Response> }) {
  const response = await fetch('api/articles');
  const articles: Article[] = await response.json();
  return { articles };
}