import Processor from '@asciidoctor/core';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import { all, createStarryNight } from '@wooorm/starry-night';
import { toHtml } from 'hast-util-to-html';

/** @type (content: string) => {markdown: string, meta: string} */
function frontmatter(content) {
  const { content: markdown, data } = matter(content);
  const meta = `
    <script context="module">
      export const metadata = ${JSON.stringify(data)};
    </script>
  `;
  return { markdown, meta };
}

/** @type (content: string) => Promise<string> */
async function parseAdoc(content) {
  const processor = Processor();

  let html = processor
    .convert(content, {
      standalone: false,
      safe: 'unsafe',
      attributes: {
        icons: 'font',
        'allow-uri-read': '',
        sectanchors: true,
        'skip-front-matter': true
      }
    })
    .toString();

  const dom = new JSDOM(html);
  const document = dom.window.document;

  /** @type {NodeListOf<HTMLElement>} */
  const codes = document.querySelectorAll('pre.highlight > code');
  for (const code of codes) {
    code.innerHTML = code.innerHTML.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
    const lang = code.dataset.lang;
    if (!lang) continue;
    const starryNight = await createStarryNight(all);
    const scope = starryNight.flagToScope(lang);
    if (!scope) continue;
    code.innerHTML = toHtml(starryNight.highlight(code.innerHTML, scope));
  }

  return document.body.innerHTML;
}

/**
 * Replace characters with HTML entities.
 * @param {string} content
 */
function escapeHtml(content) {
  content = content.replace(/{/g, '&#123;').replace(/}/g, '&#125;');

  const componentRegex = /<[A-Z].*/g;
  const components = content.match(componentRegex);
  components?.forEach((component) => {
    const replaced = component.replace('&#123;', '{').replace('&#125;', '}');
    content = content.replace(component, replaced);
  });

  return content;
}

/** @type () => {markup: (file: {content: string, filename: string}) => Promise<{code: string} | undefined>} */
export default function svasciidoc() {
  return {
    markup: async ({ content, filename }) => {
      if (filename.endsWith('.adoc')) {
        const { markdown, meta } = frontmatter(content);
        const document = await parseAdoc(markdown);
        const html = escapeHtml(document);
        return { code: meta + html };
      }
    }
  };
}
