### 21.3.0

#### Changed

- Loading state of the popover now uses `lu-skeleton-user-popover`.

### 21.1.2

#### Deprecated

- `USER_POPOVER_IS_ACTIVATED` token — the popover is now always activated.
- `provideLuUserPopover()` — no longer needed, the popover relies on `luPopover2`.

### 21.1.0

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### Fixed

- Explicit type on the `luUserPopover` signal input.

### 20.3.0

#### Added

- Skeleton displayed while the user data is loading.

### 20.1.1

#### Added

- Keyboard navigation inside the popover content.

### 20.1.0

#### Added

- `[luUserPopover]` directive and `lu-user-popover-content` component, with the `luUserPopover` and `intl` inputs, plus the `LU_USER_POPOVER_USER` and `USER_POPOVER_IS_ACTIVATED` injection tokens.
- Loader displayed while the user is being fetched.

#### Changed

- The popover is now hosted by the `popover2` directives.

### 18.1.0

#### Changed

- Dates are displayed with the short format instead of the long one.
- Avatar size variants updated.
