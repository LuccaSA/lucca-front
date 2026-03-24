# pr-Switch

## Quand utiliser ce composant
- Pour créer des cases à cocher qui sont plus visuelles et faciles à utiliser dans des formulaires.
- Lorsqu'il est nécessaire d'indiquer une action binaire à l'utilisateur (on/off).
- Pour remplacer des boutons radio ou des cases à cocher classiques lorsque l'on souhaite un design plus moderne et engageant.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-switchfield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-switchfield-angular--basic)

## Composant Figma
[Design du pr-Switch sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20183-78399) - Composant de type switch, déclenchant un état on/off visible, avec plusieurs variantes disponibles pour différentes tailles et états d'activation.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/forms';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { SwitchInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-form-field>
  <lu-checkbox-input [checked]="true"></lu-checkbox-input>
</lu-form-field>
```

## Directive / Composant : `lu-form-field`, `lu-checkbox-input` ou `lu-switch-input`

Containers pour les éléments de formulaire, applicables sur des éléments de type formulaire. 

### Valeurs

| Valeur     | Description                   |
|------------|-------------------------------|
| `size`     | Définit la taille du switch (S, M) |
| `checked`  | Indique si le switch est coché (true, false) |
| `state`    | Indique l'état du switch (Default, Disabled / Readonly, Hover, Focus, Active) |

```html
<lu-form-field>
  <lu-switch-input size="M" checked="true" state="Default"></lu-switch-input>
</lu-form-field>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définir la taille du switch.

```html
<lu-switch-input [size]="'S'">...</lu-switch-input>
```

### `checked`
Type: `boolean` — Default: `false`

Indique si le switch est activé.

```html
<lu-switch-input [checked]="true">...</lu-switch-input>
```

### `state`
Type: `'Default' | 'Disabled/Readonly' | 'Hover' | 'Focus' | 'Active'` — Default: `'Default'`

Définit l'état visuel du switch.

```html
<lu-switch-input [state]="'Disabled/Readonly'">...</lu-switch-input>
```

## Patterns courants

### Utilisation d'un pr-Switch
```html
<!-- Exemple d'un switch activé -->
<lu-form-field>
  <lu-switch-input size="M" checked="true" state="Focus"></lu-switch-input>
</lu-form-field>
```

## Accessibilité
Assurez-vous que chaque switch est associé à une étiquette explicite pour garantir une utilisation facile par tous les utilisateurs, y compris ceux utilisant des lecteurs d'écran.

## Guidelines Prisme
- Ne pas utiliser le switch pour des options qui peuvent être réglées avec une sélection simple.
- Éviter les contenus trop près d'un switch qui peuvent le rendre difficile à utiliser.
- Gardez vos labels clairs et courts pour assurer une bonne compréhension de l'état du switch.