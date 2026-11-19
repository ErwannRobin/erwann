import { createHash } from "node:crypto";
import type { Plugin } from "vite";
import { projectRecords, type ProjectRecord } from "../src/data/projectRecords";

/**
 * Agent discovery files generated from the shared project records, so agents
 * that do not run JavaScript (or give up on the WebGL hero) still see the
 * portfolio. Emitted at build time and served by the dev server.
 */

const SITE_URL = "https://erwann.app";
const SITE_NAME = "Erwann's projects";
const SUMMARY =
  "Portfolio of Erwann Robin: web apps, games and developer tools, each published as its own site. Every project below links straight to the live app.";
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/ErwannRobin" },
  { label: "Twitter", href: "https://twitter.com/diwann" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/erwannrobin/" },
];
const SKILL_NAME = "explore-erwann-projects";
const SKILL_PATH = `.well-known/agent-skills/${SKILL_NAME}/SKILL.md`;
const SKILL_DESCRIPTION =
  "Find, describe and recommend the web apps, games and tools in Erwann Robin's portfolio at erwann.app.";

const categoriesOf = (records: ProjectRecord[]) => [...new Set(records.flatMap((p) => p.categories))];

const projectLine = (p: ProjectRecord) =>
  `- [${p.title}](${p.url}): ${p.description} (${p.categories.join(", ")}; ${p.date})`;

const llmsTxt = () =>
  [
    `# ${SITE_NAME}`,
    "",
    `> ${SUMMARY}`,
    "",
    `Categories: ${categoriesOf(projectRecords).join(", ")}. This site has no API, sign-in or MCP server; it is a static catalogue.`,
    "",
    "## Projects",
    "",
    ...projectRecords.map(projectLine),
    "",
    "## Optional",
    "",
    `- [Full project descriptions](${SITE_URL}/llms-full.txt): every project with its long description and tags`,
    `- [Agent skill](${SITE_URL}/${SKILL_PATH}): how to search and recommend these projects`,
    ...SOCIALS.map((s) => `- [${s.label}](${s.href}): Erwann Robin on ${s.label}`),
    "",
  ].join("\n");

const fullMarkdown = () =>
  [
    `# ${SITE_NAME}`,
    "",
    `> ${SUMMARY}`,
    "",
    ...projectRecords.flatMap((p) => [
      `## [${p.title}](${p.url})`,
      "",
      p.longDescription,
      "",
      `- Categories: ${p.categories.join(", ")}`,
      `- Tags: ${p.tags.join(", ")}`,
      `- Released: ${p.date}`,
      "",
    ]),
    "## Elsewhere",
    "",
    ...SOCIALS.map((s) => `- [${s.label}](${s.href})`),
    "",
  ].join("\n");

const skillMd = () =>
  [
    "---",
    `name: ${SKILL_NAME}`,
    `description: ${SKILL_DESCRIPTION}`,
    "---",
    "",
    "# Explore Erwann's projects",
    "",
    "Use this skill when someone asks about Erwann Robin's work, or wants a small web app, game or developer tool that this portfolio may already offer.",
    "",
    `1. Fetch ${SITE_URL}/llms.txt for the catalogue: title, one-line summary, categories, release month and live URL of every project.`,
    `2. Fetch ${SITE_URL}/llms-full.txt when you need the long description and tags of a project.`,
    `3. Match requests against the categories (${categoriesOf(projectRecords).join(", ")}) and tags, then link to the project's own URL rather than to erwann.app.`,
    "4. Each project is a standalone website. There is no API, account or MCP server to call on erwann.app itself.",
    "",
  ].join("\n");

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Visually hidden, replaced by React on mount; read by agents that skip JavaScript. */
const fallbackHtml = () =>
  [
    '<div id="root"><main style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap">',
    `<h1>${escapeHtml(SITE_NAME)}</h1>`,
    `<p>${escapeHtml(SUMMARY)}</p>`,
    "<ul>",
    ...projectRecords.map(
      (p) =>
        `<li><a href="${escapeHtml(p.url)}">${escapeHtml(p.title)}</a>: ${escapeHtml(p.description)} (${escapeHtml(p.categories.join(", "))}; ${escapeHtml(p.date)})</li>`,
    ),
    "</ul>",
    "</main></div>",
  ].join("");

const sha256 = (s: string) => `sha256:${createHash("sha256").update(s, "utf8").digest("hex")}`;

const files = () => {
  const skill = skillMd();
  const full = fullMarkdown();
  return {
    "llms.txt": { body: llmsTxt(), type: "text/plain; charset=utf-8" },
    "llms-full.txt": { body: full, type: "text/plain; charset=utf-8" },
    "index.md": { body: full, type: "text/markdown; charset=utf-8" },
    [SKILL_PATH]: { body: skill, type: "text/markdown; charset=utf-8" },
    ".well-known/agent-skills/index.json": {
      body: `${JSON.stringify(
        {
          $schema: "https://schemas.agentskills.io/discovery/0.2.0/schema.json",
          skills: [
            {
              name: SKILL_NAME,
              type: "skill-md",
              description: SKILL_DESCRIPTION,
              url: `${SITE_URL}/${SKILL_PATH}`,
              digest: sha256(skill),
            },
          ],
        },
        null,
        2,
      )}\n`,
      type: "application/json; charset=utf-8",
    },
  } satisfies Record<string, { body: string; type: string }>;
};

export const agentDiscovery = (): Plugin => {
  let base = "/";
  return {
    name: "agent-discovery",
    configResolved(config) {
      base = config.base;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const path = req.url?.split("?")[0].replace(base, "") ?? "";
        const file = (files() as Record<string, { body: string; type: string }>)[path];
        if (!file) return next();
        res.setHeader("Content-Type", file.type);
        res.end(file.body);
      });
    },
    transformIndexHtml(html) {
      return html
        .replace('<div id="root"></div>', fallbackHtml())
        .replace(
          "</head>",
          `  <link rel="alternate" type="text/markdown" href="${base}index.md" title="Markdown version" />\n  </head>`,
        );
    },
    generateBundle() {
      for (const [fileName, { body }] of Object.entries(files())) {
        this.emitFile({ type: "asset", fileName, source: body });
      }
    },
  };
};
