# pr-TimePicker

## Quand utiliser ce composant
1. Pour permettre à l'utilisateur de sélectionner une heure précise dans un formulaire.
2. Lors de la création d'événements nécessitant une heure de début et de fin.
3. Pour toute interface où un choix temporel est requis, par exemple, dans des applications de réservation ou de planification.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)

## Composant Figma
[Vue du composant dans Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=12773-20990) - Ce composant présente des variantes de taille et de présentation avec différents états visuels.

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/forms';
// ou
import { TimePickerDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-time-picker></lu-time-picker>
```

## Directive / Composant : `lu-time-picker` ou `<lu-time-picker>`

Un sélecteur pour choisir une heure, applicable sur les éléments HTML de formulaire.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `size` | Dimension du composant, peut être 'S', 'M' pour petite ou moyenne. |
| `state` | État visuel, peut être 'Default', 'FocusHours', 'FocusMinutes', 'Hover', ou 'Disabled/Readonly'. |
| `content` | Contenu présenté, peut être 'Filled' ou 'Empty'. |
| `feedback` | Indication de retour, peut être 'None', 'Critical' ou d'autres. |

```html
<lu-time-picker size="M" state="FocusHours" content="Filled" feedback="None"></lu-time-picker>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du composant.

```html
<lu-time-picker [size]="'S'"></lu-time-picker>
```

### `state`
Type: `'Default' | 'FocusHours' | 'FocusMinutes' | 'Hover' | 'Disabled/Readonly'` — Default: `'Default'`

Indique l'état visuel du sélecteur.

```html
<lu-time-picker [state]="'FocusMinutes'"></lu-time-picker>
```

### `content`
Type: `'Filled' | 'Empty'` — Default: `'Filled'`

Spécifie le contenu à afficher dans le sélecteur.

```html
<lu-time-picker [content]="'Empty'"></lu-time-picker>
```

### `feedback`
Type: `'None' | 'Critical'` — Default: `'None'`

Affiche un retour visuel en fonction de la saisie utilisateur.

```html
<lu-time-picker [feedback]="'Critical'"></lu-time-picker>
```

## Patterns courants

### Sélection d'heure
```html
<lu-time-picker size="M" state="Default" content="Filled" feedback="None"></lu-time-picker>
```

## Accessibilité
Assurez-vous que le composant pr-TimePicker dispose des descriptions ARIA appropriées et que les états visuels sont clairs pour les utilisateurs de technologies d'assistance.

## Guidelines Prisme
Consultez les guidelines pour éviter les erreurs communes dans l'utilisation des composants, et assurer une cohérence avec le design system de Lucca.