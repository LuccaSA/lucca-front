# filterbar

## Import

```typescript
import { FilterPillComponent, FilterBarComponent, FilterPillAddonBeforeDirective, FilterPillAddonAfterDirective, FilterPillDisplayerDirective, FilterPillLabelDirective } from '@lucca-front/ng/filter-pills';
```

## API Reference

### FilterPillComponent (component)

**Selector:** `lu-filter-pill`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `name` | `name` | `string` | — | — | — | — |
| `optional` | `optional` | `boolean` | `false` | — | `booleanAttribute` | — |
| `label` | `label` | `string` | — | ✅ | — | — |
| `placeholder` | `placeholder` | `string` | `this.intl.placeholder` | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |

#### Models (two-way binding)

| Property | Type | Required |
|----------|------|----------|
| `displayed` | `unknown` | — |

### FilterBarComponent (component)

**Selector:** `lu-filter-bar`

### FilterPillAddonBeforeDirective (directive)

**Selector:** `[luFilterPillAddonBefore]`

### FilterPillAddonAfterDirective (directive)

**Selector:** `[luFilterPillAddonAfter]`

### FilterPillDisplayerDirective (directive)

**Selector:** `[luFilterPillDisplayer]`

### FilterPillLabelDirective (directive)

**Selector:** `[luFilterPillLabel]`

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 569 available values

## Related files

- 📝 [Code & implementation](./filterbar.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./filterbar.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.5/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular--docs)
- 📋 [Changelog](./filterbar.changelog.md)
