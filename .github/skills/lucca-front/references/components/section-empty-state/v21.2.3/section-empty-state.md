# section-empty-state

## Import

```typescript
import { EmptyStatePageIllustration, EmptyStatePageComponent, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
```

## API Reference

### EmptyStatePageIllustration (component)

**Selector:** `lu-empty-state-page-illustration`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `src` | `src` | `string \| null` | `null` | — | — | — |
| `alt` | `alt` | `string \| null` | `''` | — | — | — |

### EmptyStatePageComponent (component)

**Selector:** `lu-empty-state-page`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string \| null` | `null` | — | — | — |
| `topRightBackground` | `topRightBackground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg'` | — | — | — |
| `topRightForeground` | `topRightForeground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg'` | — | — | — |
| `bottomLeftBackground` | `bottomLeftBackground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg'` | — | — | — |
| `bottomLeftForeground` | `bottomLeftForeground` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg'` | — | — | — |
| `contentBackgroundColor` | `contentBackgroundColor` | `string` | `'var(--pr-t-elevation-surface-default` | — | — | — |
| `slotTop` | `slotTop` | `PortalContent` | — | — | — | — |
| `illustration` | `illustration` | `PortalContent` | — | — | — | — |
| `heading` | `heading` | `string` | — | — | — | — |
| `description` | `description` | `PortalContent` | — | — | — | — |
| `hx` | `hx` | `number` | `1` | — | `numberAttribute` | — |
| `hxStyle` | `hxStyle` | `number` | `1` | — | `numberAttribute` | — |

### EmptyStateSectionComponent (component)

**Selector:** `lu-empty-state-section`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string \| null` | `null` | — | — | — |
| `illustration` | `illustration` | `BubbleIllustration \| string \| null` | `null` | — | — | — |
| `action` | `action` | `boolean` | `false` | — | `booleanAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |
| `heading` | `heading` | `string` | — | — | — | — |
| `description` | `description` | `PortalContent` | — | — | — | — |
| `hx` | `hx` | `number` | `3` | — | `numberAttribute` | — |

## Related files

- 🎨 [Design guidelines](./design/_index.md)

- 📋 [Changelog](../section-empty-state.changelog.md)
