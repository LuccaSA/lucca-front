# HorizontalNavigation

## Quand utiliser ce composant
- Pour créer un menu de navigation horizontal pour une application ou un site web.
- Quand vous avez besoin d'une navigation claire et accessible pour l'utilisateur, avec possibilité d'ajouter des liens dynamiques.
- Lorsqu'il est nécessaire d'afficher des notifications ou des compteurs associés aux éléments de navigation.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-horizontalnavigation-angular--basic)

## Composant Figma
[Vue Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3104-410) + Composant de navigation horizontal avec des tailles disponibles en Size=M et Size=S.

## Import

```typescript
import { HorizontalNavigationComponent } from '@lucca-front/ng/navigation';
// ou
import { HorizontalNavigationLinkDirective } from '@lucca-front/ng/navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-horizontal-navigation>
  <a [luHorizontalNavigationLink] routerLink="/home">Accueil</a>
  <a [luHorizontalNavigationLink] routerLink="/about">À propos</a>
</lu-horizontal-navigation>
```

## Directive / Composant : `lu-horizontal-navigation` ou `[luHorizontalNavigationLink]`

Composant principal pour la navigation horizontale. Permet de contenir plusieurs liens via la directive associée.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Lien habituel sans badge. |
| `"badge"` | Affiche une notification ou un compteur sur le lien. |

```html
<lu-horizontal-navigation>
  <a [luHorizontalNavigationLink]="badge">Lien avec badge</a>
</lu-horizontal-navigation>
```

## Inputs

### `size`
Type: `'M' | 'S'` — Default: `'M'`

Définit la taille du composant de navigation.

```html
<lu-horizontal-navigation [size]="sizeValue">...</lu-horizontal-navigation>
```

## Patterns courants

### Navigation avec badges
```html
<lu-horizontal-navigation>
  <a [luHorizontalNavigationLink] routerLink="/messages">
    Messages <lu-numeric-badge [count]="5"></lu-numeric-badge>
  </a>
  <a [luHorizontalNavigationLink] routerLink="/notifications">
    Notifications <lu-numeric-badge [count]="2"></lu-numeric-badge>
  </a>
</lu-horizontal-navigation>
```

## Accessibilité
Assurez-vous que tous les liens ont un texte descriptif pour les lecteurs d'écran et que les actions des utilisateurs sont clairement indiquées.

## Guidelines Prisme
- Utiliser les tailles appropriées pour le contexte de navigation.
- Éviter les surcharges visuelles; garder l'interface simple et intuitive.