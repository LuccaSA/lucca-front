`lu-multilanguage-input` expose deux validateurs dédiés pour piloter les erreurs métier liées aux traductions :

- `MultiLanguageInputValidators.allLanguagesRequired`
- `MultiLanguageInputValidators.invariantRequired`

Ils sont exportés depuis `@lucca-front/ng/forms`.

#### Principe général

Le composant manipule une valeur de type `MultilanguageTranslation[]` :

```ts
type MultilanguageTranslation = {
  cultureCode: string;
  value: string;
};
```

Les validateurs retournent des clés d’erreur standard Angular sur le `FormControl`, que vous pouvez ensuite afficher dans le `lu-form-field` parent ou dans votre template.

#### Valideur `allLanguagesRequired`

Ce valideur vérifie que **toutes** les lignes de traduction contiennent une valeur non vide.

- **Succès**: `null`
- **Erreur**: `{ missingLang: true }`

```ts
allLanguagesRequired(control) =>
  areAllLanguagesFilled(control.value) ? null : { missingLang: true };
```

À utiliser quand chaque langue de votre modèle est obligatoire.

#### Valideur `invariantRequired`

Ce valideur vérifie que la traduction `invariant` est renseignée.

- **Succès**: `null`
- **Erreur**: `{ missingInvariant: true }`

```ts
invariantRequired(control) =>
  isInvariantFilled(control.value) ? null : { missingInvariant: true };
```

À utiliser quand seule la valeur principale (invariante) est obligatoire.

#### Exemple (Reactive Forms)

```ts
import { FormControl } from '@angular/forms';
import { MultiLanguageInputValidators, MultilanguageTranslation } from '@lucca-front/ng/forms';

translationsControl = new FormControl<MultilanguageTranslation[]>(
  [
    { cultureCode: 'invariant', value: '' },
    { cultureCode: 'fr-FR', value: '' },
    { cultureCode: 'en-US', value: '' },
  ],
  {
    validators: [
      MultiLanguageInputValidators.invariantRequired,
      // MultiLanguageInputValidators.allLanguagesRequired,
    ],
  },
);
```

```html
<lu-form-field label="Libellé" [errorInlineMessage]="errorMessage">
  <lu-multilanguage-input [formControl]="translationsControl" />
</lu-form-field>
```

```ts
get errorMessage(): string {
  const errors = this.translationsControl.errors;
  if (!errors) return '';
  if (errors['missingInvariant']) return 'La valeur principale est obligatoire.';
  if (errors['missingLang']) return 'Toutes les traductions sont obligatoires.';
  return '';
}
```

#### Erreurs inline dans le popover

Indépendamment des validateurs ci-dessus, le composant affiche une erreur inline sur chaque langue du panneau quand :

- le champ est marqué `required` au niveau du `lu-form-field`/contrôle,
- et que la valeur de la langue est vide.

Le message utilisé est la traduction `requiredError` (par défaut : `La traduction est obligatoire` en français).

#### Cas particulier : invariant manquant dans la valeur

Lors de `writeValue`, si vous fournissez un tableau non vide sans entrée `cultureCode: 'invariant'`, le composant lève une erreur :

`Please provide an invariant translation in translation array`

Même avec `hasNoInvariant`, prévoyez donc une ligne `invariant` dans la valeur technique du contrôle.
