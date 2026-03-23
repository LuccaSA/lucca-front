# pr-Textarea

## Quand utiliser ce composant
1. Utiliser ce composant pour permettre à l'utilisateur de saisir des commentaires longs dans un formulaire.
2. Lorsque vous avez besoin d'un champ de saisie flexible qui peut s'ajuster automatiquement à la quantité de texte saisie.
3. Pour des formulaires nécessitant une validation visuelle avec un état de succès, d'avertissement ou d'erreur.

## Stories Storybook
- [Documentation complète](https://lucca-front.lucca.io/storybook/?path=/docs/documentation-forms-fields-textareafield-angular--docs)
- [Basic](https://lucca-front.lucca.io/storybook/?path=/story/documentation-forms-fields-textareafield-angular--basic)

## Composant Figma
[https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8718-45752](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP?node-id=8718-45752) - Zone de texte avec plusieurs variantes de taille et état, permettant des contenus variés comme le feedback utilisateur.

## Import

```typescript
import { TextareaInputComponent } from '@lucca-front/ng/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
```

## Usage de base

```html
<!-- Usage minimal -->
<lu-textarea label="Votre commentaire" placeholder="Saisissez ici..."></lu-textarea>
```

## Directive / Composant : `luTextarea` ou `<lu-textarea>`

Utilisé pour créer une zone de texte flexible pour la saisie d'informations.

### Valeurs

| Valeur | Description |
|--------|-------------|
| `""` (vide) | Variante par défaut |
| `"M"` | Taille moyenne |
| `"S"` | Taille petite |
| `"XS"` | Taille très petite (dépréciée) |

```html
<lu-textarea size="M">...</lu-textarea>
```

## Inputs

### `label`
Type: `string` — Default: `''`

Texte affiché comme étiquette pour le champ.

```html
<lu-textarea [label]="'Votre message'"></lu-textarea>
```

### `required`
Type: `boolean` — Default: `false`

Indique si le champ est obligatoire.

```html
<lu-textarea [required]="true"></lu-textarea>
```

### `tooltip`
Type: `string` — Default: `''`

Affiche une info-bulle liée au champ.

```html
<lu-textarea [tooltip]="'Informations supplémentaires'"></lu-textarea>
```

### `disabled`
Type: `boolean` — Default: `false`

Désactive le champ.

```html
<lu-textarea [disabled]="true"></lu-textarea>
```

### `placeholder`
Type: `string` — Default: `''`

Texte à afficher lorsque le champ est vide.

```html
<lu-textarea [placeholder]="'Entrez votre texte ici...'"></lu-textarea>
```

### `size`
Type: `'M' | 'S' | 'XS'` — Default: `'M'`

Modifie la taille du champ.

```html
<lu-textarea [size]="'S'"></lu-textarea>
```

### `inlineMessage`
Type: `string` — Default: `''`

Texte descriptif affiché sous le champ.

```html
<lu-textarea [inlineMessage]="'Message d'erreur'"></lu-textarea>
```

### `inlineMessageState`
Type: `'default' | 'success' | 'warning' | 'error'` — Default: `'default'`

État du message d'indication.

```html
<lu-textarea [inlineMessageState]="'error'"></lu-textarea>
```

### `rows`
Type: `number` — Default: `3`

Nombre de lignes visibles par défaut.

```html
<lu-textarea [rows]="5"></lu-textarea>
```

### `autoResize`
Type: `boolean` — Default: `false`

Active l'ajustement automatique de la taille du champ.

```html
<lu-textarea [autoResize]="true"></lu-textarea>
```

## Patterns courants

### Exemple de champ de texte
```html
<!-- Exemple d'un champ de zone de texte avec label, placeholder et message d'aide -->
<lu-textarea label="Description" placeholder="Décrivez votre idée" [inlineMessage]="'Champ obligatoire'" [required]="true"></lu-textarea>
```

## Accessibilité
Assurez-vous que toutes les étiquettes sont associées aux champs afin de garantir une bonne compréhension pour les utilisateurs d'assistants vocaux.

## Guidelines Prisme
- Utiliser des labels clairs et descriptifs.
- Éviter de désactiver les champs sans raison valable, surtout pour les formulaires.
- Toujours fournir des messages d'état pour la validation des données.