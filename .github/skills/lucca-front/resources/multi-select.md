# AssetsSelect

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de sélectionner plusieurs éléments d'une liste.
- Lorsque vous avez besoin d'un contrôle de type dropdown qui peut afficher une structure arborescente.
- Quand il est nécessaire d'afficher un message d'aide ou des erreurs sous le champ de sélection.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-multi-select-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-multi-select-angular--basic)

## Composant Figma
[AssetsSelect Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=16278-20930)  
Description visuelle : Composant de sélection avec la possibilité de choisir plusieurs options. Variantes disponibles incluent différents états, tailles et configurations d'arborescence.

## Import

```typescript
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<lu-form-field label="Label" [required]="true">
  <lu-multi-select [(ngModel)]="selectedOptions" [options]="options"></lu-multi-select>
</lu-form-field>
```

## Directive / Composant : `lu-multi-select`

Composant permettant la sélection multiple d'options. Utilisable à l'intérieur d'un `<lu-form-field>`.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut, ne présente pas d'arborescence. |
| `"clearable"` | Affiche un bouton pour effacer la sélection si elle existe. |
| `"loading"` | Affiche un état de chargement. |

```html
<lu-multi-select [loading]="true" clearable></lu-multi-select>
```

## Inputs

### `label`
Type: `string` — Default: `undefined`

Modifie le label du champ.

```html
<lu-multi-select [label]="'Sélectionnez vos options'"></lu-multi-select>
```

### `tooltip`
Type: `string` — Default: `undefined`

Affiche une icône associée à une info-bulle.

```html
<lu-multi-select [tooltip]="'Informations supplémentaires'"></lu-multi-select>
```

### `required`
Type: `boolean` — Default: `false`

Marque le champ comme obligatoire.

```html
<lu-multi-select [required]="true"></lu-multi-select>
```

### `placeholder`
Type: `string` — Default: `undefined`

Modifie le placeholder au champ.

```html
<lu-multi-select [placeholder]="'Choisir...'"></lu-multi-select>
```

## Patterns courants

### Sélection multiple simple
```html
<lu-form-field label="Choix multiples">
  <lu-multi-select [(ngModel)]="selectedItems" [options]="items"></lu-multi-select>
</lu-form-field>
```

## Accessibilité
Le composant doit être accessible avec un support pour les lecteurs d'écran, en utilisant des attributs ARIA appropriés pour indiquer l'état des options sélectionnées.

## Guidelines Prisme
- Utiliser des messages d'aide en inline pour améliorer la clarté pour l'utilisateur.
- Éviter d'encombrer le champ de sélection avec trop d'options visibles sans arborescence adaptée.