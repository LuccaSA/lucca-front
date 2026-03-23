# pr-SortableList

## Quand utiliser ce composant
- Pour créer des listes d'éléments que l'utilisateur peut trier en modifiant l'ordre des éléments.
- Lorsqu'une fonctionnalité de glisser-déposer est nécessaire pour réorganiser les éléments listés.
- Pour afficher des listes d'éléments pouvant être interactives et affichant des messages d'aide.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-sortable-list-angular-basic--basic)
- [Draggable](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-sortable-list-angular-draggable--basic)

## Composant Figma
[🔗 Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3136-21597) – Le composant pr-SortableList permet de gérer des listes triables, avec des variantes de tailles disponibles (Size=M et Size=S).

## Import

```typescript
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-sortable-list>
  <lu-sortable-list-item label="Label 1" helperMessage="Helper message 1"></lu-sortable-list-item>
  <lu-sortable-list-item label="Label 2" helperMessage="Helper message 2"></lu-sortable-list-item>
  <lu-sortable-list-item label="Label 3" helperMessage="Helper message 3"></lu-sortable-list-item>
</lu-sortable-list>
```

## Directive / Composant : `luSortableList` ou `<lu-sortable-list>`

Directive pour créer une liste sortable. Applicable sur les éléments qui doivent être des listes d'éléments triables.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"small"` | Affiche la liste dans une taille réduite |

```html
<lu-sortable-list small>...</lu-sortable-list>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Modifie le texte principal d'un élément de liste.

```html
<lu-sortable-list-item label="Votre Label">...</lu-sortable-list-item>
```

### `helperMessage`
Type: `string` — Default: `''`

Ajoute un texte secondaire à l'élément de liste.

```html
<lu-sortable-list-item label="Votre Label" helperMessage="Votre message d'aide">...</lu-sortable-list-item>
```

### `small`
Type: `boolean` — Default: `false`

Modifie la taille du composant.

```html
<lu-sortable-list [small]="true">...</lu-sortable-list>
```

### `clickable`
Type: `boolean` — Default: `false`

Rend les lignes cliquables.

```html
<lu-sortable-list-item [clickable]="true">...</lu-sortable-list-item>
```

### `unclearable`
Type: `boolean` — Default: `false`

Masque la croix de suppression.

```html
<lu-sortable-list-item [unclearable]="true">...</lu-sortable-list-item>
```

## Patterns courants

### Liste triable
```html
<!-- Liste d'éléments avec option de réorganisation -->
<lu-sortable-list>
  <lu-sortable-list-item label="Élément 1" helperMessage="Aide 1"></lu-sortable-list-item>
  <lu-sortable-list-item label="Élément 2" helperMessage="Aide 2"></lu-sortable-list-item>
  <lu-sortable-list-item label="Élément 3" helperMessage="Aide 3"></lu-sortable-list-item>
</lu-sortable-list>
```

## Accessibilité
Assurez-vous que les éléments de la liste soient accessibles via la navigation par clavier et qu'ils respectent les normes ARIA pour une compréhension optimale des utilisateurs de lecteurs d'écran.

## Guidelines Prisme
Respectez les lignes directrices établies par le design Lucca lors de la création de listes triables. Évitez les chevauchements d'éléments et assurez-vous que chaque élément ait une taille suffisante pour une interaction facile.