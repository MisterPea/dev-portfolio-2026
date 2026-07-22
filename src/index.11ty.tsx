import SectionSpacer from "./components/SectionSpacer.tsx";
import SiteLayout from "./components/SiteLayout.tsx";
import type { SiteData } from "./types/site.ts";

export const data = {
  title: "Home",
  description: "Engineering portfolio of Perry Angelora. Building systems for data ingestion, financial APIs, and developer tooling — with an emphasis on user-centric, reusable design and clean architecture",
};

type HomePageProps = {
  site: SiteData;
};

export function HomePage({ site }: HomePageProps) {
  return (
    <SiteLayout site={site} currentPath="/">
      <section className="content-grid">
        <article className="content-panel">

          <SectionSpacer sectionTitle="Selected Systems" isLandingPage >
            <a className="landing-content" href="/hoop-state-gameflows">
              <p><span className="underline-text">Hoop State Gameflows</span>: A visual, stats-first look at NBA games; their lineup rotations, score-margin trends, shot charts and more.</p>
            </a>
            <a className="landing-content" href="/sec-insider-cluster">
              <p><span className="underline-text">SEC Insider Trade Clusters</span>: Automated pipeline for detecting clusters of insider sales and purchases from SEC Form 4 filings.</p>
            </a>
            <a className="landing-content" href="/word-salad-sifter">
              <p><span className="underline-text">Word Salad Sifter</span>: AI-assisted system for extracting structured information from job postings.</p>
            </a>
          </SectionSpacer>
          <SectionSpacer sectionTitle="Tools" isLandingPage >
            <a className="landing-content" href="/sqlite-worker">
              <p><span className="underline-text">sqlite-worker</span>: A concurrency-safe wrapper around better-sqlite3, isolating database operations to a background thread for Node.js applications.</p>
            </a>
            <a className="landing-content" href="/schwab-node">
              <p><span className="underline-text">schwab-node</span>: Unofficial TypeScript/Node.js SDK for authenticated market data and streaming data via the Charles Schwab API.</p>
            </a>
          </SectionSpacer>
          <SectionSpacer sectionTitle="Listening/Reading" isLandingPage >
            <div
              className="spotify-data landing-content"
              aria-atomic="true"
              aria-live="polite"
            ></div>
            <span className="landing-content">
              <p>I'm currently reading <a href="https://academic.oup.com/book/52292" rel="noreferrer" target="_blank">Trading and Exchanges</a> - <i>Market Microstructure for Practitioners</i>, by Larry Harris</p>
            </span>
          </SectionSpacer>
          <SectionSpacer sectionTitle="Colophon" isLandingPage >
            <p className="landing-content">
              Built with TSX templates, SCSS, vanilla TypeScript, and <a href="https://www.11ty.dev" rel="noreferrer" target="_blank">11ty</a>. Typography in <a href="https://vercel.com/font" rel="noreferrer" target="_blank">Geist</a>. Check out the <a href="https://github.com/MisterPea/dev-portfolio-2026" rel="noreferrer" target="_blank">repo here</a>. Coded by hand; AI used selectively for sanity-checking, test development, and bug hunting. All architecture and final decisions are mine.
            </p>
          </SectionSpacer>
          <SectionSpacer sectionTitle="Links" isLandingPage >
            <a className="landing-content outbound-link" title="View my GitHub" href="https://github.com/MisterPea" rel="noreferrer" target="_blank"><p><span className="underline-text" >GitHub</span></p></a>
            <a className="landing-content outbound-link" title="View my CodePens" href="https://codepen.io/misterpea" rel="noreferrer" target="_blank"><p><span className="underline-text" >CodePen</span></p></a>
            <a className="landing-content outbound-link" title="View my LinkedIn" href="https://www.linkedin.com/in/perry-angelora/" rel="noreferrer" target="_blank"><p><span className="underline-text" >LinkedIn</span></p></a>
            <button
              className="landing-content outbound-email"
              title="Say Hi!"
              type="button"
              aria-label="Compose an email to Perry Angelora"
            ><p><span className="underline-text" >Email</span></p></button>
          </SectionSpacer>
        </article>
      </section>
    </SiteLayout >
  );
}

export const render = HomePage;
