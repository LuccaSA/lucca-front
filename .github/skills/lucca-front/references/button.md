# pr-ButtonGroup

## Quand utiliser ce composant
- Lorsque vous devez grouper plusieurs boutons ayant une fonction similaire dans une interface.
- Pour améliorer l'ergonomie en proposant des actions groupées, par exemple sur des formulaires ou des dialogues.
- Lors de l'utilisation d'actions simultanées où la hiérarchie des boutons est essentielle.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-actions-button-angular-ai--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-ai--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-basic--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-basic--basic-test)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-counter--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-counter--basic-test)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-icon--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-icon--basic-test)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=32845-165564) - Variantes disponibles : 9 variantes incluant des types Filled et Outlined avec les palettes Product et Neutral.

## Import

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
```

## Usage de base

```html
<!-- Usage minimal -->
<button type="button" luButton>Button</button>
```

## Directive / Composant : `luButton` ou `<lu-button>`

Directive utilisée pour modifier la hiérarchie ou le style du bouton. Applicable aux éléments `<button>`.

### Valeurs

| Valeur       | Description                                               |
|--------------|---------------------------------------------------------|
| `""` (vide)  | Variante par défaut                                      |
| `"AI"`       | Spécifie un bouton avec style AI                        |
| `"block"`    | Applique display: block au bouton                       |
| ...          | Autres valeurs possibles selon les variantes et états   |

```html
<button type="button" luButton="AI">AI Button</button>
```

## Inputs

### `block`
Type: `boolean` — Default: `false`

Applique display: block au bouton.

```html
<button type="button" luButton [block]="true">Block Button</button>
```

### `palette`
Type: `'Product' | 'Neutral'` — Default: `'Product'`

Applique une palette de couleurs au bouton.

```html
<button type="button" luButton [palette]="'Neutral'">Neutral Button</button>
```

### `state`
Type: `'normal' | 'hover' | 'active' | 'disabled'` — Default: `'normal'`

Modifie l'état du bouton.

```html
<button type="button" luButton [state]="'disabled'" disabled>Disabled Button</button>
```

### `disclosure`
Type: `boolean` — Default: `false`

Indique la présence d'un menu.

```html
<button type="button" luButton [disclosure]="true">Button with menu</button>
```

### `critical`
Type: `boolean` — Default: `false`

Marque une action aux conséquences importantes ou irréversibles au survol et focus. Seulement compatible avec outlined et ghost.

```html
<button type="button" luButton [critical]="true">Critical Action</button>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du composant.

```html
<button type="button" luButton [size]="'large'">Large Button</button>
```

## Patterns courants

### Boutons groupés
```html
<!-- Exemple d'utilisation d'un groupe de boutons -->
<div>
    <button type="button" luButton="AI">AI Action</button>
    <button type="button" luButton [palette]="'Neutral'">Neutral Action</button>
</div>
```

## Accessibilité
Assurez-vous d'utiliser des attributs ARIA appropriés si nécessaire, en particulier pour les boutons ayant des fonctionnalités de menu.

## Guidelines Prisme
- Lorsque vous utilisez les boutons dans une interface, assurez-vous de conserver une hiérarchie claire et logique.
- Évitez d'utiliser plusieurs boutons similaires dans un espace confiné pour réduire la confusion.