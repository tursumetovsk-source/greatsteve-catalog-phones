import { useLayoutEffect } from 'react';
import { updatePageMetadata } from '../lib/pageMetadata';

interface SEOHeadProps {
  title: string;
  description: string;
  canonical: string;
  keywords?: string;
  ogImage?: string;
  schema?: object | object[];
}

export default function SEOHead({
  title,
  description,
  canonical,
  keywords,
  ogImage = '/main/gs-main1.jpeg',
  schema,
}: SEOHeadProps) {
  useLayoutEffect(() => {
    updatePageMetadata(document, { title, description, canonical, keywords, ogImage, schema });
  }, [title, description, canonical, keywords, ogImage, schema]);

  return null;
}
