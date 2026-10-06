# duration-picker

## Import

```typescript
import { DurationPickerComponent } from '@lucca-front/ng/time';
```

## API Reference

### DurationPickerComponent (component)

**Selector:** `lu-duration-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | — |
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}P${string}`` | `'PT99H'` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `label` | `label` | `string` | — | — | — | — |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `durationChange` | `durationChange` | `DurationChangeEvent` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `disabled` | `unknown` | — | — |
| `value` | `ISO8601Duration` | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DURATION_PICKER_TRANSLATIONS` | `unknown` | — |

## Related files

- 🎨 [Design guidelines](./duration-picker.design.md)
- 🎯 [Figma design tokens](./duration-picker.figma.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `step` : `${string}P${string}` → ISO8601Duration | null
~ `displayArrows` : transform booleanAttribute → luBooleanAttribute
~ `hideZeroValue` : transform booleanAttribute → luBooleanAttribute

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
