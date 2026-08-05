import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/site-url';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const lastModified = new Date();

  return [
    { url: new URL('/', base).toString(), lastModified, priority: 1 },
    { url: new URL('/analyzer', base).toString(), lastModified, priority: 0.8 },
  ];
}
