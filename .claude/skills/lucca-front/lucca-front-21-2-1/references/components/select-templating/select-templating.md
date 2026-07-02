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

## Related files

- 📋 [Changelog](./select-templating.changelog.md)
