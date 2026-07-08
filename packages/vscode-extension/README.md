# Lucca Front IntelliSense

VS Code autocomplete, hover and diagnostics for [`@lucca-front/scss`](https://github.com/LuccaSA/lucca-front) — its CSS custom properties (`--pr-t-*`, `--palettes-*`, `--commons-*`, `--breakpoints-*`) and `pr-u-*` utility classes.

The extension is **version-aware**: it reads a manifest shipped inside the `@lucca-front/scss` version installed in your project's `node_modules`, so suggestions always match the tokens and classes that version actually provides.

## Features

- **Completion**
  - Custom properties in CSS/SCSS/LESS, inside `var(…)` and in value positions. Inside `var(`, the full list is offered even before you type `--`, so `var(spacings` filters straight to the spacing tokens.
  - `pr-u-*` utility classes inside `class="…"` attributes in HTML and inside Angular inline `template: `…`` strings in `.ts` files.
- **Hover** — the resolved value of a custom property, or the CSS a utility class applies (including responsive `@media`/`@container` variants), plus a deprecation note where relevant and links to the documentation.
- **Diagnostics**
  - `pr-u-*` classes that don't exist in the installed version are flagged (catches typos and version mismatches).
  - When the experimental deprecation toggle is on, deprecated custom properties and utility classes are underlined (strikethrough) with the recommended replacement.
- **Quick Fixes** (`Ctrl+.` / `Cmd+.`) — replace an unknown class with a close match, or a deprecated class with its recommended replacement.
- **Status bar** — a health snapshot of the open files (`LF <version> ⚠ <n>`); click to open the Problems panel.

## Experimental: deprecation flagging

Deprecation signals (diagnostics, hover notices, completion strikethrough) are **off by default** and enabled via `luccaFront.experimental.cssDeprecations`, because deprecation metadata in `@lucca-front/scss` is still incomplete. Unknown-class detection is always on.

## Requirements

`@lucca-front/scss` must be installed in the workspace, at a version that ships the CSS API manifest (`css-api/manifest.json`). Older versions activate the extension but show a one-time notice and provide no suggestions. The status bar shows `LF <version>` when a manifest is loaded.

## Settings

| Setting | Default | Description |
| --- | --- | --- |
| `luccaFront.diagnostics.enabled` | `true` | Toggle all diagnostics. |
| `luccaFront.diagnostics.deprecatedSeverity` | `warning` | Severity for deprecated tokens/classes. |
| `luccaFront.diagnostics.unknownClassSeverity` | `warning` | Severity for unknown `pr-u-*` classes. |
| `luccaFront.experimental.cssDeprecations` | `false` | **Experimental.** Flag deprecated custom properties and `pr-u-*` classes. |
| `luccaFront.docs.storybookBaseUrl` | `""` | Storybook base URL for per-family utility doc links. Fixed (e.g. `https://<host>/main/storybook`) or with a `{version}` placeholder filled from the installed version (e.g. `https://lucca-front.lucca.io/{version}/storybook` → `.../v21.0/storybook`). |
| `luccaFront.manifestPath` | `""` | Absolute path to a `manifest.json`, overriding node_modules discovery (for library development). |

## Out of scope (v1)

`[class.x]` / `[ngClass]` bindings, `classList` calls in TS, and nested template literals inside `${…}` interpolation are not analysed. Plain `class="…"` attributes and inline templates cover the vast majority of utility-class usage.

## Development

```sh
npm run test:vscode-extension        # pure-logic unit tests
npm run build:vscode-extension       # typecheck, compile, and package a .vsix
```

To debug, open the monorepo in VS Code and run the **Run Lucca Front IntelliSense** launch config (opens `../lf-ext-sandbox` as the test workspace). Before a manifest ships in a released `@lucca-front/scss`, point `luccaFront.manifestPath` at a locally generated `dist/scss/css-api/manifest.json` (produced by `npm run css-api`).

The manifest itself is generated in the `@lucca-front/scss` build — see [`packages/scss/css-api/`](../scss/css-api/). To deprecate a token or class, add a `/* @deprecated <note> */` comment before its declaration in the SCSS source; the generator picks it up automatically.
