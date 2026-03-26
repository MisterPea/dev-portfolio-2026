import type { SiteData } from "./types/site.ts";

export const data = {
  permalink: "/robots.txt",
  eleventyExcludeFromCollections: true,
};

type RobotsPageData = {
  site: SiteData;
};

export function render({ site }: RobotsPageData) {
  return `User-agent: *
Allow: /

Sitemap: ${site.url}/sitemap.xml
`;
}
