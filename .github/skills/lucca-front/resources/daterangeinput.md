# pr-DateRangePicker

## Quand utiliser ce composant
- Pour sélectionner une plage de dates dans un formulaire.
- Lors de la création de filtres dans des tableaux de données.
- Pour des opérations de planification où plusieurs dates sont nécessaires.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Composant Figma
[Consulter le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24726-53006) - Composant pr-DateRangePicker avec différentes variantes de taille, période, état, contenu et feedback.

## Import

```typescript
import { DateRangePickerComponent } from '@lucca-front/ng/forms';
// ou
import { DateRangePickerDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<input luDateRangePicker />
```

## Directive / Composant : `luDateRangePicker` ou `<lu-date-range-picker>`

Directive permettant de créer un sélecteur de plage de dates. Applicable sur les éléments d'entrée.

### Valeurs

| Valeur            | Description        |
|-------------------|--------------------|
| `""` (vide)       | Variante par défaut |
| `"outlined"`      | Variante avec contour |

```html
<input luDateRangePicker="outlined" />
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Détermine la taille du sélecteur de plage de dates.

```html
<input luDateRangePicker [size]="'S'" />
```

### `period`
Type: `'Days' | 'Months' | 'Years'` — Default: `'Days'`

Définit la période sélectionnée pour les dates.

```html
<input luDateRangePicker [period]="'Months'" />
```

### `state`
Type: `'Default' | 'FocusStart' | 'FocusEnd' | 'Hover' | 'Disabled'` — Default: `'Default'`

Indique l'état du sélecteur.

```html
<input luDateRangePicker [state]="'FocusStart'" />
```

### `feedback`
Type: `'None' | 'Warning' | 'Success' | 'Critical'` — Default: `'None'`

Affiche le retour d'information sur le champ.

```html
<input luDateRangePicker [feedback]="'Warning'" />
```

### `presentation`
Type: `boolean` — Default: `true`

Indique si la présentation est active ou non.

```html
<input luDateRangePicker [presentation]="false" />
```

## Patterns courants

### Sélecteur de plage de dates avec état de focus
```html
<!-- Utilisation du sélecteur de plage de dates avec état de focus -->
<input luDateRangePicker [state]="'FocusStart'" [size]="'M'" [period]="'Days'" />
```

## Accessibilité
Assurez-vous que le sélecteur de plage de dates est accessible via le clavier et que les attributs ARIA sont correctement utilisés pour décrire l'interaction.

## Guidelines Prisme
- Utiliser le composant pour tous les choix de dates où cela est possible.
- Ne pas combiner les variations sans justification claire.
- Respecter l'accessibilité lors du choix des dates.