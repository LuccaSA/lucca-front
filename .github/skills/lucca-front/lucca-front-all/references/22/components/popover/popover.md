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


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-popover--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`LuPopoverPanelComponent`, `LuPopoverTargetDirective`, `LuPopoverTriggerDirective`).
