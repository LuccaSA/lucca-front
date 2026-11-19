# favorite

## Import

```typescript
import { FavoriteComponent } from '@lucca-front/ng/favorite';
```

## Basic Usage

```html
<lu-favorite (favoriteChange)="onFavoriteChange($event)" />
```

## API Reference

### FavoriteComponent (component)

**Selector:** `lu-favorite`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `favorite` | `favorite` | `boolean` | `false` | — | `luBooleanAttribute` | Indique que l’élément est en favori. Compatible two-way avec `[(favorite)]`. |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | `'M'` | — | — | Modifie la taille du bouton. |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Empêche l’ajout ou le retrait du favori. Le bouton reste atteignable au clavier et son tooltip reste affiché. |
| `intl` | `intl` | `unknown` | — | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `favoriteChange` | `favoriteChange` | `boolean` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_FAVORITE_TRANSLATIONS` | `unknown` | — |

## Related files

- 📝 [Code & implementation](./favorite.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-actions-favorite-angular-basic--docs)
