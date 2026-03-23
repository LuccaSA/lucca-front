# pr-Calendar

## Quand utiliser ce composant
- Pour permettre à l'utilisateur de sélectionner une date précise dans un formulaire.
- Pour afficher un calendrier mensuel, permettant une navigation facile entre les mois.
- Pour permettre une vue annuelle afin de voir rapidement les dates importantes sur une période plus longue.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-date-calendar--docs)

## Composant Figma
[Lien Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=24071-83911) - Le composant pr-Calendar présente une interface utilisateur pour la sélection de dates, avec les variantes disponibles : Type=Day, Type=Month, Type=Year.

## Import

```typescript
import { CalendarComponent } from '@lucca-front/ng/form';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-calendar></lu-calendar>
```

## Directive / Composant : `lu-calendar` ou `<lu-calendar>`

Le sélecteur `lu-calendar` est utilisé pour afficher un composant de calendrier, applicable sur des éléments spécifiques pour la gestion des dates.

### Valeurs

| Valeur     | Description                      |
|------------|----------------------------------|
| `Day`      | Affiche le calendrier par jour.  |
| `Month`    | Affiche le calendrier par mois.  |
| `Year`     | Affiche le calendrier par année. |

```html
<lu-calendar type="Day"></lu-calendar>
```

## Inputs

### `type`
Type: `'Day' | 'Month' | 'Year'` — Default: `'Day'`

Définit le type d'affichage du calendrier.

```html
<lu-calendar [type]="'Month'"></lu-calendar>
```

### `selectedDate`
Type: `Date` — Default: `null`

Permet de sélectionner une date par défaut dans le calendrier.

```html
<lu-calendar [selectedDate]="myDate"></lu-calendar>
```

## Patterns courants

### Sélection d'une date
```html
<!-- Permet à l'utilisateur de sélectionner une date à partir d'un calendrier -->
<lu-calendar type="Day" [selectedDate]="new Date()"></lu-calendar>
```

## Accessibilité
Assurez-vous que toutes les interactions avec le calendrier soient accessibles via le clavier, et que les annonces ARIA appropriées soient utilisées pour les changements de sélection de date.

## Guidelines Prisme
- Évitez de surcharger le calendrier avec trop d’informations.
- Toujours fournir des descriptions claires pour les éléments interactifs autour du calendrier afin d'assurer une bonne expérience utilisateur.