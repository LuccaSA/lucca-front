# pr-FilterPill

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de filtrer des listes de données en sélectionnant des options parmi plusieurs critères.
- Pour capturer des plages de dates à travers une interface utilisateur intuitive.
- Pour faciliter la sélection multiple d'éléments tout en gardant un design cohérent et attrayant.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-filterpills-angular--basic)

## Composant Figma
[Consulter sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26824-179309) - Le composant pr-FilterPill est disponible en plusieurs variantes, y compris des sélecteurs simples et multiples, ainsi que des entrées de dates.

## Import

```typescript
import { FilterPillComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/forms';
import { DateInputComponent } from '@lucca-front/ng/forms';
import { DateRangeInputComponent } from '@lucca-front/ng/forms';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-filter-pill>...</lu-filter-pill>
```

## Directive / Composant : `lu-filter-pill`

Composant principal pour les filtres, applicable sur des éléments associé à des sélections et entrées de données.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

## Inputs

### `totalCount`
Type: `number` — Default: `0`

Nombre total d'éléments disponibles pour la sélection.

```html
<lu-filter-pill [totalCount]="10">...</lu-filter-pill>
```

### `departments`
Type: `string[]` — Default: `[]`

Liste des départements à filtrer.

```html
<lu-filter-pill [departments]="['HR', 'IT']">...</lu-filter-pill>
```

## Patterns courants

### Sélection de plusieurs éléments
```html
<lu-filter-pill>
  <lu-multi-select totalCount="10" [departments]="['HR', 'IT']"></lu-multi-select>
</lu-filter-pill>
```

## Accessibilité
Assurez-vous que tous les éléments interactifs ont des étiquettes appropriées afin d'améliorer l'accessibilité pour les utilisateurs de lecteurs d'écran.

## Guidelines Prisme
- Les composants doivent rester cohérents avec les styles et la typographie du design système.
- Ne pas surcharger le composant avec trop d'informations visuelles afin de préserver la clarté.