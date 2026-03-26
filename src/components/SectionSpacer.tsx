import { ReactNode } from "react";

export default function SectionSpacer({ sectionTitle, isLandingPage = false, children }: { sectionTitle: string, isLandingPage?: boolean, children: ReactNode; }) {
  const convertToClassName = () => sectionTitle.replace(' ', '-').replace('/', '-').toLowerCase();
  return (
    <section className={`${convertToClassName()}-section section-divider`}>
      <h2 className={`section-spacer${isLandingPage ? ' landing' : ''}`}>{sectionTitle}</h2>
      <>{children}</>
    </section >
  );
}