# PageHeader

## Quand utiliser ce composant
- Lorsque vous devez afficher un en-tête de page avec un titre, une description et une navigation associée.
- Pour créer une structure de page cohérente avec des éléments de navigation comme des breadcrumbs.
- Lors de la configuration d'un en-tête responsive qui s'adapte à différentes tailles d'écran.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-pageheader-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-pageheader-angular-basic--basic)

## Composant Figma
[Consulter le Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=23985-475) - Le composant PageHeader présente un en-tête structuré avec un titre, une description, et des éléments de navigation. Variantes disponibles : Screen size=M, Screen size=S.

## Import

```typescript
import { PageHeaderComponent } from '@lucca-front/ng/page-header';
import { BreadcrumbsComponent } from '@lucca-front/ng/breadcrumbs';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { HorizontalNavigationComponent } from '@lucca-front/ng/horizontal-navigation';
import { LinkComponent } from '@lucca-front/ng/link';
```

## Usage de base

```html
<lu-page-header>
  <h1>Titre de la page</h1>
  <p>Description de la page.</p>
</lu-page-header>
```

## Directive / Composant : `lu-page-header` ou `<lu-page-header>`

Composant permettant de structurer l'en-tête d'une page. Peut inclure des éléments de navigation et du contenu texte.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"screen-size-M"` | Affichage pour taille d'écran M |
| `"screen-size-S"` | Affichage pour taille d'écran S |

```html
<lu-page-header screen-size="screen-size-M">
  <h1>Titre de la page</h1>
  <p>Description de la page.</p>
</lu-page-header>
```

## Inputs

### `label`
Type: `PortalContent` — Default: `''`

Texte à afficher comme titre de l'en-tête.

```html
<lu-page-header [label]="'Mon Titre'"></lu-page-header>
```

### `description`
Type: `PortalContent` — Default: `''`

Texte à afficher comme description sous le titre.

```html
<lu-page-header [description]="'Ceci est la description de la page.'"></lu-page-header>
```

### `container`
Type: `boolean` — Default: `false`

Applique un container autour du contenu de Page Header.

```html
<lu-page-header [container]="true"></lu-page-header>
```

## Patterns courants

### En-tête avec navigation
```html
<lu-page-header [label]="'Titre Principal'" [description]="'Description de la page.'">
  <lu-breadcrumbs>
    <a luBreadcrumbsLink href="#">Accueil</a>
    <a luBreadcrumbsLink href="#">Section</a>
  </lu-breadcrumbs>
</lu-page-header>
```

## Accessibilité
Assurez-vous que le composant inclut des attributs ARIA appropriés pour décrire le contenu et les actions disponibles pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Suivre les principes de design de la documentation Prisme pour garantir la cohérence des styles.
- Éviter d'encombrer l'en-tête avec trop d'informations, se concentrer sur les éléments les plus pertinents.