# LuApiModule / LuApiSelectModule / LuApiSelectInputModule / LuApiSearcherModule

## Contexte de dépréciation

Ces NgModules sont des wrappers autour de composants standalone. Ils ont été conservés pour la compatibilité mais sont désormais inutiles.

## Modules concernés

| Module déprécié | Remplacement direct |
|---|---|
| `LuApiModule` | imports directs des composants standalone |
| `LuApiSelectModule` | imports directs des composants standalone |
| `LuApiSelectInputModule` | `LuApiSelectInputComponent` |
| `LuApiSearcherModule` | `LuApiPagedSearcherComponent, LuApiSearcherComponent` |

## Migration

### Avant

```ts
import { LuApiModule } from '@lucca-front/ng/api';

@NgModule({
  imports: [LuApiModule],
})
```

### Après

```ts
import {
  LuApiFeederComponent,
  LuApiPagedSearcherComponent,
  LuApiSearcherComponent,
  LuApiPagerComponent,
  LuApiSelectInputComponent,
} from '@lucca-front/ng/api';

// Dans un composant standalone :
@Component({
  imports: [
    LuApiFeederComponent,
    LuApiPagedSearcherComponent,
    LuApiSearcherComponent,
    LuApiPagerComponent,
    LuApiSelectInputComponent,
  ],
})
```

## Migration automatique

- Remplacer `LuApiModule` dans les imports par la liste des composants standalone.
- Remplacer `LuApiSelectModule` par `LuApiFeederComponent, LuApiPagedSearcherComponent, LuApiSearcherComponent, LuApiPagerComponent, LuApiSelectInputComponent`.
- Remplacer `LuApiSelectInputModule` par `LuApiSelectInputComponent`.
- Remplacer `LuApiSearcherModule` par `LuApiPagedSearcherComponent, LuApiSearcherComponent`.
- Supprimer les imports depuis `@lucca-front/ng/api` qui correspondent aux modules dépréciés et les remplacer par les composants correspondants.
