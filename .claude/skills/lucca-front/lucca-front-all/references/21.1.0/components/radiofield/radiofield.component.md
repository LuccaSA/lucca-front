# radiofield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.0/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)

## Angular

Component selector : `lu-radio-group-input`

### Utilisation

Au sein de votre template, l'utilisation de l'input radio se fait via deux composants distincts:

- `lu-radio-group-input` qui gère le lien entre chaque radio et qui porte le `formControl`.
- `lu-radio` qui permet de lister les options.

Exemple:

Comme tous les `lu-***-input`, il est recommandé de les utiliser dans un `lu-form-field` même si vous n'avez pas de label à afficher, afin d'assurer une bonne accessibilité (le label est obligatoire mais vous pouvez le rendre caché pour que seules les technologies d'assistance puissent le voir).

#### lu-radio

Le composant `lu-radio` porte les valeurs, les options que vous souhaitez proposer.

Il vous permet d'assigner une valeur via `[value]` et le label affiché vient se placer au sein de la balise, en tant que contenu projeté. Si vous souhaitez ajouter un texte sous le label, vous pouvez le faire via `inlineMessage`, uniquement en `string`.

Il est également possible de désactiver une option via l'input `disabled` sur celle-ci.

| Example | File |
|---------|------|
| Field | [angular-field.md](./stories/angular-field.md) |

## HTML/CSS

| Example | File |
|---------|------|
| Field disabled | [html-field-disabled.md](./stories/html-field-disabled.md) |
| Field inline | [html-field-inline.md](./stories/html-field-inline.md) |
| Field invalid | [html-field-invalid.md](./stories/html-field-invalid.md) |
| Field size | [html-field-size.md](./stories/html-field-size.md) |
| Field | [html-field.md](./stories/html-field.md) |
