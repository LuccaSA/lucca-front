# pr-Calendar

## Quand utiliser ce composant
- Pour sélectionner une seule date dans une application de gestion de tâches.
- Lors de la création d'un système de réservation où les utilisateurs doivent choisir une date spécifique.
- Dans les formulaires où une sélection de date est requise.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date-calendar--docs)

## Composant Figma
[pr-Calendar sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24071-83911) - Ce composant est visuellement représenté par un calendrier avec trois variantes disponibles : Type=Day, Type=Month, Type=Year.

## Import

```typescript
import { CalendarComponent } from '@lucca-front/ng/forms';
// ou
import { CalendarDirective } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<element luCalendar>...</element>
```

## Directive / Composant : `luCalendar` ou `<lu-calendar>`

Description courte du sélecteur. Applicable sur les éléments HTML.

### Valeurs

| Valeur | Description              |
|--------|--------------------------|
| `""` (vide) | Variante par défaut (Day) |
| `"month"`   | Variante Month          |
| `"year"`    | Variante Year           |

```html
<element luCalendar="month">...</element>
```

## Inputs

### `type`
Type: `'day' | 'month' | 'year'` — Default: `'day'`

Le type de calendrier à afficher.

```html
<element luCalendar [type]="'month'">...</element>
```

## Patterns courants

### Sélection d'une date
```html
<!-- Permet à l'utilisateur de choisir une date spécifique -->
<element luCalendar [type]="'day'">...</element>
```

## Accessibilité
Assurez-vous que le calendrier est navigable au clavier et comprend des étiquettes accessibles pour tous les éléments interactifs.

## Guidelines Prisme
- Utiliser les variantes de calendrier de manière adéquate en fonction du contexte d'utilisation (jour, mois, année).
- Éviter d'encombrer le calendrier de fonctionnalités inutiles qui pourraient nuire à l'expérience utilisateur.
- Assurez-vous que les couleurs et contrastes respectent les normes d'accessibilité.