# pr-DatePicker

## Quand utiliser ce composant
1. Pour sélectionner une date dans un formulaire où l'utilisateur doit spécifier une date précise.
2. Pour permettre la sélection de périodes de dates dans des applications de gestion de projets, comme le suivi de délais.
3. Dans les interfaces utilisateur où l'affichage d'une date est nécessaire, par exemple, pour choisir une date d'événement ou de rendez-vous.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date2-dateinput--docs)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24746-256931) - Le composant pr-DatePicker est représenté avec plusieurs variantes en fonction de la taille, de l'état et du type de contenu.

## Import

```typescript
import { DatePickerComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-date-picker></pr-date-picker>
```

## Directive / Composant : `pr-date-picker` ou `<pr-date-picker>`

Composant utilisé pour sélectionner une date. Applicable sur tout élément HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<pr-date-picker size="M" period="Days" state="Default" content="Filled" feedback="None"></pr-date-picker>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Détermine la taille du composant.

### `period`
Type: `'Days' | 'Months' | 'Years'` — Default: `'Days'`

Définit la période de sélection de dates.

### `state`
Type: `'Default' | 'Hover' | 'Focus' | 'Disabled / Readonly'` — Default: `'Default'`

Représente l'état visuel du composant.

### `content`
Type: `'Filled' | 'Placeholder'` — Default: `'Filled'`

Spécifie le contenu affiché dans le sélecteur.

### `feedback`
Type: `'None' | 'Success' | 'Warning' | 'Critical'` — Default: `'None'`

Affiche le retour d'information associé à la sélection de dates.

### `formPresentation`
Type: `boolean` — Default: `false`

Indique si le composant est présenté dans un formulaire.

### `presentation`
Type: `boolean` — Default: `true`

Détermine si le composant est affiché sous forme de présentation.

```html
<pr-date-picker [size]="'S'" [period]="'Months'" [state]="'Hover'" [content]="'Placeholder'" [feedback]="'Warning'"></pr-date-picker>
```

## Patterns courants

### Date de sélection simple
```html
<!-- Sélectionnez une date simple -->
<pr-date-picker size="M" period="Days" state="Default"></pr-date-picker>
```

## Accessibilité
Assurez-vous que tous les éléments d'interaction sont accessibles au clavier et fournissent des descriptions appropriées pour les lecteurs d'écran.

## Guidelines Prisme
- Évitez d'utiliser des formats de date ambigus. Utilisez un format standardisé.
- Ne surchargez pas le sélecteur de dates avec trop d'informations visuelles.