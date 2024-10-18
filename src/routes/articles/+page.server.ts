import type { Article } from '$lib/types';

export async function load({ url, fetch }: any) {
  let tags = JSON.parse(url.searchParams.get('tags')) as string[];
  const res = await fetch(`api/articles`);
  const articles = (await res.json()) as Article[];

  return {
    articles: articles.filter((article) =>
      article.categories.some((category) => tags.includes(category))
    ),
    tags
  };
}
