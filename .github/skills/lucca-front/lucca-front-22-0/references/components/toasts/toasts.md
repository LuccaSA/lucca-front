# toasts

## Import

```typescript
import { LuToastsComponent } from '@lucca-front/ng/toast';
```

## API Reference

### LuToastsComponent (component)

**Selector:** `lu-toasts`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `bottom` | `bottom` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `sources` | `sources` | `Array<Observable<LuToastInput>>` | — | — | — | — |
| `intl` | `intl` | `unknown` | — | — | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_TOAST_TRANSLATIONS` | `unknown` | — |

### Services

#### LuToastsService

- `addToast(toastInput: LuToastInput): LuToast`
- `removeToast(toast: LuToast): void`
- `isOnlyDismissibleManually({ duration }: LuToastInput): boolean`

### Modules dépréciés

- ⚠️ `LuToastsModule` — use `LuToastsComponent` instead

## Related files

- 📝 [Code & implementation](./toasts.component.md)
- 🎨 [Design guidelines](./toasts.design.md)
- 🎯 [Figma design tokens](./toasts.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-overlays-toasts--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.2` jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

~ `bottom` : transform ∅ → luBooleanAttribute

### Notes de release (ZeroHeight)

#### 21.3.0

##### Changed

- Long words now wrap (`overflow-wrap`) instead of overflowing the toast.

#### 21.1.3

##### Fixed

- `max-inline-size` of the toasts on narrow viewports.

#### 21.1.0

##### Changed

- `intl` input now accepts partial overrides that are merged with the default translations.

#### 21.0.0

##### Deprecated

- `LuToastsModule` — import the standalone `LuToastsComponent` instead.

#### 20.3.4

##### Fixed

- The Angular component now imports its own styles.

#### 18.3.4

##### Changed

- Toast message is rendered inside a paragraph.

#### 18.2.0

##### Deprecated

- `ILuTranslation` type — use `LuTranslation` instead.

##### Fixed

- Toast position when a footer is present.

#### 18.1.0

##### Added

- `message` now accepts a `PortalContent`.

##### Changed

- Toast UI refactored.
