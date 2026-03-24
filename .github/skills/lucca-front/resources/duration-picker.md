# pr-DurationPicker

## Quand utiliser ce composant
- Pour permettre aux utilisateurs de sélectionner une durée en heures ou en jours.
- Dans des formulaires où une estimation de temps est requise, comme la planification d'événements.
- Lors de la création d'interfaces utilisateur nécessitant une saisie temporelle précise, intégrée à d'autres éléments de formulaire.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-time-duration-picker-angular-form--docs)

## Composant Figma
[Durée Picker Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8221-37781) - Ce composant propose des variantes incluant différentes tailles (S, M), types (Heures, 🚧 Jours), états (Default, Hover, Focus), et présentations (Filled, Empty).

## Import

```typescript
import { DurationPickerComponent } from '@lucca-front/ng/forms';
// ou
import { DurationPickerDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<element lu-duration-picker>...</element>
```

## Directive / Composant : `lu-duration-picker` ou `<lu-duration-picker>`

Directive utilisée pour intégrer un sélecteur de durée. Applicable sur les éléments de formulaire.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"🚧 Days"` | Type de sélection en jours |
| `"Hours"` | Type de sélection en heures |

```html
<element lu-duration-picker="🚧 Days">...</element>
```

## Inputs

### `type`
Type: `'🚧 Days' | 'Hours'` — Default: `'Hours'`

Détermine le type de durée que l'utilisateur peut sélectionner.

```html
<element lu-duration-picker [type]="'🚧 Days'">...</element>
```

## Patterns courants

### Saisie de durée
```html
<!-- Un formulaire permettant la saisie d'une durée -->
<element lu-duration-picker ...>...</element>
```

## Accessibilité
Assurez-vous que les étiquettes associées au sélecteur de durée sont claires et visibles pour tous les utilisateurs, et qu'elles peuvent être naviguées via le clavier.

## Guidelines Prisme
- Évitez d'utiliser des abréviations dans les étiquettes du composant.
- Ne combinez pas différents types de durée dans un même selecteur.
- Assurez-vous que les messages de feedback sont facilement compréhensibles par tous les utilisateurs.