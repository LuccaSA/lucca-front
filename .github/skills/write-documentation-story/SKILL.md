---
name: write-documentation-story
description: "Workflow skill for writing Storybook documentation stories in lucca-front. Use when asked to write, create, or add a documentation story for a component. Handles Angular and HTML&CSS variants, file structure, argTypes, imports, and conventions."
argument-hint: "Component name and variant (e.g. 'Button icon story' or 'InputFramed Angular basic story')"
---

# Write Documentation Story

## Procedure

1. **Identify** — component name, variant, type (Angular / HTML&CSS / both). Ask if missing.
2. **Check existing stories** — call `mcp_storybook_getComponentList` to list all stories, find the category, spot duplicates, then call `mcp_storybook_getComponentsProps` on a sibling story to reuse its argTypes and descriptions.
3. **Explore source** — only if no sibling story exists: read `packages/ng/<package>/public-api.ts` for exported symbols; inspect component class for `@Input()` ou `input()` properties, enums, defaults.
4. **Write** — follow [documentation-stories.instructions.md](../../instructions/documentation-stories.instructions.md). Angular: `component`, `render` with `generateInputs`, `moduleMetadata`, typed `argTypes`/`args`. HTML&CSS: plain CSS classes, `:host` layout styles.
5. **Validate** — imports match real exports; no duplicate title; all descriptions in French.
