import type { Article } from '$lib/types';

async function getArticles(): Promise<Article[]> {
  let articles: Article[] = [];

  const paths = import.meta.glob('/src/articles/*.adoc', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').pop()?.replace('.adoc', '');
    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Article, 'slug'>;
      const post = { ...metadata, slug } satisfies Article;
      post.published && articles.push(post);
    }
  }

  articles = articles.sort(
    (first, second) => new Date(second.date).getTime() - new Date(first.date).getTime()
  );

  return articles;
}

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(await getArticles()), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET'
    }
  });
}
