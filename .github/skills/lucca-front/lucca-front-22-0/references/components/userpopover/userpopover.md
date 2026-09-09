# userpopover

## Import

```typescript
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
```

## API Reference

### LuUserPopoverComponent (component)

**Selector:** `lu-user-popover-content`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### LuUserPopoverDirective (directive)

**Selector:** `[luUserPopover]`

**exportAs:** `LuUserPopoverDirective`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `luPopover2` | `luPopover2` | `TemplateRef<unknown> \| Type<unknown>` | — | — | — | — |
| `luPopoverPosition` | `luPopoverPosition` | `PopoverPosition \| null` | `null` | — | — | — |
| `luPopoverMaxBlockSize` | `luPopoverMaxBlockSize` | `string \| null` | `null` | — | — | — |
| `luPopoverMaxInlineSize` | `luPopoverMaxInlineSize` | `string \| null` | `null` | — | — | — |
| `overlayScrollStrategy` | `overlayScrollStrategy` | `'reposition' \| 'block' \| 'close'` | `'reposition'` | — | — | — |
| `luPopoverDisabledInput` | `luPopoverDisabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `customPositionsInput` | `customPositions` | `ConnectionPositionPair[] \| null` | `null` | — | — | — |
| `luPopoverNoCloseButtonInput` | `luPopoverNoCloseButton` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `luPopoverAnchor` | `luPopoverAnchor` | `FlexibleConnectedPositionStrategyOrigin` | `this.elementRef` | — | — | — |
| `luPopoverIgnoredOutsidePointerTargets` | `luPopoverIgnoredOutsidePointerTargets` | `HTMLElement \| HTMLElement[] \| null` | `null` | — | — | — |
| `luPopoverOpenDelay` | `luPopoverOpenDelay` | `number` | `300` | — | `luNumberAttribute` | — |
| `luPopoverCloseDelay` | `luPopoverCloseDelay` | `number` | `100` | — | `luNumberAttribute` | — |
| `luUserPopover` | `luUserPopover` | `ILuUser` | — | ✅ | — | — |
| `luUserPopoverDisabled` | `luUserPopoverDisabled` | `boolean` | `false` | — | — | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `luPopoverClosed` | `luPopoverClosed` | `void` | — |
| `luPopoverOpened` | `luPopoverOpened` | `void` | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `luPopoverTrigger` | `'click' \| 'click+hover' \| 'hover+focus'` | — | — |

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuUserPopover` | `()` | ⚠️ **Déprécié** : no longer needed as user popover uses `luPopover2`  |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_POPUP_EMPLOYEE_TRANSLATIONS` | `unknown` | — |
| `LU_USER_POPOVER_USER` | `Signal<ILuUser>` | — |
| `USER_POPOVER_IS_ACTIVATED` | `Observable<boolean>` | ⚠️ **Déprécié** : no longer needed as popover is always activated  |

## Related files

- 📝 [Code & implementation](./userpopover.component.md)
- 🎨 [Design guidelines](./userpopover.design.md)
- 🎯 [Figma design tokens](./userpopover.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-users-display-userpopover--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`LuUserPopoverDirective` :
  + `luPopoverIgnoredOutsidePointerTargets` : HTMLElement | HTMLElement[] | null
  ~ `luPopoverDisabled` : transform booleanAttribute → luBooleanAttribute
  ~ `customPositions` : unknown → ConnectionPositionPair[] | null, défaut ∅ → null
  ~ `luPopoverNoCloseButton` : transform booleanAttribute → luBooleanAttribute
  ~ `luPopoverOpenDelay` : transform ∅ → luNumberAttribute
  ~ `luPopoverCloseDelay` : transform ∅ → luNumberAttribute
  ~ `luUserPopoverDisabled` : défaut ∅ → false
