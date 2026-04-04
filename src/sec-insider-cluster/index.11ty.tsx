import Icon from "../components/Icon.tsx";
import InsertImage from "../components/InsertImage.tsx";
import ListItemBlock from "../components/ListItem.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import SectionSpacer from "../components/SectionSpacer.tsx";
import SiteLayout from "../components/SiteLayout.tsx";
import type { SiteData } from "../types/site.ts";

export const data = {
  title: "SEC Insiders",
  description:
    "A project page for an automated SEC Form 4 pipeline that ingests filings, parses transaction-level rows, and detects insider trading clusters.",
};

type SecInsidersPageProps = {
  site: SiteData;
};

const sampleRows = [
  "accession             cik         is_officer  security_type   security_title                             acquired_disposed  transaction_shares  conversion_exercise_price  is_option_exercise  is_from_exercise  is_exercise_related_sale  underlying_title  underlying_shares  sec_owned_post_trx",
  "--------------------  ----------  ----------  --------------  -----------------------------------------  -----------------  ------------------  -------------------------  ------------------  ----------------  ------------------------  ----------------  -----------------  ------------------",
  "0001127602-25-020266  0000066740  1           derivative      Non-qualified Stock Option (Right to Buy)  D                  6650                130.14                     1                   0                 0                         Common Stock      6650.0             0.0",
  "0001127602-25-020266  0000066740  1           non-derivative  Common Stock                               A                  6650                130.14                     0                   1                 0                                           9065.149",
  "0001127602-25-020266  0000066740  1           non-derivative  Common Stock                               D                  6165                150.1801                   0                   0                 1                                           2900.149",
].join("\n");

