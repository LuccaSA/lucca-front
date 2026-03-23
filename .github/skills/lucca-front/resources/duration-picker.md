# pr-DurationPicker

## Quand utiliser ce composant
- Pour sélectionner des durées (en heures ou en jours) dans des formulaires.
- Lorsqu'il est nécessaire de gérer des inputs de durée avec des états de retour variés (ex: erreur, succès).
- Dans des cas où l'accessibilité et les retours visuels doivent être implémentés pour une meilleure expérience utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-time-duration-picker-angular-form--docs)

## Composant Figma
- [Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8221-37781) : Le pr-DurationPicker est un composant qui permet de sélectionner une durée soit en jours, soit en heures. Il supporte plusieurs variations en termes de taille et d'états, permettant une mise en forme flexible dans différents contextes d'application.

## Import

```typescript
import { DurationPickerComponent } from '@lucca-front/ng/forms';
// ou
import { DurationPickerDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<element luDurationPicker>...</element>
```

## Directive / Composant : `luDurationPicker` ou `<lu-duration-picker>`

Directive pour utiliser le composant pr-DurationPicker, applicable sur les éléments HTML.

### Valeurs

| Valeur                | Description                |
|-----------------------|----------------------------|
| `type`                | Type de durée (ex: "Days" ou "Hours") |
| `size`                | Taille du composant (ex: "S", "M") |
| `state`               | État du composant (ex: "Default", "Hover", "FocusMinutes", "FocusHours", "Disabled / Readonly") |
| `content`             | Contenu (ex: "Filled", "Empty") |
| `feedback`            | Type de retour (ex: "None", "Critical") |
| `presentation`        | Mode de présentation (ex: True ou False) |

```html
<element luDurationPicker type="Days" size="M" state="Default" content="Filled" feedback="None">...</element>
```

## Inputs

### `type`
Type: `'Days' | 'Hours'` — Default: `'Days'`

Définit le type de durée à sélectionner.

```html
<element luDurationPicker [type]="'Hours'">...</element>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du composant.

```html
<element luDurationPicker [size]="'S'">...</element>
```

### `state`
Type: `'Default' | 'Hover' | 'FocusMinutes' | 'FocusHours' | 'Disabled / Readonly'` — Default: `'Default'`

Définit l'état visuel du composant.

```html
<element luDurationPicker [state]="'Hover'">...</element>
```

### `content`
Type: `'Filled' | 'Empty'` — Default: `'Filled'`

Définit le contenu à afficher dans le composant.

```html
<element luDurationPicker [content]="'Empty'">...</element>
```

### `feedback`
Type: `'None' | 'Critical'` — Default: `'None'`

Définit le type de feedback associé à la durée sélectionnée.

```html
<element luDurationPicker [feedback]="'Critical'">...</element>
```

### `presentation`
Type: `boolean` — Default: `false`

Indique si le composant doit être présenté de manière différente (ex: avec une mise en forme spécifique).

```html
<element luDurationPicker [presentation]="true">...</element>
```

## Patterns courants

### Sélection de durée standard
```html
<!-- Utilisation de la durée par défaut -->
<element luDurationPicker [size]="'M'" [state]="'Default'">...</element>
```

## Accessibilité
Assurez-vous que le composant pr-DurationPicker respecte les standards d'accessibilité, incluant des étiquettes appropriées et un flux de navigation clair.

## Guidelines Prisme
- Ne pas utiliser le composant sans étiquettes claires.
- Évitez d'utiliser des couleurs de feedback qui ne sont pas accessibles.
- Assurez-vous que le composant est testé avec des utilisateurs ayant des besoins d'accessibilité.