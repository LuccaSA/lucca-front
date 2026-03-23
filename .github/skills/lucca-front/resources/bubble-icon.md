# pr-BubbleIcon

## Quand utiliser ce composant
- Pour ajouter des icônes informatives avec des bulles colorées sur vos interfaces.
- Lorsque vous souhaitez représenter des actions ou des états avec des variations de couleurs et directions.
- En complément d’autres composants pour fournir un contexte visuel additionnel à l’utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-bubble-icon-angular-basic--basic)

## Composant Figma
[pr-BubbleIcon sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-9511) - Le composant représente des icônes avec des bulles, pouvant être stylisées selon différentes palettes et directions. Variantes disponibles incluant diverses combinaisons de direction et de palette.

## Import

```typescript
import { BubbleIconComponent } from '@lucca-front/ng/bubble-icon';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-bubble-icon></lu-bubble-icon>
```

## Directive / Composant : `luBubbleIcon` ou `<lu-bubble-icon>`

Description courte du sélecteur. Applicable sur les éléments HTML pour afficher une icône avec une bulle colorée.

### Valeurs

| Valeur   | Description                         |
|----------|-------------------------------------|
| `""` (vide) | Variante par défaut                 |
| `"left"`  | Bulle à gauche                     |
| `"right"` | Bulle à droite                     |
| `"top"`   | Bulle en haut                      |
| `"bottom"`| Bulle en bas                       |

```html
<lu-bubble-icon bubbleDirection="left"></lu-bubble-icon>
```

## Inputs

### `direction`
Type: `'' | 'left' | 'right' | 'top' | 'bottom'` — Default: `''`

Définit une direction de la bulle. Aléatoire par défaut.

```html
<lu-bubble-icon [direction]="value"></lu-bubble-icon>
```

### `size`
Type: `'S' | '' | 'L'` — Default: `''`

Modifie la taille du composant.

```html
<lu-bubble-icon [size]="value"></lu-bubble-icon>
```

### `palette`
Type: `'product' | 'pagga' | 'poplee' | 'coreHR' | 'timmi' | 'cleemy' | 'cc' | 'brand' | 'neutral' | 'success' | 'warning' | 'critical' | 'kiwi' | 'lime' | 'cucumber' | 'mint' | 'glacier' | 'lagoon' | 'blueberry' | 'lavender' | 'grape' | 'watermelon' | 'pumpkin' | 'pineapple'` — Default: `'neutral'`

Applique une palette de couleurs au composant.

```html
<lu-bubble-icon [palette]="value"></lu-bubble-icon>
```

### `icon`
Type: `string` — Default: `''`

Modifie le glyphe de l'icône.

```html
<lu-bubble-icon [icon]="value"></lu-bubble-icon>
```

### `alt`
Type: `string` — Default: `''`

Information restituée par le lecteur d'écran.

```html
<lu-bubble-icon [alt]="value"></lu-bubble-icon>
```

## Patterns courants

### Icone avec palette et direction
```html
<lu-bubble-icon direction="right" palette="kiwi" size="L" icon="someIcon" alt="Description de l'icône"></lu-bubble-icon>
```

## Accessibilité
S'assurer que l'attribut `alt` est utilisé pour décrire le contenu de l'icône aux utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Favoriser l'utilisation de couleurs qui respectent la charte graphique de Lucca.
- Éviter d'utiliser des icônes non-standards ou peu compréhensibles pour une bonne accessibilité.
- Limiter le nombre de variations affichées pour éviter une surcharge visuelle.