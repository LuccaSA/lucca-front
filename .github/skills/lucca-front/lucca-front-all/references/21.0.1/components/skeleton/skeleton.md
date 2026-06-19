# skeleton

## Import

```typescript
import { SkeletonButtonComponent, SkeletonDataTableComponent, SkeletonFieldComponent, SkeletonHeaderComponent, SkeletonIndexTableComponent, SkeletonResourceCardComponent, SkeletonTableComponent } from '@lucca-front/ng/skeleton';
```

## API Reference

### SkeletonButtonComponent (component)

**Selector:** `lu-skeleton-button`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |
| `size` | `size` | `'XS' \| 'S' \| 'M'` | — | — | — | — |

### SkeletonDataTableComponent (component)

**Selector:** `lu-skeleton-data-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dataTableBodyOnly` | `dataTableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | — | — |
| `rows` | `rows` | `number` | `8` | — | — | — |

### SkeletonFieldComponent (component)

**Selector:** `lu-skeleton-field`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean, boolean \| `${boolean}`` | `false` | — | `booleanAttribute` | — |
| `hiddenLabel` | `hiddenLabel` | `boolean, boolean \| `${boolean}`` | `false` | — | `booleanAttribute` | — |
| `rows` | `rows` | `number, number \| `${number}`` | `1` | — | `numberAttribute` | — |

### SkeletonHeaderComponent (component)

**Selector:** `lu-skeleton-header`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `dark` | `dark` | `boolean` | `false` | — | `booleanAttribute` | — |

### SkeletonIndexTableComponent (component)

**Selector:** `lu-skeleton-index-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `tableBodyOnly` | `tableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | — | — |
| `rows` | `rows` | `number` | `8` | — | — | — |

### SkeletonResourceCardComponent (component)

**Selector:** `lu-skeleton-resource-card`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `descriptionLines` | `descriptionLines` | `number` | `0` | — | `numberAttribute` | — |

### SkeletonTableComponent (component)

**Selector:** `lu-skeleton-table`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `tableBodyOnly` | `tableBodyOnly` | `boolean` | `false` | — | `booleanAttribute` | — |
| `cols` | `cols` | `number` | `5` | — | — | — |
| `rows` | `rows` | `number` | `8` | — | — | — |

## Related files

- 📝 [Code & implementation](./skeleton.component.md)

- 🎯 [Figma design tokens](./skeleton.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.1/storybook/?path=/docs/documentation-loaders-skeleton--docs)
- 📋 [Changelog](./skeleton.changelog.md)
