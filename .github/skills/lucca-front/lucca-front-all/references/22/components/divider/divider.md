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
| `separatorRole` | `separatorRole` | `boolean` | `false` | — | `luBooleanAttribute` | Permet de restituer Divider comme un séparateur natif (hr). Son éventuel contenu textuel ne sera alors plus restitué. |
| `vertical` | `vertical` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `size` | `size` | `DividerSize \| null` | `null` | — | — | — |
| `withRole` | `withRole` | `boolean` | `false` | — | `luBooleanAttribute` | ⚠️ **Déprécié** : Déprécié.  |









## Related files

- 📝 [Code & implementation](./divider.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-structure-divider-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`DividerComponent`).

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
