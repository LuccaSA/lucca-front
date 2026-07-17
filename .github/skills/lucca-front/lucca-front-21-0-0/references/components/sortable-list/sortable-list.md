# sortable-list

## Import

```typescript
import { SortableListItemComponent, SortableListComponent } from '@lucca-front/ng/sortable-list';
```

## Basic Usage

```html
<lu-sortable-list> <lu-sortable-list-item label="Label" helperMessage="Helper message" /> <lu-sortable-list-item label="Label" helperMessage="Helper message" /> <lu-sortable-list-item label="Label" helperMessage="Helper message" />
</lu-sortable-list>
```

## API Reference

### SortableListItemComponent (component)

**Selector:** `lu-sortable-list-item`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `label` | `label` | `string` | — | ✅ | — | — |
| `helperMessage` | `helperMessage` | `string` | — | — | — | — |
| `clickable` | `clickable` | `boolean` | `false` | — | `booleanAttribute` | Rend un élément de la liste cliquable. |
| `unclearable` | `unclearable` | `boolean` | `false` | — | `booleanAttribute` | — |
| `drag` | `drag` | `boolean` | `false` | — | `booleanAttribute` | — |
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | Modifie la taille de la liste. |

#### Outputs

| Property | Binding name | Type |
|----------|-------------|------|
| `delete` | `delete` | `void` |

### SortableListComponent (component)

**Selector:** `lu-sortable-list`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | Modifie la taille de la liste. |

## Related files

- 📝 [Code & implementation](./sortable-list.component.md)

- 🎯 [Figma design tokens](./sortable-list.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.0/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)
- 📋 [Changelog](./sortable-list.changelog.md)
