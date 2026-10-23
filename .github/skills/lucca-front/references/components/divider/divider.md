# divider

## Import

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
```

## Basic Usage

```html
<lu-divider >Text</lu-divider>
```

## API Reference

### DividerComponent (component)

**Selector:** `lu-divider`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `separatorRole` | `separatorRole` | `boolean` | `false` | — | `luBooleanAttribute` | Ajoute `role="separator"` au composant pour qu’il soit restitué comme un séparateur par les technologies d’assistance. S… |
| `vertical` | `vertical` | `boolean` | `false` | — | `luBooleanAttribute` | Affiche le séparateur verticalement. |
| `size` | `size` | `DividerSize \| null` | `null` | — | — | Modifie la taille du séparateur. |
| `withRole` | `withRole` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : Déprécié.  |

## Related files

- 📝 [Code & implementation](./divider.component.md)

- 🎯 [Figma design tokens](./divider.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-structure-divider-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `separatorRole` : transform booleanAttribute → luBooleanAttribute
~ `vertical` : transform booleanAttribute → luBooleanAttribute
~ `withRole` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `DIVIDER_SIZE` constant and `DividerSize` type are now publicly exported and used to type the `size` input.

#### 20.3.3

##### Fixed

- Host `role` is no longer set to an invalid value when `separatorRole` is not enabled.

#### 20.2.0

##### Fixed

- `mod-vertical` margins are now applied on the inline axis instead of the block axis.

#### 19.3.3

##### Added

- `separatorRole` input, replacing `withRole`.

##### Deprecated

- `withRole` input — use `separatorRole` instead.

#### 19.1.0

##### Added

- `lu-divider` component (`divider`) with the `size`, `vertical` and `withRole` inputs.
- `--components-divider-*` CSS custom properties to customize the divider.

#### 18.2.0

##### Fixed

- Margins and icon color of the divider.
