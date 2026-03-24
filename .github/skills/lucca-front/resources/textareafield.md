# pr-Textarea

## Quand utiliser ce composant
- Pour créer des champs de texte multi-lignes dans des formulaires.
- Pour recueillir des commentaires ou des descriptions longs d'utilisateurs.
- Lorsque vous avez besoin d'un contrôle de saisie de texte avec des fonctionnalités de feedback utilisateur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-textareafield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textareafield-angular--basic)

## Composant Figma
[Vue du composant sur Figma](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8718-45752) - Composant pr-Textarea avec différentes variantes selon la taille, l'état, le contenu et le feedback.

## Import

```typescript
import { FormFieldComponent } from '@lucca-front/ng/forms';
import { TextareaInputComponent } from '@lucca-front/ng/forms';
```

## Usage de base

```html
<lu-form-field>
  <lu-textarea-input></lu-textarea-input>
</lu-form-field>
```

## Directive / Composant : `lu-textarea-input` ou `<lu-textarea-input>`

Composant de saisie de texte multi-lignes. Applicable sur les éléments HTML pour la gestion de texte.

### Valeurs

| Valeur                           | Description                       |
|----------------------------------|-----------------------------------|
| `""` (vide)                      | Variante par défaut              |
| `"XS"`                           | Variante petite (depréciée)      |
| `"Default"`                      | État par défaut                   |
| `"Hover"`                        | État au survol                   |
| `"Focus"`                        | État au focus                     |
| `"Disabled"`                     | État désactivé/lecture seule     |

```html
<lu-textarea-input size="Default" state="Hover" content="Votre texte ici"></lu-textarea-input>
```

## Inputs

### `size`
Type: `'XS' | 'S' | 'M'` — Default: `'S'`

Définit la taille du champ de texte.

```html
<lu-textarea-input [size]="'M'"></lu-textarea-input>
```

### `state`
Type: `'Default' | 'Hover' | 'Focus' | 'Disabled'` — Default: `'Default'`

Définit l'état du champ de texte.

```html
<lu-textarea-input [state]="'Focus'"></lu-textarea-input>
```

### `content`
Type: `'Filled' | 'Empty' | '💀 Placeholder'` — Default: `'Filled'`

Pour définir le contenu initial du champ de texte.

```html
<lu-textarea-input [content]="'💀 Placeholder'"></lu-textarea-input>
```

### `feedback`
Type: `'None' | 'Critical' | 'Warning' | 'Success'` — Default: `'None'`

Définit le retour d'information utilisateur sur le champ de texte.

```html
<lu-textarea-input [feedback]="'Success'"></lu-textarea-input>
```

### `presentation`
Type: `boolean` — Default: `false`

Indique si le champ doit être présenté d'une certaine manière.

```html
<lu-textarea-input [presentation]="true"></lu-textarea-input>
```

## Patterns courants

### Champ de texte avec placeholder
```html
<lu-form-field>
  <lu-textarea-input size="S" state="Default" content="💀 Placeholder" feedback="Warning"></lu-textarea-input>
</lu-form-field>
```

## Accessibilité
Utilisez les attributs ARIA appropriés pour améliorer l'accessibilité, comme `aria-label` pour étiqueter les champs de saisie.

## Guidelines Prisme
Suivez les principes de design selon Lucca pour garantir une cohérence visuelle et une bonne expérience utilisateur.