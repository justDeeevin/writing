import { getArticles } from '$lib';

export async function load() {
  const articles = getArticles();
  articles.length = Math.min(articles.length, 8);
  return { articles };
}
