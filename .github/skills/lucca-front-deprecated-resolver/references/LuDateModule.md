# LuDateModule / LuDatePickerModule / LuDateSelectInputModule / LuDateAdapterModule

## Contexte de dépréciation

Ces NgModules sont des wrappers de compatibilité autour de composants/pipes/directives standalone.

## Modules concernés

| Module déprécié | Remplacement direct |
|---|---|
| `LuDateModule` | `LuCalendarInputComponent, LuDatePickerComponent, LuDateInputDirective, LuDateAdapterPipe, LuDateSelectInputComponent` |
| `LuDatePickerModule` | `LuDatePickerComponent` |
| `LuDateSelectInputModule` | `LuDateSelectInputComponent` |
| `LuDateAdapterModule` | `LuDateAdapterPipe` |

## Migration

### Avant

```ts
import { LuDateModule } from '@lucca-front/ng/date';

@NgModule({
  imports: [LuDateModule],
})
```

### Après

```ts
import {
  LuCalendarInputComponent,
  LuDatePickerComponent,
  LuDateInputDirective,
  LuDateAdapterPipe,
  LuDateSelectInputComponent,
} from '@lucca-front/ng/date';

@Component({
  imports: [
    LuCalendarInputComponent,
    LuDatePickerComponent,
    LuDateInputDirective,
    LuDateAdapterPipe,
    LuDateSelectInputComponent,
  ],
})
```

## Migration automatique

Remplacer chaque module par ses équivalents standalone listés dans le tableau ci-dessus.
