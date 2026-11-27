import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [{ url: siteConfig.url, changeFrequency: "monthly", priority: 1 }];
  if (siteConfig.resume) {
    entries.push({ url: `${siteConfig.url}${siteConfig.resume}`, changeFrequency: "monthly", priority: 0.6 });
  }
  return entries;
}
