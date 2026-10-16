### 22.1.0

#### Added

- `foregroundStartEnd`, `foregroundEndStart`, `backgroundStartEnd` and `backgroundEndStart` inputs, accepting a predefined illustration name or an image URL. `foregroundEndStart` adds a bottom-left foreground illustration.
- `FANCY_BOX_FOREGROUND_START_END`, `FANCY_BOX_FOREGROUND_END_START`, `FANCY_BOX_BACKGROUND_START_END` and `FANCY_BOX_BACKGROUND_END_START` constants and their types are now publicly exported and used to type these inputs.
- `palette` input (defaults to `product`) to color the bubbles.
- `fancyBox-content-foregroundStartEnd`, `fancyBox-content-foregroundEndStart`, `fancyBox-content-backgroundStartEnd` and `fancyBox-content-backgroundEndStart` elements to display inline SVG illustrations.

#### Changed

- `backgroundLeft` and `backgroundRight` are no longer required: both backgrounds now default to the `bubbles` illustration.

#### Deprecated

- `foreground` input — use `foregroundStartEnd` instead.
- `backgroundLeft` input — use `backgroundEndStart` instead.
- `backgroundRight` input — use `backgroundStartEnd` instead.
- `fancyBox-content-foreground` element and `--components-fancyBox-foreground`, `--components-fancyBox-background-left` and `--components-fancyBox-background-right` variables — use the `fancyBox-content-*StartEnd` / `fancyBox-content-*EndStart` elements instead.

### 21.3.0

#### Added

- `FANCY_BOX_SIZE` constant and `FancyBoxSize` type are now publicly exported and used to type the `size` input.

### 21.1.2

#### Fixed

- `mod-S` styles are now declared inside the `mods` layer, so they are no longer overridden by the component styles.

### 21.0.0

#### Added

- `size` input with the `S` value (`mod-S`).

### 19.2.6

#### Fixed

- Positioning of the fancy box decorations.

### 19.1.0

#### Added

- `lu-fancy-box` component (`fancyBox`) with the `backgroundLeft`, `backgroundRight` and `foreground` inputs.
