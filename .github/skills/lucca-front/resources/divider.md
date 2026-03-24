# pr-Divider

## Quand utiliser ce composant
- Pour séparer visuellement des sections dans un layout.
- Lors de la création d'un formulaire pour distinguer les groupes de champs.
- Pour organiser des listes ou des tableaux en récupérant une meilleure lisibilité.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-listing-html-css-divider--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-divider-angular--basic)

## Composant Figma
[Visuel pr-Divider sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3130-2035) + Variantes disponibles : Style=Horizontal, Style=Horizontal - Content, Style=Vertical.

## Import

```typescript
import { DividerComponent } from '@lucca-front/ng/divider';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-divider></lu-divider>
```

## Directive / Composant : `lu-divider`

Composant utilisé pour créer des séparateurs visuels entre les sections.

### Valeurs

| Valeur          | Description                       |
|-----------------|-----------------------------------|
| `""` (vide)     | Variante par défaut (horizontal)  |
| `"content"`     | Variante avec contenu horizontal   |
| `"vertical"`    | Variante verticale                 |

```html
<lu-divider style="vertical"></lu-divider>
```

## Inputs

### `style`
Type: `'horizontal' | 'content' | 'vertical'` — Default: `'horizontal'`

Définit le style du séparateur.

```html
<lu-divider [style]="'content'"></lu-divider>
```

## Patterns courants

### Séparation de sections
```html
<!-- Utilisation pour séparer deux parties d'une page -->
<lu-divider></lu-divider>
```

## Accessibilité
Assurez-vous que le séparateur n'est pas perçu comme une barrière par les technologies d'assistance en utilisant des rôles et des attributs ARIA appropriés si nécessaire.

## Guidelines Prisme
- Utilisez le composant pour améliorer la lisibilité.
- Évitez d'utiliser plusieurs séparateurs consécutifs sans contenu significatif entre eux.