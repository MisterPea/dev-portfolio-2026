import type { ReactNode } from "react";

interface ListItemProps {
  title?: string;
  elements: ReactNode[];
  underlineTitle?: boolean;
  removeBullets?: boolean;
}
export default function ListItemBlock({
  title,
  elements,
  underlineTitle = false,
  removeBullets = false
}: ListItemProps) {
  return (
    <div className="list-item-block">
      {title && <h3 className={`list-item-block-title${underlineTitle ? '--underline' : ''}`}>{title}</h3>}
      <ul className={removeBullets ? "remove-bullets" : "keep-bullets"}>{elements.map((element, index) => (
        <li key={index}>{element}</li>
      ))}</ul>
    </div>
  );
}
