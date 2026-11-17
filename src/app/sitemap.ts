import type { MetadataRoute } from "next";
import { siteUrl } from "@/config/site";
import { routing } from "@/i18n/routing";
import { localizedPath } from "@/lib/seo";

const pages = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  return pages.flatMap(({ path, priority, changeFrequency }) =>
    routing.locales.map((locale) => ({
      url: `${base}${localizedPath(locale, path)}`,
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${base}${localizedPath(l, path)}`]),
        ),
      },
    })),
  );
}
