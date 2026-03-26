import fs from "node:fs";
import path from "node:path";
import type { CSSProperties } from "react";
import type { JSX } from "react/jsx-runtime";

const RAW_VIDEOS_DIR = path.resolve("raw_videos");
const OUTPUT_DIR = path.resolve("dist/assets/videos");
const OUTPUT_URL_BASE = "/assets/videos";
const DEFAULT_VIDEO_ASPECT_RATIO = "16 / 9";

type VideoOptions = {
  aspectRatio?: string;
  autoPlay?: boolean;
  controls?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
};

type PreparedVideo = {
  mimeType: string;
  outputUrl: string;
};

function ensureOutputDir() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }
}

function getMimeType(videoPath: string) {
  const extension = path.extname(videoPath).toLowerCase();

  if (extension === ".webm") {
    return "video/webm";
  }

  if (extension === ".ogg" || extension === ".ogv") {
    return "video/ogg";
  }

  return "video/mp4";
}

async function copyVideoToOutput(videoPath: string): Promise<PreparedVideo> {
  ensureOutputDir();

  const inputPath = path.join(RAW_VIDEOS_DIR, videoPath);
  const outputPath = path.join(OUTPUT_DIR, videoPath);

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Video not found: ${inputPath}`);
  }

  const outputFolder = path.dirname(outputPath);
  if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder, { recursive: true });
  }

  const shouldCopy = !fs.existsSync(outputPath)
    || fs.statSync(inputPath).mtimeMs > fs.statSync(outputPath).mtimeMs;

  if (shouldCopy) {
    await fs.promises.copyFile(inputPath, outputPath);
  }

  return {
    mimeType: getMimeType(videoPath),
    outputUrl: `${OUTPUT_URL_BASE}/${videoPath}`,
  };
}

/**
 * Copies a source video from `./raw_videos` into the build output and returns video markup.
 */
export default async function embedVideo(
  videoPath: string,
  className = "",
  options: VideoOptions = {},
): Promise<JSX.Element> {
  const preparedVideo = await copyVideoToOutput(videoPath);
  const {
    aspectRatio = DEFAULT_VIDEO_ASPECT_RATIO,
    autoPlay = true,
    controls = false,
    loop = true,
    muted = true,
    playsInline = true,
    preload = "metadata",
  } = options;

  return (
    <figure
      className={`project-video${className ? ` ${className}` : ""}`}
      style={{ "--video-aspect-ratio": aspectRatio } as CSSProperties}
    >
      <div className="video-placeholder" aria-hidden="true" />
      <video
        autoPlay={autoPlay}
        controls={controls}
        loop={loop}
        muted={muted}
        playsInline={playsInline}
        preload={preload}
      >
        <source src={preparedVideo.outputUrl} type={preparedVideo.mimeType} />
      </video>
    </figure>
  );
}
