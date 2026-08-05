/** The live deployment. Set NEXT_PUBLIC_SITE_URL to override on a custom domain. */
const PRODUCTION_URL = 'https://shashank-portfolio-snowy.vercel.app';

/**
 * Absolute base URL for metadata, OG images, sitemap and robots.
 *
 * Deliberately does not fall back to VERCEL_URL: that's the per-deployment
 * hostname, so preview builds would advertise OG images and canonical URLs
 * pointing at a throwaway domain instead of production.
 */
export function siteUrl(): URL {
  return new URL(process.env.NEXT_PUBLIC_SITE_URL ?? PRODUCTION_URL);
}

export const SITE_NAME = 'Shashank Chakraborty';
export const SITE_TAGLINE = 'Backend Developer';
