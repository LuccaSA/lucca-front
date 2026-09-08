# listbox

## Import

```typescript
import { ListboxComponent, Treeitem, OptionComponent } from '@lucca-front/ng/listbox';
```


## API Reference

### ListboxComponent (component)

**Selector:** `lu-listbox`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `multiple` | `multiple` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `tree` | `tree` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `state` | `state` | `ListboxState \| null` | `null` | — | — | — |
| `statusMsg` | `statusMsg` | `string \| null` | `null` | — | — | — |



### Treeitem (directive)

**Selector:** `[treeitem]`






### OptionComponent (component)

**Selector:** `lu-listbox-option`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `elementId` | `elementId` | `string \| null` | `null` | — | — | — |
| `checked` | `checked` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `mixed` | `mixed` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hovered` | `hovered` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `add` | `add` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `group` | `group` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `groupId` | `groupId` | `string \| null` | `null` | — | — | — |
| `select` | `select` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `selectAll` | `selectAll` | `'string' \| null` | — | — | — | — |
| `treeitemLevel` | `treeitemLevel` | `number \| null` | `null` | — | — | — |




### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LISTBOX_INSTANCE` | `ListboxComponent` | — |
| `OPTION_INSTANCE` | `OptionComponent` | — |





## Related files






## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`ListboxComponent`, `Treeitem`, `OptionComponent`).

### Notes de release (ZeroHeight)

#### 21.3.0

##### Added

- `LISTBOX_STATE` constant and `ListboxState` type are now publicly exported and used to type the `state` input.

#### 20.3.3

##### Fixed

- Host `role` of the listbox and its options.

#### 20.2.0

##### Added

- `lu-listbox` component with the `multiple`, `tree`, `state` (`loading`, `empty`) and `statusMsg` inputs, plus the `LISTBOX_INSTANCE` injection token.
- `lu-listbox-option` component with the `checked`, `mixed`, `disabled`, `hovered`, `group`, `add`, `select` and `selectAll` inputs, plus the `OPTION_INSTANCE` injection token.
