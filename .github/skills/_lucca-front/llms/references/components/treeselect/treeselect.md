# treeselect

## Import

```typescript
import { TreeSelectDirective, TreeBranchComponent } from '@lucca-front/ng/tree-select';
```

## API Reference

### TreeSelectDirective (directive)

**Selectors:** `lu-simple-select[treeSelect]`, `lu-multi-select[treeSelect]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `groupingFnInput` | `treeSelect` | `TreeGroupingFn<T>` | — | ✅ | — | — |
| `collapsableInput` | `collapsable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `parentStandsForChildrenInput` | `parentStandsForChildren` | `boolean` | `false` | — | `luBooleanAttribute` | — |

### TreeBranchComponent (component)

**Selector:** `lu-tree-branch`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `treeitemPosition` | `treeitemPosition` | `number \| null` | `null` | — | — | — |
| `treeitemSetSize` | `treeitemSetSize` | `number \| null` | `null` | — | — | — |
| `branch` | `branch` | `TreeNode<T>` | — | ✅ | — | — |
| `optionTpl` | `optionTpl` | `TemplateRef<LuOptionContext<T>> \| Type<unknown> \| undefined` | — | ✅ | — | — |
| `optionIndex` | `optionIndex` | `unknown` | — | ✅ | — | — |
| `optionComparer` | `optionComparer` | `LuOptionComparer<T>` | — | ✅ | — | — |
| `selectedOptions` | `selectedOptions` | `T[]` | `[]` | — | — | — |
| `simpleMode` | `simpleMode` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `parentStandsForChildren` | `parentStandsForChildren` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `collapsable` | `collapsable` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `hiddenByCollapse` | `hiddenByCollapse` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `coveredByRule` | `coveredByRule` | `boolean` | `false` | — | `luBooleanAttribute` | — |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `toggleOne` | `toggleOne` | `T` | — |
| `selectMany` | `selectMany` | `T[]` | — |
| `unselectMany` | `unselectMany` | `T[]` | — |
| `coveredUnselect` | `coveredUnselect` | `T` | — |
| `parentSelectionSwapped` | `parentSelectionSwapped` | `{ select: T[]; unselect: T[] }` | — |

## Related files

- 📝 [Code & implementation](./treeselect.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v{version}/storybook/?path=/docs/documentation-forms-treeselect--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, depuis `v21.4.4` jusqu'à `v22.1.2`. Les versions sans changement d'API sont omises.

### 22.0.0

`TreeBranchComponent` :
  - `depth`
  ~ `simpleMode` : transform booleanAttribute → luBooleanAttribute
