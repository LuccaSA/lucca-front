# pr-NewBadge

## Quand utiliser ce composant
- Pour signaler une nouvelle fonctionnalité dans la navigation de l'application.
- Lors de l'introduction de mises à jour significatives aux utilisateurs.
- Pour attirer l'attention sur des éléments récents ou des promotions temporaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-newbadge-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-newbadge-angular-basic--template)

## Composant Figma
[Voir sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8174-35724) — Ce composant indique une fonctionnalité comme étant nouvelle. Variantes disponibles : pr-NewBadge.

## Import

```typescript
import { NewBadgeComponent } from '@lucca-front/ng/texts';
```

## Usage de base

```html
<lu-new-badge>Nouvelle Fonctionnalité</lu-new-badge>
```

## Directive / Composant : `lu-new-badge` ou `<lu-new-badge>`

Composant utilisé pour indiquer une fonctionnalité nouvelle. Applicable sur les éléments HTML définis par le composant.

## Accessibilité
Assurez-vous que le badge est accompagné d’une description textuelle explicite pour garantir l'accessibilité à tous.

## Guidelines Prisme
- Utiliser le badge pour marquer des éléments réellement nouveaux.
- Éviter d'utiliser le badge pour des promotions éphémères qui ne justifient pas la mention "nouveau".
- Maintenir une cohérence dans l'utilisation à travers l'application pour éviter toute confusion chez l'utilisateur.