### 21.3.0

#### Added

- `aria` attributes on the dialog trigger.
- `DIALOG_FANCY_ILLUSTRATION` constant and `DialogFancyIllustration` type are now publicly exported.

#### Fixed

- Optional form handling inside a dialog.

### 21.2.3

#### Added

- Subtitle support in the cover layout of the dialog header, through a dedicated slot.

### 21.2.2

#### Fixed

- Size of the `mod-fancy` dialog.

### 21.2.1

#### Fixed

- Padding of the `mod-fancy` dialog.

### 21.2.0

#### Added

- `mod-fancy` dialog variant, with a configurable illustration URL.
- `maxContent` size, and `fromBottom` behaviour for the `S` drawer.

#### Fixed

- Position of the close button and UI of the dialog buttons.

### 21.1.3

#### Fixed

- Rendering of stacked dialogs.

### 21.1.0

#### Added

- `resize()` method on the dialog reference, with an animation option.
- `provideDialogRoutingReuseStrategy()` provider for dialogs opened through routes.

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 21.0.4

#### Fixed

- Layout of the dialog header.
- `display` is no longer forced with `!important`.
- Outlet configuration is applied to the parent route in the dialog factories.

### 21.0.3

#### Fixed

- Selector used by the dialog routing.
- Double gap when the dialog has no action.

### 21.0.0

#### Changed

- Radius, margins and nesting of the dialogs.

### 20.3.4

#### Changed

- Close button now relies on `luButton`.

#### Fixed

- Overflow of long dialog titles.

### 20.3.3

#### Fixed

- `canMatch` is applied on the main route so sibling routes are reached correctly.

### 20.3.1

#### Fixed

- Shadow of the dialog footer.

### 20.3.0

#### Added

- A dialog can display a component given through the router.
- `XXL` drawer variant.

#### Fixed

- `canDeactivate` is called the expected number of times.

### 20.2.2

#### Fixed

- `focus-visible` state while scrolling inside a dialog.

### 20.2.1

#### Fixed

- `NoInfer` added on the dialog `data` typing.

### 20.2.0

#### Added

- Content slot for the dialog actions.

### 20.1.3

#### Fixed

- Scroll inside dialogs opened through routing.

### 20.1.1

#### Fixed

- Missing public exports.

### 20.1.0

#### Added

- The `data` config type can now be overridden.

### 19.3.3

#### Fixed

- Overlay detachments are treated as a dismissal, and the `submitting` event is emitted reliably.

### 19.3.0

#### Added

- `canDeactivate` guards are supported in `dialogRoutingConfig`.

### 19.1.1

#### Fixed

- Closing a dialog that contains a popover.

### 18.3.3

#### Fixed

- `_addAriaLabelledBy` call in the dialog header is now null-safe.

### 18.3.0

#### Added

- Internal scroll of the dialog content.
- `mod-neutral` background variant.

#### Changed

- The dialog grid uses a subgrid and handles overflow.
- `dialogRouteFactory` handles all `Route` config options.

### 18.2.0

#### Added

- Dialogs can be opened through routes (`dialog-routing`).

#### Fixed

- Footer rendering on Safari.

### 18.1.4

#### Fixed

- `content` is no longer `null` when using `[luDialogConfig]` in a template-driven approach.

### 18.1.2

#### Added

- Closing can be disabled specifically for backdrop clicks.

#### Changed

- Long dialog titles break onto several lines.
- `header` and `footer` roles removed from the dialog markup.

### 18.1.0

#### Fixed

- Autofocus of the first input when the dialog opens.
