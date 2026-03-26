import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import sharp from "sharp";
import type { JSX } from "react/jsx-runtime";

const RAW_IMAGES_DIR = path.resolve("raw_images");
const OUTPUT_DIR = path.resolve("dist/assets/images");
const OUTPUT_URL_BASE = "/assets/images";

const RESPONSIVE_WIDTHS = [640, 960, 1280, 1920];

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

type GeneratedImage = {
  aspectRatio: string;
  fallbackSrc: string;
  height: number;
  srcSet: string;
  width: number;
};

/**
 * Generates responsive .webp assets from `./raw_images` and returns image markup.
 *
 * @param imagePath Image filename relative to `./raw_images`
 * @param className Optional class names appended to the wrapper element
 * @param alt Alternate image text
 * @param imageWidth CSS `sizes` value, defaults to `100vw`
 */
export default async function createResponsiveImages(
  imagePath: string,
  className = "",
  alt = "",
  imageWidth = "100vw",
): Promise<JSX.Element> {
  const image = await generateResponsiveImages(imagePath);

  return (
    <figure
      className={`img-main${className ? ` ${className}` : ""}`}
      style={{ "--image-aspect-ratio": image.aspectRatio } as CSSProperties}
    >
      <div className="img-placeholder" aria-hidden="true" />
      <picture className="img-picture">
        <source type="image/webp" srcSet={image.srcSet} sizes={imageWidth} />
        <img
          className="img-tag"
          src={image.fallbackSrc}
          srcSet={image.srcSet}
          sizes={imageWidth}
          alt={alt}
          width={image.width}
          height={image.height}
          loading="lazy"
          decoding="async"
        />
      </picture>
    </figure>
  );
}

async function generateResponsiveImages(imagePath: string): Promise<GeneratedImage> {
  ensureOutputDir();

  const inputPath = path.join(RAW_IMAGES_DIR, imagePath);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Image not found: ${inputPath}`);
  }

  const filename = path.parse(imagePath).name;
  const image = sharp(inputPath, { failOn: "warning" });
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error(`Could not determine image dimensions for ${imagePath}`);
  }

  const originalWidth = metadata.width;
  const originalHeight = metadata.height;
  const targetWidths = [...new Set(
    RESPONSIVE_WIDTHS
      .map((width) => Math.min(width, originalWidth))
      .filter((width) => width > 0),
  )].sort((left, right) => left - right);

  const outputSources = await Promise.all(
    targetWidths.map(async (width) => {
      const outputFilename = `${filename}-${width}w.webp`;
      const outputPath = path.join(OUTPUT_DIR, outputFilename);

      if (!fs.existsSync(outputPath)) {
        await sharp(inputPath)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 82 })
          .toFile(outputPath);
      }

      return `${OUTPUT_URL_BASE}/${outputFilename} ${width}w`;
    }),
  );

  const largestWidth = targetWidths[targetWidths.length - 1];

  return {
    aspectRatio: `${originalWidth} / ${originalHeight}`,
    fallbackSrc: `${OUTPUT_URL_BASE}/${filename}-${largestWidth}w.webp`,
    height: originalHeight,
    srcSet: outputSources.join(", "),
    width: originalWidth,
  };
}
