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
| `luPopoverAnchor` | `luPopoverAnchor` | `FlexibleConnectedPositionStrategyOrigin` | `this.elementRef` | — | — | — |
| `luPopoverOpenDelay` | `luPopoverOpenDelay` | `number` | `300` | — | — | — |
| `luPopoverCloseDelay` | `luPopoverCloseDelay` | `number` | `100` | — | — | — |
| `content` | `luPopover2` | `TemplateRef<unknown> \| Type<unknown>` | — | — | — | — |
| `luPopoverPosition` | `luPopoverPosition` | `PopoverPosition` | `'above'` | — | — | — |
| `overlayScrollStrategy` | `overlayScrollStrategy` | `'reposition' \| 'block' \| 'close'` | `'reposition'` | — | — | [v21.1] |
| `luPopoverDisabled` | `luPopoverDisabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `customPositions` | `customPositions` | `unknown` | — | — | — | — |
| `luPopoverNoCloseButton` | `luPopoverNoCloseButton` | `boolean` | `false` | — | `booleanAttribute` | [v18.2] |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `luPopoverClosed` | `luPopoverClosed` | `void` |
| `luPopoverOpened` | `luPopoverOpened` | `void` |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `luPopoverTrigger` | `'click' | 'click+hover' | 'hover+focus'` | — |

### PopoverContentComponent (component)

**Selector:** `lu-popover-content`

## Related files

- 📝 [Code & implementation](./popover2.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.3/storybook/?path=/docs/documentation-overlays-popover2-angular--docs)
- 📋 [Changelog](./popover2.changelog.md)
