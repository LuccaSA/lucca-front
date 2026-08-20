### 21.3.0

#### Added

- `BUBBLE_ILLUSTRATION_SIZE` constant and `BubbleIllustrationSize` type are now publicly exported and used to type the `size` input.

### 21.1.4

#### Changed

- `size` no longer accepts an empty string and now defaults to `M`.

#### Fixed

- `illustration` now also accepts a root-relative path (starting with `/`) so locally hosted illustrations are resolved correctly.

### 21.1.1

#### Added

- `illustration` now accepts an absolute URL in addition to the built-in illustration names.

### 21.1.0

#### Added

- `lu-bubble-illustration` component (`bubbleIllustration`) with the required `illustration` input plus `palette`, `size` and `action` inputs.
