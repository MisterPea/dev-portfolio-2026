import SectionSpacer from "./components/SectionSpacer.tsx";
import SiteLayout from "./components/SiteLayout.tsx";
import type { SiteData } from "./types/site.ts";

export const data = {
  title: "Home",
  description: "A design-forward developer portfolio homepage with room for expressive formatting and custom layout.",
};

type HomePageProps = {
  site: SiteData;
};

export function HomePage({ site }: HomePageProps) {
  return (
    <SiteLayout site={site} currentPath="/">
      <section className="content-grid">
        <article className="content-panel">
          <SectionSpacer sectionTitle="Selected Systems" isLandingPage />
          <a className="landing-content-anchor" href="#">
            <p><span className="underline-text">SEC Insider Trading Pipeline</span>: Detecting clusters of insider purchase and Sales from SEC Form 4 filings.</p>
          </a>
          <a className="landing-content-anchor" href="#">
            <p><span className="underline-text">Word Salad Sifter</span>: AI-assisted system for extracting structured information from job postings.</p>
          </a>
          <SectionSpacer sectionTitle="Tools" isLandingPage />
          <a className="landing-content-anchor" href="#">
            <p><span className="underline-text">sqlite-worker</span>: a concurrency-safe boundary implementing better-sqlite3, which  safely isolates database operations to a background thread in Node.js applications.</p>
          </a>
          <a className="landing-content-anchor" href="#">
            <p><span className="underline-text">schwab-node</span>: TypeScript SDK for authenticated market data and live streaming with Schwab APIs.</p>
          </a>
          <SectionSpacer sectionTitle="Listening/Reading" isLandingPage />
          <div className="spotify-data"></div>
          <span className="landing-reading-span">
            <p>I'm currently reading <a href="#" rel="noreferrer" target="_blank">Designing Data-Intensive Applications</a>, 2nd Edition by Martin Kleppmann, Chris Riccomini</p>
          </span>
          <SectionSpacer sectionTitle="Colophon" isLandingPage />
          <p className="landing-content-paragraph">
            Site hand-coded using .tsx as a templating language, CSS/SCSS for styling, vanilla TypeScript for interactions, and <a href="https://www.11ty.dev" rel="noreferrer" target="_blank">11ty</a> to pull it all together. Typography is set in the <a href="https://vercel.com/font" rel="noreferrer" target="_blank">Geist typeface</a>. Check out the <a href="https://github.com/MisterPea/dev-portfolio-2026" rel="noreferrer" target="_blank">repo for this site</a>.
          </p>
          <SectionSpacer sectionTitle="Contact" isLandingPage />
          <a className="landing-content-anchor outbound-link" title="View my GitHub" href="https://github.com/MisterPea" rel="noreferrer" target="_blank"><p><span className="underline-text" >GitHub</span></p></a>
          <a className="landing-content-anchor outbound-link" title="View my CodePens" href="https://codepen.io/misterpea" rel="noreferrer" target="_blank"><p><span className="underline-text" >CodePen</span></p></a>
          <a className="landing-content-anchor outbound-link" title="View my LinkedIn" href="https://www.linkedin.com/in/perry-angelora/" rel="noreferrer" target="_blank"><p><span className="underline-text" >LinkedIn</span></p></a>
          <button className="outbound-email" title="Say Hi!"><p><span className="underline-text" >Email</span></p></button>
        </article>
      </section>
    </SiteLayout>
  );
}

export const render = HomePage;
