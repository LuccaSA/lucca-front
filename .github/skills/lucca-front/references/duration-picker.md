# pr-DurationPicker

## Quand utiliser ce composant
- Lorsqu'un utilisateur doit sélectionner une durée spécifique (heures ou jours).
- Lors de la configuration de périodes dans des formulaires (ex. : réservation d'événements).
- Pour afficher une durée d'attente ou de traitement de manière intuitive.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-time-duration-picker-angular-form--docs)

## Composant Figma
[Composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8221-37781) + Variantes disponibles : Type=🚧 Days, Size=M, State=Default, Content=Filled, Feedback=None, Presentation=False, Type=Hours, etc.

## Import

```typescript
import { DurationPickerComponent } from '@lucca-front/ng/forms';
// ou
import { DurationPickerDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-duration-picker></lu-duration-picker>
```

## Directive / Composant : `luDurationPicker` ou `<lu-duration-picker>`

Directive pour intégrer le sélecteur de durée dans un formulaire. Applicable sur une balise HTML.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"🚧 Days"` | Sélectionne les jours comme unité de temps |
| `"Hours"` | Sélectionne les heures comme unité de temps |
| `"M"` | Taille medium |
| `"S"` | Taille small |
| `"Default"` | État par défaut |
| `"Hover"` | État lors du survol |
| `"FocusMinutes"` | État lorsque les minutes sont sélectionnées |
| `"FocusHours"` | État lorsque les heures sont sélectionnées |
| `"Disabled / Readonly"` | État désactivé ou en lecture seule |

```html
<lu-duration-picker type="Hours" size="M" state="Default"></lu-duration-picker>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du picker.

```html
<lu-duration-picker [size]="'S'"></lu-duration-picker>
```

### `type`
Type: `'🚧 Days' | 'Hours'` — Default: `'Hours'`

Spécifie le type d'unité de temps.

```html
<lu-duration-picker [type]="'🚧 Days'"></lu-duration-picker>
```

### `state`
Type: `'Default' | 'Hover' | 'FocusMinutes' | 'FocusHours' | 'Disabled / Readonly'` — Default: `'Default'`

Détermine l'état du composant.

```html
<lu-duration-picker [state]="'Hover'"></lu-duration-picker>
```

### `feedback`
Type: `'None' | 'Critical'` — Default: `'None'`

Fournit du retour visuel utilisateur.

```html
<lu-duration-picker [feedback]="'Critical'"></lu-duration-picker>
```

### `presentation`
Type: `boolean` — Default: `false`

Indique si le composant doit avoir une présentation spéciale.

```html
<lu-duration-picker [presentation]="true"></lu-duration-picker>
```

## Patterns courants

### Sélection de durée
```html
<!-- Sélection d'une durée en heures -->
<lu-duration-picker type="Hours" size="M" state="Default"></lu-duration-picker>
```

## Accessibilité
Assurez-vous que les labels associés sont clairs et que le sélecteur réagit à la navigation clavier. Utilisez des descriptions pour chaque état afin d'améliorer l'expérience utilisateur.

## Guidelines Prisme
- Utiliser les variantes adaptées pour chaque contexte d'utilisation.
- Évitez d'utiliser le composant en dehors de ses cas d'utilisation prévus.
- Suivez les règles de mise en forme pour l'accessibilité.