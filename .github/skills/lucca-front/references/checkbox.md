# CheckboxFieldset

## Quand utiliser ce composant
- Pour regrouper plusieurs cases à cocher sous un même label afin de faciliter les choix multiples.
- Lors de la création de filtres dans des formulaires complexes, permettant à l'utilisateur de sélectionner des options spécifiques.
- Pour afficher un retour visuel (feedback) sur les sélections faites par l'utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-checkbox-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-checkbox-angular--basic)

## Composant Figma
[CheckboxFieldset sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20185-80450) - Ce composant représente un ensemble de cases à cocher personnalisables avec plusieurs variantes de type, taille et alignement.

## Import

```typescript
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-checkbox-input name="example" [(ngModel)]="checkboxValue">Exemple de case à cocher</lu-checkbox-input>
```

## Directive / Composant : `lu-checkbox-input` ou `<lu-checkbox-input>`

Composant pour une case à cocher, pouvant être utilisé avec des labels décrivant l'option.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"large"` | Case à cocher avec taille large |
| `"small"` | Case à cocher avec taille petite |

```html
<lu-checkbox-input size="large" [(ngModel)]="checkboxValue">Exemple de case à cocher</lu-checkbox-input>
```

## Inputs

### `type`
Type: `'checkbox' | 'radio'` — Default: `'checkbox'`

Détermine le type de l'entrée, permettant de choisir entre une case à cocher ou un bouton radio.

```html
<lu-checkbox-input [type]="'radio'" [(ngModel)]="checkboxValue">Exemple de bouton radio</lu-checkbox-input>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Détermine la taille de la case à cocher.

```html
<lu-checkbox-input [size]="'small'" [(ngModel)]="checkboxValue">Exemple miniature</lu-checkbox-input>
```

### `alignment`
Type: `'vertical' | 'horizontal'` — Default: `'vertical'`

Détermine l'alignement des cases à cocher.

```html
<lu-checkbox-input [alignment]="'horizontal'" [(ngModel)]="checkboxValue">Exemple d'alignement horizontal</lu-checkbox-input>
```

### `feedback`
Type: `'default' | 'critical'` — Default: `'default'`

Détermine le type de retour (feedback) approprié à afficher.

```html
<lu-checkbox-input [feedback]="'critical'" [(ngModel)]="checkboxValue">Exemple avec feedback critique</lu-checkbox-input>
```

## Patterns courants

### Utilisation d'un CheckboxFieldset
```html
<!-- Regroupement d'options de sélection -->
<lu-filter-pill label="Options Disponibles" name="availableOptions">
  <lu-checkbox-input [(ngModel)]="option1">Option 1</lu-checkbox-input>
  <lu-checkbox-input [(ngModel)]="option2">Option 2</lu-checkbox-input>
</lu-filter-pill>
```

## Accessibilité
Assurez-vous que chaque case à cocher a une étiquette associée pour garantir que les utilisateurs de technologies d'assistance peuvent comprendre les choix disponibles.

## Guidelines Prisme
- Utiliser des labels clairs et explicites pour chaque case à cocher.
- Éviter d'utiliser trop de cases à cocher dans un même groupe afin de ne pas submerger l'utilisateur.
- Préférer un retour visuel immédiat lorsque l'utilisateur interagit avec les cases à cocher.