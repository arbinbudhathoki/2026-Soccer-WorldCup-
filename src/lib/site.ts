/**
 * Canonical site URL for metadata (Open Graph, sitemap, etc.).
 * On Vercel, `VERCEL_URL` is set automatically; for custom domains, set
 * `NEXT_PUBLIC_SITE_URL` in the project (recommended for stable previews).
 */
export function getSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit?.trim()) {
    return explicit.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}
