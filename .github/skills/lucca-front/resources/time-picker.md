# pr-TimePicker

## Quand utiliser ce composant
- Pour permettre aux utilisateurs de sélectionner une heure de manière intuitive dans un formulaire.
- Lorsqu'il est nécessaire de valider l'heure saisie pour des événements ou des réservations.
- Pour des interfaces nécessitant une entrée d'heure, comme des applications de calendrier ou de réservation.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)

## Composant Figma
[Design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=12773-20990) - Composant permettant la sélection horaire avec plusieurs variantes disponibles.

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/form';
// ou
import { TimePickerDirective } from '@lucca-front/ng/form';
```

## Usage de base

```html
<!-- Usage minimal -->
<input luTimePicker [value]="heure"> 
```

## Directive / Composant : `luTimePicker` ou `<lu-time-picker>`

Directive utilisée pour transformer un élément d'entrée en sélecteur de temps. Applicable sur les éléments `<input>`.

### Valeurs (si directive avec valeurs)

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut avec affichage standard de l'heure. |
| `"size"` | Permet de définir la taille du sélecteur (ex : 'S', 'M'). |
| `"state"` | Définit l'état visuel du champ (ex : 'FocusHours', 'Hover', 'Disabled'). |
| `"content"` | Définit le contenu affiché (ex : 'Filled', 'Empty'). |
| `"feedback"` | État de rétroaction visuelle (ex : 'None', 'Critical'). |
| `"presentation"` | Définit si le champ doit être exposé ou non. |

```html
<input luTimePicker="size='M'" [value]="heure"> 
```

## Inputs

### `value`
Type: `string` — Default: `''`

Heure sélectionnée au format HH:mm ou AM/PM.

```html
<input luTimePicker [value]="heure"> 
```

## Patterns courants

### Sélecteur d'heure
```html
<!-- Sélection d'une heure configurable -->
<input luTimePicker [value]="selectedTime" size="M" state="FocusHours" feedback="None">
```

## Accessibilité
Assurez-vous que le champ a une étiquette associée pour aider les utilisateurs utilisant des lecteurs d'écran.

## Guidelines Prisme
Utilisez le composant pr-TimePicker pour les interfaces nécessitant une saisie d'heure et suivez les principes de conception de Lucca pour assurer la clarté visuelle et l'accessibilité.