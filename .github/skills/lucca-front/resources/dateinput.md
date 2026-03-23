# pr-DatePicker

## Quand utiliser ce composant
- Lors de la création de formulaires nécessitant une entrée de date.
- Pour la sélection de dates dans des applications où l'utilisateur doit choisir une date d'événement, d'anniversaire, etc.
- Dans les interfaces utilisateurs où la sélection de périodes de temps est requise, comme des filtres de recherche.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date2-dateinput--docs)

## Composant Figma
- [Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24746-256931) - Le composant est un champ de saisie de date avec plusieurs tailles et états visuels.

## Import

```typescript
import { DateInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-date-input></lu-date-input>
```

## Directive / Composant : `lu-date-input` ou `<lu-date-input>`

Composant pour la sélection de date. Applicable sur les éléments HTML de type formulaire.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"small"` | Taille réduite |
| `"medium"` | Taille moyenne |
| `"large"` | Taille grande |
| `"years"` | Période en années |
| `"months"` | Période en mois |
| `"days"` | Période en jours |
| `"default"` | État par défaut |
| `"hover"` | État au survol |
| `"focus"` | État au focus |
| `"disabled"` | État désactivé |
| `"filled"` | Contenu rempli |
| `"placeholder"` | Contenu en tant que placeholder |
| `"success"` | État de succès |
| `"warning"` | État d'avertissement |
| `"critical"` | État critique |

```html
<lu-date-input size="medium" period="months" state="hover" content="filled" feedback="success"></lu-date-input>
```

## Inputs

### `size`
Type: `'small' | 'medium' | 'large'` — Default: `'medium'`

Définit la taille du composant.

```html
<lu-date-input [size]="'small'"></lu-date-input>
```

### `period`
Type: `'years' | 'months' | 'days'` — Default: `'days'`

Définit la période de sélection des dates.

```html
<lu-date-input [period]="'months'"></lu-date-input>
```

### `state`
Type: `'default' | 'hover' | 'focus' | 'disabled'` — Default: `'default'`

Définit l'état visuel du composant.

```html
<lu-date-input [state]="'focus'"></lu-date-input>
```

### `content`
Type: `'filled' | 'placeholder'` — Default: `'filled'`

Définit le contenu du champ.

```html
<lu-date-input [content]="'placeholder'"></lu-date-input>
```

### `feedback`
Type: `'none' | 'success' | 'warning' | 'critical'` — Default: `'none'`

Affiche le type de retour visuel.

```html
<lu-date-input [feedback]="'success'"></lu-date-input>
```

## Patterns courants

### Sélection de date
```html
<!-- Sélectionner une date pour un événement -->
<lu-date-input size="medium" period="days" state="default" content="filled"></lu-date-input>
```

## Accessibilité
Assurez-vous d'utiliser des attributs ARIA appropriés pour améliorer l'accès au composant, comme `aria-label` pour définir une description accessible.

## Guidelines Prisme
- Utiliser des états de retour (feedback) appropriés pour indiquer le statut de la saisie.
- Respecter les tailles de composants pour une meilleure ergonomie sur différents dispositifs.