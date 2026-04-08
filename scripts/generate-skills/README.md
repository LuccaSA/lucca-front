# generate-skills

TypeScript script that automatically generates `SKILL.md` files for each component of the Lucca Front design system. These files are used by **GitHub Copilot** (via VS Code Agent Skills) to answer questions about how to use Angular components.

Generated files are placed in `.github/skills/lucca-front/references/`.

## Prerequisites

- Node.js with `ts-node` (included in the project dependencies)
- A Figma token (read access to the components file)
- An API key for an AI provider (GitHub Models, Anthropic, or OpenAI)
- The Zeroheight MCP configured in VS Code (optional  for Prisme guidelines)

_Go to generate-skills-config.json.example for more instructions about API key for an AI provider and Figma Token_

## Configuration

Copy the example file and fill in your credentials:

```bash
cp scripts/generate-skills/generate-skills-config.json.example scripts/generate-skills/generate-skills-config.json
```

```json
{
  "ai": {
    "provider": "github-models",
    "model": "gpt-4o-mini",
    "apiKey": "github_pat_...",
    "concurrency": 1
  },
  "figma": {
    "token": "figd_..."
  }
}
```

`generate-skills-config.json` is gitignored.
 Never share your `github_pat_` token. For security, delete it after use.

### Supported AI providers

| Provider | `provider` | Get a key |
|---|---|---|
| GitHub Models | `github-models` | [github.com/settings/tokens](https://github.com/settings/tokens)  no permissions required |
| Anthropic | `anthropic` | [platform.anthropic.com/settings/api-keys](https://platform.anthropic.com/settings/api-keys) |
| OpenAI | `openai` | [platform.openai.com/api-keys](https://platform.openai.com/api-keys) |


## Usage

```bash
# Generate only missing SKILL.md files
npm run skills:generate

# Regenerate all SKILL.md files (including existing ones)
npm run skills:generate -- --force

# Print prompts without writing any files (debug)
npm run skills:generate -- --dry-run

# Regenerate a single component
npm run skills:generate -- --force --component button

# Re-detect Figma <-> Storybook associations automatically
npm run skills:generate -- --refresh-map
```


## Architecture

```
scripts/generate-skills/
 index.ts                           # Entry point and orchestration
 config.ts                          # Config loading and validation
 types.ts                           # Shared TypeScript types
 component-map.json                 # Manual Figma <-> Storybook mapping
 generate-skills-config.json        # Credentials (gitignored)
 generate-skills-config.json.example

 collectors/
    figma.ts                       # Fetches components from Figma
    storybook.ts                   # Fetches and groups Storybook stories
    zeroheight.ts                  # Fetches Prisme guidelines via MCP

 matchers/
    component-matcher.ts           # Maps Figma <-> Storybook via component-map.json

 generators/
     ai-client.ts                   # Multi-provider abstraction (GitHub Models / OpenAI / Anthropic)
     prompt-builder.ts              # Builds the prompt sent to the AI
     skill-writer.ts                # Writes SKILL.md files to disk
     toc-writer.ts                  # Updates the SKILL.md table of contents
```

## Generation flow

```
Figma API 
Storybook  component-matcher  prompt-builder  AI  skill-writer  SKILL.md
Zeroheight MCP                                 
packages/ng/ 
(real selectors)
```

1. **Collection**  Fetches Figma components, the Storybook index (1,300+ stories), and Zeroheight guidelines in parallel.
2. **Matching**  `component-map.json` maps each Figma component to one or more Storybook slugs. This is the central registry to maintain manually.
3. **Prompt building**  For each component, the prompt includes Figma metadata, story links and Angular story source code, **real Angular selectors** extracted from `packages/ng/` (to prevent hallucinations), and Prisme guidelines.
4. **AI generation**  The AI generates the SKILL.md following a strict format (YAML frontmatter, standardised sections, Angular examples only).
5. **Writing**  The file is written to `.github/skills/lucca-front/references/<slug>.md` and the `SKILL.md` table of contents is updated.

## component-map.json

This file is the central registry of Figma <-> Storybook associations. It must be maintained manually when new components are added to the design system.

```jsonc
{
  // Simple mapping
  "pr-Button": { "slug": "button", "storybook": "Documentation/Actions/Button/Angular" },

  // Multiple mapping (1 Figma component -> multiple SKILL.md files)
  "pr-Select": [
    { "slug": "multi-select", "storybook": "Documentation/Forms/Fields/Multi Select/Angular" },
    { "slug": "simple-select", "storybook": "Documentation/Forms/Fields/Simple Select/Angular" }
  ],

  // No story available -> null
  "pr-Banner": null
}
```

To add a new component:
1. Find the exact name in Figma
2. Find the story path in Storybook (title in the `.stories.ts` file)
3. Add the entry to `component-map.json`
   (Tip: Copilot is great at this just ask!)

```markdown
Help me fill in `scripts/generate-skills/component-map.json`.

1. Read the current `component-map.json` to identify entries that are `null` or missing a `storybook` path.
2. Fetch the Storybook index at http://localhost:6006/index.json to get the full list of available stories.
3. For each `null` or incomplete entry, search in the Storybook index for a story title that matches the Figma component name
4. If a match is found, fill in `{ "slug": "<kebab-case-name>", "storybook": "<full story title path>" }`.
5. If a single Figma component maps to multiple stories (e.g. multi-select + simple-select), use an array.
6. If no story exists for a component, leave it as `null` (do not guess).
7. Show me a diff of the proposed changes before writing anything, and ask for confirmation.
```

4. Run `npm run skills:generate -- --component <slug>`
