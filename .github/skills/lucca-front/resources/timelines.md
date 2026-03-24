# pr-TimelineVertical

## Quand utiliser ce composant
- Pour afficher des événements ou des étapes d'un processus de manière chronologique dans un format vertical.
- Pour représenter des échéances, des jalons ou des tâches dans un projet.
- Pour visualiser le parcours d'un utilisateur ou le cheminement d'un processus au fil du temps.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-timelines-basic--docs)

## Composant Figma
[Liens Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3746-26393) + Composant illustrant une chronologie verticale, avec variantes disponibles en tailles S et M.

## Import

```typescript
import { PrTimelineVerticalComponent } from '@lucca-front/ng/timelines';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-timeline-vertical></pr-timeline-vertical>
```

## Directive / Composant : `pr-timeline-vertical` ou `<pr-timeline-vertical>`

Composant utilisé pour afficher une chronologie verticale. Applicable sur les éléments de type `<pr-timeline-vertical>`.

## Inputs

### `size`
Type: `'M' | 'S'` — Default: `'M'`

Définit la taille de la chronologie.

```html
<pr-timeline-vertical [size]="'S'"></pr-timeline-vertical>
```

## Patterns courants

### Chronologie des événements
```html
<!-- Chronologie affichant des événements spécifiques -->
<pr-timeline-vertical [size]="'M'">...</pr-timeline-vertical>
```

## Accessibilité
Assurez-vous que chaque élément de la timeline est accessible via des descriptions textuelles ou des attributs ARIA appropriés pour garantir la compréhension par les lecteurs d'écran.

## Guidelines Prisme
- Suivez les lignes directrices de style et d'accessibilité définies dans le guide de style Lucca. Évitez d'encombrer l'interface utilisateur avec des détails superflus.