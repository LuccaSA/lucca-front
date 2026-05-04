# pr-Textarea

## Quand utiliser ce composant
- Pour créer des champs de saisie de texte qui nécessitent d'être multi-lignes.
- Lorsque vous souhaitez présenter des informations supplémentaires à l'utilisateur via des messages d'inline.
- Pour des formulaires nécessitant des valeurs configurables comme la désactivation, l'obligation ou les help messages.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-textareafield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textareafield-angular--basic)

## Composant Figma
[pr-Textarea Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8718-45752) - Composant input multi-lignes avec plusieurs variantes de taille et d'état.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
  <lu-textarea-input label="Commentaire" placeholder="Votre message ici" rows="5"></lu-textarea-input>
</lu-form-field>
```

## Directive / Composant : `lu-textarea-input` ou `<lu-textarea-input>`

Sélecteur pour le champ de texte multi-lignes. Applicable à l'intérieur de `lu-form-field`.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"presentation"` | Affiche le champ en tant que données textuelles non éditables. |

```html
<lu-textarea-input [rows]="5" [disabled]="false" placeholder="Entrez votre texte ici"></lu-textarea-input>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Modifie le label de l'input.

```html
<lu-textarea-input [label]="'Mon label'" ...></lu-textarea-input>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-textarea-input [required]="true" ...></lu-textarea-input>
```

### `tooltip`
Type: `string` — Default: `''`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-textarea-input [tooltip]="'Aide ici'" ...></lu-textarea-input>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le champ.

```html
<lu-textarea-input [disabled]="true" ...></lu-textarea-input>
```

### `placeholder`
Type: `string` — Default: `''`

Applique un placeholder au champ.

```html
<lu-textarea-input [placeholder]="'Votre message'" ...></lu-textarea-input>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du champ.

```html
<lu-textarea-input [size]="'S'" ...></lu-textarea-input>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif sous le champ de formulaire.

```html
<lu-textarea-input [inlineMessage]="'Message d'erreur'" ...></lu-textarea-input>
```

### `inlineMessageState`
Type: `'default' | 'success' | 'warning' | 'error'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<lu-textarea-input [inlineMessageState]="'error'" ...></lu-textarea-input>
```

### `rows`
Type: `number` — Default: `5`

Nombre de lignes visibles par défaut.

```html
<lu-textarea-input [rows]="4" ...></lu-textarea-input>
```

### `autoResize`
Type: `boolean` — Default: `false`

Active l'autoresize du champ.

```html
<lu-textarea-input [autoResize]="true" ...></lu-textarea-input>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label tout en le conservant accessible pour les lecteurs d'écrans.

```html
<lu-textarea-input [hiddenLabel]="true" ...></lu-textarea-input>
```

### `counter`
Type: `number` — Default: `undefined`

Indique le nombre de caractères maximum.

```html
<lu-textarea-input [counter]="200" ...></lu-textarea-input>
```

### `disableSpellcheck`
Type: `boolean` — Default: `false`

Désactive le correcteur d'orthographe.

```html
<lu-textarea-input [disableSpellcheck]="true" ...></lu-textarea-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-textarea-input [presentation]="true" ...></lu-textarea-input>
```

## Patterns courants

### Utilisation de base avec message d'erreur
```html
<lu-form-field>
  <lu-textarea-input label="Commentaire" 
                     placeholder="Votre message ici" 
                     [required]="true" 
                     [inlineMessage]="'Ce champ est requis'" 
                     [inlineMessageState]="'error'" 
                     rows="4">
  </lu-textarea-input>
</lu-form-field>
```

## Accessibilité
- Assurez-vous que le label est toujours associé au champ de saisie pour une accessibilité optimale.

## Guidelines Prisme
- Ne pas utiliser le champ texte pour des informations non éditables. Utilisez plutôt le mode "presentation".
- Évitez de désactiver le correcteur d'orthographe sauf si nécessaire.