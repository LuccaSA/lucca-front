# pr-DateRangePicker

## Quand utiliser ce composant
1. Lorsque vous avez besoin de permettre à l'utilisateur de sélectionner une plage de dates dans un formulaire.
2. Pour les tableaux de bord où les utilisateurs doivent filtrer les données par période.
3. Lors de la création de rapports ou d'analyses nécessitant des sélections de dates spécifiques.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Composant Figma
[PR-DateRangePicker sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24726-53006) - Composant avec plusieurs variantes visuelles. Variantes disponibles incluent différentes tailles, périodes et états d'interaction.

## Import

```typescript
import { DateRangePickerComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-date-range-picker></lu-date-range-picker>
```

## Directive / Composant : `luXxx` ou `<lu-date-range-picker>`

Sélecteur pour le composant DateRangePicker. Applicable sur les éléments pouvant contenir des données d'interaction utilisateur.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"filled"` | État rempli de l'input |
| `"outline"` | État en contournement de l'input |

```html
<lu-date-range-picker period="Months" size="M" state="Default"></lu-date-range-picker>
```

## Inputs

### `period`
Type: `'Days' | 'Months' | 'Years'` — Default: `'Days'`

Permet de définir la période pour la sélection de dates.

```html
<lu-date-range-picker [period]="'Months'"></lu-date-range-picker>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille de l'input à utiliser.

```html
<lu-date-range-picker [size]="'S'"></lu-date-range-picker>
```

### `state`
Type: `'Default' | 'FocusStart' | 'FocusEnd' | 'Hover' | 'Disabled'` — Default: `'Default'`

Indique l'état de l'input (focus, hover, disabled).

```html
<lu-date-range-picker [state]="'FocusStart'"></lu-date-range-picker>
```

## Patterns courants

### Sélection de plage de dates
```html
<!-- Utilisation d'une plage de dates avec période et taille spécifiées -->
<lu-date-range-picker period="Days" size="M"></lu-date-range-picker>
```

## Accessibilité
Assurez-vous que les éléments de date soient accessibles via le clavier et que des descriptions claires soient fournies pour aider les utilisateurs screen-reader.

## Guidelines Prisme
- Utilisez des labels clairs pour les inputs.
- Ne pas empiler trop d'inputs de date dans un seul formulaire.
- Assurez-vous que les périodes de date soient logiques et faciles à comprendre pour l'utilisateur.