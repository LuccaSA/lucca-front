# onboarding-empty-state

## Import

```typescript
import { EmptyStatePageComponent } from '@lucca-front/ng/empty-state';
```

## API Reference

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
| `contentBackgroundColor` | `contentBackgroundColor` | `string` | `'var(--pr-t-elevation-surface-default)'` | — | — | — |
| `slotTop` | `slotTop` | `PortalContent` | — | — | — | — |
| `illustration` | `illustration` | `PortalContent` | — | — | — | — |
| `heading` | `heading` | `string` | — | — | — | — |
| `description` | `description` | `PortalContent` | — | — | — | — |
| `hx` | `hx` | `number` | `1` | — | `numberAttribute` | — |
| `hxStyle` | `hxStyle` | `number` | `1` | — | `numberAttribute` | — |

## Related files

- 🎨 [Design guidelines](./design/_index.md)

- 📋 [Changelog](./onboarding-empty-state.changelog.md)
