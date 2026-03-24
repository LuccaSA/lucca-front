# BubbleIconComponent

## Quand utiliser ce composant
- Pour ajouter une icône avec une bulle d'information contextuelle qui attire l'attention sur un élément de l'interface utilisateur.
- Lorsqu'il est nécessaire d'indiquer une direction spécifique pour les notifications ou les messages accompagnant une action.
- Pour enrichir visuellement un bouton ou un élément d'interface en offrant des détails supplémentaires via une palette de couleurs variées.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-bubble-icon-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-bubble-icon-angular-basic--basic)

## Composant Figma
[Perspectives du BubbleIcon sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-9511) - Ce composant possède plusieurs variantes visuelles, avec différentes directions et palettes de couleurs. 

## Import

```typescript
import { BubbleIconComponent } from '@lucca-front/ng/structure';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-bubble-icon></lu-bubble-icon>
```

## Directive / Composant : `lu-bubble-icon`

Utilisé pour afficher une bulle d'information avec une icône. Applicable à divers éléments HTML.

### Valeurs (si directive avec valeurs)

| Valeur            | Description                     |
|-------------------|---------------------------------|
| `Direction`       | Orientation de la bulle (Right, Bottom, Top, Left) |
| `Palette`         | Palette de couleurs utilisée (Lagoon, Kiwi, Pumpkin, Glacier, Warning, Watermelon, Mint, Lavender, Grape, Pineapple, Lime, Cucumber, Product, Blueberry) |

```html
<lu-bubble-icon direction="Right" palette="Lagoon"></lu-bubble-icon>
```

## Inputs

### `direction`
Type: `'Right' | 'Bottom' | 'Top' | 'Left'` — Default: `'Right'`

Définit la direction de la bulle d'information.

```html
<lu-bubble-icon [direction]="'Bottom'"></lu-bubble-icon>
```

### `palette`
Type: `'Lagoon' | 'Kiwi' | 'Pumpkin' | 'Glacier' | 'Warning' | 'Watermelon' | 'Mint' | 'Lavender' | 'Grape' | 'Pineapple' | 'Lime' | 'Cucumber' | 'Product' | 'Blueberry'` — Default: `'Lagoon'`

Définit la palette de couleurs de la bulle.

```html
<lu-bubble-icon [palette]="'Pumpkin'"></lu-bubble-icon>
```

## Patterns courants

### Utilisation classique
```html
<lu-bubble-icon direction="Top" palette="Kiwi"></lu-bubble-icon>
```

## Accessibilité
S'assurer que les w(étiquettes) aria sont correctement définies pour garantir l'accès aux utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- **Dos** : Utiliser des couleurs contrastées pour les palettes afin d'améliorer la lisibilité.
- **Don'ts** : Éviter d'utiliser des directions trop proches pour des éléments similaires afin de prévenir la confusion visuelle.