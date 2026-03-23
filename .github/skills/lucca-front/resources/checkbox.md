# pr-CheckboxFieldset

## Quand utiliser ce composant
- Lorsque vous avez besoin de grouper des options de sélection sous forme de cases à cocher.
- Pour la création de filtres sur une liste d’éléments où plusieurs éléments peuvent être sélectionnés.
- Pour permettre à l'utilisateur de faire des choix multiples de manière claire et organisée.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-checkbox-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-filterspills-checkbox-angular--basic)

## Composant Figma
[Voir le design Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20185-80450) - Le composant pr-CheckboxFieldset permet divers styles de présentation avec plusieurs variantes disponibles comme Type, Size, et Feedback.

## Import

```typescript
import { CheckboxFieldsetComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<pr-checkbox-fieldset label="Options disponibles" name="options">
  <lu-checkbox-input [(ngModel)]="option1" label="Option 1"></lu-checkbox-input>
  <lu-checkbox-input [(ngModel)]="option2" label="Option 2"></lu-checkbox-input>
</pr-checkbox-fieldset>
```

## Directive / Composant : `pr-checkbox-fieldset` ou `<pr-checkbox-fieldset>`

Composant utilisé pour grouper des cases à cocher. Applicable à tout élément HTML qui nécessite un groupement d'options.

### Valeurs (si applicable)

| Valeur    | Description                              |
|-----------|------------------------------------------|
| `default` | Variante par défaut                      |
| `checklist` | Variante d'affichage de checklist      |

```html
<pr-checkbox-fieldset type="checklist">...</pr-checkbox-fieldset>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Libellé du groupe de cases à cocher.

```html
<pr-checkbox-fieldset [label]="'Inclure les collaborateurs partis'" name="includeFormerEmployees">...</pr-checkbox-fieldset>
```

### `name`
Type: `string` — Default: `''`

Nom du groupe de cases à cocher pour faciliter la gestion des valeurs.

```html
<pr-checkbox-fieldset label="Options" [name]="'options'">...</pr-checkbox-fieldset>
```

## Patterns courants

### Groupement de cases à cocher
```html
<pr-checkbox-fieldset label="Choisissez vos préférences" name="preferences">
  <lu-checkbox-input [(ngModel)]="preference1" label="Préférence 1"></lu-checkbox-input>
  <lu-checkbox-input [(ngModel)]="preference2" label="Préférence 2"></lu-checkbox-input>
</pr-checkbox-fieldset>
```

## Accessibilité
Assurez-vous que chaque case à cocher ait un label descriptif associé pour améliorer l'accessibilité. Utilisez le champ "name" pour grouper les cases correctement.

## Guidelines Prisme
- **Dos** : Utiliser des labels clairs et concis pour chaque case à cocher.
- **Don'ts** : Ne pas superposer les cases à cocher ou les rendre difficiles à accéder.