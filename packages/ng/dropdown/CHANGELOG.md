### 21.0.4

#### Changed

- `disabled` now takes priority over `critical` on a dropdown item.

#### Fixed

- Opening position of the dropdown panel when the trigger is close to the viewport edge.

### 21.0.0

#### Deprecated

- `LuDropdownModule` — import the standalone `LuDropdownTriggerDirective`, `LuDropdownPanelComponent` and `LuDropdownItemDirective` instead.

### 20.3.2

#### Added

- `critical` input on the dropdown items, for destructive actions.

#### Fixed

- Color of the critical items.

### 20.3.1

#### Fixed

- The panel closes when an item is clicked.
- SCSS import of the component.
- Close management of the legacy `lu-dropdown`.

### 20.3.0

#### Added

- Reworked dropdown: `[luDropdown]` trigger directive with the `lu-dropdown-menu`, `lu-dropdown-item`, `lu-dropdown-group` and `lu-dropdown-divider` components, plus the `[luDropdownItem]` directive.

### 19.3.0

#### Changed

- Dropdown UI updated.

### 19.2.0

#### Added

- `dropdown` SCSS component, usable without Angular.
