# radiofield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.0.1/storybook/?path=/docs/documentation-forms-fields-radiofield-angular--docs)

## Angular

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
| Radiofield | [angular-radiofield.md](./stories/angular-radiofield.md) |

## HTML/CSS

| Example | File |
|---------|------|
| Disabled | [html-disabled.md](./stories/html-disabled.md) |
| Inline | [html-inline.md](./stories/html-inline.md) |
| Invalid | [html-invalid.md](./stories/html-invalid.md) |
| Size | [html-size.md](./stories/html-size.md) |
| Radiofield | [html-radiofield.md](./stories/html-radiofield.md) |
