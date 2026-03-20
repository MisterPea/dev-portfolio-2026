import type { ReactNode } from "react";

import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import type { SiteData } from "../types/site.ts";

type SiteLayoutProps = {
  site: SiteData;
  currentPath: string;
  children: ReactNode;
};

export default function SiteLayout({
  site,
  currentPath,
  children,
}: SiteLayoutProps) {
  return (
    <div className="__main">
      <Header
        siteTitle={site.title}
        tagline={site.tagline}
        navigation={site.navigation}
        currentSlug={currentPath}
      />
      <main className="site-main">{children}</main>
      <Footer text={site.footerText} />
    </div>
  );
}
