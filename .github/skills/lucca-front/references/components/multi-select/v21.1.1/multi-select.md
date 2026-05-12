# multi-select

## Import

```typescript
import { LuMultiSelectContentDisplayerComponent, LuMultiSelectCounterDisplayerComponent, LuMultiSelectDefaultDisplayerComponent, LuMultiSelectDisplayerInputDirective, LuMultiDisplayerDirective, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
```

## API Reference

### LuMultiSelectContentDisplayerComponent (component)

**Selector:** `lu-multi-select-content-displayer`

### LuMultiSelectCounterDisplayerComponent (component)

**Selector:** `lu-multi-select-counter-displayer`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | ✅ | — | Modifie le label du champ. |

### LuMultiSelectDefaultDisplayerComponent (component)

**Selector:** `lu-multi-select-default-displayer`

### LuMultiSelectDisplayerInputDirective (directive)

**Selector:** `[luMultiSelectDisplayerInput]`

### LuMultiDisplayerDirective (directive)

**Selector:** `[luMultiDisplayer]`

### LuMultiSelectInputComponent (component)

**Selector:** `lu-multi-select`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `maxValuesShown` | `maxValuesShown` | `number` | `500` | — | `numberAttribute` | — |
| `keepSearchAfterSelection` | `keepSearchAfterSelection` | `boolean` | `false` | — | `booleanAttribute` | — |
| `filterPillLabelPlural` | `filterPillLabelPlural` | `string` | — | — | — | — |

## Related files

- 📝 [Code & implementation](./multi-select.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](../multi-select.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.1/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)
- 📋 [Changelog](../multi-select.changelog.md)
