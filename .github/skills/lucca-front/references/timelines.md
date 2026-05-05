# pr-TimelineHorizontal

## Quand utiliser ce composant
- Pour présenter des étapes de projet de manière visuelle et organisée.
- Pour illustrer un calendrier d'événements sur une ligne temporelle.
- Pour montrer l'évolution d'un produit ou d'une fonctionnalité au fil du temps.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-timelines-basic--docs)

## Composant Figma
[Visionnez le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3746-26369) — Composant de timeline horizontale avec deux variantes disponibles : Taille Small et Taille Default.

## Import

```typescript
import { PrTimelineHorizontalComponent } from '@lucca-front/ng/timelines';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-timeline-horizontal></pr-timeline-horizontal>
```

## Directive / Composant : `prTimelineHorizontal` ou `<pr-timeline-horizontal>`

Composant pour afficher une timeline horizontale, applicable sur des éléments HTML de type block.

### Valeurs (si directive avec valeurs)

| Valeur       | Description                |
|--------------|----------------------------|
| `""` (vide)  | Variante par défaut (Default) |
| `"small"`    | Variante petite (Size Small)     |

```html
<pr-timeline-horizontal size="small"></pr-timeline-horizontal>
```

## Inputs

### `size`
Type: `'default' | 'small'` — Default: `'default'`

Définit la taille de la timeline, disponible en taille par défaut ou petite.

```html
<pr-timeline-horizontal [size]="'small'"></pr-timeline-horizontal>
```

## Patterns courants

### Timeline avec événements
```html
<!-- Affichage d'une timeline avec des événements spécifiques -->
<pr-timeline-horizontal [size]="'default'">...</pr-timeline-horizontal>
```

## Accessibilité
Assurer que chaque étape de la timeline est bien étiquetée pour être compréhensible par les lecteurs d'écran.

## Guidelines Prisme
Suivre les directives du styleguides de Prisme pour garantir la cohérence visuelle et l'utilisation appropriée des composants.