# pr-BubbleIllustration

## Quand utiliser ce composant
- Pour afficher un message d'état (erreur, succès, avertissement) visuellement attractif.
- Lors de la recherche de contenu pour indiquer qu'aucun résultat n'a été trouvé.
- Pour rendre des notifications à l'utilisateur de manière ludique et engageante.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-bubble-illustration-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-bubble-illustration-angular-basic--basic)

## Composant Figma
[Documentation Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-10009) - Composant visuel représentant des illustrations de bulles avec différentes variantes incluant des messages d'état tels que succès, erreur et avertissement.

## Import

```typescript
import { BubbleIllustrationComponent } from '@lucca-front/ng/structure';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-bubble-illustration>...</lu-bubble-illustration>
```

## Directive / Composant : `lu-bubble-illustration` ou `<lu-bubble-illustration>`

Composant à utiliser pour afficher des illustrations de bulles. Applicable sur tous les éléments HTML.

### Valeurs

| Valeur                 | Description                  |
|-----------------------|------------------------------|
| `""` (vide)           | Variante par défaut          |
| `"Type=Error"`       | Illustration pour une erreur  |
| `"Type=Success - Thumb up"` | Illustration pour un succès avec un pouce levé |
| `"Type=Success - Award"`     | Illustration pour un succès avec un prix |
| `"Type=Warning"`     | Illustration pour une alerte  |
| `"Type=Empty search"` | Illustration quand aucun résultat n'est trouvé |
| `"Type=Success - Party popper"` | Illustration festive pour un succès |

```html
<lu-bubble-illustration type="Type=Success - Thumb up">...</lu-bubble-illustration>
```

## Inputs

### `type`
Type: `'Type=Error' | 'Type=Success - Thumb up' | 'Type=Success - Award' | 'Type=Warning' | 'Type=Default' | 'Type=Empty search' | 'Type=Success - Party popper'` — Default: `'Type=Default'`

Détermine le type de l'illustration à afficher.

```html
<lu-bubble-illustration [type]="'Type=Warning'">...</lu-bubble-illustration>
```

## Patterns courants

### Affichage d'un succès
```html
<lu-bubble-illustration type="Type=Success - Award">Félicitations ! Vous avez réussi.</lu-bubble-illustration>
```

## Accessibilité
Assurez-vous que le composant fournit des descriptions adéquates pour les lecteurs d'écran, notamment par le biais d'attributs `aria` appropriés.

## Guidelines Prisme
- Utilisez des illustrations conforme aux variations disponibles pour maintenir la cohérence visuelle dans votre application.
- Évitez d'utiliser des illustrations trop chargées qui peuvent distraire l'utilisateur.