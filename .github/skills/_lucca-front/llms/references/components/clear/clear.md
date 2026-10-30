# clear

## Import

```typescript
import { ClearComponent } from '@lucca-front/ng/clear';
```

## API Reference

### ClearComponent (component)

**Selector:** `lu-clear`

**exportAs:** `luClearer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `size` | `size` | `ClearSize \| null` | `null` | — | — | Modifie la taille du bouton. Par défaut : taille M. |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le bouton. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Applique une palette de couleurs au bouton. |
| `inverted` | `inverted` | `boolean` | `false` | — | `luBooleanAttribute` | Modifie les couleurs du bouton pour un usage sur fond foncé. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `onClearOutput` | `onClearOutput` | `void` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_CLEAR_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./clear.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-clear-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.1`. Les versions sans changement d'API sont omises.

### 22.0.5

+ token `LU_CLEAR_TRANSLATIONS` : unknown

### 22.0.0

~ `disabled` : transform booleanAttribute → luBooleanAttribute
~ `inverted` : transform booleanAttribute → luBooleanAttribute
+ (output) `onClearOutput` : void
- (output) `onClear`

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `CLEAR_SIZE` TypeScript constant is now publicly exported.

#### 21.1.0

##### Added

- `intl` input to override the component's translations.

#### 21.0.3

##### Fixed

- `clear` visibility in select fields: the clear button no longer stays hidden on a selected field.

#### 21.0.0

##### Added

- Angular component (`lu-clear` / `luClearer`) with `size`, `disabled`, `palette`, and `inverted` inputs and an `onClear` output.

##### Fixed

- `multi-select` display: the clear button now shows correctly when a value is selected.
