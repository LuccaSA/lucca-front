# FilterPill

## Quand utiliser ce composant
- Lorsque vous souhaitez créer des filtres dynamiques dans une interface utilisateur avec des options de sélection multiples ou simples.
- Pour intégrer des sélecteurs de dates et de plage de dates dans un filtre personnalisé.
- Pour permettre aux utilisateurs de réinitialiser facilement les filtres sélectionnés grâce à une interface intuitive.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-filterpills-angular--basic)

## Composant Figma
[Voir Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26824-179309) - Composant FilterPill, propose différentes variantes comme des sélecteurs simples et multiples pour filtrer les options.

## Import

```typescript
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { DateRangeInputComponent } from '@lucca-front/ng/date2';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-filter-pill label="Inclure les collaborateurs partis">
    <lu-checkbox-input [ngModel]="false"></lu-checkbox-input>
</lu-filter-pill>
```

## Directive / Composant : `lu-filter-pill` ou `<lu-filter-pill>`

Composant servant à afficher des filtres interactifs avec une capacité de sélection multiple ou simple. Applicable sur les éléments de formulaire.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-filter-pill label="Départements" name="departments">
    <lu-multi-select [ngModel]="[]" departments></lu-multi-select>
</lu-filter-pill>
```

## Inputs

### `clearable`
Type: `boolean` — Default: `false`

Affiche une croix pour réinitialiser le filtre si celui-ci est renseigné.

```html
<lu-filter-pill [clearable]="true" label="Filter">...</lu-filter-pill>
```

### `label`
Type: `string`

Modifie le label du filtre.

```html
<lu-filter-pill label="Date de début">...</lu-filter-pill>
```

### `filterPillLabelPlural`
Type: `string`

Permet de définir le label lorsque plusieurs éléments sont sélectionnés dans un multi select.

```html
<lu-filter-pill label="Légumes" filterPillLabelPlural="légumes" name="legume">
    <lu-multi-select [ngModel]="[]" [options]="legumes | filterLegumes:clue"></lu-multi-select>
</lu-filter-pill>
```

### `name`
Type: `string`

Permet de faire le lien entre la liste de filtres disponible et l'affichage du filtre.

```html
<lu-filter-pill label="Filtro" name="example">...</lu-filter-pill>
```

### `disabled`
Type: `boolean`

Désactive le filtre.

```html
<lu-filter-pill [disabled]="true" label="Non utilisable">...</lu-filter-pill>
```

## Patterns courants

### Filtre simple
```html
<!-- Filtre avec un sélecteur simple -->
<lu-filter-pill label="Legume (simple)" name="department">
    <lu-simple-select [ngModel]="null" [options]="legumes | filterLegumes:clue"></lu-simple-select>
</lu-filter-pill>
```

### Filtre avec sélection multiple
```html
<!-- Filtre avec un sélecteur multiple -->
<lu-filter-pill label="Période">
    <lu-date-range-input [ngModel]="null"></lu-date-range-input>
</lu-filter-pill>
```

## Accessibilité
Assurez-vous que chaque label est correctement associé à son contrôle afin d'améliorer l'expérience utilisateur pour les lecteurs d'écran.

## Guidelines Prisme
- Utilisez des labels clairs et concis pour chaque filtre pour faciliter l'accès et la compréhension.
- Ne surchargez pas le composant avec trop d'options de filtre similaires.
- Regroupez les filtres logiquement pour éviter la confusion et améliorer l'expérience utilisateur.