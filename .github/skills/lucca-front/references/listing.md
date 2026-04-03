# pr-Listing (v20.1)  🎉

## Quand utiliser ce composant
- Pour afficher une liste d'éléments de manière structurée et configurable.
- Lorsque vous avez besoin d'afficher des listes avec différentes variantes (checklist, icônes, texte, etc.).
- Pour ajouter des éléments de liste avec ou sans icônes intégrées pour améliorer la visualisation et l'interaction utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-angular-basic--docs)
- [Template (basique)](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-listing-angular-basic--template)
- [Template (inline)](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-listing-angular-inline--template)

## Composant Figma
[Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33815-19037) - Composant pr-Listing, variantes disponibles : checklist, icônes, texte, avec différentes tailles et options d'affichage.

## Import

```typescript
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```

## Usage de base

```html
<lu-listing>
	<lu-listing-item>item</lu-listing-item>
	<lu-listing-item>item</lu-listing-item>
</lu-listing>
```

## Directive / Composant : `lu-listing` ou `<lu-listing-item>`

Le sélecteur `lu-listing` est utilisé pour créer une liste, et `lu-listing-item` pour chaque élément de cette liste. Applicable sur les éléments HTML `lu-listing` pour la collection et `lu-listing-item` pour les éléments individuels.

### Valeurs

Il n'y a pas de valeurs spécifiques pour la directive principale. Pour `lu-listing-item`, utilisez les attributs directement par exemple `critical` pour indiquer un élément critique.

## Inputs

### `defaultIcon`
Type: `string` — Default: `undefined`

Modifie l'icône par défaut de la liste.

```html
<lu-listing [defaultIcon]="'icon-default'"></lu-listing>
```

### `icon`
Type: `string` — Default: `undefined`

Modifie l'icône d'un élément de la liste.

```html
<lu-listing-item [icon]="'icon-item'">item</lu-listing-item>
```

### `start`
Type: `number` — Default: `1`

Modifie la valeur initiale de la liste pour les ordres.

```html
<lu-listing [start]="5">
	<lu-listing-item>item</lu-listing-item>
</lu-listing>
```

### `reversed`
Type: `boolean` — Default: `false`

Présente la liste sous forme décroissante.

```html
<lu-listing [reversed]="true">
	<lu-listing-item>item</lu-listing-item>
</lu-listing>
```

### `palette`
Type: `string` — Default: `undefined`

Modifie la couleur des icônes.

```html
<lu-listing [palette]="'primary'"></lu-listing>
```

### `divider`
Type: `boolean` — Default: `false`

Ajoute un séparateur vertical entre les éléments.

```html
<lu-listing [divider]="true">
	<lu-listing-item>item</lu-listing-item>
</lu-listing>
```

## Patterns courants

### Liste avec icônes
```html
<!-- Utilisation d'icônes dans une liste basique -->
<lu-listing [defaultIcon]="'icon-default'">
	<lu-listing-item icon="icon-item1">Item 1</lu-listing-item>
	<lu-listing-item icon="icon-item2">Item 2</lu-listing-item>
</lu-listing>
```

## Accessibilité
Assurez-vous que chaque élément de liste a un texte pertinent pour aider les lecteurs d'écran à fournir le contexte à l'utilisateur.

## Guidelines Prisme
- Ne pas utiliser de listes trop imbriquées pour maintenir une bonne lisibilité.
- Utiliser des icônes pour améliorer l'interaction, mais ne pas sacrifier le texte descriptif.