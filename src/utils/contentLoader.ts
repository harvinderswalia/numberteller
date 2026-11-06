import matter from 'gray-matter';

const featureModules = import.meta.glob('../content/features/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const learnModules = import.meta.glob('../content/learn/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

const legalModules = import.meta.glob('../content/legal/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>;

export interface ContentDoc {
  slug: string;
  title: string;
  description: string;
  body: string;
  frontmatter: Record<string, unknown>;
}

function extractSlug(path: string): string {
  const match = path.match(/([^/]+)\.md$/);
  return match ? match[1] : path;
}

function parseModules(modules: Record<string, string>): Record<string, ContentDoc> {
  const docs: Record<string, ContentDoc> = {};
  for (const [path, raw] of Object.entries(modules)) {
    const slug = extractSlug(path);
    const { data, content } = matter(raw);
    docs[slug] = {
      slug,
      title: (data.title as string) || (data.seoTitle as string) || slug,
      description: (data.description as string) || '',
      body: content,
      frontmatter: data,
    };
  }
  return docs;
}

export const featureDocs = parseModules(featureModules);
export const learnDocs = parseModules(learnModules);
export const legalDocs = parseModules(legalModules);

export function getFeatureDoc(slug: string): ContentDoc | undefined {
  return featureDocs[slug];
}

export function getLearnDoc(slug: string): ContentDoc | undefined {
  return learnDocs[slug];
}

export function getLegalDoc(slug: string): ContentDoc | undefined {
  return legalDocs[slug];
}

export function getAllLearnDocs(): ContentDoc[] {
  return Object.values(learnDocs).sort((a, b) => {
    const aDate = String(a.frontmatter.updated || a.frontmatter.published || '');
    const bDate = String(b.frontmatter.updated || b.frontmatter.published || '');
    return bDate.localeCompare(aDate);
  });
}
