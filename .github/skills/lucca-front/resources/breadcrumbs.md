# pr-Breadcrumbs

## Quand utiliser ce composant
- Lorsque vous avez besoin d'afficher une hiérarchie de navigation pour aider les utilisateurs à comprendre leur position dans le site.
- Pour améliorer la navigation en permettant aux utilisateurs de revenir facilement à des sections précédentes.
- Pour structurer le contenu d’applications complexes où plusieurs niveaux de navigation sont nécessaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-breadcrumbs-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-breadcrumbs-angular-basic--basic)

## Composant Figma
[Visuel du composant pr-Breadcrumbs](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=10089-34515) - Variantes disponibles : Depth=1, Depth=2, Depth=3, Depth=4.

## Import

```typescript
import { BreadcrumbsComponent, BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-breadcrumbs>
  <a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">You</a>
  <a *luBreadcrumbsLink ariaCurrentWhenActive="page" href="#2">are</a>
  <a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>
```

## Directive / Composant : `luBreadcrumbsLink` ou `<lu-breadcrumbs-link>`

Directive utilisée pour chaque lien fourni dans le composant pr-Breadcrumbs. Applicable sur les éléments `<a>`.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut sans styles additionnels |

```html
<a *luBreadcrumbsLink>...</a>
```

## Inputs

### Aucun input défini

## Patterns courants

### Exemple de fil d’Ariane
```html
<lu-breadcrumbs>
  <a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">Home</a>
  <a *luBreadcrumbsLink href="#second-page">Second Page</a>
  <a *luBreadcrumbsLink aria-current="page">Current Page</a>
</lu-breadcrumbs>
```

## Accessibilité
Assurez-vous que chaque lien a un texte visible qui décrit clairement la destination pour améliorer l'expérience utilisateur pour les personnes utilisant des technologies d'assistance.

## Guidelines Prisme
- Utilisez le composant pr-Breadcrumbs pour respecter les conventions de navigation.
- Évitez d'utiliser des liens qui ne mènent nulle part ou qui sont redondants.