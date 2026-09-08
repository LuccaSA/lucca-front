# tooltip

## Import

```typescript
import { LuTooltipPanelComponent, LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
```


## API Reference

### LuTooltipPanelComponent (component)

**Selectors:** `lu-tooltip-panel`, `pr-tooltip-panel`






### LuTooltipTriggerDirective (directive)

**Selectors:** `[luTooltip]`, `[prTooltip]`


**exportAs:** `luTooltip`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `luTooltipInput` | `luTooltip` | `string \| SafeHtml` | `''` | — | — | — |
| `prTooltipInput` | `prTooltip` | `string \| SafeHtml` | `''` | — | — | — |
| `luTooltipEnterDelay` | `luTooltipEnterDelay` | `number` | `300` | — | `numberAttribute` | Délai d’apparition du tooltip au survol (en ms). |
| `prTooltipEnterDelay` | `prTooltipEnterDelay` | `number` | `300` | — | `numberAttribute` | — |
| `luTooltipLeaveDelay` | `luTooltipLeaveDelay` | `number` | `100` | — | `numberAttribute` | Délai de disparition du tooltip après la fin du survol (en ms). |
| `prTooltipLeaveDelay` | `prTooltipLeaveDelay` | `number` | `100` | — | `numberAttribute` | — |
| `luTooltipDisabled` | `luTooltipDisabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le tooltip. |
| `prTooltipDisabled` | `prTooltipDisabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `luTooltipOnlyForDisplay` | `luTooltipOnlyForDisplay` | `boolean` | `false` | — | `booleanAttribute` | Affiche un tooltip non restituée par les lecteurs d’écran. À utiliser si la réstitution est déjà portée par l’élément dé… |
| `prTooltipOnlyForDisplay` | `prTooltipOnlyForDisplay` | `boolean` | `false` | — | `booleanAttribute` | — |
| `luTooltipPosition` | `luTooltipPosition` | `'above' \| 'below' \| 'before' \| 'after'` | `'above'` | — | — | Position du tooltip par rapport à son élément déclencheur. |
| `prTooltipPosition` | `prTooltipPosition` | `'above' \| 'below' \| 'before' \| 'after'` | `'above'` | — | — | — |
| `luTooltipWhenEllipsisInput` | `luTooltipWhenEllipsis` | `boolean` | `false` | — | `booleanAttribute` | N’affiche le tooltip que lorsque le contenu de l’élément déclencheur est tronqué par une ellipse. |
| `prTooltipWhenEllipsisInput` | `prTooltipWhenEllipsis` | `boolean` | `false` | — | `booleanAttribute` | — |
| `luTooltipAnchor` | `luTooltipAnchor` | `FlexibleConnectedPositionStrategyOrigin \| LuTooltipAnchorRef \| null \| undefined` | `this.#host` | — | — | — |
| `prTooltipAnchor` | `prTooltipAnchor` | `FlexibleConnectedPositionStrategyOrigin \| LuTooltipAnchorRef \| null \| undefined` | `this.#host` | — | — | — |
| `id` | `id` | `string` | ``${this.#host.nativeElement.tagName.toLowerCase()}-tooltip-${nextId++}`` | — | — | — |







### Modules dépréciés

- ⚠️ `LuTooltipTriggerModule` — use `LuTooltipTriggerDirective` instead
- ⚠️ `LuTooltipModule` — use `LuTooltipTriggerDirective, LuTooltipPanelComponent` instead


## Related files

- 📝 [Code & implementation](./tooltip.component.md)
- 🎨 [Design guidelines](./tooltip.design.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-tooltip-html-css--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LuTooltipPanelComponent`, `LuTooltipTriggerDirective`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Fixed

- Connected overlays are kept out of the push panel zone, so a tooltip is no longer clipped by it.

#### 21.2.5

##### Added

- The tooltip can now be closed with the `Escape` key.

##### Fixed

- Anchor reference resolution and the condition used to display the tooltip.

#### 21.2.4

##### Changed

- Ellipsis detection is batched with `afterRenderEffect` and no longer re-measures on scroll.

#### 21.1.4

##### Fixed

- Precision of the ellipsis detection.

#### 21.1.3

##### Fixed

- Memory leaks and per-cycle layout thrashing of the trigger directive.

#### 21.1.2

##### Fixed

- Reverted the rendering change shipped in `21.1.1`, which broke some tooltips.

#### 21.1.0

##### Changed

- `luTooltip` and `luTooltipWhenEllipsis` are now signal-based inputs.

#### 21.0.4

##### Fixed

- Ellipsis detection is updated when the content changes.

#### 21.0.0

##### Deprecated

- `LuTooltipModule` — import the standalone `LuTooltipTriggerDirective` and `LuTooltipPanelComponent` instead.

##### Fixed

- Generated tooltip `id` no longer collides between triggers.

#### 20.3.2

##### Changed

- Tooltip text is no longer hyphenated.

#### 20.1.3

##### Fixed

- Overflow of long tooltip contents.

#### 20.1.1

##### Added

- `role="button"` is set on the trigger when it is required for accessibility.

#### 20.1.0

##### Added

- `luTooltipAnchor` input to attach the tooltip to an external host element.

#### 19.1.2

##### Fixed

- Freeze caused by tooltips measuring their content too often.

#### 18.3.4

##### Fixed

- Missing `tabindex` on the trigger when the ellipsis logic is not used.

#### 18.3.2

##### Added

- Real time update of the tooltip content.

##### Fixed

- Excessive reflows caused by the ellipsis detection.

#### 18.2.4

##### Added

- The directive is exported as `luTooltip`.

#### 18.2.1

##### Fixed

- Ellipsis calculation.

#### 18.2.0

##### Added

- `luTooltipOnlyForDisplay` input for tooltips that must not be focusable.

##### Fixed

- Native Safari tooltip is no longer displayed on top of the component's one.

#### 18.1.1

##### Fixed

- The tooltip is removed when its trigger is destroyed.

#### 18.1.0

##### Changed

- Trigger directive reworked around a dedicated ellipsis detection system.
