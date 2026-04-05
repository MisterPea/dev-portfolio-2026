import Icon from "../components/Icon.tsx";
import ListItemBlock from "../components/ListItem.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import SectionSpacer from "../components/SectionSpacer.tsx";
import SiteLayout from "../components/SiteLayout.tsx";
import type { SiteData } from "../types/site.ts";

export const data = {
  title: "sqlite-worker",
  description:
    "Project page for a SQLite+Worker. A concurrency-safe boundary implementing better-sqlite3, safely isolating database operations to a background thread in Node.js applications.",
};

type SchwabNodeProps = {
  site: SiteData;
};

export function SecInsidersPage({ site }: SchwabNodeProps) {
  return (
    <SiteLayout site={site} currentPath="/schwab-node/">
      <ProjectHeader
        title="sqlite-worker"
        description={
          <>Sqlite-worker is a concurrency-safe wrapper implementing better-sqlite3, which safely isolates database operations to a background thread in Node.js applications.<span className="blank-divider"></span>
            This package grew out of a data-ingestion/processing pipeline where SQLite was serving as both a durable queue and data store. Instead of allowing each read/write module to interact with the database directly, I wanted a single persistence boundary that was predictable under concurrent workloads and easy to reuse across projects.</>
        }
        metaItems={[
          { label: "Status", value: "Active development" },
          { label: "Stack", value: "TypeScript • Node.js • Better-SQLite3" },
        ]}
        links={[
          {
            href: "https://github.com/MisterPea/sqlite-worker-db",
            label: "GitHub",
            icon: <Icon.github />,
          },
          {
            href: "https://www.npmjs.com/package/@misterpea/sqlite-worker-db",
            label: "NPM",
            icon: <Icon.npm />,
          },
        ]}
      />

      <SectionSpacer sectionTitle="Overview" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            SQLite is often a good fit for local-first tools, data pipelines, and small system services,
            but usage can become complicated as projects grow, particularly around threading
            and asynchronous processing. sqlite-worker helps to simplify this by creating a
            single boundary for database operations. This allows application code to treat
            persistence as a service, rather than as a shared mutable state.
          </p>
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="System Outline" >
        <div className="project-section-wrapper">
          <ListItemBlock
            elements={[
              <>User provides path to schema and database</>,
              <>Worker owns SQLite connection</>,
              <>Operations are managed in one location</>,
              <>Main app sends requests to the worker — queuing is handled internally by the worker</>,
              <>Response comes back through defined interfaces</>,
            ]}
          />
          <div className="svg-chart" role="img" aria-label="sqlite-worker system flow diagram">
            <Icon.sqliteFlow />
          </div>
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Key Technical Decisions" >
        <div className="project-section-wrapper">
          <ListItemBlock
            title="Dedicated worker ownership of the SQLite connection"
            elements={[
              <>Isolated database ownership allows operations to be independent of the main thread.</>,
            ]}
          />
          <ListItemBlock
            title="Message-based operation"
            elements={[
              <>Message passing creates a cleaner communication surface rather than a direct, scattered database access.</>,
              <>Using worker-messages takes advantage of the internal message queue (event loop) that exists inside of the worker. Therefore, we have no need to build an explicit message queue for database events.</>,
            ]}
          />
          <ListItemBlock
            title="Reusability across multiple projects"
            elements={[
              <>Originally wanting a no-nonsense durable queue, I found myself using SQLite in ever-widening contexts. As usage expanded, the need for a thread-safe local database option emerged — and the package grew from there.</>,
            ]}
          />
        </div>
      </SectionSpacer>
    </SiteLayout >
  );
}

export const render = SecInsidersPage;
