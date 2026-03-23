# pr-Icon

## Quand utiliser ce composant
- Pour afficher des icônes dans un menu ou une barre de navigation.
- Lors de la création de boutons d'action avec des icônes pour enrichir l'interface utilisateur.
- Pour ajouter des éléments graphiques succincts dans des tableaux ou des listes.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-html-css-icons--docs)

## Composant Figma
[Accéder au composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34358-50637) - Composant pr-Icon avec 7 variantes de taille disponibles.

## Import

```typescript
import { IconComponent } from '@lucca-front/ng/icons';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-icon></lu-icon>
```

## Directive / Composant : `luIcon` ou `<lu-icon>`

Directive utilisée pour afficher une icône. Applicable sur les éléments permettant l'insertion d'images ou d'éléments graphiques.

### Valeurs

| Valeur | Description               |
|--------|---------------------------|
| `""` (vide) | Variante par défaut (taille M) |
| `"S"`      | Taille petite              |
| `"XS"`     | Taille extra petite        |
| `"XXS"`    | Taille très petite         |
| `"XXL"`    | Taille très grande         |
| `"L"`      | Taille grande              |
| `"XL"`     | Taille extra grande        |

```html
<lu-icon size="S"></lu-icon>
```

## Inputs

### `size`
Type: `'S' | 'XS' | 'XXS' | 'XXL' | 'L' | 'XL' | 'M'` — Default: `'M'`

Définit la taille de l'icône affichée.

```html
<lu-icon [size]="value"></lu-icon>
```

## Patterns courants

### Utilisation d'une icône dans un bouton
```html
<!-- Ajout d'une icône à un bouton -->
<button type="button">
  <lu-icon size="L"></lu-icon>
  Action
</button>
```

## Accessibilité
S'assurer que les icônes ont une signification visuelle et contextuelle. Ajouter des attributs `aria-label` si nécessaire pour décrire la fonction de l'icône.

## Guidelines Prisme
- Ne pas utiliser d'icônes trop chargées visuellement, optez pour des designs simples.
- Ne pas superposer plusieurs icônes, cela peut créer de la confusion pour l'utilisateur.