# dialog

## Import

```typescript
import { DialogContentComponent, DialogFooterComponent, DialogHeaderAction, DialogHeaderSubtitle, DialogHeaderComponent, DialogRoutingContainerComponent, DialogComponent, DialogCloseDirective, DialogDismissDirective, DialogOpenDirective } from '@lucca-front/ng/dialog';
```

## Basic Usage

```html
<div class="dialog_backdrop"></div>
<div role="dialog" aria-modal="true" aria-labelledby="dialogInsideHeaderTitle1" class="dialog "> <div class="dialog-inside"> <form class="dialog-inside-formOptional"> <header class="dialog-inside-header"> <button type="button" class="dialog-inside-header-button button"> <span class="lucca-icon icon-signClose" aria-hidden="true"></span> <span class="pr-u-mask">Fermer</span> </button> <div class="dialog-inside-header-container"> <h1 class="dialog-inside-header-container-title" id="dialogInsideHeaderTitle1">Title</h1> </div> </header> <div class="dialog-inside-content">dialog</div> <footer class="dialog-inside-footer footer"> <div class="footer-actions"> <button type="submit" class="button">Action</button> <button type="button" class="button mod-ghost">Action</button> </div> </footer> </form> </div>
</div>
```

## API Reference

### DialogContentComponent (component)

**Selector:** `lu-dialog-content`

### DialogFooterComponent (component)

**Selector:** `lu-dialog-footer`

### DialogHeaderAction (directive)

**Selector:** `[dialogHeaderAction]`

### DialogHeaderSubtitle (directive)

**Selector:** `[dialogHeaderSubtitle]`

### DialogHeaderComponent (component)

**Selector:** `lu-dialog-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### DialogRoutingContainerComponent (component)

**Selector:** `lu-dialog-routing-container`

### DialogComponent (component)

**Selector:** `lu-dialog`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `stacked` | `stacked` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `fancyIllustration` | `fancyIllustration` | `'approval' \| 'checklist' \| 'email' \| 'install' \| 'mapping' \| 'save' \| 'users' \| 'welcome' \| 'payment-card'` | `'welcome'` | — | — | Modifie l’illustration affichée dans la Fancy dialog. |
| `fancyIllustrationUrl` | `fancyIllustrationUrl` | `string \| null` | `null` | — | — | Surcharge l’illustration avec une URL personnalisée. |

### DialogCloseDirective (directive)

**Selector:** `[luDialogClose]`

### DialogDismissDirective (directive)

**Selector:** `[luDialogDismiss]`

### DialogOpenDirective (directive)

**Selector:** `[luDialogOpen]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dialog` | `luDialogOpen` | `TemplateRef<void>` | — | ✅ | — | — |
| `luDialogConfig` | `luDialogConfig` | `LuDialogConfig<unknown>` | — | — | — | — |

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideDialogRoutingReuseStrategy` | `(): EnvironmentProviders` | — |
| `configureLuDialog` | `(): EnvironmentProviders` | — |
| `provideLuDialog` | `(): Provider` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_DIALOG_HEADER_TRANSLATIONS` | `unknown` | — |
| `DIALOG_ROUTE_CLOSE_TRIGGER` | `DialogRouteCloseTrigger` | — |
| `DIALOG_ROUTE_DISMISS_TRIGGER` | `DialogRouteDismissTrigger` | — |
| `DIALOG_ROUTE_CONFIG` | `DialogRouteConfig<unknown>` | — |

### Services

#### LuDialogService

- `open<C, TData = LuDialogData<C>>(config: LuDialogConfig<C, NoInfer<TData>>): LuDialogRef<C, TData>`

## Related files

- 📝 [Code & implementation](./dialog.component.md)
- 🎨 [Design guidelines](./dialog.design.md)
- 🎯 [Figma design tokens](./dialog.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-dialog-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

`DialogComponent` :
  ~ `stacked` : transform booleanAttribute → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `aria` attributes on the dialog trigger.
- `DIALOG_FANCY_ILLUSTRATION` constant and `DialogFancyIllustration` type are now publicly exported.

##### Fixed

- Optional form handling inside a dialog.

#### 21.2.3

##### Added

- Subtitle support in the cover layout of the dialog header, through a dedicated slot.

#### 21.2.2

##### Fixed

- Size of the `mod-fancy` dialog.

#### 21.2.1

##### Fixed

- Padding of the `mod-fancy` dialog.

#### 21.2.0

##### Added

- `mod-fancy` dialog variant, with a configurable illustration URL.
- `maxContent` size, and `fromBottom` behaviour for the `S` drawer.

##### Fixed

- Position of the close button and UI of the dialog buttons.

#### 21.1.3

##### Fixed

- Rendering of stacked dialogs.

#### 21.1.0

##### Added

- `resize()` method on the dialog reference, with an animation option.
- `provideDialogRoutingReuseStrategy()` provider for dialogs opened through routes.

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 21.0.4

##### Fixed

- Layout of the dialog header.
- `display` is no longer forced with `!important`.
- Outlet configuration is applied to the parent route in the dialog factories.

#### 21.0.3

##### Fixed

- Selector used by the dialog routing.
- Double gap when the dialog has no action.

#### 21.0.0

##### Changed

- Radius, margins and nesting of the dialogs.

#### 20.3.4

##### Changed

- Close button now relies on `luButton`.

##### Fixed

- Overflow of long dialog titles.

#### 20.3.3

##### Fixed

- `canMatch` is applied on the main route so sibling routes are reached correctly.

#### 20.3.1

##### Fixed

- Shadow of the dialog footer.

#### 20.3.0

##### Added

- A dialog can display a component given through the router.
- `XXL` drawer variant.

##### Fixed

- `canDeactivate` is called the expected number of times.

#### 20.2.2

##### Fixed

- `focus-visible` state while scrolling inside a dialog.

#### 20.2.1

##### Fixed

- `NoInfer` added on the dialog `data` typing.

#### 20.2.0

##### Added

- Content slot for the dialog actions.

#### 20.1.3

##### Fixed

- Scroll inside dialogs opened through routing.

#### 20.1.1

##### Fixed

- Missing public exports.

#### 20.1.0

##### Added

- The `data` config type can now be overridden.

#### 19.3.3

##### Fixed

- Overlay detachments are treated as a dismissal, and the `submitting` event is emitted reliably.

#### 19.3.0

##### Added

- `canDeactivate` guards are supported in `dialogRoutingConfig`.

#### 19.1.1

##### Fixed

- Closing a dialog that contains a popover.

#### 18.3.3

##### Fixed

- `_addAriaLabelledBy` call in the dialog header is now null-safe.

#### 18.3.0

##### Added

- Internal scroll of the dialog content.
- `mod-neutral` background variant.

##### Changed

- The dialog grid uses a subgrid and handles overflow.
- `dialogRouteFactory` handles all `Route` config options.

#### 18.2.0

##### Added

- Dialogs can be opened through routes (`dialog-routing`).

##### Fixed

- Footer rendering on Safari.

#### 18.1.4

##### Fixed

- `content` is no longer `null` when using `[luDialogConfig]` in a template-driven approach.

#### 18.1.2

##### Added

- Closing can be disabled specifically for backdrop clicks.

##### Changed

- Long dialog titles break onto several lines.
- `header` and `footer` roles removed from the dialog markup.

#### 18.1.0

##### Fixed

- Autofocus of the first input when the dialog opens.
