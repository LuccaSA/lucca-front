### 21.3.0

#### Added

- `DIVIDER_SIZE` constant and `DividerSize` type are now publicly exported and used to type the `size` input.

### 20.3.3

#### Fixed

- Host `role` is no longer set to an invalid value when `separatorRole` is not enabled.

### 20.2.0

#### Fixed

- `mod-vertical` margins are now applied on the inline axis instead of the block axis.

### 19.3.3

#### Added

- `separatorRole` input, replacing `withRole`.

#### Deprecated

- `withRole` input — use `separatorRole` instead.

### 19.1.0

#### Added

- `lu-divider` component (`divider`) with the `size`, `vertical` and `withRole` inputs.
- `--components-divider-*` CSS custom properties to customize the divider.

### 18.2.0

#### Fixed

- Margins and icon color of the divider.
