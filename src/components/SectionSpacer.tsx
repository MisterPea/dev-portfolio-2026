export default function SectionSpacer({ sectionTitle, isLandingPage = false }: { sectionTitle: string, isLandingPage?: boolean; }) {
  return (
    <h2 className={`section-spacer${isLandingPage ? ' landing' : ''}`}>{sectionTitle}</h2>
  );
}