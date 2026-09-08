# pagination

## Import

```typescript
import { PaginationComponent } from '@lucca-front/ng/pagination';
```


## API Reference

### PaginationComponent (component)

**Selector:** `lu-pagination`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `isFirstPage` | `isFirstPage` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le bouton précédent. |
| `isLastPage` | `isLastPage` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le bouton suivant. |
| `from` | `from` | `unknown` | `undefined` | — | `luOptionalNullableNumberAttribute` | Numéro du dernier élément affiché. |
| `to` | `to` | `unknown` | `undefined` | — | `luOptionalNullableNumberAttribute` | Numéro du dernier élément affiché. |
| `itemsCount` | `itemsCount` | `unknown` | `undefined` | — | `luOptionalNullableNumberAttribute` | Nombre total d’éléments. |
| `mod` | `mod` | `'default' \| 'compact'` | `'default'` | — | — | Affiche la pagination en vue compacte (seulement avec les boutons précédent et suivant). |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `previousPage` | `previousPage` | `void` | — |
| `nextPage` | `nextPage` | `void` | — |








## Related files

- 📝 [Code & implementation](./pagination.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-pagination-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`PaginationComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `PAGINATION_MOD` constant and `PaginationMod` type are now publicly exported and used to type the `mod` input.

#### 21.2.2

##### Fixed

- Missing `button` import prevented the pagination controls from rendering.

#### 21.1.4

##### Fixed

- `mod="compact"` display.

#### 21.1.1

##### Fixed

- `intl` input is now public.

#### 21.1.0

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 20.3.3

##### Fixed

- The pagination can now be displayed with zero item.

#### 20.2.1

##### Fixed

- The component now imports its own styles.

#### 20.1.3

##### Fixed

- Inputs behaviour of the Angular component.

#### 20.1.0

##### Added

- `lu-pagination` component (`pagination`) with the `from`, `to`, `itemsCount`, `isFirstPage`, `isLastPage`, `mod` and `intl` inputs, and the `previousPage` / `nextPage` outputs.
