import Processor from '@asciidoctor/core';
import matter from 'gray-matter';

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

/** @type (content: string) => string */
function parseAdoc(content) {
  const processor = Processor();

  return processor
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
        const document = parseAdoc(markdown);
        const html = escapeHtml(document);
        return { code: meta + html };
      }
    }
  };
}