export function SecInsidersPage({ site }: SecInsidersPageProps) {
  return (
    <SiteLayout site={site} currentPath="/sec-insider-cluster/">
      <ProjectHeader
        title="SEC Insider Trade Clusters"
        description={<>SEC Insider Trade Clusters is an automated pipeline for detecting clusters of insider buying and selling of securities. The system monitors Form 4 ownership disclosures and converts raw XML into structured transaction-level data. Then, downstream analysis can isolate discretionary activity from routine or preordained trades.</>}
        metaItems={[
          { label: "Status", value: "Active development" },
          { label: "Stack", value: "TypeScript • Node.js • SQLite • SEC EDGAR APIs" },
        ]}
        links={[
          {
            href: "https://github.com/MisterPea/sec-insiders-node",
            label: "GitHub",
            icon: <Icon.github />,
          },
          {
            href: "https://bsky.app/profile/insider-tape.bsky.social",
            label: "live feed (Bluesky)",
            icon: <Icon.linkage />,
          },
        ]}
      />


      <SectionSpacer sectionTitle="System Outline" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            The system is organized as a three-stage pipeline with SQLite acting as both a
            durable queue and storage layer. That gives the project concurrent job processing,
            reliable retry behavior, and an auditable trail back to the original filing.
          </p>
          <div className="line-divider" aria-hidden="true" />
          <ListItemBlock
            title="Ingestion"
            elements={[
              <>Regularly poll for SEC Form 4 submissions.</>,
              <>Enqueue jobs containing CIK, filing URL, and accession number.</>,
            ]}
          />
          <ListItemBlock
            title="Parsing"
            elements={[
              <>Normalize inconsistent XML structures into a stable schema.</>,
              <>Explode each filing into transaction-level rows with ownership metadata.</>,
            ]}
          />
          <ListItemBlock
            title="Analysis"
            elements={[
              <>Detect clusters of coordinated insider buying or selling.</>,
              <>Augment detections with market context and summary output.</>,
            ]}
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Architecture" >
        <div className="project-section-wrapper">
          <div className="svg-chart" role="img" aria-label="SEC Insider Clusters pipeline architecture diagram">
            <h3 className="underline-text">Pipeline Diagram</h3>
            <Icon.secPipeline />
          </div>
          <div className="project-text-block">
            <h3 className="underline-text">Ingestion Layer</h3>
            <ListItemBlock
              title="1. Get data links:"
              elements={[<>Polls the SEC submissions feed via CIK and places the CIK, URL, and accession number into a job queue.</>]}
              removeBullets
            />
            <div className="blank-divider" aria-hidden="true"></div>
            <ListItemBlock
              title="2. Ingest the XML data:"
              elements={[
                <>Via the job_queue Form 4 XML documents are batch downloaded</>,
                <>Note: This queue is a SQLite table which acts as a source for the Worker pool, which processes jobs concurrently while limiting request rates to avoid rate-limit violations.</>
              ]}
              removeBullets
            />

          </div>
          <div className="blank-divider" aria-hidden="true"></div>
          <div className="project-text-block">
            <h3 className="underline-text">Parsing Layer</h3>
            <ListItemBlock
              title="1. Normalize XML filings:"
              elements={[<>XML filings are constructed in disparate ways, under differing schema guidelines. Therefore, the first step is flattening and normalization to allow consistent downstream parsing.</>]}
              removeBullets
            />
            <div className="blank-divider" aria-hidden="true"></div>
            <ListItemBlock
              title="2. Exploding filings into transaction rows:"
              elements={[
                <>A single form may contain several events that may or may not be linked. When we have linked transactions (e.g. an option is exercised), we create a symbolic link called <span className="inline-code">exercise_group_id</span>, which ties the transactions together, even though they live on separate rows.</>,
                <>Each row has metadata such as: issuer CIK, owner name, officer/director/10% owner status, filing date, amendment indicator, 10b5-1 plan flag.</>,
                <>This row-level structure makes downstream filtering and analysis much simpler.</>
              ]}
              removeBullets
            />
          </div>
          <div className="blank-divider" aria-hidden="true"></div>
          <div className="project-text-block">
            <h3 className="underline-text">Analysis Layer - Identify Clusters of Insider Behavior</h3>
            <ListItemBlock
              title="A cluster is generally defined as:"
              elements={[
                <>multiple insiders</>,
                <>at the same company</>,
                <>executing the same transaction type</>,
                <>within a rolling time window</>
              ]}
            />
            <div className="blank-divider" aria-hidden="true"></div>
            <p className="project-text-single">The signal quality is enhanced by additionally filtering the clusters by weighted average price of transactions, in relation to the 20-day and 200-day moving averages. This allows us to gauge commitment more clearly.</p>
            <div className="blank-divider" aria-hidden="true"></div>
            <ListItemBlock
              title="The final output is broadcast as an image-card, which is enriched with:"
              elements={[
                <>time window that the transactions happened</>,
                <>total number of insiders and their titles</>,
                <>total shares traded</>,
                <>total transaction value</>,
                <>weighted average price</>,
                <>relative position to the 20-day and 200-day moving averages</>,
              ]}
            />
          </div>
          <div className="project-content--image-wrap">
            <p className="photo-text" >Image-card for a Purchase Cluster</p>
            <InsertImage
              filename="purchaseActivity.jpeg"
              class="project-content--image"
              alt="Example insider purchase activity image card"
            />
          </div>
          <div className="project-content--image-wrap">
            <p className="photo-text">Image-card for a Sales Cluster</p>
            <InsertImage
              filename="salesActivity.jpeg"
              class="project-content--image"
              alt="Example insider sales activity image card"
            />
          </div>
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Key Technical Decisions" >
        <div className="project-section-wrapper">
          <div className="project-text-block">
            <h3 className="underline-text">Treat Filings as Collections of Events</h3>
            <p className="project-text-single">Form 4 filings often combine different transactions (options exercise, share acquisition, swaps, etc.) within a single filing.</p>
            <div className="blank-divider" aria-hidden="true" ></div>
            <p className="project-text-single">Instead of treating each filing as a single event, the system splits each filing into transaction-level rows. This allows downstream analysis to focus on the individual aspects of the transaction.</p>
            <InsertImage
              filename="formFour.png"
              class="project-content"
              alt="Sample of a Form 4 filing"
            />
          </div>
          <p className="project-text-single">Above, we have single transaction. With our parsing engine we're able to flatten this document into an easy to decipher table (below). In this example we show how derivatives are tied to their non-derivative acquisition via <span className="inline-code">exercise_group_id</span>. In this case, we can also see how this insider immediately sold 93% of the shares acquired from the exercising of their option.</p>
          <pre className="data-sample">{sampleRows}</pre>
          <p className="project-text-single">
            In this example the exercised derivative is tied to the non-derivative acquisition,
            and the follow-on sale remains visible as a separate event rather than being hidden in
            a single filing-level summary.
          </p>

          <div className="project-text-block">
            <h3 className="underline-text">Preserve Amendment History</h3>
            <p className="project-text-single">
              When amendments are encountered, they are treated as explicit, autonomous entries, rather than automatically overwriting the records that the amendment is superseding. This helps to retain an auditable trail.
            </p>
          </div>
          <div className="project-text-block">
            <h3 className="underline-text">Filter Toward Discretionary Activity</h3>
            <p className="project-text-single">Not all insider activity is informative. In the Analysis Layer the system filters out noisy activity that obscures discretionary activity, including:</p>

            <p className="project-text-single">&nbsp; - 10b5-1 planned trades</p>
            <p className="project-text-single">&nbsp; - equity swaps</p>
            <p className="project-text-single">&nbsp; - option exercises</p>
            <p className="project-text-single">&nbsp; - exercise-related sales</p>

            <div className="blank-divider"></div>
            <p className="project-text-single">To enhance this filtering, clusters are then filtered by price context. For example, purchase clusters are only retained when their weighted average buy price is below both the 20-day and 200-day simple moving average.</p>
          </div>
          <div className="project-text-block">
            <h3 className="underline-text">Cluster Tracking</h3>
            <p className="project-text-single">Cluster tracking is a long-running project to track the predictive quality of insider purchase/sales clusters. The <span className="inline-code">cluster_tracking</span> table is recording the initial price, current price, low/high price (since tracking initiated). At the moment, there is no output derived from this data.</p>
          </div>
        </div>
      </SectionSpacer>
    </SiteLayout >
  );
}

export const render = SecInsidersPage;
