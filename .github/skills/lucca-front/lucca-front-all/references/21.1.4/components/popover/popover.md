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
| `templateContext` | `template-context` | `unknown` | — | — | — | — |
| `inputCloseOnClick` | `close-on-click` | `boolean` | — | — | — | — |
| `inputTrapFocus` | `trap-focus` | `boolean` | — | — | — | — |
| `inputScrollStrategy` | `scroll-strategy` | `LuPopoverScrollStrategy` | — | — | — | — |
| `inputPanelClasses` | `panel-classes` | `string` | — | — | — | — |
| `inputContentClasses` | `content-classes` | `string` | — | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `close` | `close` | `void` |
| `open` | `open` | `void` |
| `hovered` | `hovered` | `boolean` |

### LuPopoverTargetDirective (directive)

**Selector:** `[luPopoverTarget]`

**exportAs:** `LuPopoverTarget`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPosition` | `luPopoverPosition` | `LuPopoverPosition` | — | — | — | — |
| `inputAlignment` | `luPopoverAlignment` | `LuPopoverAlignment` | — | — | — | — |
| `inputOverlap` | `luPopoverOverlap` | `boolean` | — | — | — | — |
| `inputOffsetX` | `luPopoverOffsetX` | `number` | — | — | — | — |
| `inputOffsetY` | `luPopoverOffsetY` | `number` | — | — | — | — |

### LuPopoverTriggerDirective (directive)

**Selector:** `[luPopover]`

**exportAs:** `LuPopoverTrigger`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `inputPanel` | `luPopover` | `TPanel` | — | — | — | — |
| `inputTarget` | `luPopoverTarget` | `TTarget` | — | — | — | — |
| `inputTriggerEvent` | `luPopoverTrigger` | `LuPopoverTriggerEvent` | — | — | — | — |
| `inputPosition` | `luPopoverPosition` | `LuPopoverPosition` | — | — | — | — |
| `inputAlignment` | `luPopoverAlignment` | `LuPopoverAlignment` | — | — | — | — |
| `inputEnterDelay` | `luPopoverEnterDelay` | `number` | — | — | — | — |
| `inputLeaveDelay` | `luPopoverLeaveDelay` | `number` | — | — | — | — |
| `inputDisabled` | `luPopoverDisabled` | `boolean` | — | — | — | — |
| `inputOverlap` | `luPopoverOverlap` | `boolean` | — | — | — | — |
| `inputOffsetX` | `luPopoverOffsetX` | `number` | — | — | — | — |
| `inputOffsetY` | `luPopoverOffsetY` | `number` | — | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `onOpen` | `luPopoverOnOpen` | `void` |
| `onClose` | `luPopoverOnClose` | `void` |

## Related files

- 📝 [Code & implementation](./popover.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./popover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-overlays-popover--docs)
- 📋 [Changelog](./popover.changelog.md)
