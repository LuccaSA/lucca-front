# PageHeader

## Quand utiliser ce composant
- Pour créer un en-tête de page avec des informations de navigation comme des breadcrumbs.
- Lorsqu'il est nécessaire d'afficher des actions spécifiques liées à la page, comme des boutons ou des liens d'actions.
- Pour structurer visuellement le contenu principal d'une page, incluant un titre et une description.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-pageheader-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-pageheader-angular-basic--basic)

## Composant Figma
[Voir le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=23985-475) - Composant utilisé pour l'en-tête de page, avec des variantes pour différents tailles d'écran : M et S.

## Import

```typescript
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-page-header>...</lu-page-header>
```

## Directive / Composant : `luPageHeader` ou `<lu-page-header>`

Composant pour un en-tête de page qui peut contenir des titres, une description, et des éléments de navigation.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"M"` | Taille d'écran M |
| `"S"` | Taille d'écran S |

```html
<lu-page-header screenSize="M">...</lu-page-header>
```

## Inputs

### `label`
Type: `string` — Default: `undefined`

Le titre principal affiché dans l'en-tête.

```html
<lu-page-header [label]="'Titre de la page'">...</lu-page-header>
```

### `description`
Type: `string` — Default: `undefined`

Une description facultative qui peut être affichée sous le titre.

```html
<lu-page-header [description]="'Description ici'">...</lu-page-header>
```

### `container`
Type: `boolean` — Default: `false`

Indique si un conteneur doit être ajouté autour du contenu de l'en-tête.

```html
<lu-page-header [container]="true">...</lu-page-header>
```

## Patterns courants

### En-tête de page avec navigation et actions
```html
<lu-page-header
  [label]="'Titre de la page'"
  [description]="'Description de la page'"
  [container]="true">
  <!-- Actions liées à la page -->
  <ng-container pageHeaderTitleActions>
    <button type="button" luButton="ghost" luTooltip="Modifier">Modifier</button>
  </ng-container>
</lu-page-header>
```

## Accessibilité
Assurez-vous que le `<lu-page-header>` utilise des titres appropriés (h1, h2) pour la hiérarchie de la page et qu'il est navigable via le clavier.

## Guidelines Prisme
- Utilisez des éléments sémantiquement appropriés pour les titres.
- Évitez d'encombrer l'en-tête avec trop d'actions ou d'informations.
- Assurez-vous que les actions sont accessibles et compréhensibles pour l'utilisateur.