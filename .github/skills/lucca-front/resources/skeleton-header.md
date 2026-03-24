# SkeletonHeaderComponent

## Quand utiliser ce composant
- Pour afficher une interface utilisateur pendant le chargement des données.
- Lorsque vous devez signaler à l'utilisateur qu'un contenu va bientôt être disponible.
- Pour maintenir une apparence visuelle stable pendant que le contenu se charge.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-header--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-header--template)

## Composant Figma
[Voir Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46912) - Le composant pr-SkeletonPageHeader (v18.1) montre une structure de chargement avec des emplacements pour les titres, les sous-titres et des éléments visuels.

## Import

```typescript
import { SkeletonHeaderComponent } from '@lucca-front/ng/loaders';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-header></lu-skeleton-header>
```

## Directive / Composant : `lu-skeleton-header`

Composant pour afficher un en-tête de page en mode chargement. Applicable sur des structures générales d'en-têtes.

## Inputs

Aucun input disponible pour ce composant.

## Patterns courants

### Exemple de chargement d'en-tête
```html
<!-- Affichage d'un en-tête de page lors du chargement -->
<lu-skeleton-header></lu-skeleton-header>
```

## Accessibilité
Les composants Skeleton ne devraient pas interagir avec l'utilisateur. Ils sont uniquement visuels et ne doivent pas être focussables pour garantir une expérience utilisateur fluide.

## Guidelines Prisme
- Toujours utiliser les Skeletons lorsqu'un chargement est nécessaire.
- Ne pas surcharger l'interface avec trop de Skeletons à la fois.
- Éviter l'utilisation des Skeletons pour masquer des contenus qui peuvent être instantanément chargés.