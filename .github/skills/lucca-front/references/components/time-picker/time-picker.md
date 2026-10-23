# time-picker

**Sommaire**

- Import
- API Reference
  - TimePickerComponent (component)
  - Injection tokens
- Related files
- Changelog
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/time';
```

## API Reference

### TimePickerComponent (component)

**Selector:** `lu-time-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | — |
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `unknown` | `null` | — | `luNullableBooleanAttribute` | — |
| `label` | `label` | `string` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `timeChange` | `timeChange` | `TimeChangeEvent` | — |
| `prevPicker` | `prevPicker` | `void` | — |
| `nextPicker` | `nextPicker` | `void` | — |
| `nonDigitKeyPressed` | `nonDigitKeyPressed` | `void` | — |
| `touched` | `touched` | `void` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `disabled` | `unknown` | — | — |
| `value` | `ISO8601Time` | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TIME_PICKER_TRANSLATIONS` | `unknown` | — |

## Related files

- 🎨 [Design guidelines](./time-picker.design.md)
- 🎯 [Figma design tokens](./time-picker.figma.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `step` : `${string}P${string}` → ISO8601Duration | null
~ `displayArrows` : transform booleanAttribute → luBooleanAttribute
~ `forceMeridiemDisplay` : boolean | null → unknown, transform ∅ → luNullableBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.1

##### Changed

- `lu-duration-picker` / `lu-time-picker`: support longer time/unit separators (e.g. Dutch).

##### Fixed

- `lu-time-picker`: allow typing `0` in the hours field when the value is empty, so the picker can be set to midnight.

#### 21.3.0

##### Added

- `lu-time-range-picker`: new component to pick a start and end time, with the exported `endTimeBeforeStartTimeValidator` to flag an end time earlier than the start time.

##### Fixed

- `lu-time-range-picker`: focus handling and `onTouched` behavior.

#### 21.2.3

##### Fixed

- `lu-time-picker` / `lu-duration-picker`: no longer keep a stale `0` in the underlying input before a value is set, preventing wrong values (e.g. `10`) when typing.

#### 21.1.1

##### Fixed

- `lu-duration-picker`: correctly display the minutes part.
- `intl` input is now public on `lu-time-picker` and `lu-duration-picker`.

#### 21.1.0

##### Added

- `intl` input on `lu-time-picker` and `lu-duration-picker` to override the component translations.

##### Changed

- `lu-duration-picker`: support durations longer than 99 hours.

##### Fixed

- `lu-duration-picker`: fix wrong incrementation that skipped an hour digit.

#### 20.1.1

##### Fixed

- Export `date-primitives` from the public API.

#### 19.1.5

##### Fixed

- `lu-time-picker`: fix the `name` attribute on the AM/PM (meridiem) inputs.

#### 19.1.4

##### Fixed

- `lu-time-picker`: generate unique `id` values for the inner inputs.

#### 18.2.4

##### Fixed

- Export the `lu-duration-picker` component type from the public API.

#### 18.2.0

##### Added

- `lu-time-picker`: AM/PM (meridiem) support, with a `forceMeridiemDisplay` input to force the 12h display.

##### Fixed

- Export the missing translation tokens from the public API.

#### 18.1.5

##### Fixed

- `lu-time-picker`: the `max` input now defaults to `23:59:59`.

#### 18.1.0

##### Added

- `lu-time-picker`: new component to pick a time of day.
- `lu-duration-picker`: new component to pick a duration.
