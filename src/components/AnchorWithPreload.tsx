import { ReactNode } from "react";

type AnchorWithPreloadProps = {
  href: string;
  title?: string;
  isExternal?: Boolean;
  className?: string;
  preload?: Boolean;
  ariaLabel?: string;
  children: ReactNode;
};

export default function AnchorWithPreload( { href, title, isExternal, className, preload, ariaLabel, children }: AnchorWithPreloadProps ) {

  return (
    <>
      <a
        className={className ? className : undefined}
        href={href}
        title={title ? title : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        data-preload={preload ? "true" : "false"}
        aria-label={ariaLabel ? ariaLabel : undefined}
      >
        {children}
      </a >
    </>
  );
}
