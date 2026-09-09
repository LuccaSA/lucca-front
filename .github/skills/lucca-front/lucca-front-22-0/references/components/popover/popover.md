# popover

## Import

```typescript
import { LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective } from '@lucca-front/ng/popover';
```

## API Reference

### LuPopoverPanelComponent (component)

**Selector:** `lu-popover`

**exportAs:** `LuPopoverPanel`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `template` | `template` | `TemplateRef<unknown>` | — | — | — | — |
| `templateContext` | `templateContext` | `unknown` | `undefined` | — | — | — |
| `inputCloseOnClick` | `inputCloseOnClick` | `boolean` | `false` | — | — | — |
| `inputTrapFocus` | `inputTrapFocus` | `boolean` | `false` | — | — | — |
| `inputScrollStrategy` | `inputScrollStrategy` | `'reposition' \| 'block' \| 'close'` | `'reposition'` | — | — | — |
| `inputPanelClasses` | `inputPanelClasses` | `string` | `''` | — | — | — |
| `inputContentClasses` | `inputContentClasses` | `string` | `''` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `closeOutput` | `closeOutput` | `void` | — |
| `openOutput` | `openOutput` | `void` | — |
| `hoveredOutput` | `hoveredOutput` | `void` | — |

### LuPopoverTargetDirective (directive)

**Selector:** `[luPopoverTarget]`

**exportAs:** `LuPopoverTarget`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPosition` | `luPopoverPosition` | `'above' \| 'below' \| 'before' \| 'after'` | `undefined` | — | — | — |
| `inputAlignment` | `luPopoverAlignment` | `'top' \| 'bottom' \| 'left' \| 'right' \| 'center'` | `undefined` | — | — | — |
| `inputOverlap` | `luPopoverOverlap` | `boolean` | `undefined` | — | — | — |
| `inputOffsetX` | `luPopoverOffsetX` | `number` | `undefined` | — | — | — |
| `inputOffsetY` | `luPopoverOffsetY` | `number` | `undefined` | — | — | — |

### LuPopoverTriggerDirective (directive)

**Selector:** `[luPopover]`

**exportAs:** `LuPopoverTrigger`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPanel` | `luPopover` | `TPanel` | `undefined` | — | — | — |
| `inputTarget` | `luPopoverTarget` | `TTarget` | `undefined` | — | — | — |
| `inputTriggerEvent` | `luPopoverTrigger` | `'click' \| 'hover' \| 'none' \| 'focus'` | `undefined` | — | — | — |
| `inputPosition` | `luPopoverPosition` | `LuPopoverPosition` | `undefined` | — | — | — |
| `inputAlignment` | `luPopoverAlignment` | `LuPopoverAlignment` | `undefined` | — | — | — |
| `inputEnterDelay` | `luPopoverEnterDelay` | `number` | `undefined` | — | — | — |
| `inputLeaveDelay` | `luPopoverLeaveDelay` | `number` | `undefined` | — | — | — |
| `inputDisabled` | `luPopoverDisabled` | `boolean` | `undefined` | — | — | — |
| `inputOverlap` | `luPopoverOverlap` | `boolean` | `undefined` | — | — | — |
| `inputOffsetX` | `luPopoverOffsetX` | `number` | `undefined` | — | — | — |
| `inputOffsetY` | `luPopoverOffsetY` | `number` | `undefined` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `onCloseOutput` | `onCloseOutput` | `void` | — |
| `onOpenOutput` | `onOpenOutput` | `void` | — |

### Modules dépréciés

- ⚠️ `LuPopoverPanelModule` — use `LuPopoverPanelComponent` instead
- ⚠️ `LuPopoverModule` — use `LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective` instead

## Related files

- 📝 [Code & implementation](./popover.component.md)

- 🎯 [Figma design tokens](./popover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-popover--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LuPopoverPanelComponent`, `LuPopoverTargetDirective`, `LuPopoverTriggerDirective`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Fixed

- Connected overlays are kept out of the push panel zone, so a popover is no longer clipped by it.

#### 21.3.0

##### Added

- `luPopoverMaxInlineSize` and `luPopoverMaxBlockSize` inputs to cap the size of the popover panel.

#### 21.1.4

##### Fixed

- The popover no longer opens when its content is `null` or `undefined`.

#### 21.1.0

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 21.0.4

##### Fixed

- Opening position of the panel when the trigger is close to the viewport edge.

#### 21.0.3

##### Added

- The overlay scroll strategy can now be customized.

#### 20.1.1

##### Fixed

- Focus is brought back to the trigger when the popover closes in focus mode.

#### 19.2.4

##### Added

- `luPopoverOpened` output.

#### 19.1.0

##### Added

- `luPopoverAnchor` input to position the popover against another element, and the `luPopoverClosed` output.

#### 18.2.1

##### Added

- The directive is exported as `luPopover2` and exposes a `close()` method.

#### 18.2.0

##### Added

- Option to remove the keyboard close button.
- `hover+focus` trigger mode.

##### Fixed

- The popover is repositioned after its content changes.

#### 18.1.5

##### Fixed

- Focus trap of the popover panel.

#### 18.1.2

##### Changed

- Scroll is no longer blocked while a popover is open.

##### Fixed

- `OverlayRef` recycling, to avoid piling up bounding boxes in the DOM.

#### 18.1.0

##### Added

- `[luPopover2]` directive and `lu-popover-content` component, with the `luPopoverTrigger`, `luPopoverPosition` and `intl` inputs.
