# FilterBar

## Quand utiliser ce composant
- Lorsque vous devez offrir plusieurs options de filtrage pour affiner les résultats d'une liste ou d'une table.
- Pour organiser les filtres d'une manière intuitive et accessible, en améliorant l'expérience utilisateur.
- Lorsque vous souhaitez intégrer des sélecteurs et des champs de saisie avec un design cohérent au sein d'un formulaire complexe.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-filterspills-filterbar-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-filterbar-angular--basic)

## Composant Figma
[Consulter le design sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26824-221178) - Le composant FilterBar propose un design modulaire avec plusieurs variantes, permettant une intégration élégante dans des applications riches, tout en offrant des options flexibles pour le filtrage.

## Import

```typescript
import { FilterBarComponent } from '@lucca-front/ng/forms';
// ou
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/select';
import { DateInputComponent } from '@lucca-front/ng/forms';
import { DateRangeInputComponent } from '@lucca-front/ng/forms';
import { DividerComponent } from '@lucca-front/ng/layout';
import { FilterPillComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '@lucca-front/ng/forms';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/select';
import { NumericBadgeComponent } from '@lucca-front/ng/badge';
import { SegmentedControlComponent } from '@lucca-front/ng/controls';
import { SegmentedControlFilterComponent } from '@lucca-front/ng/controls';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/select';
```

## Usage de base

```html
<lu-filter-bar>
  <lu-simple-select apiV4>...</lu-simple-select>
  <lu-multi-select apiV4>...</lu-multi-select>
  <lu-date-input>...</lu-date-input>
  <lu-date-range-input>...</lu-date-range-input>
  <lu-divider></lu-divider>
  <lu-filter-pill>...</lu-filter-pill>
  <lu-form-field>...</lu-form-field>
  <lu-checkbox-input>...</lu-checkbox-input>
  <lu-text-input>...</lu-text-input>
  <lu-numeric-badge>...</lu-numeric-badge>
  <lu-segmented-control>...</lu-segmented-control>
  <lu-segmented-control-filter>...</lu-segmented-control-filter>
  <lu-multi-select>...</lu-multi-select>
  <lu-simple-select>...</lu-simple-select>
</lu-filter-bar>
```

## Directive / Composant : `lu-filter-bar`

Composant principal pour la création d'une barre de filtre, appliqué sur le conteneur de filtrage.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut (Type=Full) |
| `"views-only"` | Affiche uniquement les vues |
| `"right-align"` | Aligne les vues à droite |
| `"filter-pills-only"` | Affiche uniquement les filtres sous forme de pills |

```html
<lu-filter-bar type="views-only">...</lu-filter-bar>
```

## Inputs

### `type`
Type: `'full' | 'views-only' | 'right-align' | 'filter-pills-only'` — Default: `'full'`

Détermine le type de la barre de filtre et ses options d'affichage.

```html
<lu-filter-bar [type]="'views-only'">...</lu-filter-bar>
```

## Patterns courants

### Intégration de filtres
```html
<lu-filter-bar>
  <lu-simple-select apiV4></lu-simple-select>
  <lu-date-input></lu-date-input>
</lu-filter-bar>
```

## Accessibilité
Assurez-vous que les éléments de filtrage sont accessibles via le clavier et que les contrôles permettent une navigation claire pour tous les utilisateurs, avec des étiquettes descriptives.

## Guidelines Prisme
- Respecter les conventions de couleurs établies dans le design system.
- Ne pas surcharger la barre de filtres avec trop d'options, privilégier la clarté.