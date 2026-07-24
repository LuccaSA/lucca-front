# select-templating

## Import

```typescript
import { LuCoreSelectTotalCountDirective, LuCoreSelectNoClueDirective, LuDisabledOptionDirective, LuOptionGroupDirective, LuOptionDirective, LuCoreSelectPanelHeaderDirective } from '@lucca-front/ng/core-select';
```

## API Reference

### LuCoreSelectTotalCountDirective (directive)

**Selectors:** `lu-simple-select[totalCount]`, `lu-multi-select[totalCount]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `totalCount` | `totalCount` | `number` | — | ✅ | — | — |

### LuCoreSelectNoClueDirective (directive)

**Selectors:** `lu-simple-select[noClue]`, `lu-multi-select[noClue]`

### LuDisabledOptionDirective (directive)

**Selector:** `[luDisabledOption]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `isDisabled` | `luDisabledOption` | `boolean \| null` | — | — | — | — |

### LuOptionGroupDirective (directive)

**Selector:** `[luOptionGroup]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `select` | `luOptionGroupSelect` | `ALuSelectInputComponent<TOption, TValue>` | — | — | — | — |
| `selector` | `luOptionGroupBy` | `(option: TOption)` | `> TGroup` | — | — | — |

### LuOptionDirective (directive)

**Selector:** `[luOption]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `select` | `luOptionSelect` | `ALuSelectInputComponent<TOption, TValue>` | — | — | — | — |

### LuCoreSelectPanelHeaderDirective (directive)

**Selector:** `[luSelectPanelHeader]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `select` | `luSelectPanelHeader` | `ALuSelectInputComponent<unknown, unknown> \| ALuSelectInputComponent<unknown, unknown[]>` | — | ✅ | — | — |

### Providers

| Fonction | Signature | Description |
|----------|-----------|-------------|
| `provideLuSelectLabelsAndIds` | `(): Provider[]` | — |
| `provideOptionContext` | `(): Provider` | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_OPTION_CONTEXT` | `ILuOptionContext<unknown>` | — |
| `SELECT_PANEL_INSTANCE` | `CoreSelectPanelInstance` | — |
| `SELECT_ID` | `number` | — |
| `SELECT_LABEL` | `HTMLLabelElement \| undefined` | — |
| `SELECT_LABEL_ID` | `string` | — |
| `CORE_SELECT_API_TOTAL_COUNT_PROVIDER` | `CoreSelectApiTotalCountProvider` | — |
| `LU_CORE_SELECT_TRANSLATIONS` | `unknown` | — |

### Pipes

| Pipe | Classe | transform | Description |
|------|--------|-----------|-------------|
| `luTreeDisplay` | `TreeDisplayPipe` | `(items: T[], treeGenerator: TreeGenerator<T, TreeNode<T>>): TreeNode<T>[]` | — |
| `luOptionGroup` | `LuOptionGroupPipe` | `(options: T[], selector: (option: T) => TGroup)` | — |
| `luIsOptionSelected` | `LuIsOptionSelectedPipe` | `(option: T, comparer: LuOptionComparer<T>, selectedOptions: T[]): boolean` | — |

### Services

#### CoreSelectKeyManager

- `init(options: CoreSelectKeyManagerOptions<T>): void`
- `onKeydown(event: KeyboardEvent): void`
- `setActiveItem(index: number): void`
- `setActiveItemByElement(item: CoreSelectPanelElement<T>): void`
- `highlightOption(option: T): void`

## Related files

- 📋 [Changelog](./select-templating.changelog.md)
