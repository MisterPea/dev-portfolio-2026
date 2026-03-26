import Icon from "../components/Icon.tsx";
import ListItemBlock from "../components/ListItem.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import SectionSpacer from "../components/SectionSpacer.tsx";
import SiteLayout from "../components/SiteLayout.tsx";
import type { SiteData } from "../types/site.ts";

export const data = {
  title: "schwab-node",
  description:
    "A project page for a TypeScript SDK for authenticated market data and live streaming with Schwab APIs.",
};

type SchwabNodeProps = {
  site: SiteData;
};

export function SecInsidersPage({ site }: SchwabNodeProps) {
  return (
    <SiteLayout site={site} currentPath="/schwab-node/">
      <ProjectHeader
        title="schwab-node"
        description={<>schwab-node is a Node.js/TypeScript SDK that simplifies access to Charles Schwab's developer APIs.</>}
        metaItems={[
          { label: "Status", value: "Active development" },
          { label: "Stack", value: "TypeScript • Node.js • Zod" },
        ]}
        links={[
          {
            href: "https://github.com/MisterPea/schwab-node",
            label: "GitHub",
            icon: <Icon.github />,
          },
          {
            href: "https://www.npmjs.com/package/@misterpea/schwab-node",
            label: "NPM",
            icon: <Icon.npm />,
          },
        ]}
      />

      <SectionSpacer sectionTitle="Overview" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            This package was designed to reduce the amount of
            brokerage-specific plumbing required before market-data
            applications become useful. Rather than exposing raw API
            mechanics directly, it organizes functionality around practical
            domains such as market data, account access, derivatives, and live
            stream consumption.
          </p>
          <ListItemBlock
            title="This SDK provides:"
            elements={[
              <>OAuth login and token refresh</>,
              <>authenticated request construction</>,
              <>response validation</>,
              <>real-time streaming setup</>,
              <>a set of higher-level helpers for common options workflow</>,
            ]}
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="System Outline" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            This system is organized around three primary services:
          </p>
          <ListItemBlock
            title="1. Authentication"
            elements={[
              <>Primary authentication</>,
              <>Automatic re-authentication</>
            ]}
          />
          <ListItemBlock
            title="2. API Requests"
            elements={[
              <>Account/orders</>,
              <>Historical data</>,
              <>Securities snapshot</>,
              <>Bespoke derivative search</>
            ]}
          />
          <ListItemBlock
            title="3. Streaming"
            elements={[
              <>Simplified connection to Schwab's stream</>,
              <>All outbound traffic is run through ZeroMQ, allowing language-agnostic connections to the data stream</>,
            ]}
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Key Technical Decisions" >
        <div className="project-section-wrapper">
          <ListItemBlock
            title="Centralized Authentication"
            elements={[
              <>With multiple, disparate modules potentially needing authentication, the auth layer exists as a separate broker of authentication, shared among modules while retaining control of its own refresh and initiation logic.</>,
            ]}
          />
          <ListItemBlock
            title="Centralized Request Logic"
            elements={[
              <>Schwab-node utilizes a centralized request pattern so ownership of request and auth resides in one place (and not spread about the package), and the API logic doesn't need to integrate any authentication.</>,
              <>This centralized configuration also allows us to implement a rate-limited queue so as not to run afoul of Schwab's rate limits.</>,
            ]}
          />
          <div className="svg-chart" role="img" aria-label="schwab-node request and authentication flow diagram">
            <Icon.schwabFlowchart />
          </div>
          <ListItemBlock
            title="Zod-backed request and response validation"
            elements={[
              <>Because input and output integrity is critical for financial data, Zod provides a runtime trust boundary for both.</>,
            ]}
          />
          <ListItemBlock
            title="Websocket → ZeroMQ"
            elements={[
              <>The Schwab stream's surface is designed so the user never interacts with the WebSocket directly. The SDK provides simplified (but not simple) interactions with the stream.</>,
              <>With ZeroMQ, we can have a single upstream connection and many local consumers.</>,
              <>ZeroMQ is language agnostic—you can consume the stream with interfaces written in a number of languages.</>,
            ]}
          />
          <div className="svg-chart" role="img" aria-label="schwab-node streaming and ZeroMQ flow diagram">
            <Icon.schwabFlowchartTwo />
          </div>
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Current public surface" >
        <div className="project-section-wrapper">
          <ListItemBlock
            title="Account"
            elements={[
              <>getAccounts</>,
              <>getAccountNumbers</>,
              <>getUserPreference</>,
            ]}
          />
          <ListItemBlock
            title="Market Data"
            elements={[
              <>getQuote</>,
              <>getPriceHistory</>,
              <>getMovers</>,
              <>getMarketHours</>,
            ]}
          />
          <ListItemBlock
            title="Derivatives"
            elements={[
              <>getOptionChain</>,
              <>getOptionExpirations</>,
              <>getAtmOptionData</>,
              <>greekFilter</>,
            ]}
          />
          <ListItemBlock
            title="Streaming"
            elements={[
              <>SchwabStreamer</>,
              <>order book / chart / screener / account activity streams</>,
              <>ZeroMQ publisher/subscriber helpers</>,
            ]}
          />
        </div>
      </SectionSpacer>
    </SiteLayout >
  );
}

export const render = SecInsidersPage;
