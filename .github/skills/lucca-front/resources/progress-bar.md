# pr-ProgressBar

## Quand utiliser ce composant
- Pour indiquer visuellement la progression d'un processus (par exemple, un téléchargement).
- Pour afficher des états de succès ou d'erreur lors d'opérations spécifiques (comme la soumission d'un formulaire).
- Lorsqu'il est nécessaire de signaler qu'une opération est en cours sans connaître le temps nécessaire (état indéterminé).

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-loaders-progress-bar-angular-basic--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-loaders-progress-bar-angular-basic--basic)

## Composant Figma
[Liens Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=16861-21024) + Ce composant représente une barre de progression, affichant l'état actuel d'un processus. Variantes disponibles : State=Success, State=Error, State=Default.

## Import

```typescript
import { ProgressBarComponent } from '@lucca-front/ng/progress-bar';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-progress-bar></lu-progress-bar>
```

## Directive / Composant : `luProgressBar` ou `<lu-progress-bar>`

Directive pour afficher une barre de progression. Applicable sur les éléments `<lu-progress-bar>`.

### Valeurs

| Valeur       | Description                                 |
|--------------|---------------------------------------------|
| `""` (vide)  | Variante par défaut                          |
| `"success"`  | État de succès de la progression            |
| `"error"`    | État d'erreur de la progression             |

```html
<lu-progress-bar state="success"></lu-progress-bar>
```

## Inputs

### `state`
Type: `'success' | 'error' | ''` — Default: `''`

Indique l'état de la barre de progression.

```html
<lu-progress-bar [state]="'success'"></lu-progress-bar>
```

### `indeterminate`
Type: `boolean` — Default: `false`

Affiche un état de chargement sans information de progression.

```html
<lu-progress-bar [indeterminate]="true"></lu-progress-bar>
```

### `value`
Type: `number` — Default: `0`

Pourcentage de progression de 0 à 100.

```html
<lu-progress-bar [value]="50"></lu-progress-bar>
```

## Patterns courants

### Barre de progression avec état de succès
```html
<!-- Affiche une barre de progression indiquant le succès -->
<lu-progress-bar state="success" [value]="70"></lu-progress-bar>
```

## Accessibilité
S'assurer que les barres de progression sont correctement étiquetées avec `aria-valuenow`, `aria-valuemin`, et `aria-valuemax` pour garantir une bonne accessibilité.

## Guidelines Prisme
- Utiliser la barre de progression pour les actions longues et visibles.
- Éviter d'utiliser des barres de progression pour des actions impossibles à mesurer.
- Ne pas utiliser l'état indéterminé pour tout type de chargement sans explication visible de ce qui se passe.