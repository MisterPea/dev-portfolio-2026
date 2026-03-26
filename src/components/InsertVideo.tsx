import embedVideo from "../../utilities/videoProcessor.tsx";
import type { JSX } from "react/jsx-runtime";

type InsertVideoProps = {
  ariaLabel?: string;
  aspectRatio?: string;
  autoPlay?: boolean;
  class?: string;
  className?: string;
  controls?: boolean;
  filename: string;
  loop?: boolean;
  muted?: boolean;
  playsInline?: boolean;
  preload?: "auto" | "metadata" | "none";
};

export default async function InsertVideo({
  ariaLabel,
  aspectRatio,
  autoPlay,
  class: classProp,
  className,
  controls,
  filename,
  loop,
  muted,
  playsInline,
  preload,
}: InsertVideoProps): Promise<JSX.Element> {
  const video = await embedVideo(
    filename,
    className ?? classProp ?? "",
    {
      ariaLabel,
      aspectRatio,
      autoPlay,
      controls,
      loop,
      muted,
      playsInline,
      preload,
    },
  );

  return <div className="video-display">{video}</div>;
}
