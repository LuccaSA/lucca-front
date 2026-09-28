### 21.3.0

#### Added

- `lu-horizontal-navigation-tab` component to build tab-based navigations, with the `label`, `palette`, `disabled` inputs and the `currentIndex` model on the parent navigation.
- Dedicated styles when the navigation is used inside a dialog.
- `HORIZONTAL_NAVIGATION_SIZE` constant and `HorizontalNavigationSize` type are now publicly exported and used to type the `size` input, along with the `LU_HORIZONTALNAVIGATION_INSTANCE` injection token.

#### Fixed

- Palette handling and numeric badge rendering inside the navigation entries.

### 19.3.0

#### Added

- `lu-horizontal-navigation` component (`horizontalNavigation`) and the `[luHorizontalNavigationLink]` directive, with the `container`, `noBorder`, `size` and `vertical` inputs.

#### Changed

- The component no longer renders its own `nav` element — declare it on the host instead.
