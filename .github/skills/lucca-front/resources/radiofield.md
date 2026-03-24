# pr-Radio

## Quand utiliser ce composant
- Pour créer des groupes d'options où l'utilisateur peut sélectionner une seule option parmi plusieurs.
- Lorsque vous devez afficher des choix d'options avec un état visuel clair (coché/décoché).
- Dans les formulaires lorsque le choix d'une seule option parmi plusieurs est requis.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-radiofield-angular--basic)

## Composant Figma
[Visuel du composant pr-Radio sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=20115-1619) - Variantes disponibles : Size (S, M), Checked (True, False), State (Active, Default, Hover, Focus, Disable), Error (True, False).

## Import

```typescript
import { RadioComponent } from '@lucca-front/ng/forms';
// ou
import { RadioGroupInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-radioGroupInput>
  <lu-radio [checked]="true" [size]="'S'">Option 1</lu-radio>
  <lu-radio [checked]="false" [size]="'M'">Option 2</lu-radio>
</lu-radioGroupInput>
```

## Directive / Composant : `lu-radio` ou `<lu-radio>`

Composant utilisé pour chaque option d'un groupe de boutons radios. Applicable sur des éléments conteneurs.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"size"` | Définit la taille du radio (S ou M) |
| `"checked"` | État du radio (true ou false) |
| `"state"` | État visuel du radio (active, default, hover, focus, disable) |
| `"error"` | Indicateur d'erreur (true ou false) |

```html
<lu-radio [size]="'M'" [checked]="true" [state]="'active'" [error]="false">Option</lu-radio>
```

## Inputs

### `size`
Type: `'S' | 'M'` — Default: `'M'`

Définit la taille du bouton radio.

```html
<lu-radio [size]="'S'">Option</lu-radio>
```

### `checked`
Type: `boolean` — Default: `false`

Indique si le radio est sélectionné ou non.

```html
<lu-radio [checked]="true">Option sélectionnée</lu-radio>
```

### `state`
Type: `'active' | 'default' | 'hover' | 'focus' | 'disable'` — Default: `'default'`

Définit l'état visuel du radio.

```html
<lu-radio [state]="'hover'">Option</lu-radio>
```

### `error`
Type: `boolean` — Default: `false`

Indique si le radio est dans un état d'erreur.

```html
<lu-radio [error]="true">Option avec erreur</lu-radio>
```

## Patterns courants

### Groupe de boutons radio
```html
<lu-radioGroupInput>
  <lu-radio [checked]="true">Option 1</lu-radio>
  <lu-radio [checked]="false">Option 2</lu-radio>
</lu-radioGroupInput>
```

## Accessibilité
S'assurer que chaque bouton radio a une étiquette associé pour que les utilisateurs de lecteurs d'écran puissent comprendre le choix d'options.

## Guidelines Prisme
- Utiliser des couleurs et des états conformes aux directives de design systématique.
- Éviter de désactiver les boutons radio sauf si intégré dans un état logique (par exemple, désactiver tous les choix lorsque nécessaire).