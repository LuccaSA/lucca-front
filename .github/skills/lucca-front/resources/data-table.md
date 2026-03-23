# pr-DataTable

## Quand utiliser ce composant
- Pour afficher des listes de données structurées que l’utilisateur peut consulter ou modifier.
- Lorsque le tri, la sélection ou la possibilité de glisser les lignes du tableau sont nécessaires.
- Pour rendre les données plus interactives avec pagination et intégration de formulaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-basic--basic)
- [Draggable](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-draggable--basic)
- [Inject](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-inject--basic)
- [Overflow](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-overflow--basic)
- [Responsive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-responsive--basic)

## Composant Figma
[Visualiser dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=23373-9022) - Le composant pr-DataTable présente des données sous forme de tableau avec des en-têtes personnalisés et des options de tri. Variantes disponibles incluent la possibilité de rendre des lignes déplaçables.

## Import

```typescript
import { DataTableComponent, DataTableBodyComponent, DataTableFootComponent, DataTableHeadComponent, DataTableRowComponent, DataTableRowCellComponent, DataTableRowCellHeaderComponent } from '@lucca-front/ng/data-table';
```

## Usage de base

```html
<lu-data-table>
    <thead luDataTableHead>
        <tr luDataTableRow>
            <th luDataTableCell>Header</th>
            <th luDataTableCell>Cell</th>
        </tr>
    </thead>
    <tbody luDataTableBody>
        <tr luDataTableRow>
            <td luDataTableCell>Data 1</td>
            <td luDataTableCell>Data 2</td>
        </tr>
    </tbody>
</lu-data-table>
```

## Directive / Composant : `luDataTable` ou `<lu-data-table>`

Implémente un tableau de données. Applicable sur les éléments HTML de type `<lu-data-table>`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut. |
| `"drag"` | Permet de déplacer les lignes de données dans le tableau. |

```html
<lu-data-table drag>
    ...
</lu-data-table>
```

## Inputs

### `sort`
Type: `'' | 'none' | 'ascending' | 'descending'` — Default: `''`

Définit l'état de tri d'une cellule d'en-tête.

```html
<lu-data-table [sort]="'ascending'">...</lu-data-table>
```

### `align`
Type: `'' | 'start' | 'center' | 'end'` — Default: `''`

Aligne le contenu des cellules horizontalement.

```html
<lu-data-table [align]="'center'">...</lu-data-table>
```

### `verticalAlign`
Type: `'' | 'top' | 'middle' | 'bottom'` — Default: `''`

Aligne le contenu des cellules verticalement.

```html
<lu-data-table [verticalAlign]="'middle'">...</lu-data-table>
```

### `selected`
Type: `boolean` — Default: `false`

Applique l'état actif à une ligne sélectionnable.

```html
<lu-data-table [selected]="true">...</lu-data-table>
```

## Patterns courants

### Exemple de tableau avec tri
```html
<lu-data-table [sort]="'ascending'">
    <thead luDataTableHead>
        <tr luDataTableRow>
            <th luDataTableCell>Header</th>
            <th luDataTableCell>Cell</th>
        </tr>
    </thead>
    <tbody luDataTableBody>
        <tr luDataTableRow>
            <td luDataTableCell>Data 1</td>
            <td luDataTableCell>Data 2</td>
        </tr>
    </tbody>
</lu-data-table>
```

## Accessibilité
Assurez-vous que les en-têtes des colonnes sont clairement identifiés pour les lecteurs d'écran et que les fonctionnalités de tri sont accessibles via le clavier.

## Guidelines Prisme
- Utiliser des en-têtes clairs et des cellules pour fournir un contexte aux données présentées.
- Éviter les tableaux à plusieurs niveaux qui peuvent nuire à la lisibilité.