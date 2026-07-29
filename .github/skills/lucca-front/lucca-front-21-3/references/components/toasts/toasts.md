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
| `bottom` | `bottom` | `boolean` | `false` | — | — | — |
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
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-overlays-toasts--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.1.0

+ `intl` : unknown

### 21.0.0

Composant introduit (`LuToastsComponent`).
