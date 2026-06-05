# LuInputModule / LuInputClearerModule / LuInputDisplayerModule / LuInputClearerComponent / LuInputDisplayerDirective

## Contexte de dépréciation

Ces NgModules et certains composants/directives sont dépréciés au profit de leurs équivalents standalone.

## Éléments dépréciés

| Élément déprécié | Remplacement |
|---|---|
| `LuInputModule` | `LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent` |
| `LuInputClearerModule` | `LuInputClearerComponent` |
| `LuInputDisplayerModule` | `LuInputDisplayerDirective` |
| `LuInputClearerComponent` (`lu-input-clearer`) | `ClearComponent` depuis `@lucca-front/ng/core-select` |
| `LuInputDisplayerDirective` (`[luDisplayer]`) | utilisation directe de `LuInputDisplayerDirective` standalone |

## Migration

### LuInputClearerComponent → ClearComponent

```html
<!-- Avant -->
<lu-input-clearer />

<!-- Après -->
<lu-clear />
```

```ts
// Avant
import { LuInputClearerModule } from '@lucca-front/ng/input';

// Après
import { ClearComponent } from '@lucca-front/ng/core-select';
```

### Modules NgModule → standalone

```ts
// Avant
import { LuInputModule } from '@lucca-front/ng/input';
@NgModule({ imports: [LuInputModule] })

// Après
import { LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent } from '@lucca-front/ng/input';
@Component({ imports: [LuInputDirective, LuInputDisplayerDirective, LuInputClearerComponent] })
```

## Migration automatique

1. Remplacer les NgModules par les imports standalone.
2. Remplacer `lu-input-clearer` par `lu-clear` si `ClearComponent` est disponible dans le contexte.
