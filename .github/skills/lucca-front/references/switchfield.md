# pr-Switch

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un toggle pour activer ou désactiver des options dans un formulaire.
- Pour une meilleure accessibilité visuelle dans les formulaires avec des états actifs, désactivés ou en focus.
- Lorsqu'un retour d'état est nécessaire (ex. : erreur, aide) en dessous du champ de formulaire via des messages en ligne.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-switchfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-switchfield-angular--basic)

## Composant Figma
[Pr-Switch Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20183-78399) — Composant de switch avec différentes tailles et états disponibles.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, SwitchInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
    <lu-switch-input [(ngModel)]="example"></lu-switch-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

## Directive / Composant : `lu-switch-input` ou `<lu-switch-input>`

Component de switch à utiliser dans les formulaires. Applicable sur l'élément pour changer un état booléen.

### Valeurs

Aucune valeur spécifique.

```html
<lu-switch-input [(ngModel)]="value">...</lu-switch-input>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du switch.

```html
<lu-switch-input [size]="'S'">...</lu-switch-input>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-switch-input [inlineMessage]="'Texte d’aide'">...</lu-switch-input>
```

### `inlineMessageState`
Type: `'default' | 'error' | 'success'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<lu-switch-input [inlineMessageState]="'error'">...</lu-switch-input>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-switch-input [hiddenLabel]="true">...</lu-switch-input>
```

### `tooltip`
Type: `string | undefined` — Default: `undefined`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-switch-input [tooltip]="'Info sur le switch'">...</lu-switch-input>
```

### `label`
Type: `string` — Default: `'Switch'`

Modifie le label de l'input.

```html
<lu-switch-input [label]="'Mon Switch'">...</lu-switch-input>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-switch-input [required]="true">...</lu-switch-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-switch-input [presentation]="true">...</lu-switch-input>
```

## Patterns courants

### Utilisation d'un switch avec message d'état
```html
<lu-form-field>
    <lu-switch-input [(ngModel)]="example" [inlineMessage]="'Veuillez activer ou désactiver.'" [inlineMessageState]="'default'"></lu-switch-input>
</lu-form-field>
<pr-story-model-display>{{ example }}</pr-story-model-display>
```

## Accessibilité
Assurez-vous que le switch est correctement labellisé et que les états sont bien signalés pour les utilisateurs de technologies d'assistance.

## Guidelines Prisme
### Source : list-styleguides
- Suivez les directives d'accessibilité et d'expérience utilisateur décrites dans le guide Prisme de Lucca pour garantir une utilisation optimale du composant.