# Pr-DotBadge

## Quand utiliser ce composant
- Pour afficher l'état d'un élément (en ligne, en liste ou en tableau) avec une indication visuelle claire.
- Lorsqu'il est nécessaire de représenter des statuts tels que "Actif", "Inactif" ou "En attente".
- Dans des notifications ou des alertes pour signaler des changements d'état de façon concise.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-statusbadge-angular--docs) | [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-statusbadge-angular--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=13369-11940) - Le composant est un badge circulaire, disponible dans trois tailles : S, XS, et M.

## Import

```typescript
import { StatusBadgeComponent } from '@lucca-front/ng/statusbadge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-status-badge></lu-status-badge>
```

## Directive / Composant : `lu-status-badge`

Composant pour afficher un badge d'état. Applicable sur les éléments HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `size` | Définit la taille du badge (S, XS, M). |

```html
<lu-status-badge size="S"></lu-status-badge>
```

## Inputs

### `size`
Type: `'S' | 'XS' | 'M'` — Default: `'S'`

Permet de définir la taille du badge.

```html
<lu-status-badge [size]="'M'"></lu-status-badge>
```

## Patterns courants

### Badge d'état actif
```html
<!-- Représentation d'un état actif -->
<lu-status-badge size="S"></lu-status-badge>
```

## Accessibilité
Utiliser les attributs ARIA appropriés pour assurer que les utilisateurs de technologies d'assistance comprennent le statut du badge.

## Guidelines Prisme
- Favoriser l'utilisation de tailles appropriées en fonction du contexte pour garantir une bonne lisibilité.
- Ne pas surcharger d'informations un badge. Utiliser des couleurs contrastantes pour améliorer la visibilité.