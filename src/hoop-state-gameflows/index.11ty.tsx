import Icon from "../components/Icon.tsx";
import InsertImage from "../components/InsertImage.tsx";
import ListItemBlock from "../components/ListItem.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import SectionSpacer from "../components/SectionSpacer.tsx";
import SiteLayout from "../components/SiteLayout.tsx";
import type { SiteData } from "../types/site.ts";

export const data = {
  title: "Hoop State Gameflows",
  description:
    "Project page for SEC Insider Trade Clusters - an automated SEC Form 4 pipeline that ingests filings, parses transaction-level rows, and detects insider trading clusters.",
};

type SecInsidersPageProps = {
  site: SiteData;
};

export function SecInsidersPage( { site }: SecInsidersPageProps ) {
  return (
    <SiteLayout site={site} currentPath="/hoop-state-gameflows/">
      <ProjectHeader
        title="Hoop State Gameflows"
        description={<>Hoop State Gameflows is a data-gathering and presentation framework that turns NBA game data into visual, contextual breakdowns — lineup rotations, score-margin trends, shot charts, and full box scores.</>}
        metaItems={[
          { label: "Status", value: "Active development" },
          { label: "Stack", value: "Next.js • TypeScript • SCSS • Node.js • SQLite" },
        ]}
        links={[
          {
            href: "https://hoopstate.net",
            label: "Website",
            icon: <Icon.linkage />,
          },
          {
            href: "https://storybook.hoopstate.net",
            label: "Storybook",
            icon: <Icon.storybook />,
          },
          {
            href: "https://github.com/MisterPea/hoop-state-gameflows",
            label: "GitHub",
            icon: <Icon.github />,
          },
        ]}
      />

      <SectionSpacer sectionTitle="The Idea" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            For years I've been a fan of the NBA stats site <a href="https://popcornmachine.net/?dr=202601" rel="noreferrer" target="_blank">
              <span className="underline-text">popcornmachine.net</span>
            </a> — a project that, remarkably, dates back to 2003 and quietly built one of the longest-running, free game-level stat viewers on the web. (Its name comes from a quip by legendary Lakers announcer Chick Hearn: "He put him in the popcorn machine...he's got salt and butter all over him.") After the site went quiet at the beginning of 2026 — and after waiting a few months in hopes it would return — I decided to build a modern take on the idea it championed: a visual, stats-first look at NBA games.
          </p>

        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="System Outline" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            The site is constructed in three parts: the Ingest Layer, the Presentation Layer, and the Orchestration Layer.
          </p>
          <ListItemBlock
            title="Ingest Layer"
            elements={[
              <>The presentation layer is designed to be cleanly minimal, easy to browse and compare, and fast.</>,
              <>Each game is pre-rendered into its own lightweight (~700KB) static webpage, eliminating API fetches and hydration lag while maximizing page-load speed and browser caching.</>,
            ]}
          />
          <ListItemBlock
            title="Presentation Layer"
            elements={[
              <>The presentation layer is designed to be cleanly minimal, easy to browse and compare, and fast.</>,
              <>Each game is pre-rendered into its own lightweight (~700KB) static webpage, eliminating API fetches and hydration lag while maximizing page-load speed and browser caching.</>,
              <>Chart components (bar chart, game-flow, shot chart) were built and tested in isolation via <a href="https://storybook.hoopstate.net" rel="noreferrer" target="_blank"><span className="underline-text">Storybook.js</span></a> before being wired into the static page templates.</>,
            ]}
          />
          <ListItemBlock
            title="Orchestration Layer"
            elements={[
              <>Using a persistent macOS LaunchAgent, scripts are automatically executed every morning to poll the latest game data, build the game pages, test the build, and deploy the update.</>,
            ]}
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Key Decisions" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            The volume of data I process is staggering. For each season there are approximately 600,000 rows of data, with as many as 32 factors per row. That scale creates a few key decisions.
          </p>
          <div className="project-text-block">
            <h3 className="underline-text">Balancing site speed and page weight</h3>
            <p className="project-text-single">Instead of keeping a live SQLite database to hydrate pages at browse-time, I opted to pre-build pages. This eliminates the need for a Node.js server to operate the site and database, so I'm able to run a simple static website on S3 (and CloudFront).</p>
            <div className="blank-divider" aria-hidden="true" ></div>
            <h3 className="underline-text">Presenting the data clearly without overwhelming the user</h3>
            <p className="project-text-single">With the amount and granularity of data I have, it's important to make every piece of it as useful as possible — opting for a comparison-based narrative that frames the adversarial nature of inter-team competition.</p>
            <p className="project-text-single">Instead of treating each filing as a single event, the system splits each filing into transaction-level rows. This allows downstream analysis to focus on the individual aspects of the transaction.</p>

            <div className="blank-divider" aria-hidden="true" ></div>
            <InsertImage
              filename="hoopStateBars.png"
              class="project-content"
              alt="Bar chart example from a hard-fought win by the New York against Philadelphia"
            />
            <p className="project-text-single image-caption">Bar charts to explain raw, numeric comparisons.</p>
          </div>

          <div className="blank-divider" aria-hidden="true" ></div>

          <div className="project-text-block">
            <InsertImage
              filename="hoopStateScoreMargin.png"
              class="project-content"
              alt="A score margin chart from a New York, Philadelphia game, showing several lead changes"
            />
            <p className="project-text-single image-caption">A time-based score-margin chart paired with lineup plus/minus, to explain the push and pull of intra-game battles.</p>
          </div>

          <div className="blank-divider" aria-hidden="true" ></div>

          <div className="project-text-block">
            <InsertImage
              filename="hoopStateShotChart.png"
              class="project-content"
              alt="Image of the shot charts from the Knicks win over the 76ers"
            />
            <p className="project-text-single image-caption">Shot charts that give a visual representation of a court and where shots were made or missed, with the ability to filter shots by distance.</p>
          </div>

        </div>
      </SectionSpacer>
    </SiteLayout >
  );
}

export const render = SecInsidersPage;
