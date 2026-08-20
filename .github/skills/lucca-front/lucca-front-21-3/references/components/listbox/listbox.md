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
| `multiple` | `multiple` | `boolean` | `false` | — | `booleanAttribute` | — |
| `tree` | `tree` | `boolean` | `false` | — | `booleanAttribute` | — |
| `state` | `state` | `ListboxState \| null` | `null` | — | — | — |
| `statusMsg` | `statusMsg` | `string \| null` | `null` | — | — | — |

### Treeitem (directive)

**Selector:** `[treeitem]`

### OptionComponent (component)

**Selector:** `lu-listbox-option`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `checked` | `checked` | `boolean` | `false` | — | `booleanAttribute` | — |
| `mixed` | `mixed` | `boolean` | `false` | — | `booleanAttribute` | — |
| `disabled` | `disabled` | `boolean` | `false` | — | `booleanAttribute` | — |
| `hovered` | `hovered` | `boolean` | `false` | — | `booleanAttribute` | — |
| `add` | `add` | `boolean` | `false` | — | `booleanAttribute` | — |
| `group` | `group` | `boolean` | `false` | — | `booleanAttribute` | — |
| `select` | `select` | `boolean` | `false` | — | `booleanAttribute` | — |
| `selectAll` | `selectAll` | `'string' \| null` | — | — | — | — |

## Related files

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.3.0

`ListboxComponent` :
  ~ `state` : 'loading' | 'empty' | null → ListboxState | null

### 21.0.0

Composant introduit (`ListboxComponent`, `Treeitem`, `OptionComponent`).
