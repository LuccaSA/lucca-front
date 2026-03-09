---
description: Composant Data table - composants pour afficher des listes et collections de données
triggers:
  - data-table
  - datatable
  - button
  - datatablebody
  - datatablefoot
  - datatablehead
  - datatablerowcell
  - datatablerowcellheader
  - datatablerow
  - form-field
  - formfield
  - forms
  - textinput
  - icon
  - numeric-badge
  - numericbadge
  - pagination
  - list
  - table
  - data
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Data table

## Description

Le composant **Data table** fait partie de la catégorie **Listings** du design system Lucca Front.

Composants pour afficher des listes et collections de données.

**Story path:** `Documentation/Listings/Data table/Angular/Basic`
**Component:** `DataTableDraggableStory`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DataTableBodyComponent, DataTableComponent, DataTableFootComponent, DataTableHeadComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent, DataTableRowComponent } from '@lucca-front/ng/data-table';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { PaginationComponent } from '@lucca-front/ng/pagination';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |
| `cols` | `range` | `8` | - |

## Utilisation

### Quand utiliser Data table

- Affichage de collections
- Tableaux de données
- Listes d'éléments

### Quand ne pas utiliser

- Élément unique
- Formulaires

## Exemples

### Exemple basique

```html
<lu-data-table.....................>
<thead luDataTableHead>
<tr luDataTableRow...>
<th luDataTableCell>...</th>... <th luDataTableCell.........>...</th>
</tr>
</thead>
<tbody luDataTableBody......>... <tr luDataTableRow...>
<th luDataTableCell>......</th>... <td luDataTableCell...>...</td>
</tr>
<tr luDataTableRow.........>
<th luDataTableCell>...</th>... <td luDataTableCell...>...</td>
</tr>
</tbody>...... </lu-data-table> ......
```

### Autres exemples

```html
<tr luDataTableRow>
<th luDataTableCell>header</th>
<td luDataTableCell>cell</td>
<td luDataTableCell>cell</td>
<td luDataTableCell>cell</td>
<td luDataTableCell>cell</td>
<td luDataTableCell>cell</td>
<td luDataTableCell>cell</td>
<td luDataTableCell>cell</td>
</tr>

<lu-data-table.........>
<thead luDataTableHead...>
<tr luDataTableRow>
<th luDataTableCell>...</th>... <th luDataTableCell>...</th>
</tr>
</thead>
<tbody luDataTableBody>... </tbody>... </lu-data-table>
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.dataTableWrapper` | Classe de base |
| `.dataTable` | Classe de base |
| `.dataTable-head` | Classe de base |
| `.dataTable-head-row` | Classe de base |
| `.dataTable-head-row-cell` | Classe de base |
| `.mod-alignCenter` | Modificateur alignCenter |
| `.mod-alignRight` | Modificateur alignRight |
| `.mod-alignTop` | Modificateur alignTop |
| `.mod-cellBorder` | Modificateur cellBorder |
| `.mod-draggable` | Modificateur draggable |
| `.mod-editable` | Modificateur editable |
| `.mod-layoutFixedAtMediaMinM` | Modificateur layoutFixedAtMediaMinM |
| `.mod-layoutFixed` | Modificateur layoutFixed |
| `.mod-group` | Modificateur group |
| `.mod-hover` | Modificateur hover |
| `.is-collapsed` | État collapsed |

## Accessibilité

- Utiliser des structures sémantiques (table, ul, ol)
- Fournir des en-têtes pour les tableaux
- Supporter le tri et la pagination accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
