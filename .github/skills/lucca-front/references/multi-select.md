# AssetsSelect

## Quand utiliser ce composant
- Lorsque vous avez besoin de sélectionner plusieurs options parmi une liste.
- Pour des formulaires complexes où une liste déroulante avec sélection multiple est requise.
- Lors de la création d'interfaces utilisateur nécessitant un filtrage dynamique basé sur la recherche d'options.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-multi-select-angular--basic)

## Composant Figma
[AssetsSelect sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=16278-20930) + Composant visuel avec différentes variantes de sélection (multiple, arbre, états).

## Import

```typescript
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
```

## Usage de base

```html
<lu-form-field>
    <lu-multi-select [(ngModel)]="example" [options]="options" (clueChange)="onClueChange($event)"></lu-multi-select>
</lu-form-field>
```

## Directive / Composant : `luMultiSelectInputComponent` ou `<lu-multi-select>`

Permet de créer un champ de sélection multiple. Applicable dans des formulaires et autres conteneurs de données.

### Valeurs

| Valeur           | Description                                |
|------------------|--------------------------------------------|
| `""` (vide)     | Variante par défaut                        |
| `"multiple"`    | Permet la sélection de plusieurs options. |
| `"tree"`        | Affiche les options sous forme d'arbre.   |

```html
<lu-multi-select [multiple]="true" [options]="options">...</lu-multi-select>
```

## Inputs

### `tooltip`
Type: `string` — Default: `''`

Affiche une icône (?) associée à une info-bulle.

```html
<lu-multi-select [tooltip]="'Votre info'">...</lu-multi-select>
```

### `label`
Type: `string` — Default: `''`

Modifie le label du champ.

```html
<lu-multi-select [label]="'Votre Label'">...</lu-multi-select>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-multi-select [required]="true">...</lu-multi-select>
```

### `placeholder`
Type: `string` — Default: `''`

Modifie le placeholder au champ.

```html
<lu-multi-select [placeholder]="'Sélectionnez vos options'">...</lu-multi-select>
```

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Modifie la taille du champ.

```html
<lu-multi-select [size]="'large'">...</lu-multi-select>
```

### `clearable`
Type: `boolean` — Default: `false`

Affiche un bouton pour vider le champ lorsque celui-ci est rempli.

```html
<lu-multi-select [clearable]="true">...</lu-multi-select>
```

## Patterns courants

### Sélection d'options multiples
```html
<lu-form-field>
    <lu-multi-select [(ngModel)]="selectedOptions" [options]="options" [placeholder]="'Choisissez vos options'" [clearable]="true"></lu-multi-select>
</lu-form-field>
```

## Accessibilité
Assurez-vous que toutes les options ont des labels clairs pour faciliter l'utilisation par les lecteurs d'écrans. Les messages d'erreur doivent être communiqués via l'`inlineMessage`.

## Guidelines Prisme
- Évitez d'avoir trop d'options visibles à la fois pour ne pas surcharger l'utilisateur.
- Utilisez les états de chargement pour indiquer que des données sont en cours de chargement.
- Ne pas inclure de champs inutiles qui could potentially complicate the interaction.