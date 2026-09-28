### 21.1.0

#### Added

- `intl` input to override the component's translations.

### 21.0.0

#### Changed

- `breadcrumbs-list-item-action` styles are now applied to every element of a `breadcrumbs-list-item`, not only to links.

### 19.3.3

#### Fixed

- `BreadcrumbsLinkDirective` was missing from the component's imports, making `[luBreadcrumbsLink]` unusable.

### 19.3.2

#### Deprecated

- `.breadcrumbs.mod-compact` CSS class.

### 19.3.0

#### Added

- `lu-breadcrumbs` component (`breadcrumbs`) and the `[luBreadcrumbsLink]` directive to declare each entry of the trail.
- `disableCompact` input to prevent the breadcrumbs from collapsing on small screens.

### 18.1.0

#### Changed

- Back arrow now uses the `arrow_left` icon.
- Text and separator colors use the `neutral-700` shade for better contrast.
