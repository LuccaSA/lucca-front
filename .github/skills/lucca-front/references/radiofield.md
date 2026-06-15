# pr-Radio

## Quand utiliser ce composant
- Pour créer des groupes de boutons radio dans des formulaires nécessitant une option unique parmi plusieurs.
- Lorsqu'un message descriptif inline est nécessaire pour fournir des indications ou des erreurs.
- Lorsque l'accessibilité est une priorité, en masquant des labels et en maintenant des informations pour les lecteurs d'écran.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-radiofield-angular--basic)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20115-1619) - Composant pr-Radio avec 28 variantes disponibles.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
	<lu-radio-group-input [(ngModel)]="example">
		<lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
		<lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
		<ng-template #template><strong>Option</strong> text</ng-template>
		<lu-radio [value]="3" [inlineMessage]="template" disabled>Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>

<pr-story-model-display>{{ example }}</pr-story-model-display>
```

## Directive / Composant : `lu-radio` ou `<lu-radio-group-input>`

Sélecteur pour le radio et le groupe, applicable sur les formulaires.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-radio [value]="1">Option A</lu-radio>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Modifie la taille du radio.

```html
<lu-radio size="S">Option A</lu-radio>
```

### `inlineMessageState`
Type: `'active' | 'error' | 'default'` — Default: `'default'`

Modifie l'état de l'inline message.

```html
<lu-radio [inlineMessageState]="'error'">Option A</lu-radio>
```

### `hiddenLabel`
Type: `boolean` — Default: `false`

Masque le label en le conservant dans le DOM pour les lecteurs d'écrans.

```html
<lu-radio [hiddenLabel]="true">Option A</lu-radio>
```

### `tooltip`
Type: `string` — Default: `''`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-radio tooltip="Information concernant cette option">Option A</lu-radio>
```

### `label`
Type: `string` — Default: `''`

Modifie le label de l'input.

```html
<lu-radio label="Options disponibles">Option A</lu-radio>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-radio [required]="true">Option A</lu-radio>
```

### `inlineMessage`
Type: `string` — Default: `''`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

```html
<lu-radio inlineMessage="Ceci est un message d'aide">Option A</lu-radio>
```

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

```html
<lu-radio [presentation]="true">Option A</lu-radio>
```

## Patterns courants

### Utilisation d'un groupe de radios
```html
<!-- Utilisation d'un groupe de radios avec plusieurs options -->
<lu-form-field>
	<lu-radio-group-input [(ngModel)]="example">
		<lu-radio [value]="1">Option A</lu-radio>
		<lu-radio [value]="2">Option B</lu-radio>
		<lu-radio [value]="3" disabled>Option C</lu-radio>
	</lu-radio-group-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que chaque radio a un label associé explicitement pour garantir que les lecteurs d'écran peuvent l'identifier correctement.

## Guidelines Prisme
- Utilisez les variantes appropriées des radios pour s'assurer que les états sont bien représentés (ex: erreur, actif).