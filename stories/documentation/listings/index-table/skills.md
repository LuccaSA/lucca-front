---
description: Composant Index table - composants pour afficher des listes et collections de données
triggers:
  - index-table
  - indextable
  - button
  - dropdown
  - dropdownaction
  - dropdowngroup
  - dropdownitem
  - dropdownmenu
  - ludropdowntrigger
  - icon
  - indextableaction
  - indextablebody
  - indextablefoot
  - indextablehead
  - indextablerowcell
  - indextablerowcellheader
  - indextablerow
  - indextableactionfile
  - pagination
  - tooltip
figma:
  nodeId: null
  fileKey: null
globs:
  - "**/*.ts"
  - "**/*.html"
alwaysApply: false
---

# Index table

## Description

Le composant **Index table** fait partie de la catégorie **Listings** du design system Lucca Front.

Composants pour afficher des listes et collections de données.

**Story path:** `Documentation/Listings/Index Table/Angular/Actions`
**Component:** `IndexTableInteractiveNestedSelectableStory`


## Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DropdownActionComponent, DropdownGroupComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { IconComponent } from '@lucca-front/ng/icon';
import { IndexTableActionComponent, IndexTableBodyComponent, IndexTableComponent, IndexTableFootComponent, IndexTableHeadComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent, IndexTableRowComponent, IndexTableActionFileComponent } from '@lucca-front/ng/index-table';
import { PaginationComponent } from '@lucca-front/ng/pagination';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { LuUserDisplayModule, LuUserPictureComponent } from '@lucca-front/ng/user';
import { LuUserPopoverComponent, LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { EmptyStateSectionComponent } from '@lucca-front/ng/empty-state';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
```


## Propriétés

| Propriété | Type | Défaut | Description |
|-----------|------|--------|-------------|
| `size` | `'M' | 'S' | 'XS'` | `-` | Change the size of the Button |
| `palette` | `Palette` | `none` | Applies a color palette to the Button |
| `state` | `'default' | 'loading' | 'error' | 'success'` | `default` | Modifies the state of the Button |

## Utilisation

### Quand utiliser Index table

- Affichage de collections
- Tableaux de données
- Listes d'éléments

### Quand ne pas utiliser

- Élément unique
- Formulaires

## Exemples

### Exemple basique

```html
<lu-index-table...>
<thead luIndexTableHead>
<tr luIndexTableRow>
<th luIndexTableCell>Label</th>
<th luIndexTableCell>Label</th>
<th luIndexTableCell actions...>Label</th>
</tr>
</thead>
<tbody luIndexTableBody>
<tr luIndexTableRow>
<th luIndexTableCell><a href=
```

### Autres exemples

```html
<lu-index-table.........>
<thead luIndexTableHead>
<tr luIndexTableRow...>
<th luIndexTableCell>Label</th>
<th luIndexTableCell...>Label</th>
<th luIndexTableCell......>Label</th>
</tr>
</thead>
<tbody luIndexTableBody.........> ... </tbody>...... </lu-index-table>...

<lu-index-table layoutFixed>
<thead luIndexTableHead>
<tr luIndexTableRow>
<th luIndexTableCell>Action</th>
<th luIndexTableCell>Content</th>
<th luIndexTableCell>Content</th>
<th luIndexTableCell>Content</th>
<th luIndexTableCell>Content</th>
<th luIndexTableCell actions>Secondary action</th>
</tr>
</thead>
<tbody luIndexTableBody>
<tr luIndexTableRow #line1>
<th luIndexTableCell>
<a href=
```


## Classes CSS

| Classe | Description |
|--------|-------------|
| `.userPopover_trigger` | Classe de base |
| `.code` | Classe de base |
| `.indexTable-body-row-cell-subAction` | Classe de base |
| `.indexTable` | Classe de base |
| `.indexTable-head` | Classe de base |
| `.mod-actions` | Modificateur actions |
| `.mod-ghost` | Modificateur ghost |
| `.mod-onlyIcon` | Modificateur onlyIcon |
| `.mod-S` | Modificateur S |
| `.mod-allowTextSelection` | Modificateur allowTextSelection |
| `.mod-critical` | Modificateur critical |
| `.mod-layoutFixed` | Modificateur layoutFixed |
| `.mod-alignRight` | Modificateur alignRight |
| `.mod-L` | Modificateur L |
| `.mod-selectable` | Modificateur selectable |
| `.is-closed` | État closed |
| `.palette-product` | Palette product |

## Accessibilité

- Utiliser des structures sémantiques (table, ul, ol)
- Fournir des en-têtes pour les tableaux
- Supporter le tri et la pagination accessibles

## Figma

⚠️ Ce composant n'est pas encore lié à un node Figma. Utilisez Code Connect pour créer le lien.

## Voir aussi

<!-- Composants liés à documenter -->
