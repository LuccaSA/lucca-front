# Radio input

# Utilisation

Au sein de votre template, l'utilisation de l'input radio se fait via deux composants distincts:

- `lu-radio-group-input` qui gère le lien entre chaque radio et qui porte le `formControl`.
- `lu-radio` qui permet de lister les options.

Exemple:

```angular2html

<lu-radio-group-input required [(ngModel)]="example">
  <lu-radio [value]="1" inlineMessage="Option text">Option A</lu-radio>
  <lu-radio [value]="2" inlineMessage="Option text">Option B</lu-radio>
  <lu-radio [value]="3" inlineMessage="Option text" disabled>
    Option C
  </lu-radio>
</lu-radio-group-input>
```

Comme tous les `lu-***-input`, il est recommandé de les utiliser dans un `lu-form-field` même si vous n'avez pas de label à afficher, afin d'assurer une bonne accessibilité (le label est obligatoire mais vous pouvez le rendre caché pour que seules les technologies d'assistance puissent le voir).

## lu-radio

Le composant `lu-radio` porte les valeurs, les options que vous souhaitez proposer.

Il vous permet d'assigner une valeur via `[value]` et le label affiché vient se placer au sein de la balise, en tant que contenu projeté. Si vous souhaitez ajouter un texte sous le label, vous pouvez le faire via `inlineMessage`, uniquement en `string`.

Il est également possible de désactiver une option via l'input `disabled` sur celle-ci.
