# RadioField

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de sélectionner une option parmi un groupe limité de choix.
- Lorsque vous avez besoin de présenter des options de manière claire et esthétique dans un formulaire.
- Pour capturer des saisies simples tout en maintenant une accessibilité avec un label caché pour les lecteurs d'écrans.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-radiofield-angular--basic)

## Composant Figma
[Accéder au Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20115-1619) - Composant pr-Radio avec variantes disponibles pour différents états et tailles.

## Import

```typescript
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-radio-group>
  <lu-radio [label]="'Option 1'" [size]="'M'" [required]="true"></lu-radio>
  <lu-radio [label]="'Option 2'" [size]="'M'"></lu-radio>
</lu-radio-group>
```

## Directive / Composant : `lu-radio-group` ou `<lu-radio>`

Groupe de boutons radio permettant la sélection unique d'une option. Applicable sur des éléments de type boutons radio.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"S"` | Taille petite |
| `"M"` | Taille moyenne |

```html
<lu-radio-group [size]="'M'">
  <lu-radio [label]="'Option 1'"></lu-radio>
</lu-radio-group>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du radio.

```html
<lu-radio [size]="'S'"></lu-radio>
```

### `inlineMessageState`
Type: `'default' | 'success' | 'warning' | 'error'`

Modifie l'état de l'inline message associé au champ.

```html
<lu-radio [inlineMessageState]="'error'"></lu-radio>
```

### `hiddenLabel`
Type: `boolean`

Masque le label tout en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-radio [hiddenLabel]="true"></lu-radio>
```

### `tooltip`
Type: `string`

Affiche une icône (?) associée à une info-bulle si le label est visible.

```html
<lu-radio [tooltip]="'Cette option...'"></lu-radio>
```

### `label`
Type: `string`

Modifie le label de l'input.

```html
<lu-radio [label]="'Mon Option'"></lu-radio>
```

### `required`
Type: `boolean`

Marque le champ comme obligatoire.

```html
<lu-radio [required]="true"></lu-radio>
```

### `inlineMessage`
Type: `string`

Ajoute un texte descriptif sous le champ de formulaire.

```html
<lu-radio [inlineMessage]="'Ceci est une aide'"></lu-radio>
```

### `presentation`
Type: `boolean`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-radio [presentation]="true"></lu-radio>
```

## Patterns courants

### Utilisation d'un groupe de boutons radio
```html
<!-- Groupe de boutons radio permettant de choisir une option -->
<lu-radio-group>
  <lu-radio [label]="'Option A'" [size]="'M'"></lu-radio>
  <lu-radio [label]="'Option B'" [size]="'M'"></lu-radio>
</lu-radio-group>
```

## Accessibilité
Veillez à toujours fournir un label descriptif pour chaque option de radio afin d'améliorer l'expérience utilisateur pour les personnes utilisant des technologies d'assistance.

## Guidelines Prisme
- Évitez d'utiliser des groupes de boutons radio lorsque le nombre d'options dépasse 5, préférez les listes déroulantes.
- Assurez-vous que chaque option ait un label clair et concis.