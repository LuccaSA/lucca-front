# pr-IndexTable

## Quand utiliser ce composant
- Pour afficher une liste de ressources avec des actions rapides.
- Lorsque vous avez besoin d'une vue détaillée de plusieurs éléments similaires.
- Pour permettre des opérations de sélection sur des lignes dans un tableau.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-actions--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-basic--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-tooltips--basic)

## Composant Figma
[https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19654-99228](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19654-99228) — Composant représentant un tableau d'index avec diverses variantes.

## Import

```typescript
import { IndexTableComponent, IndexTableBodyComponent, IndexTableHeadComponent, IndexTableRowComponent, IndexTableRowCellComponent, IndexTableRowCellHeaderComponent, IndexTableFootComponent, IndexTableActionComponent } from '@lucca-front/ng/index-table';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-index-table layoutFixed>
  <thead luIndexTableHead>
    <tr luIndexTableRow>
      <th luIndexTableCell>Action</th>
      <th luIndexTableCell>Contenu</th>
    </tr>
  </thead>
  <tbody luIndexTableBody>
    <tr luIndexTableRow>
      <th luIndexTableCell>
        <a href="#" luIndexTableAction>Action primaire</a>
      </th>
      <td luIndexTableCell>Contenu de la ressource</td>
    </tr>
  </tbody>
</lu-index-table>
```

## Directive / Composant : `luIndexTable` ou `<lu-index-table>`

Sélecteur principal pour utiliser le composant Index Table. Applicable sur les éléments HTML pour structurer un tableau d'index.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `layoutFixed` | Applique une largeur fixe aux colonnes. |

```html
<lu-index-table layoutFixed>...</lu-index-table>
```

## Inputs

### `action`
Type: `'link' | 'button' | 'user' | 'file'` — Default: `'link'`

Modifie le type d'élément HTML cliquable.

```html
<lu-index-table [action]="'button'">...</lu-index-table>
```

### `layoutFixed`
Type: `boolean` — Default: `false`

Détermine si le tableau doit avoir une largeur fixe pour les colonnes.

```html
<lu-index-table [layoutFixed]="true">...</lu-index-table>
```

### `pagination`
Type: `boolean` — Default: `false`

Active ou désactive la pagination des lignes.

```html
<lu-index-table [pagination]="true">...</lu-index-table>
```

### `selectable`
Type: `boolean` — Default: `false`

Indique si les lignes du tableau sont sélectionnables via des checkbox.

```html
<lu-index-table [selectable]="true">...</lu-index-table>
```

## Patterns courants

### Tableau avec actions et pagination
```html
<lu-index-table [pagination]="true" [selectable]="true">
  <thead luIndexTableHead>
    <tr luIndexTableRow>
      <th luIndexTableCell actions>Actions</th>
      <th luIndexTableCell>Titre</th>
      <th luIndexTableCell>Statut</th>
    </tr>
  </thead>
  <tbody luIndexTableBody>
    <tr luIndexTableRow>
      <td luIndexTableCell>
        <button type="button" luIndexTableAction>Modifier</button>
      </td>
      <td luIndexTableCell>Article 1</td>
      <td luIndexTableCell>Actif</td>
    </tr>
  </tbody>
</lu-index-table>
```

## Accessibilité
Assurez-vous que chaque ligne du tableau a un rôle approprié et que les actions sont étiquetées pour que les utilisateurs de lecteurs d'écran puissent les comprendre.

## Guidelines Prisme
- Utiliser les couleurs et typographies spécifiées dans le guide de style Lucca.
- S'assurer que les tables sont responsives et accessibles.
- Éviter de surcharger le tableau avec trop d'informations à la fois.