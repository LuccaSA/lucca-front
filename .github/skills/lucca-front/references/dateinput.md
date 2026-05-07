# pr-DatePicker

## Quand utiliser ce composant
- Lors de la création de formulaires nécessitant la sélection de dates.
- Pour afficher un calendrier permettant à l'utilisateur de choisir une date facilement.
- Lors de la mise en place de filtres ou de searches impliquant une plage de dates.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date2-dateinput--docs)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24746-256931) — Il présente un sélecteur de date avec différentes variantes de taille et d'état. Variantes disponibles : S, M, périodes (Days, Months, Years), états (Default, Hover, Focus, Disabled), contenus (Filled, Placeholder), feedback (None, Success, Warning, Critical).

## Import

```typescript
import { DatePickerComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-datePicker></lu-datePicker>
```

## Directive / Composant : `lu-datePicker` ou `<lu-date-picker>`

Description courte du sélecteur. Applicable sur les éléments de formulaire pour sélectionner une date.

### Valeurs

| Valeur           | Description                 |
|------------------|-----------------------------|
| `""` (vide)      | Variante par défaut         |
| `"outlined"`     | ...                         |

```html
<lu-date-picker size="S" period="Days" state="Default" content="Filled"></lu-date-picker>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'S'`

Détermine la taille du sélecteur de date.

```html
<lu-date-picker [size]="value"></lu-date-picker>
```

### `period`
Type: `'Days' | 'Months' | 'Years'` — Default: `'Days'`

Spécifie la période pour la sélection de la date.

```html
<lu-date-picker [period]="value"></lu-date-picker>
```

### `state`
Type: `'Default' | 'Hover' | 'Focus' | 'Disabled / Readonly'` — Default: `'Default'`

Indique l'état d'interaction du composant.

```html
<lu-date-picker [state]="value"></lu-date-picker>
```

### `content`
Type: `'Filled' | 'Placeholder'` — Default: `'Filled'`

Définit le contenu affiché dans le sélecteur.

```html
<lu-date-picker [content]="value"></lu-date-picker>
```

### `feedback`
Type: `'None' | 'Success' | 'Warning' | 'Critical'` — Default: `'None'`

Affiche un retour visuel sur la sélection de la date.

```html
<lu-date-picker [feedback]="value"></lu-date-picker>
```

### `formPresentation`
Type: `boolean` — Default: `true`

Contrôle la présentation du formulaire.

```html
<lu-date-picker [formPresentation]="value"></lu-date-picker>
```

### `presentation`
Type: `boolean` — Default: `true`

Gère la présentation de l'interface.

```html
<lu-date-picker [presentation]="value"></lu-date-picker>
```

## Patterns courants

### Sélecteur de date de formulaire
```html
<lu-date-picker size="M" period="Months" state="Focus" content="Placeholder" feedback="Success"></lu-date-picker>
```

## Accessibilité
Assurez-vous que le composant pr-DatePicker utilise des attributs ARIA appropriés pour la navigation par clavier et pour les lecteurs d'écran afin d'assurer l'accessibilité. 

## Guidelines Prisme
- Utilisez le composant pour une interaction utilisateur fluide.
- Évitez d'imposer des périodes insuffisantes pour la sélection de dates.
- Ne pas négliger les états de feedback visuels pour un meilleur repère utilisateur.