# verticalnavigation

## Import

```typescript
import { VerticalNavigationLinkComponent, VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent } from '@lucca-front/ng/vertical-navigation';
```


## API Reference

### VerticalNavigationLinkComponent (component)

**Selectors:** `span[luVerticalNavigationLink]`, `a[luVerticalNavigationLink]`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le composant. |



### VerticalNavigationComponent (component)

**Selector:** `lu-vertical-navigation`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent \| null` | `null` | — | — | Titre de la section. [PortalContent] |
| `level` | `level` | `number` | `3` | — | `luNumberAttribute` | — |



### VerticalNavigationGroupComponent (component)

**Selector:** `lu-vertical-navigation-group`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le composant. |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |

### VerticalNavigationItemComponent (component)

**Selector:** `lu-vertical-navigation-item`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string \| null` | `null` | — | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le composant. |


#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `expanded` | `unknown` | — | — |






## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 585 available values


## Related files

- 📝 [Code & implementation](./verticalnavigation.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-navigation-verticalnavigation-angular-disabled--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`VerticalNavigationLinkComponent`, `VerticalNavigationComponent`, `VerticalNavigationGroupComponent`, `VerticalNavigationItemComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Changed

- `heading` input is now optional.

#### 21.0.0

##### Added

- `lu-vertical-navigation` component (`verticalNavigation`) with the `heading` input.
- `lu-vertical-navigation-group` and `lu-vertical-navigation-item` components, with the `label`, `icon`, `level`, `expanded` and `disabled` inputs.
- `[luVerticalNavigationLink]` directive for `a` and `span` elements.

#### 18.2.0

##### Changed

- Colors of the disabled entries.
