### 21.3.0

#### Fixed

- Accessibility of the pill: labelling and keyboard handling of the trigger.

### 21.1.0

#### Added

- `placeholder` input to replace the default placeholder of the pill.

#### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

### 20.3.0

#### Fixed

- The checkbox layout is no longer applied when the projected select already displays checkboxes.

### 20.1.3

#### Fixed

- Default value handling: `isEmpty` detection and `clearable` behaviour.

### 20.1.1

#### Fixed

- `displayed` model is now kept in sync with the pill value.

### 20.1.0

#### Changed

- Tooltip behaviour and `max-inline-size` of the pill adjusted.

### 19.3.2

#### Fixed

- Handling of nested select inputs inside a pill.

### 19.2.6

#### Fixed

- `clearable` behaviour of the pill.

### 19.2.4

#### Fixed

- API v4 initialization logic no longer triggers useless API calls.

### 19.2.0

#### Added

- `lu-filter-pill` component (`filterPill`) with the required `label` input plus `name`, `icon`, `optional` and `intl`, and the `displayed` model.
- `[luFilterPillLabel]` and `[luFilterPillDisplayer]` directives to customize the label and the displayed value.
