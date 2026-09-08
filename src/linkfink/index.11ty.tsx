import Icon from "../components/Icon.tsx";
import InsertImage from "../components/InsertImage.tsx";
import ListItemBlock from "../components/ListItem.tsx";
import ProjectHeader from "../components/ProjectHeader.tsx";
import SectionSpacer from "../components/SectionSpacer.tsx";
import SiteLayout from "../components/SiteLayout.tsx";
import type { SiteData } from "../types/site.ts";

export const data = {
  title: "Linkfink",
  description:
    "Project page for Linkfink - a modern rebuild of an abandoned Chrome extension-based link extractor. Replete with filtering, bulk-open, and light/dark mode, rewritten from scratch in TypeScript and SCSS",
};

type LinkfinkPageProps = {
  site: SiteData;
};

export function LinkfinkPage( { site }: LinkfinkPageProps ) {
  return (
    <SiteLayout site={site} currentPath="/linkfink/">
      <ProjectHeader
        title="Linkfink"
        description={<>Linkfink is a modern rebuild of an abandoned Chrome extension-based link extractor. Replete with filtering, bulk-open, and light/dark mode, rewritten from scratch in TypeScript and SCSS.</>}
        metaItems={[
          { label: "Status", value: "Active development" },
          { label: "Stack", value: "TypeScript • React • SCSS • esbuild • Chrome Extension APIs" },
        ]}
        links={[
          {
            href: "https://chromewebstore.google.com/detail/linkfink/ebjcigbhaoppaljkbpofjcfeipbnhhpp",
            label: "Chrome Store",
            icon: <Icon.linkage />,
          },
          {
            href: "https://github.com/MisterPea/linkfink",
            label: "GitHub",
            icon: <Icon.github />,
          },
        ]}
      />

      <SectionSpacer sectionTitle="The Idea" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            Linkfink is built off a fork of <a href="https://github.com/7fffffff/linkgrabber" rel="noreferrer" target="_blank">
              <span className="underline-text">Link Grabber</span></a>
            , a Chrome extension originally built by Don Tong. After reaching out to the original author about contributing improvements upstream and being turned down, I decided to continue development independently under a new name, under the terms of the original MIT license. Since then, it has been rebuilt from the ground up.
          </p>
        </div>
      </SectionSpacer>

      <SectionSpacer sectionTitle="Extending and Improving" >
        <div className="project-section-wrapper">
          <p className="project-text-single">
            The bones of the original Link Grabber are solid, well thought out, not overly wrought, but felt like they needed a refresh.
          </p>
          <ListItemBlock
            title="Modifications"
            elements={[
              <>Ported project to TypeScript and SCSS - Unnecessary at this point, but will help for future maintenance </>,
              <>Moved options panel from being a right-menu-click to being a button-click on the main page</>,
              <>Employed a sticky header to keep filtering options in view at all times</>,
              <>Modernized the design with updated typography, palette, and layout — while retaining the spirit of the original <i>Link Grabber</i></>,
            ]}
          />
          <ListItemBlock
            title="Additions"
            elements={[
              <>Extended filtering of links by allowing comma-separated queries and prefix negation by prepending a greater-than "&gt;" sign.</>,
              <>Added ability to block links: of same-origin-subdomains and ones that contain text links.</>,
              <>Supplemented the 'Copy Links to Clipboard' feature with the ability for the user to open found links in new tabs or windows.</>,
              <>Added Dark/Light/Auto color mode.</>,
            ]}
          />
          <div className="blank-divider" aria-hidden="true" ></div>
          <p className="underline-text">Design Changes - Before</p>

          <div className="project-text-block">
            <InsertImage
              filename="linkfinkBefore.png"
              class="project-content"
              alt="Screenshot of the original Link Grabber"
            />
            <p className="project-text-single image-caption">The original (before) <i>Link Grabber</i>, which this project was forked</p>

            <InsertImage
              filename="linkfinkSettingsBefore.png"
              class="project-content"
              alt="Screenshot of the original Link Grabber settings"
            />
            <p className="project-text-single image-caption">The original (before) <i>Link Grabber</i> settings removes the user from the workflow by redirecting to the extension settings page</p>
          </div>
          <div className="blank-divider" aria-hidden="true" ></div>
          <p className="underline-text">Design Changes - After</p>
          <div className="project-text-block">
            <InsertImage
              filename="linkfinkAfterLight.png"
              class="project-content"
              alt="Screenshot of the updated Linkfink"
            />
            <p className="project-text-single image-caption"><i>Linkfink</i> (after), showing updated layout and features (Light Mode)</p>
            <InsertImage
              filename="linkfinkSettingsAfter.png"
              class="project-content"
              alt="Screenshot of the original updated Linkfink"
            />
            <p className="project-text-single image-caption">The <i>Linkfink</i> (after) settings page is a modal that allows the user to make changes without having to navigate away from the page</p>

            <InsertImage
              filename="linkfinkAfterDark.png"
              class="project-content"
              alt="Screenshot of the updated Linkfink"
            />
            <p className="project-text-single image-caption"><i>Linkfink</i> (after), showing updated layout and features (Dark Mode)</p>
          </div>
        </div>
      </SectionSpacer>
      <SectionSpacer
        sectionTitle="How It Works, in a Nutshell"
      >
        <div className="project-section-wrapper">
          <ListItemBlock
            elements={[
              <>Clicking the toolbar icon prompts the script to scan the page for every <span className="inline-code">&lt;a&gt;</span> link, pulling each one's href, host, path, and visible text.</>,
              <>These results open in their own review tab — showing a clean list of all links found on the page.</>,
              <>Built-in filters allow the user to clean up the list: hide duplicates, hide same-origin links, hide domains the user wants blocked, group by domain, or filter with a comma-separated, negatable substring.</>,
              <>One click copies every visible link to the clipboard, or opens them all at once — in new tabs or new windows.</>,
              <>Preferences (blocked domains, tabs vs. windows, light/dark/auto) sync across every machine you're signed into.</>,
            ]}
          />
        </div>
      </SectionSpacer>

    </SiteLayout >
  );
}

export const render = LinkfinkPage;
