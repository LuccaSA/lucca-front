# pr-TimelineVertical

## Quand utiliser ce composant
- Pour afficher une séquence d'événements de manière chronologique et organisée sur une page.
- Lorsqu'il est nécessaire de présenter des informations en lien avec des dates ou des moments significatifs dans un format clair et visuel.
- Pour des interfaces utilisateur nécessitant une visualisation des progrès, des étapes de projet ou des historiques d'activités.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-timelines-basic--docs)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3746-26393) - Visualisation du composant pr-TimelineVertical, avec deux variantes disponibles : Size=M (taille normale) et Size=S (taille réduite).

## Import

```typescript
import { PrTimelineVerticalComponent } from '@lucca-front/ng/timelines';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-timeline-vertical></pr-timeline-vertical>
```

## Directive / Composant : `<pr-timeline-vertical>`

Composant pour représenter une timeline verticale, utile pour des listes d'événements.

### Valeurs

| Valeur  | Description          |
|---------|----------------------|
| `""`    | Variante par défaut (Size=M) |
| `"small"` | Variante réduite (Size=S)   |

```html
<pr-timeline-vertical size="small"></pr-timeline-vertical>
```

## Inputs

### `size`
Type: `'small' | 'medium'` — Default: `'medium'`

Détermine la taille de la timeline.

```html
<pr-timeline-vertical [size]="'small'"></pr-timeline-vertical>
```

## Patterns courants

### Affichage d'une timeline
```html
<!-- Exemple d'utilisation d'une timeline verticale pour afficher des événements -->
<pr-timeline-vertical [size]="'medium'">...</pr-timeline-vertical>
```

## Accessibilité
Assurez-vous que chaque événement de la timeline est accessible par le clavier et possède une description claire pour les lecteurs d'écran.

## Guidelines Prisme
- Évitez d'utiliser des couleurs qui nuisent à la lisibilité. 
- Préférez une hiérarchie visuelle claire pour les événements, afin de guider l'utilisateur dans la lecture de la timeline.