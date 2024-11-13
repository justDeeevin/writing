import { getArticles } from '$lib';

export async function load({ url }: { url: URL }) {
  const tags = JSON.parse(url.searchParams.get('tags') ?? 'null') as string[] | null;
  const title = url.searchParams.get('title');
  const articles = getArticles();

  return {
    articles,
    filters: { tags, title }
  };
}
