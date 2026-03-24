# SkeletonButtonComponent

## Quand utiliser ce composant
- Lorsque vous souhaitez informer l'utilisateur qu'un contenu est en cours de chargement, par exemple lors du chargement d'une liste d'éléments.
- Pour améliorer l'expérience utilisateur en indiquant le type et la position des éléments en attente, comme des images ou des boutons.
- Dans les interfaces où des temps de chargement peuvent être longs, afin de garder l'utilisateur engagé et informé.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-button--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-button--template)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46941) - Composant représentant un bouton en état de chargement. Disponible en variante pr-SkeletonButton (v18.1).

## Import

```typescript
import { SkeletonButtonComponent } from '@lucca-front/ng/loaders';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-button></lu-skeleton-button>
```

## Directive / Composant : `lu-skeleton-button`

Sélecteur pour le composant SkeletonButton. Applicable sur des éléments HTML pour indiquer un état de chargement.

## Inputs

Aucun input n'est spécifié pour ce composant.

## Patterns courants

### Affichage d'état de chargement
```html
<!-- Indique qu'un bouton est en cours de chargement -->
<lu-skeleton-button></lu-skeleton-button>
```

## Accessibilité
Assurez-vous que les éléments entourant le SkeletonButton soient clairs pour l'utilisateur, et qu'ils soient informés du chargement en cours via des descriptions appropriées.

## Guidelines Prisme
- Suivez les directive de chargement pour garantir une cohérence visuelle et d'expérience.
- Évitez d'utiliser ce composant dans des interfaces où le temps de chargement est minimal pour ne pas perturber l'utilisateur.