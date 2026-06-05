# SimpleSelect API aliases dépréciés

## Contexte de dépréciation

Les exports `LuSimpleSelectApiV4Directive` et `ALuSimpleSelectApiDirective` depuis `@lucca-front/ng/simple-select` sont des aliases dépréciés des exports du package `@lucca-front/ng/core-select`.

## Éléments dépréciés

| Élément déprécié | Package source | Remplacement |
|---|---|---|
| `LuSimpleSelectApiV4Directive` | `@lucca-front/ng/simple-select` | `LuCoreSelectApiV4Directive` depuis `@lucca-front/ng/core-select/api` |
| `ALuSimpleSelectApiDirective` | `@lucca-front/ng/simple-select` | `ALuCoreSelectApiDirective` depuis `@lucca-front/ng/core-select/api` |

## Migration

### Avant

```ts
import { LuSimpleSelectApiV4Directive } from '@lucca-front/ng/simple-select';
import { ALuSimpleSelectApiDirective } from '@lucca-front/ng/simple-select';
```

### Après

```ts
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { ALuCoreSelectApiDirective } from '@lucca-front/ng/core-select/api';
```

## Migration automatique

Remplacer les imports et renommer les références :
- `LuSimpleSelectApiV4Directive` → `LuCoreSelectApiV4Directive` (changer aussi l'import)
- `ALuSimpleSelectApiDirective` → `ALuCoreSelectApiDirective` (changer aussi l'import)
