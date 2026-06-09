# tooltip

## Import

```typescript
import { LuTooltipPanelComponent, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```

## API Reference

### LuTooltipPanelComponent (component)

**Selector:** `lu-tooltip-panel`

### LuTooltipTriggerDirective (directive)

**Selector:** `[luTooltip]`

**exportAs:** `luTooltip`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `luTooltipInput` | `luTooltip` | `string \| SafeHtml` | `''` | — | — | — |
| `luTooltipEnterDelay` | `luTooltipEnterDelay` | `number` | `300` | — | `numberAttribute` | — |
| `luTooltipLeaveDelay` | `luTooltipLeaveDelay` | `number` | `100` | — | `numberAttribute` | — |
| `luTooltipDisabled` | `luTooltipDisabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `luTooltipOnlyForDisplay` | `luTooltipOnlyForDisplay` | `boolean` | `false` | — | `booleanAttribute` | [v18.2] |
| `luTooltipPosition` | `luTooltipPosition` | `LuPopoverPosition` | `'above'` | — | — | — |
| `luTooltipWhenEllipsisInput` | `luTooltipWhenEllipsis` | `boolean` | `false` | — | `booleanAttribute` | — |
| `luTooltipAnchor` | `luTooltipAnchor` | `FlexibleConnectedPositionStrategyOrigin` | `this.#host` | — | — | — |
| `id` | `id` | `string` | ``${this.#host.nativeElement.tagName.toLowerCase(` | — | — | — |

## Related files

- 📝 [Code & implementation](./tooltip.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./tooltip.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.1/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)
- 📋 [Changelog](./tooltip.changelog.md)
