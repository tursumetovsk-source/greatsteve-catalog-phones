import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
  schema?: object | object[];
}

/**
 * SEO-компонент. Использует React 19 native head hoisting для
 * <title>, <meta>, <link> — теги автоматически поднимаются в <head>.
 * Schema.org вставляется через useEffect (JSON-LD в <script>).
 */
export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = '/main/gs-main1.jpeg',
  schema,
}: SEOHeadProps) {
  const siteUrl = 'https://greatsteve.kz';
  const url = `${siteUrl}${canonical}`;
  const image = `${siteUrl}${ogImage}`;

  useEffect(() => {
    if (!schema) return;
    const schemas = Array.isArray(schema) ? schema : [schema];
    const elements = schemas.map((s, i) => {
      const el = document.createElement('script');
      el.type = 'application/ld+json';
      el.textContent = JSON.stringify(s);
      el.setAttribute('data-seo-page', `${canonical}-${i}`);
      document.head.appendChild(el);
      return el;
    });
    return () => { elements.forEach(el => el.remove()); };
  }, [canonical, schema]);

  return (
    <>
      {/* Primary */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="ru_KZ" />
      <meta property="og:site_name" content="GreatSteve" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </>
  );
}
