# Calendar

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de sélectionner une date précise dans un formulaire.
- Lorsqu'il est nécessaire d'afficher un calendrier pour choisir un intervalle de dates.
- Pour proposer une vue mensuelle ou hebdomadaire dans une application de gestion de tâches.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date-calendar--docs)

## Composant Figma
[Voir le composant Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24071-83911) + Le composant représente un calendrier interactif permettant de choisir des dates avec trois variantes principales : Type=Day, Type=Month, Type=Year.

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

Sélecteur permettant d'intégrer le composant calendrier sur des éléments HTML.

### Valeurs

| Valeur       | Description                              |
|--------------|------------------------------------------|
| `""` (vide)  | Variante par défaut                      |
| `"day"`      | Affiche le calendrier en type jour      |
| `"month"`    | Affiche le calendrier en type mois      |
| `"year"`     | Affiche le calendrier en type année     |

```html
<element luCalendar="day">...</element>
```

## Inputs

### `type`
Type: `'day' | 'month' | 'year'` — Default: `'day'`

Sélectionne le type d'affichage du calendrier.

```html
<element luCalendar [type]="'month'">...</element>
```

## Patterns courants

### Sélection d'une date
```html
<!-- Calendrier pour sélectionner une date précise -->
<element luCalendar [type]="'day">...</element>
```

## Accessibilité
S'assurer que le calendrier utilise des labels accessibles et que les interactions par clavier sont gérées pour une navigation fluide.

## Guidelines Prisme
- Utiliser le composant calendrier pour une meilleure interaction avec les utilisateurs lorsqu'ils choisissent des dates.
- Éviter d'encombrer l'interface utilisateur avec des éléments inutiles autour du calendrier.
- Ne pas oublier de tester l'accessibilité pour tous les utilisateurs.