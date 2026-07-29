# establishmentselect

## Import

```typescript
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
```

## API Reference

### LuEstablishmentSelectInputComponent (component)

**Selector:** `lu-establishment-select`

> ⚠️ **Déprécié** : prefer SimpleSelect or MultipleSelect with establishments directive

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `filters` | `filters` | `string[]` | — | — | — | — |
| `appInstanceId` | `appInstanceId` | `number` | — | — | — | — |
| `operations` | `operations` | `number[]` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_ESTABLISHMENT_SELECT_INPUT_TRANSLATIONS` | `unknown` | — |

### Modules dépréciés

- ⚠️ `LuEstablishmentModule` — prefer SimpleSelect or MultipleSelect with establishments directive
- ⚠️ `LuEstablishmentSelectModule` — prefer SimpleSelect or MultipleSelect with establishments directive
- ⚠️ `LuEstablishmentSelectInputModule` — use `LuEstablishmentSelectInputComponent` instead

## Related files

- 📝 [Code & implementation](./establishmentselect.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-establishmentselect--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`LuEstablishmentSelectInputComponent`).
