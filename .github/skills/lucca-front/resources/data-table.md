# pr-DataTable

## Quand utiliser ce composant
- Lorsque vous devez afficher des ensembles de données structurées pour des analyses.
- Pour permettre à l'utilisateur d'éditer des données directement depuis la table.
- Lorsque vous devez intégrer des tables avec pagination et différentes options de tri.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-data-table-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-basic--basic)
- [Draggable](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-draggable--basic)
- [Inject](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-inject--basic)
- [Overflow](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-overflow--basic)
- [Responsive](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-data-table-angular-responsive--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=23373-9022) - Le composant représente un tableau de données interactif, permettant à l'utilisateur de naviguer facilement à travers les informations. Variantes disponibles : pr-DataTable.

## Import

```typescript
import { DataTableComponent } from '@lucca-front/ng/table';
```

## Usage de base

```html
<lu-data-table>
  <thead luDataTableHead>
    <tr luDataTableRow>
      <th luDataTableCell>Header 1</th>
      <th luDataTableCell>Header 2</th>
    </tr>
  </thead>
  <tbody luDataTableBody>
    <tr luDataTableRow>
      <td luDataTableCell>Données 1</td>
      <td luDataTableCell>Données 2</td>
    </tr>
  </tbody>
  <tfoot luDataTableFoot>
    <tr luDataTableRow>
      <td luDataTableCell colspan="2">Pied de table</td>
    </tr>
  </tfoot>
</lu-data-table>
```

## Directives / Composant : `lu-data-table` ou `tbody[luDataTableBody]`, `tfoot[luDataTableFoot]`, `thead[luDataTableHead]`, `tr[luDataTableRow]`, `td[luDataTableCell]`, `th[luDataTableCell]`

Le composant `lu-data-table` est utilisé pour créer un tableau de données. Les autres directives permettent de structurer le tableau par des entêtes, corps et pieds de tableau, ainsi que des lignes et cellules.

### Valeurs (si directive avec valeurs)
Aucune valeur spécifique n'est mentionnée.

```html
<lu-data-table ...>...</lu-data-table>
```

## Inputs
Aucun input documenté spécifiquement.

## Patterns courants

### Affichage basique
```html
<lu-data-table>
  <thead luDataTableHead>
    <tr luDataTableRow>
      <th luDataTableCell>Column A</th>
      <th luDataTableCell>Column B</th>
    </tr>
  </thead>
  <tbody luDataTableBody>
    <tr luDataTableRow>
      <td luDataTableCell>Valeur A</td>
      <td luDataTableCell>Valeur B</td>
    </tr>
  </tbody>
</lu-data-table>
```

## Accessibilité
Veiller à fournir des en-têtes significatifs pour chaque colonne, utiliser les attributs `scope` dans les éléments `<th>` pour améliorer l'accessibilité.

## Guidelines Prisme
- Garder une hiérarchie claire des données.
- Ne pas surcharger la table avec trop d'informations à la fois.
- Utiliser des libellés explicites pour chaque colonne.