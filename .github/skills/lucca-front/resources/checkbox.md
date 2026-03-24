# pr-CheckboxFieldset

## Quand utiliser ce composant
- Lorsque vous avez besoin d'un groupe de cases à cocher (checkbox) pour des choix multiples.
- Pour afficher des options configurables dans différents formats, tels que horizontal ou vertical.
- Pour fournir des retours visuels basés sur l'interaction utilisateur, par exemple en utilisant un feedback critique.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-checkbox-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-checkbox-angular--basic)

## Composant Figma
[Visuel Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20185-80450) — Le pr-CheckboxFieldset est présenté avec plusieurs variantes incluant différentes tailles et alignements. 

## Import

```typescript
import { CheckboxFieldsetComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-checkbox-fieldset>...</lu-checkbox-fieldset>
```

## Directive / Composant : `lu-checkbox-fieldset` ou `<lu-checkbox-fieldset>`

Ce sélecteur représente un ensemble de cases à cocher qui peut être utilisé dans les formulaires.

### Valeurs (si directive avec valeurs)

| Valeur      | Description                             |
|-------------|-----------------------------------------|
| `""` (vide) | Variante par défaut                     |
| `"Checklist"` | Variante pour des options checklist  |
| `"S"`       | Taille petite                           |
| `"M"`       | Taille moyenne                          |
| `"Vertical"`| Alignement vertical                     |
| `"Horizontal"`| Alignement horizontal                 |
| `"Critical"`| Feedback critique                       |
| `"Default"` | Feedback par défaut                     |

```html
<lu-checkbox-fieldset type="Checklist" size="M" alignment="Horizontal" feedback="Critical">...</lu-checkbox-fieldset>
```

## Inputs

### `type`
Type: `'Default' | 'Checklist'` — Default: `'Default'`

Définit le type de case à cocher.

```html
<lu-checkbox-fieldset [type]="'Checklist'">...</lu-checkbox-fieldset>
```

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du champ de cases à cocher.

```html
<lu-checkbox-fieldset [size]="'S'">...</lu-checkbox-fieldset>
```

### `alignment`
Type: `'Vertical' | 'Horizontal'` — Default: `'Vertical'`

Définit l'alignement des cases à cocher.

```html
<lu-checkbox-fieldset [alignment]="'Horizontal'">...</lu-checkbox-fieldset>
```

### `feedback`
Type: `'Critical' | 'Default'` — Default: `'Default'`

Définit le type de retour visuel à afficher.

```html
<lu-checkbox-fieldset [feedback]="'Critical'">...</lu-checkbox-fieldset>
```

## Patterns courants

### Groupe de choix multiples
```html
<lu-checkbox-fieldset [type]="'Checklist'" [alignment]="'Vertical'">...</lu-checkbox-fieldset>
```

## Accessibilité
Veillez à fournir des labels clairs pour chaque option de case à cocher afin d'assurer une bonne compréhension et utilisation pour les utilisateurs de technologies d'assistance.

## Guidelines Prisme
- Évitez de surcharger le composant avec trop d'options, optez pour une présentation claire.
- Utilisez le feedback critique pour signaler des erreurs ou des choix incorrects aux utilisateurs.