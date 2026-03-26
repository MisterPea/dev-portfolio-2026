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
      {/* Keep the transition scoped to page content so the header/footer read as a stable shell. */}
      <main className="site-main" style={{ viewTransitionName: "site-main" }}>
        {children}
      </main>
      <Footer text={site.footerText} />
    </div>
  );
}
