# NG

## About

`@lucca-front/ng` is a comprehensive Angular library containing business components and domain-specific logic for Lucca applications.

### What's inside

This package contains specialized components organized by domain:

**Business Components**
- **User management**: `user-select`, `user-popover`, user-related components
- **Organization**: `department`, `establishment`, organizational structures
- **Qualifications**: Skills and qualification management

**Form Components**
- **Inputs**: `text-input`, `number-input`, `date-input`, `date2`, `multilanguage-input`, `file-upload`
- **Selects**: `simple-select`, `multi-select`, `tree-select`, `core-select`
- **Complex forms**: `formly` integration, form validation

**Layout & Navigation**
- **Layouts**: `app-layout`, `main-layout`, `page-header`
- **Navigation**: `horizontal-navigation`, `vertical-navigation`, `breadcrumbs`
- **Containers**: `box`, `container`, `fancy-box`, `scroll-box`

**Data Display**
- **Tables**: `data-table`, `index-table`, `sortable-list`
- **Cards**: `resource-card`, `highlight-data`
- **Feedback**: `toast`, `inline-message`, `callout`, `empty-state`
- **Progress**: `progress-bar`, `gauge`, `loading`, `skeleton`

**Interactive Components**
- **Overlays**: `modal`, `dialog`, `popup`, `sidepanel`, `popover`, `popover2`, `tooltip`
- **Controls**: `button`, `chip`, `tag`, `segmented-control`, `filter-pills`
- **Utilities**: `pagination`, `read-more`, `code`, `dropdown`

**Domain Features**
- API integration helpers
- Lucca-specific data formatting and display
- Business rule implementations

### Maintenance

Components are maintained by their respective business units and domain experts who understand the specific business context and requirements.

## Schematics

Schematics help automate migrations and updates when upgrading Lucca Front. They cover most replacements, but manual verification is recommended to ensure edge cases are handled (concatenated strings, complex conditions, etc.).

> **Note:** If you use NX, replace `ng g` with `npm run nx g` to launch schematics.

### Available Schematics

| Description | Version | Command |
| ----------- | ------- | ------- |
| Replace HTML loading with `<lu-loading>` | 21.1+ | `ng g @lucca-front/ng:lu-loading` |
| Replace HTML containers with `<lu-container>` | 21.1+ | `ng g @lucca-front/ng:lu-container` |
| Replace physical alignment utilities (e.g., `.pr-u-textRight`) with logical ones (e.g., `.pr-u-textAlignEnd`) | 21.0.1+ | `ng g @lucca-front/ng:alignment-utilities` |
| Update imports for Scrollbox, Segmented control and Status badge (naming consistency) | 21.0.1+ | `ng g @lucca-front/ng:component-path` |
| Update text color utilities (e.g., `.pr-u-textLight` → `.pr-u-colorTextSubtle`) | 21.0.0 | `ng g @lucca-front/ng:color-text` |
| Replace utility class prefixes (`.u` → `.pr-u`) | 20.2+ | `ng g @lucca-front/ng:class-prefix` |
| Replace border radius variables with tokens | 20.2+ | `ng g @lucca-front/ng:tokens-radius` |
| Replace HTML buttons with `luButton` | 20.1+ | `ng g @lucca-front/ng:lu-button` |
| Replace HTML icons with `<lu-icon>` | 20.1+ | `ng g @lucca-front/ng:lu-icon` |
| Replace CSS "sizes" variables with Font tokens | 20.1+ | `ng g @lucca-front/ng:tokens-typo` |
| Replace deprecated Selects with Simple & Multi Select | 19.2+ | `ng g @lucca-front/ng:lu-select` |
| Update CDN URLs | 19.2+ | `ng g @lucca-front/ng:cdn-urls` |
| Apply new spacing tokens (e.g., `.pr-u-margin100`, `--pr-t-spacings-100`) | 17.4+ | `ng g @lucca-front/ng:tokens-spacings` |
| Replace old palettes (grey, primary, secondary, lucca) with new ones (neutral, product, brand) | 17.4+ | `ng g @lucca-front/ng:palettes` |
| Apply new icon naming convention | 17.2+ | `ng g @lucca-front/ng:new-icons` |

### Best Practices

- Run schematics on a dedicated PR to simplify code review
- Manually verify changes after running schematics
- Translation strings cannot be replaced automatically and must be updated manually
