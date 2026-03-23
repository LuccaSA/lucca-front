# AssetsFooter

## Quand utiliser ce composant
1. Pour afficher un footer avec contenu personnalisé dans les applications Angular.
2. Lorsque vous avez besoin d'un footer fixe en bas de page qui reste visible lors du défilement.
3. Pour encapsuler des éléments tels que des boutons ou des liens dans un footer structuré.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-listings-index-table-html-css-footer--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-structure-footer-angular-basic--basic)

## Composant Figma
[AssetsFooter Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=30336-1613) - Ce composant présente une disposition simple avec des boutons et un contenu personnalisé. Variantes disponibles : AssetsFooter / Total.

## Import

```typescript
import { FooterComponent } from '@lucca-front/ng/footer';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-footer>
    <ng-container footerContent>
        Content
    </ng-container>
    <button type="button" luButton>Button</button>
    <button type="button" luButton="outlined">Button</button>
</lu-footer>
```

## Directive / Composant : `lu-footer` ou `<lu-footer>`

Composant utilisé pour créer un footer personnalisé, applicable aux éléments de type footer.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut (AssetsFooter) |
| `"Total"` | Variante affichant des informations totales dans le footer. |

```html
<lu-footer variant="Total">...</lu-footer>
```

## Inputs

### `sticky`
Type: `boolean` — Default: `false`

Indique si le footer doit rester fixé en bas de la fenêtre.

```html
<lu-footer [sticky]="true">...</lu-footer>
```

### `container`
Type: `boolean` — Default: `false`

Applique un conteneur autour du contenu du footer.

```html
<lu-footer [container]="true">...</lu-footer>
```

### `forceNarrow`
Type: `boolean` — Default: `false`

Force le footer à utiliser un style étroit.

```html
<lu-footer [forceNarrow]="true">...</lu-footer>
```

### `narrowAtMediaMax`
Type: `'XXS' | 'XS' | 'S' | 'M'` — Default: `'XXS'`

Définit le point d'arrêt pour l'état étroit du footer.

```html
<lu-footer narrowAtMediaMax="S">...</lu-footer>
```

## Patterns courants

### Footer avec contenu flex
```html
<lu-footer>
    <ng-container footerContent>
        Contenu du Footer
    </ng-container>
    <button type="button" luButton>Action</button>
</lu-footer>
```

## Accessibilité
Assurez-vous que le contenu du footer est bien structuré et utilise des balises sémantiques pour optimiser l'accessibilité.

## Guidelines Prisme
- Favorisez un texte clair et concis dans le footer.
- Évitez de surcharger le footer avec trop de contenu interactif.
- Respectez les contrastes de couleurs pour assurer une bonne lisibilité.