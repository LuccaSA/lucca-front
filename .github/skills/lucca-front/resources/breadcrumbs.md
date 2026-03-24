# pr-Breadcrumbs

## Quand utiliser ce composant
- Lorsqu'il est nécessaire de visualiser la hiérarchie de navigation dans une application.
- Pour permettre aux utilisateurs de comprendre leur position actuelle dans la structure d'une application.
- Pour offrir un moyen facile de revenir à des sections précédentes dans une interface utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-breadcrumbs-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-breadcrumbs-angular-basic--basic)

## Composant Figma
[Visualiser dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=10089-34515) - Composant pr-Breadcrumbs avec les variantes disponibles : Depth=1, Depth=2, Depth=3, Depth=4.

## Import

```typescript
import { BreadcrumbsComponent } from '@lucca-front/ng/breadcrumbs';
// ou
import { BreadcrumbsLinkDirective } from '@lucca-front/ng/breadcrumbs';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-breadcrumbs>...</lu-breadcrumbs>
```

## Directive / Composant : `lu-breadcrumbs` ou `[luBreadcrumbsLink]`

Composant de navigation hiérarchique. Applicable sur des éléments de navigation.

### Valeurs (si directive avec valeurs)

Aucune valeur applicable.

```html
<lu-breadcrumbs>...</lu-breadcrumbs>
```

## Inputs

### `depth`
Type: `1 | 2 | 3 | 4` — Default: `1`

Détermine le niveau de profondeur des breadcrumbs affichés.

```html
<lu-breadcrumbs [depth]="3">...</lu-breadcrumbs>
```

## Patterns courants

### Affichage de breadcrumbs avec un lien
```html
<lu-breadcrumbs>
  <a [luBreadcrumbsLink]="true" routerLink="/">Accueil</a>
  <a [luBreadcrumbsLink]="true" routerLink="/section">Section</a>
  <span>Page actuelle</span>
</lu-breadcrumbs>
```

## Accessibilité
Assurez-vous que chaque lien dans le composant breadcrumbs soit accessible par clavier et propose une description pertinente dans le texte du lien. Utilisez des éléments de balisage corrects pour indiquer la structure hiérarchique.

## Guidelines Prisme
- Utiliser les breadcrumbs pour améliorer la navigation.
- Ne pas utiliser les breadcrumbs sur des pages où la hiérarchie n'est pas pertinente.
- Assurez-vous que les liens dans les breadcrumbs restent clairs et descriptifs pour les utilisateurs.