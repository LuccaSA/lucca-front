# empty-state

## Import

```typescript
import { EmptyStatePageComponent, EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
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
| `contentBackgroundColor` | `contentBackgroundColor` | `string` | `'var(--pr-t-elevation-surface-default` | — | — | — |
| `slotTop` | `slotTop` | `PortalContent` | — | — | — | [v19.3] Optional, Add content above heading. |
| `heading` | `heading` | `string` | — | — | — | [v18.1] Optional |
| `description` | `description` | `PortalContent` | — | — | — | [v18.1] Optional |
| `hx` | `hx` | `number` | `1` | — | `numberAttribute` | [v18.1] |

### EmptyStateSectionComponent (component)

**Selector:** `lu-empty-state-section`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `icon` | `icon` | `string` | `'https://cdn.lucca.fr/lucca-front/assets/empty-states/icons/iconBanknote.svg'` | — | — | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `center` | `center` | `boolean` | `false` | — | `booleanAttribute` | — |
| `heading` | `heading` | `string` | — | — | — | [v18.1] Optional |
| `description` | `description` | `PortalContent` | — | — | — | [v18.1] Optional |
| `hx` | `hx` | `number` | `3` | — | `numberAttribute` | [v18.1] |

## Related files

- 📝 [Code & implementation](./empty-state.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./empty-state.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-feedback-empty-state-angular-page--docs)
- 📋 [Changelog](./empty-state.changelog.md)
