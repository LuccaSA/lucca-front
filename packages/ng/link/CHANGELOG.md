### 21.3.1

#### Fixed

- `external` router links now render an `href` attribute, making them reachable via keyboard navigation and showing their destination on hover.

### 21.3.0

#### Added

- `hiddenIcon` input to display the external icon only on hover/focus. It is also applied automatically when the link is used inside a `data-table` or `index-table`.

### 21.2.0

#### Changed

- Reworked component styling: theming now relies on dedicated `--components-link-*` CSS custom properties, with support for a `.link-text` inner element.

### 21.1.2

#### Fixed

- `external` links now prepare the URL with the application base href before opening, fixing external redirection for array link commands.

### 21.1.0

#### Added

- `intl` input to override the component's translations.

#### Fixed

- `external` links now honor `navigationExtras` and support `UrlTree` link commands.

### 20.3.3

#### Fixed

- `external` router links (`external` + `luLink` commands) now open correctly in a new tab.

### 20.1.1

#### Fixed

- `luLink` no longer breaks with Angular 20.

### 19.1.6

#### Added

- `button[luLink]` selector support, allowing the directive to be used on `<button>` elements.

#### Removed

- Required `label` input removed; the link content is now projected via `ng-content` instead.

### 19.1.0

#### Added

- Angular component (`lu-link` / `luLink`).

### 18.2.1

#### Fixed

- `link` spacing: corrected the spacing and alignment of the external icon.
