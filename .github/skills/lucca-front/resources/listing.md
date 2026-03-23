# Listing

## Quand utiliser ce composant
- Pour afficher une liste d'éléments avec ou sans icônes, en utilisant différents types de listes (checklist, ordonnée, non ordonnée).
- Quand il est nécessaire de représenter une liste d'éléments interactifs avec une option de marquage (checklist).
- Pour afficher des éléments en ligne ou dans un style traditionnel, selon le contexte requis par l'application.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-listing-angular-basic--template)
- [Template Inline](https://lucca-front.lucca.io/storybook/?path=/story/documentation-listings-listing-angular-inline--template)

## Composant Figma
[Accéder au design dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33815-19037) - Composant pr-Listing (v20.1) avec 14 variantes de taille et de type.

## Import

```typescript
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-listing>
  <lu-listing-item>Item 1</lu-listing-item>
  <lu-listing-item>Item 2</lu-listing-item>
</lu-listing>
```

## Directive / Composant : `lu-listing` ou `<lu-listing>`

Ce sélecteur est utilisé pour créer des listes d'éléments. Applicable sur les éléments HTML comme `<ul>`, `<ol>` et autres conteneurs.

### Valeurs

| Valeur      | Description                      |
|-------------|----------------------------------|
| `""` (vide) | Variante par défaut (liste simple) |
| `"checklist"` | Liste avec éléments cochables    |
| `"ordered"`   | Liste numérotée                  |
| `"icons"`     | Liste avec icônes                |

```html
<lu-listing type="checklist">...</lu-listing>
```

## Inputs

### `checklist`
Type: `boolean` — Default: `false`

Indique si la liste doit être traitée comme une checklist.

```html
<lu-listing [checklist]="true">...</lu-listing>
```

### `ordered`
Type: `boolean` — Default: `false`

Indique si la liste doit être affichée en ordre numérique.

```html
<lu-listing [ordered]="true">...</lu-listing>
```

### `icons`
Type: `boolean` — Default: `false`

Indique si des icônes doivent être affichées à côté des éléments de la liste.

```html
<lu-listing [icons]="true">...</lu-listing>
```

### `palette`
Type: `'none' | 'primary' | 'secondary'` — Default: `'none'`

Définit la palette de couleurs utilisée pour la liste.

```html
<lu-listing palette="primary">...</lu-listing>
```

### `start`
Type: `number` — Default: `1`

Définit le numéro de départ pour une liste ordonnée.

```html
<lu-listing [start]="3" [ordered]="true">...</lu-listing>
```

### `reversed`
Type: `boolean` — Default: `false`

Indique si les éléments doivent être affichés en ordre inversé.

```html
<lu-listing [reversed]="true">...</lu-listing>
```

### `defaultIcon`
Type: `string` — Default: `''`

Définit l'icône par défaut à utiliser lorsque la propriété `icon` n'est pas spécifiée.

```html
<lu-listing [defaultIcon]="'check'">...</lu-listing>
```

### `icon`
Type: `string` — Default: `''`

Définit l'icône à afficher pour un élément de la liste.

```html
<lu-listing-item icon="star">Item avec étoile</lu-listing-item>
```

## Patterns courants

### Liste ordonnée
```html
<lu-listing ordered>
  <lu-listing-item>Premier élément</lu-listing-item>
  <lu-listing-item>Deuxième élément</lu-listing-item>
</lu-listing>
```

### Checklist
```html
<lu-listing checklist>
  <lu-listing-item>Élément à cocher 1</lu-listing-item>
  <lu-listing-item>Élément à cocher 2</lu-listing-item>
</lu-listing>
```

## Accessibilité
S'assurer que les éléments de checklist sont navigables via le clavier et qu'ils utilisent des attributs ARIA appropriés pour indiquer leur état coché ou non.

## Guidelines Prisme
- Utiliser les types de listes appropriés selon le contexte (checklist, ordinaise).
- Ne pas abuser des icônes; les utiliser uniquement lorsque cela améliore l'expérience utilisateur.