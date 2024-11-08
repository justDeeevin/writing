import type { Article } from '$lib/types';

export async function load({ url, fetch }: any) {
  const tags = JSON.parse(url.searchParams.get('tags')) as string[] | undefined;
  const title = url.searchParams.get('title') as string | undefined;
  const res = await fetch(`api/articles`);
  const articles = (await res.json()) as Article[];

  return {
    articles,
    filters: { tags, title }
  };
}
