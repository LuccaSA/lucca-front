# callout-disclosure

## Import

```typescript
import { CalloutDisclosureComponent } from '@lucca-front/ng/callout';
```

## API Reference

### CalloutDisclosureComponent (component)

**Selector:** `lu-callout-disclosure`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | ✅ | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S'` | `'M'` | — | — | — |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | — |
| `open` | `open` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `openChange` | `openChange` | `boolean` |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 567 available values

## Related files

- 📝 [Code & implementation](./callout-disclosure.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./callout-disclosure.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- 📋 [Changelog](./callout-disclosure.changelog.md)
