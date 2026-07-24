# multilanguagefield — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.3.1/storybook/?path=/docs/documentation-forms-fields-multilanguagefield-angular--docs)

## Angular

Component selector : `lu-multilanguage-input`

### Paramétrage des langues

Pour qu'une locale apparaisse dans le panneau du composant, elles doivent être initialisées à vide dans le `ngModel`. Exemple : 

### Validateurs

`lu-multilanguage-input` expose deux validateurs dédiés pour piloter les erreurs métier liées aux traductions :

- `MultiLanguageInputValidators.allLanguagesRequired`
- `MultiLanguageInputValidators.invariantRequired`

Ils sont exportés depuis `@lucca-front/ng/forms`.

#### Principe général

Le composant manipule une valeur de type `MultilanguageTranslation[]` :

Les validateurs retournent des clés d’erreur standard Angular sur le `FormControl`, que vous pouvez ensuite afficher dans le `lu-form-field` parent ou dans votre template.

#### Valideur `allLanguagesRequired`

Ce valideur vérifie que **toutes** les lignes de traduction contiennent une valeur non vide.

- **Succès**: `null`
- **Erreur**: `{ missingLang: true }`

À utiliser quand chaque langue de votre modèle est obligatoire.

#### Valideur `invariantRequired`

Ce valideur vérifie que la traduction `invariant` est renseignée.

- **Succès**: `null`
- **Erreur**: `{ missingInvariant: true }`

À utiliser quand seule la valeur principale (invariante) est obligatoire.

#### Exemple (Reactive Forms)

#### Erreurs inline dans le popover

Indépendamment des validateurs ci-dessus, le composant affiche une erreur inline sur chaque langue du panneau quand :

- le champ est marqué `required` au niveau du `lu-form-field`/contrôle,
- et que la valeur de la langue est vide.

Le message utilisé est la traduction `requiredError` (par défaut : `La traduction est obligatoire` en français).

#### Cas particulier : invariant manquant dans la valeur

Lors de `writeValue`, si vous fournissez un tableau non vide sans entrée `cultureCode: 'invariant'`, le composant lève une erreur :

`Please provide an invariant translation in translation array`

Même avec `hasNoInvariant`, prévoyez donc une ligne `invariant` dans la valeur technique du contrôle.

| Example | File |
|---------|------|
| Field | [angular-field.md](./stories/angular-field.md) |
