# pr-TimePicker

## Quand utiliser ce composant
- Pour permettre la sélection d'une heure dans un formulaire.
- Lorsque vous avez besoin de valider une heure avant de l'envoyer au serveur.
- Pour afficher un champ d'entrée d'heure avec différentes options de personnalisation.

## Stories Storybook
[Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-time-time-picker-angular-form--docs)

## Composant Figma
[Visuel du pr-TimePicker](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=12773-20990) — Ce composant présente différentes variantes de taille, état, contenu, feedback et présentation.

## Import

```typescript
import { TimePickerComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-time-picker placeholder="Sélectionner une heure" ></lu-time-picker>
```

## Directive / Composant : `luTimePicker` ou `<lu-time-picker>`

Directive applicable sur les éléments de type input pour gérer la sélection d'une heure.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |

```html
<lu-time-picker size="S" state="FocusHours" content="Filled" feedback="None"></lu-time-picker>
```

## Inputs

### `placeholder`
Type: `string` — Default: `''`

Texte affiché lorsque le champ est vide.

```html
<lu-time-picker [placeholder]="'Sélectionnez une heure'"></lu-time-picker>
```

### `disabled`
Type: `boolean` — Default: `false`

Indique si le composant est désactivé.

```html
<lu-time-picker [disabled]="true"></lu-time-picker>
```

### `readonly`
Type: `boolean` — Default: `false`

Indique si le champ est en lecture seule.

```html
<lu-time-picker [readonly]="true"></lu-time-picker>
```

## Patterns courants

### Sélection d'heure avec état d'erreur
```html
<lu-time-picker size="M" state="Hover" content="Empty" feedback="Critical"></lu-time-picker>
```

## Accessibilité
Utilisez des attributs `aria` appropriés pour indiquer l'état et la valeur actuelle du sélecteur horaire.

## Guidelines Prisme
Respectez les principes de design de Lucca lors de l'utilisation de ce composant pour garantir une expérience utilisateur cohérente. Évitez les modifications non autorisées des styles et comportements.