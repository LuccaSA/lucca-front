# New Badge

## Quand utiliser ce composant

- Pour indiquer une nouvelle fonctionnalité ou section dans une interface utilisateur.
- Pour attirer l'attention des utilisateurs sur une nouveauté au sein de la navigation.
- Pour mettre en avant une fonctionnalité récemment ajoutée à une application.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-texts-newbadge-angular-basic--docs)
- [Template](https://lucca-front.lucca.io/storybook/?path=/story/documentation-texts-newbadge-angular-basic--template)

## Composant Figma
- [Lien vers le composant dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8174-35724)
- Un petit badge visuellement distinctif qui attire l'attention. Une seule variante disponible : pr-NewBadge.

## Import

```typescript
import { NewBadgeComponent } from '@lucca-front/ng/new-badge';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-new-badge label="Nouveau"></lu-new-badge>
```

## Directive / Composant : `<lu-new-badge>`

Le composant `lu-new-badge` est conçu pour afficher un badge signalant quelque chose de nouveau. Il est utilisé en tant qu'élément HTML autonome.

## Inputs

### `label`
Type: `string` — Default: `""`

Permet de personnaliser le texte affiché à l'intérieur du badge.

```html
<lu-new-badge label="Nouvelle fonctionnalité"></lu-new-badge>
```

## Patterns courants

### Affichage d'un badge "Nouveau"
```html
<!-- Indique une fonctionnalité nouvelle -->
<lu-new-badge label="Nouveau"></lu-new-badge>
```

### Badge pour une version donnée
```html
<!-- Affiche un badge personnalisable avec une version -->
<lu-new-badge label="v2.0"></lu-new-badge>
```

## Accessibilité
- Assurez-vous que le texte passé en input `label` est clair et compréhensible pour les lecteurs d'écran.
- Inclure un contexte supplémentaire pour aider les utilisateurs en situation de handicap à comprendre la signification du badge si nécessaire.

## Guidelines Prisme
- [Lien vers les guidelines associées](https://prisme.lucca.io/94310e217/v/latest/p/36bcdf)
- Utilisez ce composant uniquement pour signaler des nouveautés significatives.
- Évitez de surutiliser ce composant pour des changements mineurs ou des fonctionnalités déjà largement communiquées.