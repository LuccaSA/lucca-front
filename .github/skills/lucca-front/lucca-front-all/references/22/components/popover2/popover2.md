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
| `intl` | `intl` | `unknown` | — | — | — | — |
| `luPopover2` | `luPopover2` | `TemplateRef<unknown> \| Type<unknown>` | — | — | — | — |
| `luPopoverPosition` | `luPopoverPosition` | `PopoverPosition \| null` | `null` | — | — | Position du popover par rapport à son déclencheur. |
| `luPopoverMaxBlockSize` | `luPopoverMaxBlockSize` | `string \| null` | `null` | — | — | Modifie la hauteur max de la popover. |
| `luPopoverMaxInlineSize` | `luPopoverMaxInlineSize` | `string \| null` | `null` | — | — | — |
| `overlayScrollStrategy` | `overlayScrollStrategy` | `'reposition' \| 'block' \| 'close'` | `'reposition'` | — | — | [v21.1] Comportement du popover lors du scroll. |
| `luPopoverDisabledInput` | `luPopoverDisabled` | `boolean` | `false` | — | `luBooleanAttribute` | Désactive le popover. |
| `customPositionsInput` | `customPositions` | `ConnectionPositionPair[] \| null` | `null` | — | — | — |
| `luPopoverNoCloseButtonInput` | `luPopoverNoCloseButton` | `boolean` | `false` | — | `luBooleanAttribute` | Masque le bouton de fermeture du popover visible à la navigation clavier. |
| `luPopoverAnchor` | `luPopoverAnchor` | `FlexibleConnectedPositionStrategyOrigin` | `this.elementRef` | — | — | — |
| `luPopoverIgnoredOutsidePointerTargets` | `luPopoverIgnoredOutsidePointerTargets` | `HTMLElement \| HTMLElement[] \| null` | `null` | — | — | — |
| `luPopoverOpenDelay` | `luPopoverOpenDelay` | `number` | `300` | — | `luNumberAttribute` | Délai en millisecondes avant ouverture du popover. |
| `luPopoverCloseDelay` | `luPopoverCloseDelay` | `number` | `100` | — | `luNumberAttribute` | Délai en millisecondes avant fermeture du popover. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `luPopoverClosed` | `luPopoverClosed` | `void` | — |
| `luPopoverOpened` | `luPopoverOpened` | `void` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `luPopoverTrigger` | `'click' \| 'click+hover' \| 'hover+focus'` | — | — |

### PopoverContentComponent (component)

**Selector:** `lu-popover-content`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |



### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `configureLuPopover` | `(): EnvironmentProviders` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_POPOVER2_TRANSLATIONS` | `unknown` | — |
| `POPOVER_CONFIG` | `PopoverConfig` | — |





## Related files

- 📝 [Code & implementation](./popover2.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-popover2-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`PopoverDirective`, `PopoverContentComponent`).
