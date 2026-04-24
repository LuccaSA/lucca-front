# pr-Icon

## Quand utiliser ce composant
- Lorsque vous avez besoin d'afficher une icône dans une interface utilisateur, par exemple, à côté d'un texte d'étiquette.
- Pour représenter visuellement des actions ou des statuts dans une liste d'éléments.
- Lors de la création de boutons ou d'éléments d'interface nécessitant une représentation graphique pour améliorer l'UX.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-html-css-icons--docs)

## Composant Figma
[Pr-Icon sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34358-50637) - Icônes disponibles dans diverses tailles (XS, XXS, S, M, L, XL, XXL).

## Import

```typescript
import { IconComponent } from '@lucca-front/ng/icons';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-icon size="M"></lu-icon>
```

## Directive / Composant : `luIcon` ou `<lu-icon>`

Le sélecteur pour utiliser le composant. Applicable sur les éléments HTML où une icône est nécessaire.

### Valeurs

| Valeur | Description          |
|--------|----------------------|
| `''` (vide) | Variante par défaut, taille M |
| `'XS'` | Taille XS |
| `'XXS'` | Taille XXS |
| `'S'` | Taille S |
| `'L'` | Taille L |
| `'XL'` | Taille XL |
| `'XXL'` | Taille XXL |

```html
<lu-icon size="S"></lu-icon>
```

## Inputs

### `size`
Type: `'XS' | 'XXS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'` — Default: `'M'`

Définit la taille de l'icône à afficher.

```html
<lu-icon [size]="value"></lu-icon>
```

## Patterns courants

### Affichage d'une icône dans un étiquette
```html
<lu-icon size="L"></lu-icon>
<span>Mon Étiquette</span>
```

## Accessibilité
Assurez-vous que chaque icône utilisée possède une alternative textuelle appropriée pour garantir l'accessibilité.

## Guidelines Prisme
- Utilisez une taille d'icône appropriée par rapport au texte ou aux éléments environnants.
- Ne surchargez pas les interfaces avec trop d'icônes, respectez l'espace et la clarté.