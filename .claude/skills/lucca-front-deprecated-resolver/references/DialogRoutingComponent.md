# DialogRoutingComponent — defaultOnClosedFn générique déprécié

## Contexte de dépréciation

La surcharge générique `defaultOnClosedFn<C>()` de la fonction `defaultOnClosedFn` est dépréciée. La version non générique doit être utilisée.

## Élément déprécié

| Élément déprécié | Remplacement |
|---|---|
| `defaultOnClosedFn<C>()` (surcharge générique) | `defaultOnClosedFn()` (version non générique) |

## Migration

### Avant

```ts
import { defaultOnClosedFn } from '@lucca-front/ng/dialog';

// Utilisation avec paramètre de type générique
onClosed: defaultOnClosedFn<MyComponent>
```

### Après

```ts
import { defaultOnClosedFn } from '@lucca-front/ng/dialog';

// Sans paramètre de type
onClosed: defaultOnClosedFn
```

## Migration automatique

Supprimer les paramètres de type génériques `<...>` sur les appels à `defaultOnClosedFn`.
