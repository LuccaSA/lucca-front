### 21.3.0

#### Added

- `BUBBLE_ICON_SIZE` and `BUBBLE_ICON_DIRECTION` constants, together with the `BubbleIconSize` and `BubbleIconDirection` types, are now publicly exported and used to type the `size` and `bubbleDirection` inputs.

### 21.1.4

#### Changed

- `size` no longer accepts an empty string and now defaults to `M`.
- `bubbleDirection` no longer accepts `null` and now defaults to `random`.

### 21.1.0

#### Added

- `lu-bubble-icon` component (`bubbleIcon`) with the required `icon` input plus `alt`, `size`, `palette` and `bubbleDirection` inputs.
