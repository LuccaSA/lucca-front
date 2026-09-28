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
| `luPopoverPosition` | `luPopoverPosition` | `PopoverPosition \| null` | `null` | — | — | Position du popover par rapport à son déclencheur. |
| `luPopoverAnchor` | `luPopoverAnchor` | `FlexibleConnectedPositionStrategyOrigin` | `this.elementRef` | — | — | — |
| `luPopoverOpenDelay` | `luPopoverOpenDelay` | `number` | `300` | — | — | Délai en millisecondes avant ouverture du popover. |
| `luPopoverCloseDelay` | `luPopoverCloseDelay` | `number` | `100` | — | — | Délai en millisecondes avant fermeture du popover. |
| `content` | `luPopover2` | `TemplateRef<unknown> \| Type<unknown>` | — | — | — | — |
| `overlayScrollStrategy` | `overlayScrollStrategy` | `'reposition' \| 'block' \| 'close'` | `'reposition'` | — | — | [v21.1] Comportement du popover lors du scroll. |
| `luPopoverDisabled` | `luPopoverDisabled` | `boolean` | `false` | — | `booleanAttribute` | Désactive le popover. |
| `customPositions` | `customPositions` | `unknown` | — | — | — | — |
| `luPopoverNoCloseButton` | `luPopoverNoCloseButton` | `boolean` | `false` | — | `booleanAttribute` | Masque le bouton de fermeture du popover visible à la navigation clavier. |

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

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-overlays-popover2-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.2.5`. Les versions sans changement d'API sont omises.

### 21.2.0

`PopoverDirective` :
  ~ `luPopoverPosition` : 'above' | 'below' | 'before' | 'after' → PopoverPosition | null, défaut 'above' → null

### 21.1.0

`PopoverDirective` :
  + `intl` : unknown
`PopoverContentComponent` :
  + `intl` : unknown

### 21.0.4

`PopoverDirective` :
  ~ `luPopoverPosition` : PopoverPosition → 'above' | 'below' | 'before' | 'after'

### 21.0.3

`PopoverDirective` :
  + `overlayScrollStrategy` : 'reposition' | 'block' | 'close'

### 21.0.0

Composant introduit (`PopoverDirective`, `PopoverContentComponent`).
