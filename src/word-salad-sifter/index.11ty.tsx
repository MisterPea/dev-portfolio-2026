import Icon from "../components/Icon.tsx";
import InsertImage from "../components/InsertImage.tsx";
import InsertVideo from "../components/InsertVideo.tsx";
import ListItemBlock from "../components/ListItem.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import SectionSpacer from "../components/SectionSpacer.tsx";
import SiteLayout from "../components/SiteLayout.tsx";
import type { SiteData } from "../types/site.ts";

export const data = {
  title: "Word Salad Sifter",
  description:
    "A project page for an AI-assisted system for extracting structured information from job postings.",
};

type SchwabNodeProps = {
  site: SiteData;
};

export function SecInsidersPage({ site }: SchwabNodeProps) {
  return (
    <SiteLayout site={site} currentPath="/schwab-node/">
      <ProjectHeader
        title="Word Salad Sifter"
        description={<>A Chrome Extension integrating Google Docs and Anthropic's API to capture highlighted, job-listing text and transform it into structured information, which is then stored in a user's Google Docs. The system uses Anthropic's API to parse job descriptions and extract key attributes relevant to resume tailoring.</>}
        metaItems={[
          { label: "Status", value: "Active development" },
          { label: "Stack", value: "React • TypeScript • Chrome Extension API • Anthropic API • Google Docs API • Google Drive API" },
        ]}
        links={[
          {
            href: "https://github.com/MisterPea/word-salad-sifter",
            label: "GitHub",
            icon: <Icon.github />,
          },
          {
            href: "https://chromewebstore.google.com/detail/unartful-labs-word-salad/fhfndnjlnahfnnnocegccejjfpigiioo",
            label: "Chrome Store",
            icon: <Icon.linkage />,
          },
        ]}
      />

      <SectionSpacer sectionTitle="Overview" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            Job postings are typically long, loosely structured documents that contain useful signals, filler text, and boilerplate language. For applicants intent on tailoring resumes and cover letters, it's burdensome to identify what information actually matters.
          </p>
          <p className="project-text-single">
            Word Salad Sifter focuses on extracting the useful signals. The extension allows users to highlight a job description directly in the browser and convert it into a structured reference table within a working resume document.
          </p>
          <p className="project-text-single">
            The goal is not to generate application materials automatically, but to provide a structured framework that helps applicants craft their own targeted, human responses (see example below).
          </p>
          <InsertImage
            filename="word_salad_sifter-resume_sample.png"
            class="project-content--image"
            alt="Example output from a parsed job post"
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="System Outline" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            This system connects three primary services:
          </p>
          <ListItemBlock
            title="1. Browser capture"
            elements={[
              <>Captures user-highlighted text from job listings</>,
            ]}
          />
          <ListItemBlock
            title="2. Processing"
            elements={[
              <>Anthropic API parses the job description</>,
              <>Response is normalized into structured schema</>
            ]}
          />
          <InsertVideo
            filename="word_salad_sifter-in_progress.mp4"
            ariaLabel="Screen capture demonstrating Word Salad Sifter parsing a job posting into structured output"
          />
          <ListItemBlock
            title="3. Document Generation"
            elements={[
              <>Google OAuth for user authentication</>,
              <>Google Drive API duplicates the resume document</>,
              <>Google Docs API allows insertion of structured output</>,
            ]}
          />
          <p className="project-text-single">
            The result is a consistent reference table embedded directly in a working resume document.
          </p>
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Architecture" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            Word Salad Sifter consists of three interacting component-layers:
          </p>
          <ListItemBlock
            title="Chrome Extension Layer"
            elements={[
              <>Handles user interaction, text capture, and UI feedback.</>,
              <>Ensures valid API key and login exists.</>
            ]}
          />
          <div className="svg-chart" role="img" aria-label="Word Salad Sifter extension layer architecture diagram">
            <Icon.wordSaladFlowOne />
          </div>
          <p className="project-text-single">
            The extension integrates two external services: Anthropic for text parsing and Google APIs for document creation. The login flow validates the user's API key and establishes a Google OAuth session before any processing is allowed to occur.
          </p>
          <ListItemBlock
            title="Processing Layer"
            elements={[
              <>Anthropic's API interprets the job description and extracts structured attributes such as required skills, experience expectations, and tone indicators.</>
            ]}
          />
          <ListItemBlock
            title="Document Integration Layer"
            elements={[
              <>Google APIs duplicate the user's resume and append structured information into a standardized table.</>
            ]}
          />
          <div className="svg-chart" role="img" aria-label="Word Salad Sifter document integration architecture diagram">
            <Icon.wordSaladFlowTwo />
          </div>
          <p className="project-text-single">
            The parsing process converts raw job posting text into structured data through a multi-stage pipeline.
          </p>
          <ListItemBlock
            title="High-level flow: User highlights job posting"
            elements={[
              <>→ extension captures text</>,
              <>→ text sent to processing API</>,
              <>→ structured response returned</>,
              <>→ Google Docs updated with extracted information</>,
            ]}
            removeBullets
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Key Technical Decisions" >
        <div className="project-section-wrapper">
          <ListItemBlock
            title="Structured extraction instead of document generation"
            elements={[
              <>Rather than using an LLM to generate full resumes or cover letters, the system extracts structured signals from the job posting. This preserves the applicant's voice while still surfacing the most relevant information.</>
            ]}
          />
          <ListItemBlock
            title="Tabular normalization"
            elements={[
              <>Job postings vary widely in structure. A consistent table format makes it easier to compare roles and quickly scan requirements.</>
            ]}
          />
          <ListItemBlock
            title="Each processed job description is converted into a predictable set of attributes:"
            elements={[
              <>Company name and job title</>,
              <>Education requirements</>,
              <>Required software knowledge</>,
              <>Core job themes</>,
              <>Key requirements</>,
              <>Essential soft skills</>,
              <>Prioritized critical skills</>,
              <>Experience requirements</>,
              <>Cultural indicators and tone</>,
              <>Position's unique elements</>,
              <>Critical keywords and phrases</>,
              <>Special application instructions</>,
              <>Source URL</>,
            ]}
          />
          <ListItemBlock
            title="Lightweight browser integration"
            elements={[
              <>A Chrome extension was chosen instead of a standalone application so the system could operate directly on job boards without requiring copy-paste workflows.</>
            ]}
          />
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Platform Considerations" >
        <div className="project-section-wrapper">
          <h3 className="underline-text">Chrome extension architecture</h3>
          <ListItemBlock
            title="Chrome extensions operate across separate execution contexts:"
            elements={[
              <>background service worker</>,
              <>UI surfaces (popups, side panels)</>,
              <>content scripts</>,
            ]}
          />
          <p className="project-text-single">
            Communication between these contexts requires message passing. Temporary state must be explicitly preserved or it will be lost when UI components close.
          </p>
          <p className="project-text-single">
            To handle this, the extension uses Chrome's storage API to maintain session data across contexts.
          </p>
          <h3 className="underline-text">Processing latency</h3>
          <p className="project-text-single">
            LLM processing time varies based on text length and API latency. The extension provides feedback to the user with estimated completion time and processing status.
          </p>
        </div>
      </SectionSpacer>
    </SiteLayout >
  );
}

export const render = SecInsidersPage;
