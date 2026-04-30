# DateRangePicker

## Quand utiliser ce composant
1. Lorsque vous avez besoin de sélectionner une plage de dates dans un formulaire.
2. Pour saisir des périodes de temps spécifiques dans des applications de gestion de projets ou de réservation.
3. Dans des tableaux de bord analytiques nécessitant un filtrage basé sur des dates.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Composant Figma
[Design Figma - pr-DateRangePicker](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24726-53006) - Variantes disponibles incluent différentes tailles, périodes, états et types de contenu.

## Import

```typescript
import { DateRangePickerComponent } from '@lucca-front/ng/forms';
// ou
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-date-range-picker></lu-date-range-picker>
```

## Directive / Composant : `luDateRangePicker` ou `<lu-date-range-picker>`

Composant permettant de sélectionner une plage de dates. Applicable dans les formulaires Angular.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"outlined"` | Variante avec bordure |

```html
<lu-date-range-picker value="valeur1"></lu-date-range-picker>
```

## Inputs

### `value`
Type: `Date | null` — Default: `null`

La plage de dates sélectionnée.

```html
<lu-date-range-picker [value]="selectedRange"></lu-date-range-picker>
```

## Patterns courants

### Exemple de sélection de date
```html
<!-- Sélection d'une plage de dates dans un formulaire -->
<lu-date-range-picker [(ngModel)]="dateRange">...</lu-date-range-picker>
```

## Accessibilité
Assurez-vous d'utiliser des attributs ARIA pour décrire le composant et ses états afin de garantir que les lecteurs d'écran puissent le comprendre.

## Guidelines Prisme
- Respecter les principes de design définis dans le guide Prisme de Lucca.
- Éviter d'utiliser des couleurs qui ne respectent pas les normes d'accessibilité visuelle.