# establishmentselect

## Import

```typescript
import { LuEstablishmentSelectInputComponent } from '@lucca-front/ng/establishment';
```

## API Reference

### LuEstablishmentSelectInputComponent (component)

**Selector:** `lu-establishment-select`

> ⚠️ **Déprécié** : since 17.3.2; use LuSimpleSelectInputComponent or LuMultiSelectInputComponent. Use the establishments directive.

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

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-establishmentselect--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.2`. Les versions sans changement d'API sont omises.

### 22.1.2

~ `LuEstablishmentSelectInputComponent` devient déprécié (since 17.3.2; use LuSimpleSelectInputComponent or LuMultiSelectInputComponent. Use the establishments directive.)
