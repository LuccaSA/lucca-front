# multi-select

## Import

```typescript
import { LuMultiSelectContentDisplayerComponent, LuMultiSelectCounterDisplayerComponent, LuMultiSelectDefaultDisplayerComponent, LuMultiSelectDisplayerInputDirective, LuMultiDisplayerDirective, LuMultiSelectWithSelectAllDirective, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

## API Reference

### LuMultiSelectContentDisplayerComponent (component)

**Selector:** `lu-multi-select-content-displayer`

### LuMultiSelectCounterDisplayerComponent (component)

**Selector:** `lu-multi-select-counter-displayer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `selected` | `selected` | `T[]` | — | — | — | — |
| `label` | `label` | `string` | — | ✅ | — | Modifie le label du champ. |

### LuMultiSelectDefaultDisplayerComponent (component)

**Selector:** `lu-multi-select-default-displayer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### LuMultiSelectDisplayerInputDirective (directive)

**Selector:** `[luMultiSelectDisplayerInput]`

### LuMultiDisplayerDirective (directive)

**Selector:** `[luMultiDisplayer]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `select` | `luMultiDisplayerSelect` | `LuMultiSelectInputComponent<T>` | — | — | — | — |

### LuMultiSelectWithSelectAllDirective (directive)

**Selector:** `lu-multi-select[withSelectAll]`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `displayerLabel` | `withSelectAllDisplayerLabel` | `string` | — | ✅ | — | — |

### LuMultiSelectInputComponent (component)

**Selector:** `lu-multi-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |
| `maxValuesShown` | `maxValuesShown` | `number` | `500` | — | `numberAttribute` | — |
| `keepSearchAfterSelection` | `keepSearchAfterSelection` | `boolean` | `false` | — | `booleanAttribute` | — |
| `filterPillLabelPlural` | `filterPillLabelPlural` | `string` | — | — | — | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `valuesTpl` | `TemplateRef<LuOptionContext<T[]>> | Type<unknown>` | — |

## Related files

- 📝 [Code & implementation](./multi-select.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./multi-select.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.0/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)
- 📋 [Changelog](./multi-select.changelog.md)
