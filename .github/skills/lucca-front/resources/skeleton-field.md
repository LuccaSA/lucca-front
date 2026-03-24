# pr-SkeletonFormField

## Quand utiliser ce composant
- Lors de la création d'une interface utilisateur où des données sont en cours de chargement.
- Pour améliorer l’expérience utilisateur en fournissant une indication visuelle sur le type de contenu qui sera affiché.
- Lors de l'attente des réponses API afin de maintenir une disposition visuelle cohérente.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-skeleton-skeleton-field--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-skeleton-skeleton-field--template)

## Composant Figma
[Pr-SkeletonFormField (v18.1)](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=21713-46919) - Ce composant représente un squelette de formulaire, permettant de visualiser la structure du contenu qui sera bientôt disponible. Une seule variante est disponible.

## Import

```typescript
import { SkeletonFieldComponent } from '@lucca-front/ng/loaders';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-skeleton-field></lu-skeleton-field>
```

## Directive / Composant : `lu-skeleton-field`

Composant permettant d’afficher un squelette qui représente temporairement un champ de formulaire. Applicable sur les éléments contenant du contenu chargé dynamiquement.

## Accessibilité
Veillez à fournir un état approprié lors de l’affichage de ce composant, afin que les utilisateurs de technologies d'assistance comprennent qu'un chargement est en cours.

## Guidelines Prisme
- Utilisez les squelettes pour indiquer clairement l'état de chargement des contenus.
- Ne les utilisez pas de manière excessive pour ne pas nuire à l’expérience utilisateur.