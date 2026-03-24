# SortableList

## Quand utiliser ce composant
- Pour créer une interface utilisateur où les utilisateurs peuvent réorganiser des éléments de manière interactive.
- Dans les situations où il est nécessaire de classer ou de prioriser des éléments dynamiquement selon les préférences de l'utilisateur.
- Pour permettre la réorganisation de listes dans des tableaux de bord ou des gestionnaires de tâches.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-sortable-list-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-sortable-list-angular-basic--basic)
- [Draggable](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-sortable-list-angular-draggable--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3136-21597) – Composant de liste sortable avec deux variantes : Size=M, Size=S. Design minimaliste et moderne adapté pour une expérience utilisateur intuitive.

## Import

```typescript
import { SortableListComponent } from '@lucca-front/ng/list';
// ou
import { SortableListItemComponent } from '@lucca-front/ng/list';
```

## Usage de base

```html
<lu-sortable-list>
  <lu-sortable-list-item>Élément 1</lu-sortable-list-item>
  <lu-sortable-list-item>Élément 2</lu-sortable-list-item>
</lu-sortable-list>
```

## Directive / Composant : `lu-sortable-list` ou `<lu-sortable-list-item>`

Le sélecteur `lu-sortable-list` est utilisé pour créer un conteneur pour une liste d'éléments réorganisables. `lu-sortable-list-item` est utilisé pour chaque élément de la liste.

### Valeurs

#### Pour `lu-sortable-list`
Aucune valeur spécifiée.

#### Pour `lu-sortable-list-item`
Aucune valeur spécifiée.

## Inputs

Aucun input mentionné dans les données disponibles.

## Patterns courants

### Liste Réorganisable
```html
<lu-sortable-list>
  <lu-sortable-list-item>Élément A</lu-sortable-list-item>
  <lu-sortable-list-item>Élément B</lu-sortable-list-item>
  <lu-sortable-list-item>Élément C</lu-sortable-list-item>
</lu-sortable-list>
```

## Accessibilité
Assurez-vous que les éléments de la liste peuvent être manipulés par le clavier et qu'ils sont correctement étiquetés pour les technologies d'assistance.

## Guidelines Prisme
- Utilisez des couleurs et des polices approuvées selon les spécifications de Lucca pour maintenir une cohérence visuelle.
- Assurez-vous que les interactions sont intuitives et que l'état d'une liste sortable est clair pour l'utilisateur.