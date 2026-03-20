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
      {/* <section className="page-intro">
        <h1 className="display-title">Building software with a designer's eye for rhythm, detail, and systems.</h1>
        <p className="intro-copy">
          I work across product thinking, front-end craft, and full-stack implementation.
          This version of the site moves page content back into TSX so the design can use
          <a className="inline-link" href="/projects/portfolio-engine/"> links</a>,
          <span className="underline-copy"> underlined emphasis</span>, and custom compositions
          without forcing everything through a rigid JSON schema.
        </p>
      </section> */}

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
          <a className="landing-content-anchor" href="#">
            <p>I'm currently reading <span className="underline-text">Designing Data-Intensive Applications</span>, 2nd Edition by Martin Kleppmann, Chris Riccomini</p>
          </a>
          <SectionSpacer sectionTitle="Colophon" isLandingPage />
          <p className="landing-content-paragraph">
            Site hand-coded using .tsx as a templating language, CSS/SCSS for styling, vanilla TypeScript for interactions, and 11ty to pull it all together. Typography is set in the <a href="https://vercel.com/font" target="_blank">Geist typeface</a>. Check out the <a href="#">repo for this site</a>.
          </p>
          <SectionSpacer sectionTitle="Contact" isLandingPage />
          <a className="landing-content-anchor outbound-link" href="#"><p><span className="underline-text">GitHub</span></p></a>
          <a className="landing-content-anchor outbound-link" href="#"><p><span className="underline-text">CodePen</span></p></a>
          <a className="landing-content-anchor outbound-link" href="#"><p><span className="underline-text">LinkedIn</span></p></a>
          <a className="landing-content-anchor outbound-link" href="#"><p><span className="underline-text">Email</span></p></a>
        </article>
      </section>
    </SiteLayout>
  );
}

export const render = HomePage;
