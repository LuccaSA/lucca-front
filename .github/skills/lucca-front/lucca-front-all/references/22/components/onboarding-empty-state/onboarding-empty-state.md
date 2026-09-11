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
| `topRightBackground` | `topRightBackground` | `string \| null` | — | — | — | — |
| `topRightForeground` | `topRightForeground` | `string \| null` | — | — | — | — |
| `bottomLeftBackground` | `bottomLeftBackground` | `string \| null` | — | — | — | — |
| `bottomLeftForeground` | `bottomLeftForeground` | `string \| null` | — | — | — | — |
| `contentBackgroundColor` | `contentBackgroundColor` | `string` | `'var(--pr-t-elevation-surface-default)'` | — | — | — |
| `slotTop` | `slotTop` | `PortalContent` | — | — | — | — |
| `illustration` | `illustration` | `PortalContent` | — | — | — | — |
| `heading` | `heading` | `string` | — | — | — | — |
| `description` | `description` | `PortalContent` | — | — | — | — |
| `hx` | `hx` | `number` | `1` | — | `luNumberAttribute` | — |
| `hxStyle` | `hxStyle` | `number` | `1` | — | `luNumberAttribute` | — |

## Related files

- 🎨 [Design guidelines](./onboarding-empty-state.design.md)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `topRightBackground` : string → string | null, défaut 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-top-right-01.svg' → ∅
~ `topRightForeground` : string → string | null, défaut 'https://cdn.lucca.fr/lucca-front/assets/empty-states/generic/coffee-01.svg' → ∅
~ `bottomLeftBackground` : string → string | null, défaut 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/bubbles-bottom-left-01.svg' → ∅
~ `bottomLeftForeground` : string → string | null, défaut 'https://cdn.lucca.fr/lucca-front/assets/empty-states/poplee/core-hr-01.svg' → ∅
~ `hx` : transform numberAttribute → luNumberAttribute
~ `hxStyle` : transform numberAttribute → luNumberAttribute
