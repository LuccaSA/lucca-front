# pr-Breadcrumbs

## Quand utiliser ce composant
- Pour représenter la hiérarchie de navigation dans une application.
- Pour améliorer l'ux en permettant aux utilisateurs de revenir facilement en arrière dans les niveaux de navigation.
- Pour indiquer la position actuelle d'un utilisateur dans la structure de l'application.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-breadcrumbs-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-breadcrumbs-angular-basic--basic)

## Composant Figma
[Pr-Breadcrumbs sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=10089-34515) + Composant de navigation illustrant les différents niveaux de profondeur disponibles sous forme de variantes.

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

## Directive / Composant : `lu-breadcrumbs` ou `[luBreadcrumbsLink]`

Le composant `lu-breadcrumbs` est utilisé pour créer une structure de navigation à fil d'Ariane, et `[luBreadcrumbsLink]` est utilisé pour définir chaque lien dans cette structure.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `Depth=1` | Fil d'Ariane avec 1 niveau de profondeur. |
| `Depth=2` | Fil d'Ariane avec 2 niveaux de profondeur. |
| `Depth=3` | Fil d'Ariane avec 3 niveaux de profondeur. |
| `Depth=4` | Fil d'Ariane avec 4 niveaux de profondeur. |

## Inputs

### `ariaCurrentWhenActive`
Type: `'page' | 'location' | 'step' | 'date' | 'time' | ''` — Default: `''`

Détermine le statut actuel du lien pour l'accessibilité, spécifiant si le lien correspond à la page active.

```html
<lu-breadcrumbs>
	<a *luBreadcrumbsLink routerLink="/" ariaCurrentWhenActive="page">You</a>
	<a *luBreadcrumbsLink ariaCurrentWhenActive="page" href="#2">are</a>
	<a *luBreadcrumbsLink aria-current="page">here</a>
</lu-breadcrumbs>
```

## Patterns courants

### Fil d'Ariane simple
```html
<lu-breadcrumbs>
	<a *luBreadcrumbsLink routerLink="/">Home</a>
	<a *luBreadcrumbsLink routerLink="/category">Category</a>
	<a *luBreadcrumbsLink aria-current="page">Current Page</a>
</lu-breadcrumbs>
```

## Accessibilité
Utiliser des attributs ARIA appropriés sur les liens pour garantir l'accessibilité — notamment `aria-current` pour indiquer la page active.

## Guidelines Prisme
- Éviter d'utiliser des liens non cliquables dans le fil d'Ariane.
- Chaque élément doit refléter l'état de la navigation et permettre un retour facile.