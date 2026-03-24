# PageHeader

## Quand utiliser ce composant
- Pour structurer une page avec un en-tête contenant un titre et une navigation pertinente.
- Lorsqu'il est nécessaire d'afficher un fil d'Ariane pour aider les utilisateurs à comprendre leur position dans la hiérarchie du site.
- Pour combiner des champs de formulaire (comme des entrées de texte) dans un en-tête contextuel pour une meilleure interactivité.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-pageheader-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-pageheader-angular-basic--basic)

## Composant Figma
[PageHeader Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=23985-475) + Composant d'en-tête de page avec deux variantes : Screen size=M et Screen size=S.

## Import

```typescript
import { PageHeaderComponent } from '@lucca-front/ng/structure';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-page-header>...</lu-page-header>
```

## Directive / Composant : `lu-page-header`

Composant utilisé pour créer un en-tête de page. Applicable sur les sections d'une application Angular.

### Valeurs (si directive avec valeurs)

Aucune valeur spécifique à mentionner.

## Inputs

### `title`
Type: `string` — Default: `''`

Titre de l'en-tête de page.

```html
<lu-page-header [title]="'Mon Titre'">...</lu-page-header>
```

## Patterns courants

### En-tête avec navigation
```html
<lu-page-header>
  <ul lu-breadcrumbs>
    <li [luBreadcrumbsLink]="'/home'">Accueil</li>
    <li [luBreadcrumbsLink]="'/page'">Page courante</li>
  </ul>
</lu-page-header>
```

## Accessibilité
Assurez-vous que tous les éléments d'interaction sont accessibles via le clavier et que les rôles ARIA sont correctement définis pour une navigation assistée.

## Guidelines Prisme
- Utilisez des titres clairs et significatifs.
- Évitez d'encombrer l'en-tête avec trop d'éléments.
- Gardez la hiérarchie visuelle cohérente.