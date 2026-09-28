### 21.3.1

#### Fixed

- Connected overlays are kept out of the push panel zone, so a popover is no longer clipped by it.

### 21.3.0

#### Added

- `luPopoverMaxInlineSize` and `luPopoverMaxBlockSize` inputs to cap the size of the popover panel.

### 21.1.4

#### Fixed

- The popover no longer opens when its content is `null` or `undefined`.

### 21.1.0

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 21.0.4

#### Fixed

- Opening position of the panel when the trigger is close to the viewport edge.

### 21.0.3

#### Added

- The overlay scroll strategy can now be customized.

### 20.1.1

#### Fixed

- Focus is brought back to the trigger when the popover closes in focus mode.

### 19.2.4

#### Added

- `luPopoverOpened` output.

### 19.1.0

#### Added

- `luPopoverAnchor` input to position the popover against another element, and the `luPopoverClosed` output.

### 18.2.1

#### Added

- The directive is exported as `luPopover2` and exposes a `close()` method.

### 18.2.0

#### Added

- Option to remove the keyboard close button.
- `hover+focus` trigger mode.

#### Fixed

- The popover is repositioned after its content changes.

### 18.1.5

#### Fixed

- Focus trap of the popover panel.

### 18.1.2

#### Changed

- Scroll is no longer blocked while a popover is open.

#### Fixed

- `OverlayRef` recycling, to avoid piling up bounding boxes in the DOM.

### 18.1.0

#### Added

- `[luPopover2]` directive and `lu-popover-content` component, with the `luPopoverTrigger`, `luPopoverPosition` and `intl` inputs.
