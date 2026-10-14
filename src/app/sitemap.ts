import type { MetadataRoute } from "next";
import { INGREDIENTS } from "@/lib/data";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: SITE_URL, changeFrequency: "monthly", priority: 1 },
    ...Object.keys(INGREDIENTS).map((id) => ({
      url: `${SITE_URL}/ingredient/${id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
