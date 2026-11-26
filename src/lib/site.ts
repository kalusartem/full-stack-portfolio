// Public site config. Contact links render only when the matching env var is set.

/**
 * The public origin for canonical URLs, Open Graph tags, JSON-LD and the sitemap. Required in production builds
 * (scripts/build-pages.sh sets it) so they can never ship pointing at localhost; `next dev` and tests fall back.
 */
function siteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (url) return url.replace(/\/$/, "");
  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL is not set. Set it for production builds (see scripts/build-pages.sh).");
  }
  return "http://localhost:3000";
}

export const site = {
  name: "Artem Kalus",
  title: "Artem Kalus | Full-Stack Developer",
  description:
    "Full-stack developer building fast, polished web apps and AI automation with Next.js, TypeScript, and Supabase. Browse selected projects and get in touch.",
  url: siteUrl(),
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};

// Max projects the admin can pin to the home page (enforced in the admin API).
export const HOME_PROJECT_LIMIT = 3;
