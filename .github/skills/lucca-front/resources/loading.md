# pr-Loading

## Quand utiliser ce composant
- Pour indiquer un chargement en cours lors du traitement de données dans une application.
- Pour signaler à l'utilisateur que certaines actions prennent un peu de temps, par exemple lors du chargement d'une page.
- Pour améliorer l'expérience utilisateur en bloquant des interactions pendant le chargement d'un contenu.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-listbox-option-html-css-loading--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-loading-angular-basic--basic)

## Composant Figma
[pr-Loading Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=10583-34479) — Ce composant représente un indicateur de chargement avec différentes variantes visuelles en fonction des palettes de couleurs et des tailles.

## Import

```typescript
import { LoadingComponent } from '@lucca-front/ng/loading';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-loading></lu-loading>
```

## Directive / Composant : `lu-loading` ou `<lu-loading>`

Permet d'afficher un indicateur de chargement. Applicable sur tous les éléments HTML. 

### Valeurs (si directive avec valeurs)

| Valeur  | Description                          |
|---------|--------------------------------------|
| `""`    | Variante par défaut                  |
| `"L"`   | Taille large                         |
| `"block"` | Rend l'indicateur de chargement en mode bloc |
| `"invert"` | Inverse les couleurs de l'indicateur de chargement |
| `"template"` | Spécifie le type de template à utiliser pour l'affichage |

```html
<lu-loading size="L" block invert template="popin"></lu-loading>
```

## Inputs

### `size`
Type: `'S' | 'XS' | 'M' | 'L'` — Default: `'M'`

Définit la taille de l'indicateur de chargement.

```html
<lu-loading [size]="'L'"></lu-loading>
```

### `block`
Type: `boolean` — Default: `false`

Active le mode bloc pour l'indicateur de chargement.

```html
<lu-loading [block]="true"></lu-loading>
```

### `invert`
Type: `boolean` — Default: `false`

Inverse les couleurs de l'indicateur de chargement.

```html
<lu-loading [invert]="true"></lu-loading>
```

### `template`
Type: `string` — Default: `''`

Définit le type de template à utiliser pour l'affichage.

```html
<lu-loading [template]="'fullPage'"></lu-loading>
```

## Patterns courants

### Chargement standard
```html
<!-- Utilisation simple d'un indicateur de chargement -->
<lu-loading size="M" block></lu-loading>
```

## Accessibilité
S'assurer que l'indicateur de chargement est accompagné d'un texte alternatif pour informer l'utilisateur lorsqu'un contenu est en cours de chargement.

## Guidelines Prisme
1. Évitez d'utiliser des indicateurs de chargement excessifs qui pourraient frustrer l'utilisateur.
2. Utilisez des animations pour renforcer l'indication de chargement sans distraire l'utilisateur.
3. Assurez-vous que les états de chargement ne bloquent pas complètement l'interaction lorsque cela n'est pas nécessaire.