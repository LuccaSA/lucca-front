# Pr-SkeletonButton

## Quand utiliser ce composant
1. Lorsqu'un contenu est en cours de chargement et qu'il est nécessaire d'indiquer à l'utilisateur où le contenu apparaîtra.
2. Pour améliorer l'expérience utilisateur lors du chargement de données, en évitant les écrans vides.
3. En tant qu'élément de substitution pour les boutons en cours de chargement dans une interface utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-button--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-button--template)

## Composant Figma
[Pr-SkeletonButton (v18.1)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46941) - Un bouton d'attente avec style, affichant le type de contenu en cours de chargement. Variante disponible : pr-SkeletonButton (v18.1).

## Import

```typescript
import { SkeletonButtonComponent } from '@lucca-front/ng/skeleton';
```

## Usage de base

```html
<lu-skeleton-button></lu-skeleton-button>
```

## Directive / Composant : `lu-skeleton-button`

Sélecteur pour le composant SkeletonButton, applicable sur les éléments de bouton.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"dark"` | Applique un style foncé pour un usage sur fond gris. |

```html
<lu-skeleton-button [dark]="true"></lu-skeleton-button>
```

## Inputs

### `dark`
Type: `boolean` — Default: `false`

Applique un style foncé pour un usage sur fond gris.

```html
<lu-skeleton-button [dark]="true"></lu-skeleton-button>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du composant.

```html
<lu-skeleton-button [size]="'large'"></lu-skeleton-button>
```

## Patterns courants

### Skeleton pour les boutons
```html
<!-- Utiliser un SkeletonButton pour indiquer le chargement d'un bouton -->
<lu-skeleton-button></lu-skeleton-button>
```

## Accessibilité
Assurez-vous que les messages de chargement soient clairs et que le composant soit utilisable avec un clavier pour garantir l'accessibilité.

## Guidelines Prisme
- Utiliser les Skeletons pour indiquer un état de chargement sans confusion.
- Éviter les transitions brusques entre les Skeletons et le contenu réel pour une meilleure expérience utilisateur.
- Ne pas abuser des Skeletons dans une seule vue pour éviter la surcharge visuelle.