import { getArticles } from '$lib';

export async function GET(): Promise<Response> {
  return new Response(JSON.stringify(getArticles()), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'justdeeevin.dev',
      'Access-Control-Allow-Methods': 'GET'
    }
  });
}

export async function OPTIONS(): Promise<Response> {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': 'justdeeevin.dev',
      'Access-Control-Allow-Methods': 'GET'
    }
  });
}
