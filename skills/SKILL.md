---
name: lucca-front
description: "Helps developers use the @lucca-front design system library. Covers Angular components (@lucca-front/ng), icons (@lucca-front/icons), SCSS utilities (@lucca-front/scss), and core Prisme components (@lucca/prisme). Use this skill when a developer asks about Lucca UI components, forms, overlays, navigation, data tables, buttons, dialogs, or any front-end design system question — even if they don't mention @lucca-front explicitly."
---

# @lucca-front — Lucca Front Design System

## Import paths

| Package | Import |
|---------|--------|
| Angular Components | `@lucca-front/ng/{component}` |
| Icons | `@lucca-front/icons` |
| SCSS Utilities | `@lucca-front/scss` |
| Prisme Core | `@lucca/prisme/{component}` |

## How to use this skill

Read only the reference file(s) relevant to the question. Use the routing guide below to pick the right one — don't load everything at once.

## Routing guide

### Angular Components (@lucca-front/ng)

| If the question is about… | Read |
|---------------------------|------|
| **Actions** (Button, Links) | [ng/references/button.md](ng/references/button.md) |
| **Feedback** (Callout, CalloutDisclosure, CalloutFeedbackList, CalloutPopover, EmptyState...) | [ng/references/callout.md](ng/references/callout.md) |
| **Forms** (Select, Checkbox, CheckboxLegacy, DataPresentation, Calendar...) | [ng/references/select.md](ng/references/select.md) |
| **Integration** (Utilities) | [ng/references/utilities.md](ng/references/utilities.md) |
| **Intl** (Intl) | [ng/references/intl.md](ng/references/intl.md) |
| **Listings** (Chip, DataTable, IndexTable, List, Listing...) | [ng/references/chip.md](ng/references/chip.md) |
| **Loaders** (Gauge, Loading, ProgressBar, Skeleton, SkeletonButton...) | [ng/references/gauge.md](ng/references/gauge.md) |
| **Navigation** (Breadcrumbs, HorizontalNavigation, MenuSecondary, MobileNavigation, Pagination...) | [ng/references/breadcrumbs.md](ng/references/breadcrumbs.md) |
| **Overlays** (Dialog, Dropdown, Modal, Popover, Popover2...) | [ng/references/dialog.md](ng/references/dialog.md) |
| **Structure** (AppLayout, Box, BubbleIcon, BubbleIllustration, Cards...) | [ng/references/applayout.md](ng/references/applayout.md) |
| **Texts** (Clear, Code, Comment, Icons, Labels...) | [ng/references/clear.md](ng/references/clear.md) |
| **Toolbox** (Animations, Date, Numbers) | [ng/references/animations.md](ng/references/animations.md) |
| **Users** (Avatars, Group, Display, Popover, Select...) | [ng/references/avatars.md](ng/references/avatars.md) |

### By component

| Component | Reference |
|-----------|-----------|
| Button | [button.md](ng/references/button.md) |
| Links | [links.md](ng/references/links.md) |
| Callout | [callout.md](ng/references/callout.md) |
| CalloutDisclosure | [calloutdisclosure.md](ng/references/calloutdisclosure.md) |
| CalloutFeedbackList | [calloutfeedbacklist.md](ng/references/calloutfeedbacklist.md) |
| CalloutPopover | [calloutpopover.md](ng/references/calloutpopover.md) |
| EmptyState | [emptystate.md](ng/references/emptystate.md) |
| ErrorPage | [errorpage.md](ng/references/errorpage.md) |
| MobilePush | [mobilepush.md](ng/references/mobilepush.md) |
| PlgPush | [plgpush.md](ng/references/plgpush.md) |
| Select | [select.md](ng/references/select.md) |
| Checkbox | [checkbox.md](ng/references/checkbox.md) |
| CheckboxLegacy | [checkboxlegacy.md](ng/references/checkboxlegacy.md) |
| DataPresentation | [datapresentation.md](ng/references/datapresentation.md) |
| Calendar | [calendar.md](ng/references/calendar.md) |
| Select | [select.md](ng/references/select.md) |
| Date2 | [date2.md](ng/references/date2.md) |
| Department | [department.md](ng/references/department.md) |
| EstablishmentSelect | [establishmentselect.md](ng/references/establishmentselect.md) |
| Examples | [examples.md](ng/references/examples.md) |
| Checkbox | [checkbox.md](ng/references/checkbox.md) |
| ColorInput | [colorinput.md](ng/references/colorinput.md) |
| Date | [date.md](ng/references/date.md) |
| Fields | [fields.md](ng/references/fields.md) |
| MultiSelect | [multiselect.md](ng/references/multiselect.md) |
| Multilanguage | [multilanguage.md](ng/references/multilanguage.md) |
| Number | [number.md](ng/references/number.md) |
| NumberFormat | [numberformat.md](ng/references/numberformat.md) |
| PhoneNumberInput | [phonenumberinput.md](ng/references/phonenumberinput.md) |
| Radio | [radio.md](ng/references/radio.md) |

*... and 107 more components in ng/references/*

### Icons

| If the question is about… | Read |
|---------------------------|------|
| Icons, pictograms, lu-icon, lucca-icon | [icons/references/icons.md](icons/references/icons.md) |

### SCSS

| If the question is about… | Read |
|---------------------------|------|
| CSS utilities, mixins, theming, spacing, display | [scss/references/utilities.md](scss/references/utilities.md) |

### Prisme Core

| If the question is about… | Read |
|---------------------------|------|
| Button | [prisme/references/button.md](prisme/references/button.md) |
| Core | [prisme/references/core.md](prisme/references/core.md) |
| Icon | [prisme/references/icon.md](prisme/references/icon.md) |

## Quick examples

### Button

```html
<button type="button" luButton>Primary action</button>
<button type="button" luButton="outlined">Secondary action</button>
<button type="button" luButton="ghost">Tertiary action</button>
```

### Dialog

```html
<lu-dialog>
  <lu-dialog-header>Title</lu-dialog-header>
  <lu-dialog-content>Content</lu-dialog-content>
  <lu-dialog-footer>
    <button luButton>Confirm</button>
  </lu-dialog-footer>
</lu-dialog>
```

### Form Field

```html
<lu-form-field label="Email">
  <lu-text-input [(ngModel)]="email" />
</lu-form-field>
```

### Icon

```html
<lu-icon icon="heart" alt="Favorite" />
```
