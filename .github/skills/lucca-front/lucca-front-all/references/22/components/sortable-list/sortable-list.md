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
| `label` | `label` | `PortalContent` | — | ✅ | — | Modifie le texte principal d’un élément de liste. [PortalContent] |
| `helperMessage` | `helperMessage` | `string` | — | — | — | Ajoute un texte secondaire à l’élément de liste. |
| `clickable` | `clickable` | `boolean` | `false` | — | `luBooleanAttribute` | Rend les lignes cliquables. |
| `unclearable` | `unclearable` | `boolean` | `false` | — | `luBooleanAttribute` | Masque la croix de suppression. |
| `drag` | `drag` | `boolean` | `false` | — | `luBooleanAttribute` | — |
| `small` | `small` | `boolean` | `false` | — | `luBooleanAttribute` | Modifie la taille du composant. |

#### Outputs

| Property | Binding name | Type | Notes |
|----------|-------------|------|-------|
| `delete` | `delete` | `void` | — |


### SortableListComponent (component)

**Selector:** `lu-sortable-list`



#### Inputs

| Property | Binding name | Type | Default | Required | Transform | Description |
|----------|-------------|------|---------|----------|-----------|-------------|
| `small` | `small` | `boolean` | `false` | — | `luBooleanAttribute` | Modifie la taille du composant. |









## Related files

- 📝 [Code & implementation](./sortable-list.component.md)


- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)

## Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v22.0.0`. Les versions sans changement d'API sont omises.

### 22.0.0

Composant introduit (`SortableListItemComponent`, `SortableListComponent`).

### Notes de release (ZeroHeight)

#### 21.3.1

##### Changed

- `label` the `lu-sortable-list-item` input now accepts a `PortalContent` instead of a plain `string`, allowing rich templated content.

#### 21.0.0

##### Added

- `lu-sortable-list` new Angular wrapper component exposing a `small` input and projecting `lu-sortable-list-item` children.
- `lu-sortable-list-item` new Angular wrapper component with `label` (required), `helperMessage`, `clickable`, `unclearable` and `small` inputs and a `delete` output.
- `drag` a `lu-sortable-list-item` input that displays a drag handle and enables drag-and-drop reordering.
