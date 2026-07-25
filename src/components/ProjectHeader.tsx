import type { ReactNode } from "react";
import AnchorWithPreload from "./AnchorWithPreload";

type ProjectHeaderLink = {
  href: string;
  label: string;
  icon: ReactNode;
};

type ProjectHeaderMetaItem = {
  label: string;
  value: string;
};

type ProjectHeaderProps = {
  title: string;
  description: ReactNode;
  metaItems: ProjectHeaderMetaItem[];
  links: ProjectHeaderLink[];
  children?: ReactNode;
};

export default function ProjectHeader( {
  title,
  description,
  metaItems,
  links,
  children
}: ProjectHeaderProps ) {
  return (
    <header className="project-header">
      <h2 className="project-header--title">{title}</h2>
      <div className="project-header--links">
        {links.map( ( link ) => (
          <AnchorWithPreload
            key={link.href}
            href={link.href}
            isExternal
            preload
            aria-label={`${link.label} (opens in a new tab)`}
          >
            <span aria-hidden="true">{link.icon}</span>
            <p>{link.label}</p>
          </AnchorWithPreload>
        ) )}
      </div>
      <p className="project-header--copy">{description}</p>
      <ul className="project-header--meta">
        {metaItems.map( ( item ) => (
          <li key={item.label}>
            <span className="underline-text">{item.label}</span>: {item.value}
          </li>
        ) )}
      </ul>
      {children && <>{children}</>}
    </header>
  );
}
