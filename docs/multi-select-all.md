### Mise en place

#### Cas `establishments` / `job-qualifications` / `users` / `apiV4` / `apiV3`

Il suffit d'importer `LuMultiSelectWithSelectAllDirective` et d'ajouter `withSelectAll` et `withSelectAllDisplayerLabel` sur la balise `lu-multi-select`.

```ts
import { LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';

@Component({
  imports: [LuMultiSelectWithSelectAllDirective],
})
class MyComponent {}
```

```html
<lu-multi-select users withSelectAll [withSelectAllDisplayerLabel]="'POTATOES' | transloco" />
```

#### Cas des selects custom

Pour avoir un affichage plus parlant pour l'utilisateur, le multi-select doit connaître son nombre d'options. En plus du cas standard vu ci-dessus, il faut ajouter la directive `LuCoreSelectTotalCountDirective`.

```ts
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { LuMultiSelectWithSelectAllDirective } from '@lucca-front/ng/multi-select';

@Component({
  imports: [LuCoreSelectTotalCountDirective, LuMultiSelectWithSelectAllDirective],
})
class MyComponent {}
```

```html
<lu-multi-select withSelectAll [withSelectAllDisplayerLabel]="'POTATOES' | transloco" [totalCount]="123" />
```

### Implications

L'utilisation de `withSelectAll` apporte un certain nombre de changements :

- l'utilisation de `*luMultiDisplayer` n'est plus possible
- l'utilisation de `*luDisplayer` ne sert qu'à afficher une option si c'est la seule sélectionnée
- un label doit être passé à `withSelectAllDisplayerLabel` pour afficher le texte `[3] <votre label ici>` si 3 options sont sélectionnées
- le type de sortie n'est plus un tableau des objets sélectionnés mais une `LuMultiSelection` :

  <!-- prettier-ignore -->
  ```ts
  export type LuMultiSelection<T> =
    | { mode: 'include'; values: T[] }
    | { mode: 'exclude'; values: T[] }
    | { mode: 'none' }
    | { mode: 'all' };

  export type LuMultiSelectionMode = 'include' | 'exclude' | 'none' | 'all';
  ```

### Exemples

#### Dans une barre de filtres

On pourra utiliser la fonction `selectionToQueryParams` qui permet de créer un objet utilisable en query params à partir d'une `LuMultiSelection`.

Son fonctionnement est le suivant (si appelé avec `selectionToQueryParams('ownerId', selection, (user) => user.id)`) :

| `LuMultiSelection`                                    | `queryParams`           |
| ----------------------------------------------------- | ----------------------- |
| `{ mode: 'none' }`                                    | `{}`                    |
| `{ mode: 'all' }`                                     | `{}`                    |
| `{ mode: 'include', values: [{ id: 1 }, { id: 2 }] }` | `{ ownerId: '1,2' }`    |
| `{ mode: 'exclude', values: [{ id: 3 }, { id: 4 }] }` | `{ '-ownerId': '3,4' }` |

```ts
import { LuMultiSelection, selectionToQueryParams } from '@lucca-front/ng/multi-select';

@Component()
class ExpenseListComponent {
  ownerSelection = new FormControl<LuMultiSelection<User>>({ mode: 'none' });

  expenses = ownerSelection.valueChanges.pipe(
    map((selection) => selectionToQueryParams('ownerId', selection, (user) => user.id)),
    switchMap((params) => this.expenseService.getExpenses(params)),
  );
}
```

:warning: Il est nécessaire que l'API cible accepte un `ApiFilter` en paramètre pour que le filtre sur `ownerId` cela fonctionne.

#### Dans un formulaire avec sauvegarde des données

Dans ce cas, il faut voir avec le backend pour que en payload, les valeurs soient envoyées sous forme de Selection et pas sous forme de tableau.
