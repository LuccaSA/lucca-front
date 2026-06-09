# callout-disclosure

## Import

```typescript
import { CalloutActionsComponent, CalloutDisclosureComponent, CalloutFeedbackListComponent, CalloutPopoverComponent, CalloutComponent } from '@lucca-front/ng/callout';
```

## API Reference

### CalloutActionsComponent (component)

**Selector:** `lu-callout-actions`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inline` | `inline` | `boolean` | `false` | — | `booleanAttribute` | — |

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

### CalloutFeedbackListComponent (component)

**Selector:** `ul[lu-callout-feedback-list]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `palette` | `palette` | `Palette` | — | — | — | — |
| `size` | `size` | `'M' \| 'S'` | — | — | — | — |

### CalloutPopoverComponent (component)

**Selector:** `lu-callout-popover`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `openDelay` | `openDelay` | `number` | `50` | — | `numberAttribute` | — |
| `closeDelay` | `closeDelay` | `number` | `500` | — | `numberAttribute` | — |
| `buttonLabel` | `buttonLabel` | `string` | — | — | — | — |
| `buttonAlt` | `buttonAlt` | `string` | `''` | — | — | — |
| `headingHiddenIfSingleItem` | `headingHiddenIfSingleItem` | `boolean` | `false` | — | `booleanAttribute` | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S' \| 'XS'` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | — |
| `heading` | `heading` | `PortalContent` | — | — | — | — |

### CalloutComponent (component)

**Selector:** `lu-callout`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `heading` | `heading` | `PortalContent` | — | — | — | — |
| `palette` | `palette` | `Palette` | `'none'` | — | — | — |
| `size` | `size` | `'M' \| 'S'` | — | — | — | — |
| `state` | `state` | `'success' \| 'warning' \| 'error'` | — | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |
| `removable` | `removable` | `boolean` | `false` | — | `booleanAttribute` | — |
| `removed` | `removed` | `boolean` | `false` | — | `booleanAttribute` | — |
| `iconAlt` | `iconAlt` | `string \| null` | `null` | — | — | — |
| `AI` | `AI` | `boolean` | `false` | — | `booleanAttribute` | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `removedChange` | `removedChange` | `boolean` |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 567 available values

## Related files

- 📝 [Code & implementation](./callout-disclosure.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./callout-disclosure.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-feedback-callout-disclosure-angular--docs)
- 📋 [Changelog](./callout-disclosure.changelog.md)
