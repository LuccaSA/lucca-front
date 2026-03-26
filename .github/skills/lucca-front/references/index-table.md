# pr-IndexTable

## Quand utiliser ce composant
- Afficher une liste homogène de ressources pour fournir un aperçu rapide et permettre une navigation vers un détail complet.
- Permettre des actions rapides sur une ressource grâce à des boutons ou dropdowns directement intégrés dans chaque ligne.
- Offrir un tableau interactif avec des fonctionnalités telles que la sélection de lignes, le regroupement et l’affichage d’états vides.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-angular-actions--docs)
- [Basic - Actions & Tooltips](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-actions--basic)
- [Basic - Table de base](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-index-table-angular-basic--basic)

## Composant Figma
- [Figma pr-IndexTable](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=19654-99228) – Visualisation détaillée du composant avec la variante pr-IndexTable disponible.

## Import

```typescript
import { IndexTableComponent } from '@lucca-front/ng/index-table';
```

## Usage de base

```html
<!-- Usage minimal de l'index table -->
<lu-index-table>
  <thead luIndexTableHead>
    <!-- Définition des en-têtes -->
  </thead>
  <tbody luIndexTableBody>
    <!-- Parcours des rows -->
    <tr luIndexTableRow>
      <th luIndexTableCell>En-tête 1</th>
      <td luIndexTableCell>Donnée</td>
    </tr>
  </tbody>
  <tfoot luIndexTableFoot>
    <!-- Contenu éventuel du pied de tableau -->
  </tfoot>
</lu-index-table>
```

## Directive / Composant : `lu-index-table`

Composant Angular qui sert de conteneur pour l’affichage d’un tableau listant des ressources. S’utilise sur l’élément <lu-index-table> et se combine avec ses sous-composants (luIndexTableHead, luIndexTableBody, luIndexTableFoot, etc.) pour construire la structure complète du tableau.

## Inputs

### `empty`
Type: boolean — Default: false  
Affiche un état vide (empty state) à la place des lignes de tableau lorsque la donnée est absente ou vide.

```html
<lu-index-table [empty]="true">
  ...
</lu-index-table>
```

### `layoutFixed`
Type: boolean — Default: false  
Applique une largeur fixe aux colonnes du tableau pour garantir une répartition homogène de l’espace.

```html
<lu-index-table [layoutFixed]="true">
  ...
</lu-index-table>
```

### `selectable`
Type: boolean — Default: false  
Rend les lignes du tableau sélectionnables via l’affichage de cases à cocher.

```html
<lu-index-table [selectable]="true">
  ...
</lu-index-table>
```

### `action`
Type: string — Default: 'button'  
Modifie le type d’élément HTML cliquable pour les actions des lignes (peut être configuré, par exemple, en 'a' pour un lien).

```html
<lu-index-table [action]="'a'">
  ...
</lu-index-table>
```

### `hiddenLabel`
Type: boolean — Default: false  
Masque les cellules d’en-tête du tableau pour les contextes où l’affichage de ces libellés n’est pas nécessaire ou déjâ présent ailleurs.

```html
<lu-index-table [hiddenLabel]="true">
  ...
</lu-index-table>
```

### `expanded`
Type: boolean — Default: false  
Affiche le groupe (si le tableau est structuré en groupes) dans son état déplié par défaut.

```html
<lu-index-table [expanded]="true">
  ...
</lu-index-table>
```

### `group`
Type: boolean — Default: false  
Active le regroupement des lignes du tableau pour les rendre dépliables, facilitant ainsi l’organisation des données.

```html
<lu-index-table [group]="true">
  ...
</lu-index-table>
```

### `groupButtonAlt`
Type: string — Default: ''  
Texte alternatif restitué par le bouton du groupe pour clarifier l’action d’expansion/repliage.

```html
<lu-index-table [groupButtonAlt]="'Voir plus'">
  ...
</lu-index-table>
```

## Patterns courants

### Index Table avec état vide
```html
<!-- Afficher un message ou un composant EmptyStateSection lorsque aucune donnée n'est disponible -->
<lu-index-table [empty]="true">
  ...
</lu-index-table>
```

### Index Table avec lignes sélectionnables et actions personnalisées
```html
<!-- Configuration d'un tableau avec sélection multiple et actions sous forme de lien -->
<lu-index-table [selectable]="true" [action]="'a'">
  <thead luIndexTableHead>
    <!-- Définitions d'en-têtes -->
  </thead>
  <tbody luIndexTableBody>
    <tr luIndexTableRow>
      <th luIndexTableCell>Nom</th>
      <td luIndexTableCell>
        <button type="button" luIndexTableAction>Action</button>
      </td>
    </tr>
  </tbody>
</lu-index-table>
```

## Accessibilité
- Veillez à associer les en-têtes de colonnes aux cellules en utilisant les balises appropriées (<th> pour les en-têtes, <td> pour les cellules).
- S’assurer que les éléments interactifs (boutons, liens) disposent d’un texte alternatif descriptif pour la navigation assistée.
- Respecter les rôles ARIA pour les tableaux lorsque le contexte d’utilisation le nécessite (par exemple, role="table").

## Guidelines Prisme
Consultez les guidelines Prisme pour confirmer les dos & don'ts spécifiques aux listings et tableaux dans l’écosystème Lucca :
- [Prisme: Composants – Structure, Empty State et autres éléments](https://prisme.lucca.io/94310e217/v/latest/p/68bde1)