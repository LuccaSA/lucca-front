# Sortable List

## Quand utiliser ce composant
1. Vous souhaitez offrir une fonctionnalité de réordonnancement par glisser-déposer dans une liste.
2. Vous devez afficher une liste d'éléments avec des options supplémentaires comme un message d'aide, ou la possibilité de suppression.
3. Vous voulez un affichage adaptatif de la liste avec des tailles d’éléments différentes (S ou M).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)
- [Exemple interactif — Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-sortable-list-angular-basic--basic)
- [Exemple interactif — Draggable](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-sortable-list-angular-draggable--basic)

## Composant Figma
- [Sortable List sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3136-21597)  
  Représentation visuelle des différentes variantes disponibles :  
  - **Size=M** : Taille standard.  
  - **Size=S** : Taille compacte.

## Import

```typescript
import { SortableListComponent, SortableListItemComponent } from '@lucca-front/ng/sortable-list';
```

## Usage de base

### Liste simple réorganisable
```html
<lu-sortable-list>
  <lu-sortable-list-item label="Premier élément"></lu-sortable-list-item>
  <lu-sortable-list-item label="Deuxième élément"></lu-sortable-list-item>
  <lu-sortable-list-item label="Troisième élément"></lu-sortable-list-item>
</lu-sortable-list>
```

## Composants : `<lu-sortable-list>` et `<lu-sortable-list-item>`

Le composant `lu-sortable-list` est utilisé pour afficher et gérer une liste ordonnée et réorganisable par glisser-déposer.  
Les items individuels de la liste sont représentés par `lu-sortable-list-item`.

### Inputs pour `lu-sortable-list-item`

| Nom            | Type                   | Default | Description                                                   |
|----------------|------------------------|---------|---------------------------------------------------------------|
| `label`        | string                 | `''`    | Définit le texte principal de l'élément de la liste.          |
| `helperMessage`| string                 | `null`  | Ajoute un texte secondaire comme message d'aide.              |
| `small`        | boolean                | `false` | Réduit la taille de l'élément (correspond à la variante S).   |
| `clickable`    | boolean                | `false` | Rend l'élément cliquable.                                     |
| `unclearable`  | boolean                | `false` | Masque la croix de suppression.                               |

### Input pour `lu-sortable-list`

| Nom   | Type                                              | Description                                   |
|-------|---------------------------------------------------|-----------------------------------------------|
| `drop`| (event: CdkDragDrop<any[]>) => void | Événement déclenché lors du réordonnancement de la liste. |

Usage exemple avec un `drop` :
```html
<lu-sortable-list (drop)="onDrop($event)">
  <lu-sortable-list-item label="Premier élément"></lu-sortable-list-item>
  <lu-sortable-list-item label="Deuxième élément"></lu-sortable-list-item>
  <lu-sortable-list-item label="Troisième élément"></lu-sortable-list-item>
</lu-sortable-list>
```

```typescript
onDrop(event: CdkDragDrop<any[]>): void {
  moveItemInArray(this.items, event.previousIndex, event.currentIndex);
}
```

## Patterns courants

### Utilisation avec un message d'aide et suppression désactivée
```html
<lu-sortable-list>
  <lu-sortable-list-item label="Premier élément" helperMessage="Aide pour cet élément" unclearable></lu-sortable-list-item>
  <lu-sortable-list-item label="Deuxième élément" helperMessage="Un autre message" unclearable></lu-sortable-list-item>
</lu-sortable-list>
```

### Petite liste réorganisable
```html
<lu-sortable-list>
  <lu-sortable-list-item label="Petit élément" [small]="true"></lu-sortable-list-item>
  <lu-sortable-list-item label="Un autre petit élément" [small]="true"></lu-sortable-list-item>
</lu-sortable-list>
```

## Accessibilité
- Les éléments ont des attributs ARIA intégrés pour annoncer leur rôle, leur position et leur état lors de la réorganisation.
- Assurez-vous d'utiliser des textes d'étiquette (`label`) descriptifs et représentatifs pour améliorer l'expérience utilisateur des lecteurs d'écran.
- Garantir la prise en charge du clavier pour le réordonnancement, notamment la navigation et l'activation des actions via la touche <kbd>Tab</kbd>, <kbd>Entrée</kbd> et les flèches de direction.

## Guidelines Prisme
- [Bonnes pratiques pour une liste réorganisable](https://prisme.lucca.io/94310e217/v/latest/p/883e34) : Conseils sur l'ergonomie des listes réorganisables dans les interfaces.