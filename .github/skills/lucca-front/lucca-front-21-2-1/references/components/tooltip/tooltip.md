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
| `luTooltipEnterDelay` | `luTooltipEnterDelay` | `number` | `300` | — | `numberAttribute` | Délai d’apparition du tooltip au survol (en ms). |
| `luTooltipLeaveDelay` | `luTooltipLeaveDelay` | `number` | `100` | — | `numberAttribute` | Délai de disparition du tooltip après la fin du survol (en ms). |
| `luTooltipDisabled` | `luTooltipDisabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le tooltip. |
| `luTooltipOnlyForDisplay` | `luTooltipOnlyForDisplay` | `boolean` | `false` | — | `booleanAttribute` | Affiche un tooltip non restituée par les lecteurs d’écran. À utiliser si la réstitution est déjà portée par l’élément dé… |
| `luTooltipPosition` | `luTooltipPosition` | `LuPopoverPosition` | `'above'` | — | — | Position du tooltip par rapport à son élément déclencheur. |
| `luTooltipWhenEllipsisInput` | `luTooltipWhenEllipsis` | `boolean` | `false` | — | `booleanAttribute` | N’affiche le tooltip que lorsque le contenu de l’élément déclencheur est tronqué par une ellipse. |
| `luTooltipAnchor` | `luTooltipAnchor` | `FlexibleConnectedPositionStrategyOrigin` | `this.#host` | — | — | — |
| `id` | `id` | `string` | ``${this.#host.nativeElement.tagName.toLowerCase(` | — | — | — |

## Related files

- 📝 [Code & implementation](./tooltip.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./tooltip.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)
- 📋 [Changelog](./tooltip.changelog.md)
