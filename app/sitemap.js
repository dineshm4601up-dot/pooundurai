import { navLinks } from '@/lib/site';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.avalpoondurai-periyakandiamman.org';

export default function sitemap() {
  return navLinks.map((link) => ({
    url: `${SITE_URL}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: link.href === '/' ? 1 : 0.7,
  }));
}
