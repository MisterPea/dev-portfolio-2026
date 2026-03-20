import type { SiteNavItem } from "../types/site.ts";

type HeaderProps = {
  siteTitle: string;
  tagline?: string;
  navigation?: SiteNavItem[];
  currentSlug?: string;
};

export default function Header({
  siteTitle,
  tagline,
  navigation = [],
  currentSlug,
}: HeaderProps) {
  return (
    <header className="site-header">
      <div className="site-title-wrap">
        <a className="site-title" href="/">
          {siteTitle}
        </a>
        {tagline ? <p className="site-tagline">{tagline}</p> : null}
      </div>

      {navigation.length > 0 ? (
        <nav aria-label="Primary" className="site-nav-wrap">
          <ul className="site-nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <a
                  className="site-nav-link"
                  aria-current={currentSlug === item.href ? "page" : undefined}
                  href={item.href}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
