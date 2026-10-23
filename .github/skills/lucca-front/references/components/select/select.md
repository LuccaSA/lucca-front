# select

## Import

```typescript
import { LuSelectInputComponent } from '@lucca-front/ng/select';
```

## API Reference

### LuSelectInputComponent (component)

**Selector:** `lu-select`

> ⚠️ **Déprécié** : prefer SimpleSelect or MultipleSelect

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `pickerOverlap` | `pickerOverlap` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le sélecteur de date par-dessus le champ (déjà activé à l’initialisation par lu-date-select). |
| `placeholderInput` | `placeholder` | `string` | `''` | — | — | Texte affiché en l’absence de valeur. |
| `multipleInput` | `multiple` | `boolean \| string` | `false` | — | — | — |
| `disabledInput` | `disabled` | `boolean` | `false` | — | — | Désactive le champ. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `onOpenOutput` | `onOpenOutput` | `void` | — |
| `onCloseOutput` | `onCloseOutput` | `void` | — |

### Modules dépréciés

- ⚠️ `LuSelectModule` — prefer SimpleSelect or MultipleSelect
- ⚠️ `LuSelectInputModule` — prefer SimpleSelect or MultipleSelect

## Related files

- 📝 [Code & implementation](./select.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-api-select-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `pickerOverlap` : défaut ∅ → false, transform ∅ → luBooleanAttribute
~ `placeholder` : défaut ∅ → ''
~ `multiple` : défaut ∅ → false
~ `disabled` : défaut ∅ → false
+ (output) `onOpenOutput` : void
+ (output) `onCloseOutput` : void
- (output) `onOpen`
- (output) `onClose`
