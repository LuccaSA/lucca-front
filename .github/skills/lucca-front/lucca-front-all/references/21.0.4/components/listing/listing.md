# listing

## Import

```typescript
import { ListingItemComponent, ListingComponent } from '@lucca-front/ng/listing';
```

## Basic Usage

```html
<lu-listing> <lu-listing-item>item</lu-listing-item> <lu-listing-item>item</lu-listing-item> <lu-listing-item> item <lu-listing> <lu-listing-item>item</lu-listing-item> <lu-listing-item>item</lu-listing-item> <lu-listing-item>item</lu-listing-item> </lu-listing> </lu-listing-item>
</lu-listing>
```

## API Reference

### ListingItemComponent (component)

**Selector:** `lu-listing-item`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | Modifie l'icône d'un élément de la liste. |

### ListingComponent (component)

**Selector:** `lu-listing`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `ordered` | `ordered` | `boolean` | `false` | — | `booleanAttribute` | — |
| `checklist` | `checklist` | `boolean` | `false` | — | `booleanAttribute` | — |
| `icons` | `icons` | `boolean` | `false` | — | `booleanAttribute` | — |
| `defaultIcon` | `defaultIcon` | `LuccaIcon` | `'signConfirm'` | — | — | Modifie l'icône par défaut. |
| `palette` | `palette` | `Palette` | `'none'` | — | — | Modifie la couleur des icônes. |
| `start` | `start` | `number` | `1` | — | `numberAttribute` | Modifie la valeur initiale de la liste. |
| `inline` | `inline` | `boolean` | `false` | — | `booleanAttribute` | — |
| `divider` | `divider` | `boolean` | `false` | — | `booleanAttribute` | Ajoute un séparateur vertical entre les éléments. |
| `reversed` | `reversed` | `boolean` | `false` | — | `booleanAttribute` | Prédente la liste sous forme décroissante. |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./listing.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./listing.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.4/storybook/?path=/docs/documentation-listings-listing-angular-basic--docs)
- 📋 [Changelog](./listing.changelog.md)
