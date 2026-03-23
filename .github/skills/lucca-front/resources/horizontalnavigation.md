# pr-HorizontalNavigation

## Quand utiliser ce composant
- Pour créer des menus de navigation horizontaux sur des pages web avec une mise en page moderne.
- Lorsque plusieurs liens doivent être alignés horizontalement, facilitant l'accès pour les utilisateurs.
- Pour intégrer des éléments comme des badges numériques à côté des liens de navigation.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-navigation-horizontalnavigation-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-navigation-horizontalnavigation-angular--basic)

## Composant Figma
[Consulter le design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=3104-410) - Ce composant représente une navigation horizontale avec deux variantes de taille disponibles : Size=M et Size=S.

## Import

```typescript
import { HorizontalNavigationComponent, HorizontalNavigationLinkDirective } from '@lucca-front/ng/horizontal-navigation';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-horizontal-navigation>
  <a *luHorizontalNavigationLink href="#1">Lien 1</a>
  <a *luHorizontalNavigationLink href="#2">Lien 2</a>
</lu-horizontal-navigation>
```

## Directive / Composant : `luHorizontalNavigationLink` ou `<lu-horizontal-navigation>`

Directive pour marquer les éléments de lien dans la navigation. Applicable sur tous les éléments `<a>`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Taille petite |

```html
<lu-horizontal-navigation size="S">
  <a *luHorizontalNavigationLink href="#1">Lien 1</a>
</lu-horizontal-navigation>
```

## Inputs

### `size`
Type: `null | 'S'` — Default: `null`

Modifie la taille du composant.

```html
<lu-horizontal-navigation [size]="'S'">...</lu-horizontal-navigation>
```

### `noBorder`
Type: `boolean` — Default: `false`

Retire la bordure sous le composant.

```html
<lu-horizontal-navigation [noBorder]="true">...</lu-horizontal-navigation>
```

### `container`
Type: `boolean` — Default: `false`

Applique un container autour des liens pour aligner le composant avec le contenu de la page.

```html
<lu-horizontal-navigation [container]="true">...</lu-horizontal-navigation>
```

### `numericBadge`
Type: `boolean` — Default: `false`

Présente un exemple avec un badge numérique.

```html
<lu-horizontal-navigation [numericBadge]="true">...</lu-horizontal-navigation>
```

## Patterns courants

### Navigation avec badge numérique
```html
<lu-horizontal-navigation [numericBadge]="true">
  <a *luHorizontalNavigationLink href="#1">Page 1 <lu-numeric-badge [value]="888"></lu-numeric-badge></a>
  <a *luHorizontalNavigationLink href="#2">Page 2 <lu-numeric-badge [value]="999"></lu-numeric-badge></a>
</lu-horizontal-navigation>
```

## Accessibilité
Assurez-vous que chaque lien a un attribut `aria-current` approprié pour indiquer la page active.

## Guidelines Prisme
- Utiliser des couleurs et des styles conformes aux directives de conception de Lucca pour maintenir l'uniformité visuelle.
- Éviter d'utiliser trop de liens à la fois pour ne pas surcharger l'interface utilisateur.