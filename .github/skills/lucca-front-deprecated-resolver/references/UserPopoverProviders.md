# UserPopoverProviders — dépréciés

## Contexte de dépréciation

Les tokens et fonctions liés à l'activation du user popover sont dépréciés car le popover est désormais toujours actif et utilise `luPopover2`.

## Éléments dépréciés

| Élément déprécié | Action |
|---|---|
| `USER_POPOVER_IS_ACTIVATED` (InjectionToken) | Supprimer — plus nécessaire |
| `provideLuUserPopover()` | Supprimer — plus nécessaire |

## Migration

### Avant

```ts
import { USER_POPOVER_IS_ACTIVATED, provideLuUserPopover } from '@lucca-front/ng/user-popover';

providers: [
  provideLuUserPopover(),
  { provide: USER_POPOVER_IS_ACTIVATED, useValue: of(true) },
]
```

### Après

```ts
// Supprimer simplement ces providers — ils ne sont plus nécessaires.
```

## Migration automatique

1. Supprimer tous les appels à `provideLuUserPopover()` des tableaux `providers`.
2. Supprimer tous les tokens `USER_POPOVER_IS_ACTIVATED` et leurs providers.
3. Supprimer les imports correspondants.
