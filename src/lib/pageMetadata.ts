interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage: string;
  schema?: object | object[];
}

// Reuse the build-time tags instead of leaving a second, stale canonical in the head.
export function updatePageMetadata(document: Document, page: PageMetadata) {
  const url = `https://greatsteve.kz${page.canonical}`;
  const image = `https://greatsteve.kz${page.ogImage}`;
  const upsert = (selector: string, tag: string, attributes: Record<string, string>) => {
    const [existing, ...duplicates] = Array.from(document.head.querySelectorAll(selector));
    duplicates.forEach(element => element.remove());
    const element = existing ?? document.createElement(tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    if (!existing) document.head.appendChild(element);
  };
  const meta = (attribute: 'name' | 'property', key: string, content: string) => {
    upsert(`meta[${attribute}="${key}"]`, 'meta', { [attribute]: key, content });
  };

  upsert('title', 'title', {});
  document.title = page.title;
  upsert('link[rel="canonical"]', 'link', { rel: 'canonical', href: url });
  meta('name', 'description', page.description);
  meta('name', 'robots', 'index, follow, max-image-preview:large');
  if (page.keywords) meta('name', 'keywords', page.keywords);
  else document.head.querySelectorAll('meta[name="keywords"]').forEach(element => element.remove());
  for (const [key, content] of Object.entries({ title: page.title, description: page.description, url, image, type: 'website', locale: 'ru_KZ', site_name: 'GreatSteve' })) {
    meta('property', `og:${key}`, content);
  }
  for (const [key, content] of Object.entries({ card: 'summary_large_image', title: page.title, description: page.description, image })) {
    meta('name', `twitter:${key}`, content);
  }

  document.head.querySelectorAll('script[data-seo-page]').forEach(element => element.remove());
  const schemas = page.schema ? (Array.isArray(page.schema) ? page.schema : [page.schema]) : [];
  for (const schema of schemas) {
    const element = document.createElement('script');
    element.type = 'application/ld+json';
    element.setAttribute('data-seo-page', page.canonical);
    element.textContent = JSON.stringify(schema);
    document.head.appendChild(element);
  }
}
