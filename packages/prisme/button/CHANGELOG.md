### v22.0.0

#### Removed

- Deprecated CSS classes `.button.mod-text`, `.button.mod-deleted` and `.button.loading` (deprecated since `20.2.0`). Use `luButton="ghost"`, the `critical` input and `state="loading"` respectively.

### v20.3.0

#### Added

- `AI` button style (`luButton="AI"`) for AI-related actions, including the `AI-invert` variant for dark backgrounds.
- Support for a dedicated `mod-AI` icon-only variant.

### v20.2.0

#### Added

- `critical` input to flag actions with significant or irreversible consequences (hover/focus only). Only compatible with `outlined` and `ghost` styles. For buttons that must always appear in red, keep using `palette="critical"`.

#### Deprecated

- `delete` input — use `critical` instead.
- `.button.mod-text` class — use `luButton="ghost"`.
- `.button.mod-deleted` class — use the `critical` input.
- `.button.loading` class — use `state="loading"`.

### v20.1.0

#### Added

- `ghost-invert` and `text-invert` button types for use on dark backgrounds.

### v19.1.0

#### Removed

- Deprecated `.button.mod-icon` combination (deprecated since `17.2.0`). Use `mod-onlyIcon` with `lu-icon` instead.

### v17.2.0

#### Deprecated

- `.button.mod-icon` CSS class combination in favour of `mod-onlyIcon`.
