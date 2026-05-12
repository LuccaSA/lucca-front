# popover2

## Import

```typescript
import { PopoverDirective, PopoverContentComponent } from '@lucca-front/ng/popover2';
```

## API Reference

### PopoverDirective (directive)

**Selector:** `[luPopover2]`

**exportAs:** `luPopover2`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `content` | `luPopover2` | `TemplateRef<unknown> \| Type<unknown>` | — | — | — | — |
| `luPopoverPosition` | `luPopoverPosition` | `PopoverPosition` | `'above'` | — | — | — |
| `luPopoverDisabled` | `luPopoverDisabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `customPositions` | `customPositions` | `unknown` | — | — | — | — |
| `luPopoverNoCloseButton` | `luPopoverNoCloseButton` | `boolean` | `false` | — | `booleanAttribute` | [v18.2] |

### PopoverContentComponent (component)

**Selector:** `lu-popover-content`

## Related files

- 📝 [Code & implementation](./popover2.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.1/storybook/?path=/docs/documentation-overlays-popover2-angular--docs)
- 📋 [Changelog](../popover2.changelog.md)
