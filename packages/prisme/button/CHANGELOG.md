# Button — Changelog

## [22.0.0]

### Removed

- Deprecated CSS classes `.button.mod-text`, `.button.mod-deleted` and `.button.loading` (deprecated since `20.2.0`). Use `luButton="ghost"`, the `critical` input and `state="loading"` respectively.

## [20.3.0]

### Added

- `AI` button style (`luButton="AI"`) for AI-related actions, including the `AI-invert` variant for dark backgrounds.
- Support for a dedicated `mod-AI` icon-only variant.

## [20.2.0]

### Added

- `critical` input to flag actions with significant or irreversible consequences (hover/focus only). Only compatible with `outlined` and `ghost` styles. For buttons that must always appear in red, keep using `palette="critical"`.

### Deprecated

- `delete` input — use `critical` instead.
- `.button.mod-text` class — use `luButton="ghost"`.
- `.button.mod-deleted` class — use the `critical` input.
- `.button.loading` class — use `state="loading"`.

## [20.1.0]

### Added

- `ghost-invert` and `text-invert` button types for use on dark backgrounds.

## [19.1.0]

### Removed

- Deprecated `.button.mod-icon` combination (deprecated since `17.2.0`). Use `mod-onlyIcon` with `lu-icon` instead.

## [17.2.0]

### Deprecated

- `.button.mod-icon` CSS class combination in favour of `mod-onlyIcon`.

[22.0.0]: https://github.com/LuccaSA/lucca-front/releases/tag/v22.0.0
[20.3.0]: https://github.com/LuccaSA/lucca-front/releases/tag/v20.3.0
[20.2.0]: https://github.com/LuccaSA/lucca-front/releases/tag/v20.2.0
[20.1.0]: https://github.com/LuccaSA/lucca-front/releases/tag/v20.1.0
[19.1.0]: https://github.com/LuccaSA/lucca-front/releases/tag/v19.1.0
[17.2.0]: https://github.com/LuccaSA/lucca-front/releases/tag/v17.2.0
