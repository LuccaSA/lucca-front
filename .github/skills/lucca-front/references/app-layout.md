# pr-AppLayout (1600)

## Quand utiliser ce composant
- Pour structurer l'affichage d'une application en intégrant des sections telles que l'en-tête, le pied de page et une barre latérale.
- Lorsqu'une application nécessite une disposition cohérente et flexible pour divers contenus et modules.
- Pour garantir que certains éléments comme l'en-tête ou le pied de page restent visibles lors du défilement.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-structure-app-layout-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-app-layout-angular-basic--basic)

## Composant Figma
[Vue Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29773-198942) - Le pr-AppLayout fournit une structure modulable pour appuyer l’interface des applications.

## Import

```typescript
import { AppLayoutComponent } from '@lucca-front/ng/app-layout';
```

## Usage de base

```html
<lu-app-layout>
    <ng-container appLayoutBanner>banner</ng-container>
    <ng-container appLayoutNavSide>
        navSide
    </ng-container>
    <lu-main-layout>
        ...
    </lu-main-layout>
</lu-app-layout>
```

## Directive / Composant : `lu-app-layout`

Composant principal pour structurer les applications, applicable aux éléments Angular.

### Inputs

### `header`
Type: `boolean` — Default: `false`

Indique si l'en-tête doit être présent dans la structure.

```html
<lu-app-layout [header]="true">...</lu-app-layout>
```

### `footer`
Type: `boolean` — Default: `false`

Indique si le pied de page doit être présent dans la structure.

```html
<lu-app-layout [footer]="true">...</lu-app-layout>
```

### `sidebar`
Type: `boolean` — Default: `false`

Indique si une barre latérale doit être présente dans la structure.

```html
<lu-app-layout [sidebar]="true">...</lu-app-layout>
```

### `headerSticky`
Type: `boolean` — Default: `false`

Fixe l'en-tête en haut du layout lors du défilement.

```html
<lu-app-layout [headerSticky]="true">...</lu-app-layout>
```

### `footerSticky`
Type: `boolean` — Default: `false`

Fixe le pied de page en bas du layout lors du défilement.

```html
<lu-app-layout [footerSticky]="true">...</lu-app-layout>
```

### `repeatContent`
Type: `number` — Default: `1`

Modifie le nombre d'éléments affichés dans la structure.

```html
<lu-app-layout [repeatContent]="5">...</lu-app-layout>
```

### `contentOverflowing`
Type: `boolean` — Default: `false`

Permet de rendre un élément scrollable horizontalement tout en conservant le comportement du reste du layout.

```html
<lu-app-layout [contentOverflowing]="true">...</lu-app-layout>
```

## Patterns courants

### Structure de l'application
```html
<lu-app-layout [header]="true" [footer]="true" [sidebar]="true">
    <ng-container appLayoutBanner>banner</ng-container>
    <ng-container appLayoutNavSide>navSide</ng-container>
    <lu-main-layout>
        <!-- contenu principal -->
    </lu-main-layout>
</lu-app-layout>
```

## Accessibilité
S'assurer que tous les éléments interactifs au sein du layout sont accessibles via le clavier et utilisent des attributs ARIA appropriés pour décrire leur état et leur fonction.

## Guidelines Prisme
- Évitez de surcharger le layout avec trop d'éléments qui pourraient nuire à la clarté visuelle.
- Utilisez des espacements appropriés pour garantir que le contenu est aéré et lisible.