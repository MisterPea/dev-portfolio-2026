import createResponsiveImages from "../../utilities/imageProcessor.tsx";
import type { JSX } from "react/jsx-runtime";

const DEFAULT_IMAGE_WIDTH = "(min-width: 680px) 75vw, 100vw";

type InsertImageProps = {
  alt: string;
  class?: string;
  className?: string;
  filename: string;
  imageWidth?: string;
};

export default async function InsertImage({
  alt,
  class: classProp,
  className,
  filename,
  imageWidth = DEFAULT_IMAGE_WIDTH,
}: InsertImageProps): Promise<JSX.Element> {
  const image = await createResponsiveImages(
    filename,
    className ?? classProp ?? "",
    alt,
    imageWidth,
  );

  return <div className="image-display">{image}</div>;
}
