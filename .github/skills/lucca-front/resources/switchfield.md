# pr-Switch

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de faire des choix binaires simples, comme activer ou désactiver une fonctionnalité.
- Dans des formulaires où il est nécessaire d'indiquer un état d'activation, par exemple, pour souscrire à des newsletters.
- Lorsqu'il est nécessaire de fournir une interaction plus intuitive qu'une case à cocher standard, tout en conservant la clarté visuelle.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-switchfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-switchfield-angular--basic)

## Composant Figma
[Accéder au Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20183-78399) — Ce composant présente un interrupteur graphique avec différentes variantes de taille (S, M) et d'état (Checked, Disabled/Readonly, etc.).

## Import

```typescript
import { SwitchInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-switch></lu-switch>
```

## Directive / Composant : `luSwitch` ou `<lu-switch>`

Interrupteur à bascule permettant aux utilisateurs de basculer entre deux états. Applicable sur les éléments HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |

```html
<lu-switch size="M" [checked]="true"></lu-switch>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille de l'interrupteur.

```html
<lu-switch [size]="'S'"></lu-switch>
```

### `inlineMessage`
Type: `string`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-switch [inlineMessage]="'Ceci est un message inline'"></lu-switch>
```

### `inlineMessageState`
Type: `'default' | 'success' | 'warning' | 'error'`

Modifie l'état de l'inline message.

```html
<lu-switch [inlineMessageState]="'success'"></lu-switch>
```

### `hiddenLabel`
Type: `boolean`

Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-switch [hiddenLabel]="true"></lu-switch>
```

### `tooltip`
Type: `string`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-switch [tooltip]="'Info supplémentaire'"></lu-switch>
```

### `label`
Type: `string`

Modifie le label de l'input.

```html
<lu-switch [label]="'Activer la fonctionnalité'"></lu-switch>
```

### `required`
Type: `boolean`

Marque le champ comme obligatoire.

```html
<lu-switch [required]="true"></lu-switch>
```

### `presentation`
Type: `boolean`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-switch [presentation]="true"></lu-switch>
```

## Patterns courants

### Switch basique
```html
<!-- Interrupteur avec un label -->
<lu-switch [label]="'Activer'"></lu-switch>
```

## Accessibilité
Assurez-vous que le composant a des labels descriptifs et que les états peuvent être détectés par des lecteurs d'écran. Utilisez `hiddenLabel` pour masquer visuellement le label tout en le gardant accessible.

## Guidelines Prisme
- Respectez les directives d'interaction et de visuel données dans le guide Prisme de Lucca.
- Ne pas utiliser le composant pour des choix qui pourraient être mieux exprimés par une sélection multiple ou un menu déroulant.
- Utiliser des messages inline clairement articulés pour toutes les valeurs d'état.