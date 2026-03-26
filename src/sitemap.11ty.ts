import fs from "node:fs";
import type { SiteData } from "./types/site.ts";

export const data = {
  permalink: "/sitemap.xml",
  eleventyExcludeFromCollections: true,
};

type CollectionItem = {
  url?: string;
  outputPath?: string;
  inputPath?: string;
};

type SitemapPageData = {
  collections: {
    all?: CollectionItem[];
  };
  site: SiteData;
};

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function normalizeSiteUrl(url: string) {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function shouldIncludeInSitemap(entry: CollectionItem) {
  if (!entry.url || !entry.outputPath || !entry.outputPath.endsWith(".html")) {
    return false;
  }

  return entry.url !== "/404.html";
}

function getLastModified(inputPath?: string) {
  if (!inputPath) {
    return undefined;
  }

  try {
    return fs.statSync(inputPath).mtime.toISOString();
  } catch {
    return undefined;
  }
}

export function render({ collections, site }: SitemapPageData) {
  const baseUrl = normalizeSiteUrl(site.url);
  const entries = (collections.all ?? [])
    .filter(shouldIncludeInSitemap)
    .map((entry) => {
      const lastmod = getLastModified(entry.inputPath);

      return {
        loc: `${baseUrl}${entry.url}`,
        lastmod,
      };
    })
    .sort((left, right) => left.loc.localeCompare(right.loc));

  const urls = entries.map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>` : "";

    return `  <url>
    <loc>${escapeXml(loc)}</loc>${lastmodTag}
  </url>`;
  }).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
}
