# readmore

**Sommaire**

- Import
- API Reference
  - ReadMoreComponent (component)
  - Injection tokens
- Related files
- Changelog
  - 22.0.5
  - 22.0.0
  - Notes de release (ZeroHeight)

## Import

```typescript
import { ReadMoreComponent } from '@lucca-front/ng/read-more';
```

## API Reference

### ReadMoreComponent (component)

**Selector:** `lu-read-more`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `lineClamp` | `lineClamp` | `number` | `5` | — | `luNumberAttribute` | Modifie le nombre de lignes affichées à l’état replié. |
| `openOnly` | `openOnly` | `boolean` | `false` | — | `luBooleanAttribute` | Empêche la fermeture du composant en masquant le bouton "Lire moins" |
| `plainText` | `plainText` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `textFlow` | `textFlow` | `boolean` | `false` | — | `luBooleanAttribute` | Applique les espacements du composant Text flow |
| `surface` | `surface` | `ReadMoreSurface \| string \| null` | `null` | — | — | Modifie la couleur de fond sous le bouton "Lire plus / moins" |
| `innerContent` | `innerContent` | `null \| string` | `null` | — | — | Permet de passer le contenu via un innerHTML |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_READMORE_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./readmore.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-texts-readmore-angular-ai--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.0.5

+ token `LU_READMORE_TRANSLATIONS` : unknown

### 22.0.0

~ `lineClamp` : transform ∅ → luNumberAttribute
~ `openOnly` : transform booleanAttribute → luBooleanAttribute
~ `plainText` : transform booleanAttribute → luBooleanAttribute
~ `textFlow` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 22.0.0

##### Added

- `plainText` input to display the line breaks of the content instead of collapsing them.

##### Fixed

- Read less label is now correctly quoted when built from a signal.

#### 21.3.0

##### Added

- `READ_MORE_SURFACE` constant and `ReadMoreSurface` type are now publicly exported and used to type the `surface` input.

#### 21.2.1

##### Fixed

- Content projected after the component is taken into account when the clamp state is recomputed.

#### 21.1.0

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 21.0.0

##### Added

- `innerContent` input to pass the collapsible content directly to the component instead of projecting it.

#### 20.3.1

##### Fixed

- `ResizeObserver` no longer triggers unnecessary recomputations, and the expanded state is no longer set when the content is not clamped.

#### 20.2.1

##### Fixed

- Clamp detection for contents containing lists or headings.
- Line break of the disabled state.

#### 19.3.0

##### Added

- `lu-read-more` component (`readMore`) with the `lineClamp`, `openOnly`, `surface`, `textFlow` and `intl` inputs.
