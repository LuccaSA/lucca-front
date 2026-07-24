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
| `label` | `label` | `string` | — | ✅ | — | Modifie le texte principal d'un élément de liste. |
| `helperMessage` | `helperMessage` | `string` | — | — | — | Ajoute un texte secondaire à l'élément de liste. |
| `clickable` | `clickable` | `boolean` | `false` | — | `booleanAttribute` | Rend les lignes cliquables. |
| `unclearable` | `unclearable` | `boolean` | `false` | — | `booleanAttribute` | Masque la croix de suppression. |
| `drag` | `drag` | `boolean` | `false` | — | `booleanAttribute` | — |
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | Modifie la taille du composant. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `delete` | `delete` | `void` | — |

### SortableListComponent (component)

**Selector:** `lu-sortable-list`

#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `small` | `small` | `boolean` | `false` | — | `booleanAttribute` | Modifie la taille du composant. |

## Related files

- 📝 [Code & implementation](./sortable-list.component.md)

- 🎯 [Figma design tokens](./sortable-list.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)
- 📋 [Changelog](./sortable-list.changelog.md)
