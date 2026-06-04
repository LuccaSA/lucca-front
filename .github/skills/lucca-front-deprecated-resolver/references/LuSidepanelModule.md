# LuSidepanelModule / LuSidepanel / sidepanel.model

## Contexte de dépréciation

Le système de sidepanel a été fusionné avec le système de modal. `LuSidepanel` est désormais un alias de `LuModal` avec un mode `'sidepanel'`. Les tokens et types du sidepanel sont des alias des tokens et types du modal.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuSidepanelModule` | `LuModalModule` (ou `provideLuModal()`) |
| `LuSidepanel` (service) | `LuModal` avec `modal.open(component, data, { mode: 'sidepanel' })` |
| `LU_SIDEPANEL_DATA` | `LU_MODAL_DATA` depuis `@lucca-front/ng/modal` |
| `ILuSidepanelRef` | `ILuModalRef` depuis `@lucca-front/ng/modal` |
| `ALuSidepanelRef` | `ALuModalRef` depuis `@lucca-front/ng/modal` |

## Migration TypeScript

### Avant

```ts
import { LuSidepanelModule, LuSidepanel, LU_SIDEPANEL_DATA, ILuSidepanelRef } from '@lucca-front/ng/sidepanel';

@NgModule({
  imports: [LuSidepanelModule],
})
class AppModule {}

@Injectable()
class MyService {
  constructor(private sidepanel: LuSidepanel) {}

  open() {
    this.sidepanel.open(MyComponent, { data: 'value' });
  }
}

@Component()
class MyComponent {
  data = inject(LU_SIDEPANEL_DATA);
  ref = inject<ILuSidepanelRef>(ILuSidepanelRef);
}
```

### Après

```ts
import { provideLuModal, LuModal, LU_MODAL_DATA, ILuModalRef } from '@lucca-front/ng/modal';

// providers: [provideLuModal()]

@Injectable()
class MyService {
  constructor(private modal: LuModal) {}

  open() {
    this.modal.open(MyComponent, { data: 'value' }, { mode: 'sidepanel' });
  }
}

@Component()
class MyComponent {
  data = inject(LU_MODAL_DATA);
  ref = inject<ILuModalRef>(ILuModalRef);
}
```

## Migration automatique

1. Remplacer `LuSidepanelModule` par `LuModalModule` dans les imports NgModule, ou `provideLuModal()` dans les providers d'un composant standalone.
2. Remplacer `LuSidepanel` par `LuModal` dans les injections.
3. Ajouter `{ mode: 'sidepanel' }` comme 3e argument des appels `modal.open(...)`.
4. Remplacer les imports de `LU_SIDEPANEL_DATA` par `LU_MODAL_DATA` depuis `@lucca-front/ng/modal`.
5. Remplacer les types `ILuSidepanelRef` par `ILuModalRef` et `ALuSidepanelRef` par `ALuModalRef`.

## Annotation à ajouter lors de la migration

```ts
/*
** IA lucca-front-deprecated-resolver
** try to migrate LuSidepanelModule
*/
```
