# time

## Import

```typescript
import { DurationPickerComponent, TimePickerComponent, TimeRangePickerComponent } from '@lucca-front/ng/time';
```

## Basic Usage

```html
<lu-form-field [label]="labelID" [rolePresentationLabel]="true" tooltip="Tooltip message" inlineMessage="Helper message" inlineMessageState="default"> <lu-time-picker label="Label" required step="PT1M" max="23:59:59" [forceMeridiemDisplay]="undefined" [(ngModel)]="example" /> <ng-template #labelID> <span aria-hidden="true">Label</span> </ng-template>
</lu-form-field> <pr-story-model-display>{{ example }}</pr-story-model-display>
```

## API Reference

### DurationPickerComponent (component)

**Selector:** `lu-duration-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | Modifie la taille du champ. |
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}P${string}`` | `'PT99H'` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche les boutons d’incrémentation. |
| `label` | `label` | `string` | — | — | — | Modifie le label de l’input. |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `luBooleanAttribute` | Masque le contenu du champ lorsque sa valeur est nulle. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `durationChange` | `durationChange` | `DurationChangeEvent` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `disabled` | `unknown` | — | — |
| `value` | `ISO8601Duration` | — | — |

### TimePickerComponent (component)

**Selector:** `lu-time-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | Modifie la taille du champ. |
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche les boutons d’incrémentation. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `unknown` | `null` | — | `luNullableBooleanAttribute` | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l’input. |

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

### TimeRangePickerComponent (component)

**Selector:** `lu-time-range-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche les boutons d’incrémentation. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | Modifie la taille du champ. |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DURATION_PICKER_TRANSLATIONS` | `unknown` | — |
| `LU_TIME_PICKER_TRANSLATIONS` | `unknown` | — |
| `LU_TIME_RANGE_PICKER_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./time.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-forms-time-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`DurationPickerComponent` :
  ~ `step` : `${string}P${string}` → ISO8601Duration | null
  ~ `displayArrows` : transform booleanAttribute → luBooleanAttribute
  ~ `hideZeroValue` : transform booleanAttribute → luBooleanAttribute
`TimePickerComponent` :
  ~ `step` : `${string}P${string}` → ISO8601Duration | null
  ~ `displayArrows` : transform booleanAttribute → luBooleanAttribute
  ~ `forceMeridiemDisplay` : boolean | null → unknown, transform ∅ → luNullableBooleanAttribute
`TimeRangePickerComponent` :
  ~ `displayArrows` : transform booleanAttribute → luBooleanAttribute
  ~ `forceMeridiemDisplay` : transform booleanAttribute → luBooleanAttribute
  ~ `disabled` : transform booleanAttribute → luBooleanAttribute
