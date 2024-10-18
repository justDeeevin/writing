import { error } from '@sveltejs/kit';

export async function load({ params }: { params: { slug: string } }) {
  try {
    const article = await import(`/src/articles/${params.slug}.adoc`);

    return {
      content: article.default,
      meta: article.metadata
    };
  } catch (e) {
    error(404, `Could not find ${params.slug}`);
  }
}
