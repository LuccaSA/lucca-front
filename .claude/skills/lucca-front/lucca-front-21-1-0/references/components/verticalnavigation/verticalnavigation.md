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
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le composant. |

### VerticalNavigationComponent (component)

**Selector:** `lu-vertical-navigation`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | ✅ | — | Titre de la section. |
| `level` | `level` | `number` | `3` | — | — | — |

### VerticalNavigationGroupComponent (component)

**Selector:** `lu-vertical-navigation-group`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `PortalContent` | — | ✅ | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le composant. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `expanded` | `unknown` | — |

### VerticalNavigationItemComponent (component)

**Selector:** `lu-vertical-navigation-item`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string \| null` | `null` | — | — | — |
| `icon` | `icon` | `LuccaIcon \| null` | `null` | — | — | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le composant. |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `expanded` | `unknown` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./verticalnavigation.component.md)

- 🎯 [Figma design tokens](./verticalnavigation.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-navigation-verticalnavigation-angular-disabled--docs)
- 📋 [Changelog](./verticalnavigation.changelog.md)
