# Pr-NewBadge

## Quand utiliser ce composant
- Pour signaler aux utilisateurs qu'une fonctionnalité a été récemment ajoutée dans l'application.
- Lors de la mise en avant de mises à jour ou de nouvelles fonctionnalités sur des éléments de navigation.
- Pour attirer l'attention sur des sections spécifiques d'une interface utilisateur qui viennent d'être lancées.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-newbadge-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-newbadge-angular-basic--template)

## Composant Figma
[Pr-NewBadge Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8174-35724) - Ce lien vous permet de visualiser le design du composant ainsi que ses variantes disponibles.

## Import

```typescript
import { NewBadgeComponent } from '@lucca-front/ng/new-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-new-badge label="New"></pr-new-badge>
```

## Directive / Composant : `pr-new-badge` ou `<pr-new-badge>`

Composant utilisé pour afficher un badge indiquant qu'une fonctionnalité est nouvelle. Applicable sur de nombreux éléments, principalement des éléments textuels ou des indications dans l'interface.

### Inputs

#### `label`
Type: `string` — Default: `''`

Modifie le texte affiché par le composant.

```html
<pr-new-badge [label]="'New'"></pr-new-badge>
```

## Patterns courants

### Indiquer une nouvelle fonctionnalité
```html
<!-- Affiche un badge indiquant qu'une fonctionnalité est nouvelle -->
<pr-new-badge label="New"></pr-new-badge>
```

## Accessibilité
Assurez-vous que le badge est visible et lisible, avec un contraste suffisant par rapport à l'arrière-plan. Utilisez des attributs ARIA pour fournir des indications supplémentaires si nécessaire.

## Guidelines Prisme
- Ne pas utiliser le badge pour des éléments déjà bien établis.
- Utiliser le badge uniquement pour des éléments en rapport avec des fonctionnalités nouvelles.
- S'assurer que le badge se fond harmonieusement avec l'ensemble visuel de l'application.