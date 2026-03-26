# pr-InputFramed

## Quand utiliser ce composant
- Pour créer des champs de formulaire avec un bord structuré, comme un input standard ou un ensemble d'options radio.
- Lorsque vous devez afficher des messages d'erreur ou des informations contextuelles sous un champ de saisie.
- Lors de la création de formulaires complexes nécessitant une organisation en grille ou en ligne avec des validations intégrées.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-input-framed-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-input-framed-angular-basic--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29856-17751) - Le composant pr-InputFramed présente un cadre autour des champs de saisie ou des options sélectionnables. Il supporte différentes variantes en taille, type d'input (radio, checkbox) et mise en page (grid ou stacked).

## Import

```typescript
import { InputFramedComponent } from '@lucca-front/ng/form-field';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, RadioComponent, RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent, GridComponent } from '@lucca-front/ng/grid';
```

## Usage de base

```html
<lu-form-field label="Label" layout="fieldset">
    <div class="inputFramedWrapper">
        <lu-radio-group-input [(ngModel)]="example" framed required>
            <lu-grid columns="2"></lu-grid>
        </lu-radio-group-input>
    </div>
</lu-form-field>
```

## Directive / Composant : `lu-input-framed`

Composant utilisé pour créer des champs encadrés, prenant en charge les options radio et checkbox.

### Valeurs

| Valeur   | Description                       |
|----------|-----------------------------------|
| `""`     | Variante par défaut               |
| `"checkbox"` | Passe le composant au format checkbox |
| `"radio"` | Passe le composant au format radio |

```html
<lu-form-field label="Label">
    <lu-radio-group-input [(ngModel)]="example" framed required>
        <lu-grid columns="2"></lu-grid>
    </lu-radio-group-input>
</lu-form-field>
```

## Inputs

### `panel`
Type: `boolean` — Default: `false`

Ajoute une section visible lorsque le champ est sélectionné.

```html
<lu-form-field label="Label">
    <lu-radio-group-input [(ngModel)]="example" panel>
        <lu-grid columns="2"></lu-grid>
    </lu-radio-group-input>
</lu-form-field>
```

### `illustration`
Type: `string` — Default: `undefined`

Slot dédié à l'ajout d'illustrations.

### `info`
Type: `boolean` — Default: `false`

Ajoute une section informative toujours visible sous le champ.

### `tag`
Type: `string` — Default: `undefined`

Ajoute un tag après le label du champ.

### `checkbox`
Type: `boolean` — Default: `false`

Passe le composant au format checkbox.

### `center`
Type: `boolean` — Default: `false`

Aligne le champ et son illustration verticalement lorsque le label est trop court.

### `inlineMessage`
Type: `string` — Default: `undefined`

Ajoute un texte descriptif (aide, erreur, etc.) sous le champ de formulaire.

### `presentation`
Type: `boolean` — Default: `false`

Transforme le champ de formulaire en donnée textuelle non éditable.

## Patterns courants

### Structure de base avec options radio
```html
<lu-form-field label="Choisissez une option">
    <lu-radio-group-input [(ngModel)]="selectedOption" framed required>
        <lu-grid columns="2">
            <lu-radio value="option1">Option 1</lu-radio>
            <lu-radio value="option2">Option 2</lu-radio>
        </lu-grid>
    </lu-radio-group-input>
</lu-form-field>
```

## Accessibilité
Veillez à utiliser des labels clair pour chaque champ et à fournir des instructions supplémentaires via l'`inlineMessage` pour améliorer l'expérience.

## Guidelines Prisme
- **Dos** : Assurez-vous que chaque champ a un label descriptif et que les messages d'erreur sont clairs.
- **Don'ts** : N'utilisez pas de champs sans labels, cela nuit à l'accessibilité.