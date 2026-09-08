# listing

## Import

```typescript
import { ListingItemComponent, ListingComponent } from '@lucca-front/ng/listing';
```

## Basic Usage

```html
<lu-listing> <lu-listing-item>item</lu-listing-item> <lu-listing-item>item</lu-listing-item> <lu-listing-item> item <lu-listing> <lu-listing-item>item</lu-listing-item> <lu-listing-item>item</lu-listing-item> <lu-listing-item critical>item</lu-listing-item> </lu-listing> </lu-listing-item> <lu-listing-item>item</lu-listing-item>
</lu-listing>
```

## API Reference

### ListingItemComponent (component)

**Selector:** `lu-listing-item`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | Modifie l’icône d’un élément de la liste. |
| `critical` | `critical` | `boolean` | `false` | — | `luBooleanAttribute` | — |



### ListingComponent (component)

**Selector:** `lu-listing`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `ordered` | `ordered` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `orderedFancy` | `orderedFancy` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `checklist` | `checklist` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `icons` | `icons` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `defaultIcon` | `defaultIcon` | `LuccaIcon` | `'signConfirm'` | — | — | Modifie l’icône par défaut. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Modifie la couleur des icônes. |
| `start` | `start` | `number` | `1` | — | `luNumberAttribute` | Modifie la valeur initiale de la liste. |
| `inline` | `inline` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `divider` | `divider` | `boolean` | `false` | — | `luBooleanAttribute` | Ajoute un séparateur vertical entre les éléments. |
| `reversed` | `reversed` | `boolean` | `false` | — | `luBooleanAttribute` | Présente la liste sous forme décroissante. |








## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 585 available values


## Related files

- 📝 [Code & implementation](./listing.component.md)
- 🎨 [Design guidelines](./listing.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-listing-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ListingItemComponent`, `ListingComponent`).

### Notes de release (ZeroHeight)

#### 21.2.0

##### Added

- `critical` input to render an item with the critical styling.
- `orderedFancy` input, replacing `fancy`, to render an ordered list with fancy numbers.

##### Removed

- `fancy` input — use `orderedFancy` instead.

#### 21.0.0

##### Added

- `inline` input to lay out the items on a single line.
- `divider`, `reversed` and `start` inputs.

#### 20.1.0

##### Added

- `lu-listing` component (`listing`) and `lu-listing-item`, with the `ordered`, `checklist`, `palette`, `icons` and `defaultIcon` inputs, the item-level `icon` input and the `LU_LISTING_INSTANCE` injection token.

##### Fixed

- Default icon of the items.
