# ButtonGroup

## Quand utiliser ce composant
- Lorsque vous souhaitez regrouper plusieurs boutons pour une action commune.
- Pour limiter l'utilisation de l'espace tout en offrant plusieurs options d'interaction à l'utilisateur.
- Lorsque les boutons ont besoin d'un style cohérent et harmonisé dans une interface utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-actions-button-angular-ai--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-ai--basic)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-basic--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-basic--basic-test)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-counter--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-counter--basic-test)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-icon--basic)
- [Basic TEST](https://lucca-front.lucca.io/storybook/?path=/story/documentation-actions-button-angular-icon--basic-test)

## Composant Figma
[ButtonGroup sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=32845-165564) — Le composant ButtonGroup est conçu pour afficher une série de boutons. Variantes disponibles incluent différentes combinaisons de types (Filled, Outlined) et palettes (Product, Neutral).

## Import

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
```

## Usage de base

```html
<!-- Usage minimal -->
<button type="button" luButton="outlined">Bouton</button>
```

## Directive / Composant : `luButton` ou `<lu-button>`

Directive qui permet de modifier le style et le comportement des boutons. Applicable sur les éléments `<button>`.

### Valeurs

| Valeur            | Description                                                                |
|-------------------|----------------------------------------------------------------------------|
| `""` (vide)       | Variante par défaut.                                                       |
| `"outlined"`      | Bouton avec un contour.                                                   |
| `"ghost"`         | Bouton sans fond, avec une bordure.                                      |
| `"AI"`            | Style spécifique pour actions liées à l'IA.                               |
| `"AI-invert"`     | Variante inversée du style AI, pour un contraste plus fort.               |
| `"ghost-invert"`  | Variante inversée du style ghost, pour un contraste accru.                |

```html
<button type="button" luButton="outlined">Bouton</button>
```

## Inputs

### `luButton`
Type: `'' | 'outlined' | 'ghost' | 'AI' | 'AI-invert' | 'ghost-invert'` — Default: `''`

Modifie la hiérarchie ou le style du bouton.

```html
<button type="button" luButton="AI">Bouton AI</button>
```

### `block`
Type: `boolean` — Default: `false`

Applique `display: block` au bouton.

```html
<button type="button" luButton="outlined" [block]="true">Bouton Bloc</button>
```

### `palette`
Type: `'' | 'product' | 'neutral' | 'success' | 'warning' | 'critical'` — Default: `''`

Applique une palette de couleurs au bouton. Non applicable si `luButton` est 'AI'.

```html
<button type="button" luButton="outlined" palette="product">Bouton Produit</button>
```

### `state`
Type: `string` 

Modifie l'état du bouton.

```html
<button type="button" luButton="outlined" state="hover">Bouton survolé</button>
```

## Patterns courants

### Bouton d'action
```html
<!-- Exemple d'utilisation d'un bouton d'action regroupé -->
<button type="button" luButton="outlined">Titre</button>
<button type="button" luButton="ghost">Annuler</button>
<button type="button" luButton="outlined" palette="success">Confirmer</button>
```

## Accessibilité
Assurez-vous que chaque bouton a un libellé approprié pour que les technologies d'assistance puissent identifier leur fonction.

## Guidelines Prisme
1. Utilisez des variantes appropriées pour la hiérarchie et le contraste.
2. Évitez d'utiliser trop de styles différents dans le même groupe de boutons pour maintenir la cohérence.