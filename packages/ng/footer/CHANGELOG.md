### 21.3.0

#### Added

- `FOOTER_CONTAINER_MAX` and `FOOTER_NARROW_AT_MEDIA_MAX` constants, together with the `FooterContainerMax` and `FooterNarrowAtMediaMax` types, are now publicly exported and used to type the `containerMax` and `narrowAtMediaMax` inputs.

### 21.2.1

#### Fixed

- Padding of the footer inside a `mod-fancy` dialog.

### 21.2.0

#### Added

- `containerMax` input to cap the width of the footer container.

### 20.1.3

#### Fixed

- `sticky` footer now stays sticky even when the wrapper does not use `display: contents`.

### 20.1.0

#### Added

- The footer content can be aligned with the page container.

### 19.3.4

#### Fixed

- The Angular wrapper uses `display: contents` so it does not break the footer layout.

### 19.3.0

#### Added

- `lu-footer` component (`footer`) with the `container`, `dialog`, `sticky`, `forceNarrow` and `narrowAtMediaMax` inputs.

#### Fixed

- Footer buttons now wrap instead of overflowing on narrow screens.

### 18.2.1

#### Fixed

- Container width of the footer.

### 18.1.1

#### Fixed

- `sticky` footer position and margins.

### 18.1.0

#### Added

- Responsive footer with container support and `--components-footer-*` CSS custom properties.
