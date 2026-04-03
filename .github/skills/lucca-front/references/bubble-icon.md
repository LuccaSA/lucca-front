# pr-BubbleIcon

## Quand utiliser ce composant
- Pour afficher une icône sous forme de bulle à côté d'un libellé ou d'un élément interactif.
- Lorsque vous avez besoin d'une indication visuelle associée à une information contextuelle (comme un message d'erreur ou une activité).
- Pour proposer des icônes interactives qui attirent l'attention de l'utilisateur sur des actions spécifiques.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-bubble-icon-angular-basic--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-9511) : Composant représentant une bulle avec une icône. Variantes disponibles pour la direction et la palette de couleur, fournissant de nombreuses options visuelles adaptées à différents contextes.

## Import

```typescript
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
```

## Usage de base

```html
<lu-bubble-icon></lu-bubble-icon>
```

## Directive / Composant : `lu-bubble-icon`

Composant pour afficher une icône sous forme de bulle. Applicable généralement sur des éléments conteneurs.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-bubble-icon direction="top" size="medium" icon="info" alt="Information"></lu-bubble-icon>
```

## Inputs

### `direction`
Type: `'top' | 'bottom' | 'left' | 'right'` — Default: `'random'`

Définit une direction de la bulle.

```html
<lu-bubble-icon [direction]="'top'"></lu-bubble-icon>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du composant.

```html
<lu-bubble-icon [size]="'large'"></lu-bubble-icon>
```

### `icon`
Type: `string` — Default: `''`

Modifie le glyphe de l'icône.

```html
<lu-bubble-icon [icon]="'check'"></lu-bubble-icon>
```

### `alt`
Type: `string` — Default: `''`

Information restituée par le lecteur d'écran.

```html
<lu-bubble-icon [alt]="'Aide'"></lu-bubble-icon>
```

## Patterns courants

### Bulle d'information
```html
<!-- Afficher une bulle d'information avec une icône d'aide -->
<lu-bubble-icon direction="right" size="medium" icon="help" alt="Aide"></lu-bubble-icon>
```

## Accessibilité
Assurez-vous que l'attribut `alt` est renseigné pour fournir une description textuelle pour les lecteurs d'écran, garantissant ainsi l'accessibilité du composant.

## Guidelines Prisme
- Privilégiez l'utilisation des palettes de couleur appropriées pour assurer une bonne visibilité et compréhension du message.
- Évitez de surcharger visuellement la bulle pour maintenir la lisibilité et la clarté.