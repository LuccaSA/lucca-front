# pr-ColorPicker

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un sélecteur de couleur dans un formulaire.
- Pour permettre à l'utilisateur de choisir une couleur à partir d'une palette.
- Lors de la création de thèmes personnalisés où les couleurs sont essentielles.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-color-picker-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-color-picker-angular--basic)

## Composant Figma
[pr-ColorPicker Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=34491-7965) — Composant visuel de sélecteur de couleur avec différentes variantes disponibles.

## Import

```typescript
import { LuColorPickerComponent } from '@lucca-front/ng/forms';
// ou
import { LuOptionDirective } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '@lucca-front/ng/forms';
import { ColorInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-color-input></lu-color-input>
```

## Directive / Composant : `lu-color-input` ou `<lu-color-input>`

Composant de saisie de couleur. Applicable sur les éléments de formulaire.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-color-input>...</lu-color-input>
```

## Inputs

### `value`
Type: `string` — Default: `''`

Couleur sélectionnée par l'utilisateur.

```html
<lu-color-input [value]="selectedColor">...</lu-color-input>
```

### `disabled`
Type: `boolean` — Default: `false`

Indique si le composant est désactivé.

```html
<lu-color-input [disabled]="isDisabled">...</lu-color-input>
```

## Patterns courants

### Sélection de couleur
```html
<!-- Composant de couleur utilisé dans un formulaire -->
<lu-form-field>
  <lu-color-input [value]="selectedColor" [disabled]="false"></lu-color-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que le composant est accessible via le clavier et que des étiquettes appropriées sont fournies pour chaque sélecteur de couleur.

## Guidelines Prisme
- Utilisez des couleurs contrastées pour améliorer la visibilité.
- Ne pas surcharger le composant avec des options inutiles.
- Évitez d'utiliser un trop grand nombre de couleurs différentes sans indication claire.