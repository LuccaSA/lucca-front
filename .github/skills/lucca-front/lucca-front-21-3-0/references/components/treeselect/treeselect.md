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

### TreeBranchComponent (component)

**Selector:** `lu-tree-branch`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `branch` | `branch` | `TreeNode<T>` | — | ✅ | — | — |
| `optionTpl` | `optionTpl` | `TemplateRef<LuOptionContext<T>> \| Type<unknown> \| undefined` | — | ✅ | — | — |
| `optionIndex` | `optionIndex` | `unknown` | — | ✅ | — | — |
| `optionComparer` | `optionComparer` | `LuOptionComparer<T>` | — | ✅ | — | — |
| `selectedOptions` | `selectedOptions` | `T[]` | `[]` | — | — | — |
| `simpleMode` | `simpleMode` | `boolean` | `false` | — | `booleanAttribute` | — |
| `depth` | `depth` | `number` | `1` | — | — | — |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `toggleOne` | `toggleOne` | `T` |
| `selectMany` | `selectMany` | `T[]` |
| `unselectMany` | `unselectMany` | `T[]` |

## Related files

- 📝 [Code & implementation](./treeselect.component.md)

- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.0/storybook/?path=/docs/documentation-forms-treeselect--docs)
- 📋 [Changelog](./treeselect.changelog.md)
