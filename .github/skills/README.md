# Lucca Front skills

Skills help AI agents (Claude Code, Copilot…) work on projects that use Lucca Front. Install them in your project with [APM](https://microsoft.github.io/apm/) by adding their path to your `apm.yml`, then run `apm install`.

```yaml
dependencies:
  apm:
    - LuccaSA/lucca-front/.github/skills/lucca-front
    - LuccaSA/lucca-front/.github/skills/lucca-front-deprecated-resolver
```

## Recommended for every project

| Skill | What it does |
|---|---|
| [`lucca-front`](lucca-front/SKILL.md) | Before the agent writes or changes code using `lu-*`, `luX` or `pr-*`, it reads the documentation shipped with your installed `@lucca-front/ng` (`node_modules/@lucca-front/ng/llms.txt`): component APIs, examples, deprecations, CSS tokens, design guidelines. Install it once, without a ref: it works for every version. |

## Migrations

Install them when you need them, and remove them once the migration is done.

| Skill | What it does |
|---|---|
| [`lucca-front-migrate-22`](lucca-front-migrate-22/SKILL.md) | Migrates your project from Lucca Front 21.x to 22.x (breaking release): runs the official schematics, then handles what they leave (palettes, file upload, activity feed, select panel, strict/readonly/signals). |
| [`lucca-front-migrate-22-1`](lucca-front-migrate-22-1/SKILL.md) | Migrates your project from Lucca Front 22.0.x to 22.1.x (fancy box SVG rendering and renamed inputs, removed `USER_POPOVER_IS_ACTIVATED`). |
| [`lucca-front-deprecated-resolver`](lucca-front-deprecated-resolver/SKILL.md) | Finds the APIs marked `@deprecated` in your project (NgModules, components, inputs, services, tokens) and migrates them. |
| [`lf-select-migration`](lf-select-migration/SKILL.md) | Moves your app off the deprecated selects (`lu-select`, `lu-api-select`, `lu-user-select`…) to `lu-simple-select` / `lu-multi-select`, without changing what the back end receives. |
| [`textfield`](deprecated-components/textfield/SKILL.md) | Migrates the deprecated textfield to the modern Angular textfield, with an anti-regression strategy. Path: `.github/skills/deprecated-components/textfield`. |

## Not for consumer projects

- `_lucca-front/` — generated documentation, shipped in the npm package. Never install it with APM. See [scripts/generate-skills](../../scripts/generate-skills/README.md).

## Questions or ideas

Open an issue on [LuccaSA/lucca-front](https://github.com/LuccaSA/lucca-front/issues) or ask the Prisme team.
