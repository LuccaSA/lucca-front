# SkeletonButton

## Quand utiliser ce composant
- Pour indiquer le chargement d'un bouton dans une interface utilisateur.
- Lorsque vous souhaitez informer les utilisateurs sur la présence d'une action à venir tout en maintenant une certaine esthétique.
- Utiliser en remplacement temporaire de boutons pendant le chargement de données.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-button--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-button--template)

## Composant Figma
[Link Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46941) — Composant représentant un bouton en mode chargement avec des variantes disponibles.

## Import

```typescript
import { SkeletonButtonComponent } from '@lucca-front/ng/skeleton';
```

## Usage de base

```html
<!-- Usage minimal -->
<button luSkeletonButton></button>
```

## Directive / Composant : `luSkeletonButton` ou `<lu-skeleton-button>`

Directive appliquée pour indiquer que l'élément est un bouton en chargement. Applicable sur des éléments `<button>`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Taille petite |
| `"XS"` | Taille extra petite |

```html
<button luSkeletonButton="S"></button>
```

## Inputs

### `dark`
Type: `boolean` — Default: `false`

Applique un style foncé pour un usage sur fond gris.

```html
<button luSkeletonButton [dark]="true"></button>
```

### `size`
Type: `'' | 'S' | 'XS'` — Default: `''`

Modifie la taille du composant.

```html
<button luSkeletonButton [size]="'S'"></button>
```

## Patterns courants

### Chargement de boutons
```html
<!-- Modèle pour afficher un bouton en mode chargement -->
<button luSkeletonButton [dark]="true" [size]="'XS'"></button>
```

## Accessibilité
Veillez à s'assurer que le composant indique clairement qu'il s'agit d'un élément en chargement et n'interrompt pas l'accessibilité de l'interface.

## Guidelines Prisme
- Utiliser le composant Skeleton pour tous les états de chargement visible.
- Ne pas utiliser pour des actions qui ne seront pas promptement suivies d'une interaction utilisateur.