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
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}P${string}`` | `'PT99H'` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d’incrémentation. |
| `label` | `label` | `string` | — | — | — | Modifie le label de l’input. |
| `hideZeroValue` | `hideZeroValue` | `boolean` | `false` | — | `booleanAttribute` | Masque le contenu du champ lorsque sa valeur est nulle. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `durationChange` | `durationChange` | `DurationChangeEvent` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `value` | `ISO8601Duration` | — |

### TimePickerComponent (component)

**Selector:** `lu-time-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d’incrémentation. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean \| null` | `null` | — | — | — |
| `label` | `label` | `string` | — | — | — | Modifie le label de l’input. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `timeChange` | `timeChange` | `TimeChangeEvent` |
| `prevPicker` | `prevPicker` | `void` |
| `nextPicker` | `nextPicker` | `void` |
| `nonDigitKeyPressed` | `nonDigitKeyPressed` | `void` |
| `touched` | `touched` | `void` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `value` | `ISO8601Time` | — |

### TimeRangePickerComponent (component)

**Selector:** `lu-time-range-picker`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `displayArrows` | `displayArrows` | `boolean` | `false` | — | `booleanAttribute` | Affiche les boutons d’incrémentation. |
| `forceMeridiemDisplay` | `forceMeridiemDisplay` | `boolean` | `false` | — | `booleanAttribute` | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'S' \| 'M'` | — | — | — | Modifie la taille du champ. |
| `max` | `max` | ``${string}:${string}:${string}`` | `MAX_TIME` | — | — | — |
| `step` | `step` | `ISO8601Duration \| null` | `null` | — | — | — |

## Related files

- 📝 [Code & implementation](./time.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-time-angular-basic--docs)
- 📋 [Changelog](./time.changelog.md)
