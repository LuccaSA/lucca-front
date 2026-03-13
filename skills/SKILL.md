---
name: lucca-front
description: "Helps Angular developers use the @lucca-front design system library. Covers all Angular components, forms, overlays, navigation, data display, layout, and SCSS utilities. Use this skill when a developer asks about Lucca UI components, forms, dialogs, tables, buttons, responsive design, spacing, or any front-end design system question — even if they don't mention @lucca-front explicitly."
---

# @lucca-front — Lucca Front Design System

## Packages

| Package | Purpose | Skill Reference |
|---------|---------|-----------------|
| `@lucca-front/ng/*` | Angular components | [ng/SKILL.md](ng/SKILL.md) |
| `@lucca-front/scss` | SCSS utilities & tokens | [scss/SKILL.md](scss/SKILL.md) |
| `@lucca-front/icons` | Icon library | See icon.md |

## Quick Start

### Angular Components

```typescript
// app.config.ts
import { configureLuDialog } from '@lucca-front/ng/dialog';

export const appConfig: ApplicationConfig = {
  providers: [
    configureLuDialog(), // Required for dialogs
  ],
};
```

```html
<!-- app.component.html -->
<router-outlet />
<lu-toasts /> <!-- Required for toast notifications -->
```

### SCSS Utilities

```scss
// styles.scss
@use '@lucca-front/scss/src/main.scss';
```

```html
<!-- Use utility classes -->
<div class="pr-u-displayFlex pr-u-gap400 pr-u-padding500">
  ...
</div>
```

## How to Use This Skill

This skill is organized by package:

1. **For Angular components** → Start with [ng/SKILL.md](ng/SKILL.md)
2. **For SCSS/styling** → See [scss/SKILL.md](scss/SKILL.md) for utilities, mixins, and tokens

**Don't load everything at once.** Read only the specific reference file needed.

## Angular Components Overview

See [ng/SKILL.md](ng/SKILL.md) for complete documentation of **54 components** across:
- Forms (14): form-field, text-input, textarea-input, number-input, checkbox-input, switch-input, radio-group, date-input, time-picker, phone-number-input, color-input, rich-text-input, simple select, multi select
- Overlays (7): dialog, dropdown, popover, tooltip, toasts, sidepanel, user-popover
- Navigation (6): vertical-navigation, horizontal-navigation, breadcrumbs, pagination, segmented-control, link
- Data Display (8): datatable, chip, empty-state, loading, skeleton, gauge, progress-bar, data-presentation
- Layout & Structure (6): app-layout, box, container, pageheader, divider, fancy-box
- Feedback & Status (6): callout, inline-message, status-badge, numeric-badge, plg-push, tag
- Content & Text (5): icon, comment, read-more, text-flow, user-tile
- Users (2): avatar, avatar-wrapper

## SCSS Utilities Overview

See [scss/SKILL.md](scss/SKILL.md) for complete documentation of:
- Media query mixins (responsive breakpoints)
- Utility classes (spacing, display, flexbox, grid, text)
- Design tokens (CSS custom properties)
- Configuration options

## Quick Examples

### Complete Form
```html
<lu-form-field 
  label="Email" 
  errorInlineMessage="Please enter a valid email">
  <lu-text-input [(ngModel)]="email" required email />
</lu-form-field>
```

### Responsive Layout with SCSS
```scss
.container {
  padding: var(--spacings-400);
  
  @include media.minWidth('M') {
    padding: var(--spacings-600);
    max-width: 1200px;
  }
}
```

### Dialog with Button
```html
<button luButton [luDialogOpen]="dialog">Open</button>

<ng-template #dialog>
  <lu-dialog>
    <lu-dialog-header><h1>Title</h1></lu-dialog-header>
    <lu-dialog-content>Content...</lu-dialog-content>
    <lu-dialog-footer>
      <button luButton>Confirm</button>
    </lu-dialog-footer>
  </lu-dialog>
</ng-template>
```

### Data Table with Utilities
```html
<div class="pr-u-padding500">
  <lu-data-table hover>
    <lu-data-table-head>
      <lu-data-table-cell-header>Name</lu-data-table-cell-header>
    </lu-data-table-head>
    <lu-data-table-body>
      @for (item of items; track item.id) {
        <lu-data-table-row>
          <lu-data-table-cell>{{ item.name }}</lu-data-table-cell>
        </lu-data-table-row>
      }
    </lu-data-table-body>
  </lu-data-table>
</div>
```

## Key Concepts

### Palettes
Most components support `palette` input:
- `'none'` - Default/inherit
- `'product'` - Brand colors
- `'success'`, `'warning'`, `'critical'` - Semantic colors

### Sizes
Common size values: `'XS'`, `'S'`, `'M'` (default), `'L'`, `'XL'`

### Responsive Breakpoints
- `XS`: 0px (mobile)
- `S`: 480px
- `M`: 768px (tablet)
- `L`: 1024px (desktop)
- `XL`: 1280px

### Design Tokens
```scss
var(--spacings-400)    // 1rem spacing
var(--palettes-primary-500)  // Primary color
var(--radii-m)         // Medium border radius
```

## All References

### Angular Components (54 total)
See [ng/SKILL.md](ng/SKILL.md) for the full index and component documentation.

### SCSS Utilities
See [scss/references/utilities.md](scss/references/utilities.md) for complete SCSS documentation.
