# SkeletonPageHeader

## Quand utiliser ce composant
- Lorsque vous souhaitez indiquer qu'un contenu est en cours de chargement.
- Pour maintenir une bonne expérience utilisateur en prévenant l'utilisateur de l'attente.
- Dans des pages où le contenu peut varier en fonction des données, pour maintenir la structure d'affichage.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-header--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-header--template)

## Composant Figma
[Voir le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46912) - Composant pr-SkeletonPageHeader en version 18.1 avec des variantes pour indiquer le chargement.

## Import

```typescript
import { SkeletonHeaderComponent } from '@lucca-front/ng/skeleton';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-page-header>...</lu-skeleton-page-header>
```

## Directive / Composant : `luSkeletonPageHeader` ou `<lu-skeleton-page-header>`

Directive appliquée sur le composant SkeletonPageHeader pour indiquer un chargement de contenu.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `true`    | Indique un mode sombre |

```html
<lu-skeleton-page-header [dark]="true">...</lu-skeleton-page-header>
```

## Inputs

### `dark`
Type: `boolean` — Default: `false`

Active le mode sombre pour le composant.

```html
<lu-skeleton-page-header [dark]="true">...</lu-skeleton-page-header>
```

## Patterns courants

### Chargement de contenu
```html
<!-- Affichage d'un en-tête en cours de chargement -->
<lu-skeleton-page-header [dark]="false">...</lu-skeleton-page-header>
```

## Accessibilité
Assurez-vous que les composants Skeleton ne perturbent pas la navigation des lecteurs d'écran et sont correctement étiquetés lorsque le contenu devient disponible.

## Guidelines Prisme
- Utilisez les Skeletons pour améliorer l'expérience utilisateur lors des temps de chargement.
- Ne pas abuser des Skeletons : utilisez-les uniquement lorsque cela est nécessaire pour une meilleur UX.