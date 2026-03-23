# FilterPill

## Quand utiliser ce composant
- Lorsque vous souhaitez créer des filtres interactifs pour des listes ou des tableaux.
- Pour permettre aux utilisateurs de sélectionner plusieurs options à partir de listes déroulantes.
- Lors de l'utilisation de dates pour affiner des résultats basés sur une période.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-filterspills-filterpills-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-filterpills-angular--basic)

## Composant Figma
[Accéder à Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=26824-179309) - Composant visuel pour le filtre avec variantes pour les différents types et états.

## Import

```typescript
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
```

## Usage de base

```html
<!-- Usage minimal -->
<element luFilterPill>...</element>
```

## Directive / Composant : `luFilterPill` ou `<lu-filter-pill>`

Directive utilisée pour créer un filtre personnalisable. Applicable sur tout élément HTML.

### Valeurs (si directive avec valeurs)

| Valeur   | Description                             |
|----------|-----------------------------------------|
| `""`     | Variante par défaut                     |
| `"MultipleSelect"` | Pour plusieurs sélections            |
| `"SimpleSelect"` | Pour une seule sélection                 |
| `"DatePicker"` | Sélecteur de date                       |

```html
<element luFilterPill="MultipleSelect">...</element>
```

## Inputs

### `type`
Type: `'MultipleSelect' | 'SimpleSelect' | 'DatePicker'` — Default: `'MultipleSelect'`

Détermine le type de filtre à utiliser.

```html
<element luFilterPill [type]="value">...</element>
```

### `state`
Type: `'Default' | 'Active' | 'Disabled' | 'Typing' | 'Hover' | 'Focus' | 'Opened'` — Default: `'Default'`

Indique l'état actuel du filtre.

```html
<element luFilterPill [state]="value">...</element>
```

### `content`
Type: `'Filled' | 'Empty'` — Default: `'Filled'`

Détermine si le contenu du filtre est rempli ou vide.

```html
<element luFilterPill [content]="value">...</element>
```

## Patterns courants

### Filtre avec sélection simple
```html
<element luFilterPill [type]="'SimpleSelect'" [state]="'Default'" [content]="'Filled'">...</element>
```

## Accessibilité
Assurez-vous que tous les éléments de filtre ont des étiquettes associées pour améliorer l'accessibilité.

## Guidelines Prisme
- Utiliser des couleurs et des symboles conformes aux directives de l'identité de marque de Lucca.
- Ne pas surcharger un filtre avec trop d’options pour éviter de désorienter l'utilisateur.