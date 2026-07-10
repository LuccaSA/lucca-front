# filterpills

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
| `intl` | `intl` | `unknown` | — | — | — | — |
| `name` | `name` | `string` | — | — | — | Dans le cas d’un filtre optionnel, permet de faire le lien entre la liste de filtres disponible et l’affichage du filtre… |
| `optional` | `optional` | `boolean` | `false` | — | `booleanAttribute` | — |
| `label` | `label` | `string` | — | ✅ | — | Modifie le label du filtre. |
| `placeholderOverride` | `placeholder` | `string \| null` | `null` | — | — | — |
| `icon` | `icon` | `LuccaIcon` | — | — | — | — |

#### Models (two-way binding)

| Property | Type | Required | Notes |
|----------|------|----------|-------|
| `displayed` | `unknown` | — | — |

### FilterBarComponent (component)

**Selector:** `lu-filter-bar`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `intl` | `intl` | `unknown` | — | — | — | — |

### FilterPillAddonBeforeDirective (directive)

**Selector:** `[luFilterPillAddonBefore]`

### FilterPillAddonAfterDirective (directive)

**Selector:** `[luFilterPillAddonAfter]`

### FilterPillDisplayerDirective (directive)

**Selector:** `[luFilterPillDisplayer]`

### FilterPillLabelDirective (directive)

**Selector:** `[luFilterPillLabel]`

### Injection tokens

| Token | Type | Description |
|-------|------|-------------|
| `FILTER_PILL_INPUT_COMPONENT` | `FilterPillInputComponent` | — |
| `FILTER_PILL_HOST_COMPONENT` | `FilterPillComponent` | — |

## Type definitions

- [`LuccaIcon`](../../types/LuccaIcon.md) — 577 available values

## Related files

- 📝 [Code & implementation](./filterpills.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./filterpills.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.5/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)
- 📋 [Changelog](./filterpills.changelog.md)
