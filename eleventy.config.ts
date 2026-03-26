import "tsx/esm";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { ReactNode } from "react";
import * as sass from "sass";
import { prerenderToNodeStream } from "react-dom/static";
import createResponsiveImages from "./utilities/imageProcessor.tsx";
import embedVideo from "./utilities/videoProcessor.tsx";

const TEMPLATE_FORMATS = ["11ty.jsx", "11ty.ts", "11ty.tsx"];
const SCRIPT_EXTENSIONS = [".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"];
const IMPORT_PATTERN =
  /(?:import|export)\s+(?:type\s+)?(?:[^"'`]*?\s+from\s+)?["']([^"'`]+)["']/g;

function resolveLocalImport(fromFile: string, specifier: string) {
  if (!specifier.startsWith(".")) {
    return;
  }

  const absoluteBasePath = path.resolve(path.dirname(fromFile), specifier);
  const candidates = [
    absoluteBasePath,
    ...SCRIPT_EXTENSIONS.map((extension) => `${absoluteBasePath}${extension}`),
    ...SCRIPT_EXTENSIONS.map((extension) =>
      path.join(absoluteBasePath, `index${extension}`),
    ),
  ];

  return candidates.find((candidate) => fs.existsSync(candidate));
}

function collectTemplateDependencies(
  inputPath: string,
  seen = new Set<string>(),
): string[] {
  const normalizedInputPath = path.normalize(inputPath);

  if (seen.has(normalizedInputPath) || !fs.existsSync(normalizedInputPath)) {
    return [];
  }

  seen.add(normalizedInputPath);

  const fileContents = fs.readFileSync(normalizedInputPath, "utf8");
  const dependencies = new Set<string>();

  for (const match of fileContents.matchAll(IMPORT_PATTERN)) {
    const specifier = match[1];
    const resolvedDependency = resolveLocalImport(normalizedInputPath, specifier);

    if (!resolvedDependency) {
      continue;
    }

    const normalizedDependency = path.normalize(resolvedDependency);
    if (normalizedDependency === normalizedInputPath) {
      continue;
    }

    dependencies.add(normalizedDependency);

    for (const nestedDependency of collectTemplateDependencies(
      normalizedDependency,
      seen,
    )) {
      dependencies.add(nestedDependency);
    }
  }

  return [...dependencies];
}

function collectSassDependencies(compiled: sass.CompileResult) {
  return compiled.loadedUrls
    .filter((loadedUrl) => loadedUrl.protocol === "file:")
    .map((loadedUrl) => path.normalize(fileURLToPath(loadedUrl)));
}

function escapeHtmlAttribute(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

async function renderToStaticMarkupAsync(content: ReactNode) {
  const { prelude } = await prerenderToNodeStream(content);
  let html = "";

  for await (const chunk of prelude) {
    html += chunk.toString();
  }

  return html;
}

const colorSchemeBootstrapScript = `
(() => {
  const storageKey = "color-scheme";

  try {
    const storedPreference = window.localStorage.getItem(storageKey);

    if (storedPreference === "light" || storedPreference === "dark") {
      document.documentElement.dataset.colorScheme = storedPreference;
      return;
    }
  } catch (_error) {
    // Ignore storage access issues and fall back to the system preference.
  }

  document.documentElement.removeAttribute("data-color-scheme");
})();
`.trim();

// Takes a specified image and converts it to a webp.
export default function (eleventyConfig: any) {
  eleventyConfig.addAsyncShortcode(
    "getImageLinks",
    async function (
      src: string,
      className: string,
      alt: string,
      imageWidth = "100vw",
    ) {
      const imageMarkup = await createResponsiveImages(
        src,
        className,
        alt,
        imageWidth,
      );

      return renderToStaticMarkupAsync(imageMarkup);
    },
  );

  eleventyConfig.addAsyncShortcode(
    "getVideoEmbed",
    async function (
      src: string,
      className = "",
      options = {},
    ) {
      const videoMarkup = await embedVideo(src, className, options);
      return renderToStaticMarkupAsync(videoMarkup);
    },
  );

  eleventyConfig.addTemplateFormats(TEMPLATE_FORMATS);
  eleventyConfig.addExtension(TEMPLATE_FORMATS, {
    key: "11ty.js",
    compile: function (_inputContent: string, inputPath: string) {
      if (inputPath) {
        const dependencies = collectTemplateDependencies(inputPath);

        if (dependencies.length > 0) {
          this.addDependencies(inputPath, dependencies);
        }
      }

      return async function (data: any) {
        const content = await this.defaultRenderer(data);
        const result = await renderToStaticMarkupAsync(content);
        const siteTitle = data.site?.title;
        const seoTitle = data.seo?.title ?? data.title;
        const pageTitle = seoTitle && siteTitle
          ? `${seoTitle} | ${siteTitle}`
          : seoTitle ?? siteTitle ?? "Portfolio";
        const metaDescription =
          data.seo?.description ??
          data.description ??
          data.site?.description;

        return `
        <!DOCTYPE html>
          <html lang="en">
            <head>
              <meta charset="utf-8" />
              <meta name="viewport" content="width=device-width, initial-scale=1" />
              <title>${escapeHtmlAttribute(pageTitle)}</title>
              ${metaDescription ? `<meta name="description" content="${escapeHtmlAttribute(metaDescription)}" />` : ""}
              <script>${colorSchemeBootstrapScript}</script>
              <link rel="preconnect" href="https://fonts.googleapis.com">
              <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
              <link href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap" rel="stylesheet">
              <link rel="stylesheet" href="/style/variables.css" />
              <link rel="stylesheet" href="/style/main.css" />
              <script src="/js/main.js" defer></script>
            </head>
            <body>
              ${result}
            </body>
          </html>
        `;
      };
    },
  });

  eleventyConfig.addTemplateFormats("scss");
  eleventyConfig.addExtension("scss", {
    outputFileExtension: "css",
    compile: function (inputContent: string, inputPath: string) {
      if (inputPath && path.basename(inputPath).startsWith("_")) {
        return;
      }

      const result = inputPath
        ? sass.compile(inputPath, {
          loadPaths: [path.dirname(inputPath)],
        })
        : sass.compileString(inputContent);

      if (inputPath) {
        const dependencies = collectSassDependencies(result).filter(
          (dependency) => dependency !== path.normalize(inputPath),
        );

        if (dependencies.length > 0) {
          this.addDependencies(inputPath, dependencies);
        }
      }

      return async () => result.css;
    },
  });

  eleventyConfig.setServerOptions({
    enabled: true,
    showAllHosts: true,
    showVersion: true,
    domdiff: false,
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
