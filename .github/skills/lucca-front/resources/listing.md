# Listing

## Quand utiliser ce composant
- Pour afficher des listes d'éléments de manière structurée et visuellement agréable.
- Lorsqu'il est nécessaire d'afficher des éléments sous forme de checklist, texte, ou avec des icônes.
- Pour créer des sections récapitulatives d'informations organisées dans des applications Angular.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-listing-angular-basic--template)
- [Template inline](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-listing-angular-inline--template)

## Composant Figma
[Visuel du composant pr-Listing](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33815-19037) — Propose de multiples variantes de présentation, y compris des listes à cocher, avec icônes, et différentes tailles, adaptées à divers besoins d'affichage.

## Import

```typescript
import { ListingComponent } from '@lucca-front/ng/listing';
import { ListingItemComponent } from '@lucca-front/ng/listing';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-listing>
  <lu-listing-item>Élément 1</lu-listing-item>
  <lu-listing-item>Élément 2</lu-listing-item>
</lu-listing>
```

## Directives / Composant : `lu-listing` ou `<lu-listing>`

Composant principal pour l'affichage de listes. Applicable sur les éléments de liste et peut contenir des `lu-listing-item`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut pour afficher une liste simple. |

```html
<lu-listing>...</lu-listing>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille de la liste, où `S` représente une petite taille et `M` une taille moyenne.

```html
<lu-listing [size]="'S'">...</lu-listing>
```

### `type`
Type: `'Checklist' | 'Ordered' | 'Unordered' | 'Text' | 'Icons'` — Default: `'Text'`

Définit le type de liste à afficher, offrant des choix comme des checklists ou des listes avec des icônes.

```html
<lu-listing [type]="'Checklist'">...</lu-listing>
```

### `inline`
Type: `boolean` — Default: `false`

Détermine si les éléments de la liste doivent être affichés en ligne ou en bloc.

```html
<lu-listing [inline]="true">...</lu-listing>
```

## Patterns courants

### Liste de checkboxes
```html
<lu-listing [type]="'Checklist'">
  <lu-listing-item>Option 1</lu-listing-item>
  <lu-listing-item>Option 2</lu-listing-item>
</lu-listing>
```

## Accessibilité
Veillez à ajouter des attributs ARIA appropriés pour garantir l'accessibilité, notamment pour les listes interactives.

## Guidelines Prisme
- Assurez-vous que la taille et le type de liste choisis correspondent au contexte de l'application.
- Ne surchargez pas l'interface avec trop d'icônes ou d'éléments dans une liste.
- Utilisez des listes à cocher uniquement lorsque c'est nécessaire, et assurez-vous de fournir un feedback à l'utilisateur après l'interaction.