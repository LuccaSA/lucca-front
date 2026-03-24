# pr-InputFramed (v20.1)

## Quand utiliser ce composant
- Lors de la création de formulaires nécessitant des champs avec des options radio ou des cases à cocher.
- Pour offrir une interface utilisateur claire et accessible lors de la collecte d'informations.
- Quand il est nécessaire de disposer de différentes tailles et types d'options d'entrée dans un même formulaire.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-input-framed-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-input-framed-angular-basic--basic)

## Composant Figma
[pr-InputFramed](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=29856-17751) - Composant de champ de formulaire avec plusieurs variantes disponibles, incluant différentes tailles et options pour des éléments radio et cases à cocher.

## Import

```typescript
import { InputFramedComponent } from '@lucca-front/ng/forms';
// ou
import { FormFieldComponent } from '@lucca-front/ng/forms';
import { RadioComponent } from '@lucca-front/ng/forms';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { RadioGroupInputComponent } from '@lucca-front/ng/forms';
import { GridColumnComponent } from '@lucca-front/ng/forms';
import { GridComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-form-field>
    <lu-input-framed placeholder="Votre texte ici"></lu-input-framed>
</lu-form-field>
```

## Directive / Composant : `lu-input-framed` ou `<lu-input-framed>`

Champ de formulaire utilisé pour la saisie. Applicable aux formulaires.

### Valeurs

| Valeur | Description                      |
|--------|----------------------------------|
| `""` (vide)    | Variante par défaut                |
| `"radio"`      | Champ de type radio                |
| `"checkbox"`   | Champ de type case à cocher       |

```html
<lu-input-framed type="radio">...</lu-input-framed>
```

## Inputs

### `size`
Type: `'M' | 'L'` — Default: `'M'`

Détermine la taille du champ de saisie.

```html
<lu-input-framed [size]="'L'">...</lu-input-framed>
```

### `type`
Type: `'radio' | 'checkbox'` — Default: `'radio'`

Définit le type d'entrée utilisé.

```html
<lu-input-framed [type]="'checkbox'">...</lu-input-framed>
```

### `layout`
Type: `'stacked' | 'grid'` — Default: `'stacked'`

Configure la disposition des éléments à l'intérieur du formulaire.

```html
<lu-input-framed [layout]="'grid'">...</lu-input-framed>
```

### `critical`
Type: `boolean` — Default: `false`

Indique si le champ est critique pour la saisie de données.

```html
<lu-input-framed [critical]="true">...</lu-input-framed>
```

## Patterns courants

### Champ radio groupé
```html
<!-- Utilisation de plusieurs options radio -->
<lu-form-field>
    <lu-input-framed type="radio" layout="stacked" size="M"></lu-input-framed>
    <lu-input-framed type="radio" layout="stacked" size="M"></lu-input-framed>
</lu-form-field>
```

## Accessibilité
Assurez-vous que chaque champ de formulaire soit étiqueté correctement pour les technologies d'assistance. Les contrôles devraient être pratiques et avoir des indications claires sur leurs états.

## Guidelines Prisme
- Utiliser des éléments de formulaire accessibles et bien étiquetés.
- Éviter d'utiliser des champs trop petits, assurant une bonne expérience utilisateur sur les appareils tactiles.
- S'assurer que les messages d'erreur sont clairs et visibles pour les utilisateurs.