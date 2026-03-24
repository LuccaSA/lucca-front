# pr-IndexTable

## Quand utiliser ce composant
- Pour afficher une collection de ressources similaires dans une interface claire et structurée.
- Lorsqu'une navigation rapide vers des détails ou des actions sur les ressources est nécessaire.
- Pour offrir à l'utilisateur un aperçu des informations clés de manière concise.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-actions--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-basic--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-tooltips--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19654-99228) — Le pr-IndexTable présente une interface élégante pour l'affichage des données. Variantes disponibles : pr-IndexTable.

## Import

```typescript
import { IndexTableComponent } from '@lucca-front/ng/index-table';
```

## Usage de base

```html
<lu-index-table>
  <!-- Contenu de l'index table -->
</lu-index-table>
```

## Directive / Composant : `lu-index-table` ou `<lu-index-table>`

Composant principal pour afficher un tableau d'index, utilisable comme racine pour d'autres éléments de tableau.

### Valeurs (si directive avec valeurs)
| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### Aucun

## Patterns courants

### Utilisation d'un tableau d'index
```html
<lu-index-table>
  <thead luIndexTableHead>
    <tr luIndexTableRow>
      <th luIndexTableCell>Nom</th>
      <th luIndexTableCell>Actions</th>
    </tr>
  </thead>
  <tbody luIndexTableBody>
    <tr luIndexTableRow>
      <td luIndexTableCell>Exemple 1</td>
      <td luIndexTableCell>
        <button luIndexTableAction type="button">Voir</button>
      </td>
    </tr>
  </tbody>
  <tfoot luIndexTableFoot>
    <tr>
      <td colspan="2">Pagination ici</td>
    </tr>
  </tfoot>
</lu-index-table>
```

## Accessibilité
Assurez-vous que les tables respectent les normes d'accessibilité en incluant des `aria-labels` appropriés et en s'assurant que les éléments interactifs soient focalisables.

## Guidelines Prisme
- Favorisez l'utilisation de composants visuels standards pour une cohérence à travers l'application.
- Évitez de surcharger le tableau avec trop d'actions ou d'informations.
- Assurez-vous que la taille des tableaux s'adapte bien à différents écrans et résolutions.