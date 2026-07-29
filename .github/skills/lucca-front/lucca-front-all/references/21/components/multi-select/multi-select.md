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

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `valuesTpl` | `TemplateRef<LuOptionContext<T[]>> \| Type<unknown>` | — | — |

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `LU_MULTI_SELECT_DISPLAYER_TRANSLATIONS` | `unknown` | — |
| `LU_MULTI_SELECT_TRANSLATIONS` | `unknown` | — |
| `MULTI_SELECT_INPUT` | `LuMultiSelectInputComponent<unknown>` | — |

## Related files

- 📝 [Code & implementation](./multi-select.component.md)
- 🎨 [Design guidelines](./multi-select.design.md)
- 🎯 [Figma design tokens](./multi-select.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

### 21.1.0

`LuMultiSelectDefaultDisplayerComponent` :
  + `intl` : unknown
`LuMultiSelectInputComponent` :
  + `intl` : unknown

### 21.0.0

Composant introduit (`LuMultiSelectContentDisplayerComponent`, `LuMultiSelectCounterDisplayerComponent`, `LuMultiSelectDefaultDisplayerComponent`, `LuMultiSelectDisplayerInputDirective`, `LuMultiDisplayerDirective`, `LuMultiSelectWithSelectAllDirective`, `LuMultiSelectInputComponent`).
