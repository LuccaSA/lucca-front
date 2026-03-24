# pr-Link

## Quand utiliser ce composant
1. Pour créer des liens textuels clairs et accessibles dans vos interfaces utilisateurs.
2. Lorsqu'il est nécessaire de distinguer des actions cliquables d'autres éléments de contenu, par exemple dans des listes ou des paragraphes.
3. Lors de la mise en place de navigations contextuelles ou de redirections sans surcharger la mise en page.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-actions-link-angular-test--docs)

## Composant Figma
[Modèle Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=33422-7619) - Composant visuel représentant un lien avec plusieurs variantes pour la taille, l'underline, l'état et la palette.

## Import

```typescript
import { LinkComponent } from '@lucca-front/ng/actions';
// ou
import { LinkDirective } from '@lucca-front/ng/actions';
```

## Usage de base

```html
<!-- Usage minimal -->
<a luLink href="#">Mon lien</a>
```

## Directive / Composant : `luLink` ou `<lu-link>`

Directive utilisée pour transformer un élément en lien interactif. Applicable sur les éléments `<a>`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"size=S"` | Taille petite |
| `"size=M"` | Taille moyenne |
| `"underline=True"` | Lien souligné |
| `"underline=False"` | Lien non souligné |
| `"state=Focus"` | État focus |
| `"state=Hover"` | État hover |
| `"state=Disabled"` | État désactivé |
| `"state=Visited"` | État visité |
| `"palette=Neutral"` | Palette neutre |
| `"palette=Product"` | Palette produit |

```html
<a luLink="size=M,underline=True,state=Hover,palette=Product" href="#">Lien exemple</a>
```

## Inputs

### `href`
Type: `string` — Default: `"#"`

L'URL cible du lien.

```html
<a luLink [href]="'https://example.com'">Lien vers exemple</a>
```

## Patterns courants

### Lien avec état hover
```html
<!-- Lien qui change d'apparence au survol -->
<a luLink="size=S,underline=False,state=Hover,palette=Neutral" href="#">Lien sobre</a>
```

## Accessibilité
Assurez-vous que tous les liens ont un attribut `href` valide et qu'ils sont décrits de manière textuelle pour un accès via les lecteurs d'écran. Utilisez également le rôle `link` si nécessaire.

## Guidelines Prisme
- Utilisez des couleurs de lien qui se démarquent suffisamment de l'arrière-plan.
- Évitez d'utiliser des liens uniquement pour des actions de navigation requises par le contenu.