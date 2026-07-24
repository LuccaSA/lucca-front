# modal

## Import

```typescript
import { LuModalPanelComponent, LuModalPanelComponentDefaultCD } from '@lucca-front/ng/modal';
```

## API Reference

### LuModalPanelComponent (component)

**Selector:** `lu-modal-panel`

### LuModalPanelComponentDefaultCD (component)

**Selector:** `lu-modal-panel-default`

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuModal` | `(): Provider[]` | Provide LuModal. Note that OverlayModule should be imported in one of the EnvironmentInjectors (AppModule, lazy-loaded route) using `providers: [importProvidersFrom(OverlayModule)]`. |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_MODAL_DATA` | `unknown` | Injection token that can be used to access the data that was passed in to a dialog. |
| `LU_MODAL_CONFIG` | `LuModalConfig` | — |
| `LU_MODAL_REF_FACTORY` | `IModalRefFactory` | — |
| `LU_MODAL_TRANSLATIONS` | `unknown` | — |

### Services

#### LuModalRefFactory

- `forge<T extends ILuModalContent, C extends LuModalConfig, D, R>(component: ComponentType<T>, config: C)`
#### LuModal

- `open<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuModalRef<D, LuModalContentResult<T>>`
- `legacyOpen<T extends ILuModalContent, D>(component: ComponentType<T>, data: D = undefined, config: Partial<LuModalConfig> = {}): ILuModalRef<D, LuModalContentResult<T>>`

### Modules dépréciés

- ⚠️ `LuModalModule` — use `OverlayModule, DialogModule` imports && provide `provideLuModal(), LuDialogService` instead

## Related files

- 📝 [Code & implementation](./modal.component.md)
- 🎨 [Design guidelines](./design/_index.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-overlays-modal--docs)
- 📋 [Changelog](./modal.changelog.md)
