export type SiteNavItem = {
  label: string;
  href: string;
};

export type SiteData = {
  title: string;
  description?: string;
  tagline?: string;
  footerText?: string;
  navigation?: SiteNavItem[];
};
