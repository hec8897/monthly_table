// Vercel injects VERCEL_PROJECT_PRODUCTION_URL; override with NEXT_PUBLIC_SITE_URL once a custom domain exists.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const SITE_NAME = "제철밥상";
