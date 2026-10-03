// Public site config. Contact links render only when the matching env var is set.
export const site = {
  name: "Artem Kalus",
  title: "Artem Kalus | Full-Stack Developer",
  description:
    "Full-stack developer building fast, polished web apps and AI automation with Next.js, TypeScript, and Supabase.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  github: process.env.NEXT_PUBLIC_GITHUB_URL,
  linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL,
};
