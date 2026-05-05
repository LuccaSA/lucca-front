# SkeletonHeaderComponent

## Quand utiliser ce composant
- Lors de la présentation d'une page en attendant le chargement des données.
- Pour montrer l'emplacement d'éléments dynamiques comme des titres, des sous-titres ou des images.
- Lors de la construction d'interfaces utilisateur afin d'améliorer l'expérience de chargement.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-header--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-header--template)

## Composant Figma
[Consulter le Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46912) - Composant visuel de chargement pour afficher une structure sans contenu, offre une variante.

## Import

```typescript
import { SkeletonHeaderComponent } from '@lucca-front/ng/skeleton';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-header></lu-skeleton-header>
```

## Directive / Composant : `lu-skeleton-header`

Un composant utilisé pour indiquer des éléments en cours de chargement. Applicable sur des éléments contenant des informations à charger.

## Inputs

### (Aucun)

## Patterns courants

### Affichage de chargement
```html
<!-- Indique le chargement d'un en-tête -->
<lu-skeleton-header></lu-skeleton-header>
```

## Accessibilité
Utiliser ce composant de manière à indiquer clairement à l'utilisateur que le contenu est en cours de chargement afin de minimiser la confusion.

## Guidelines Prisme
- Utiliser un Skeleton uniquement lorsque le chargement est anticipé.
- Éviter d'utiliser des Skeletons pour des contenus qui ne nécessitent pas de temps de chargement significatif.