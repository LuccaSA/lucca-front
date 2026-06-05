# LuTooltipModule / LuTooltipTriggerModule

## Contexte de dépréciation

Ces NgModules sont des wrappers de compatibilité.

## Modules concernés

| Module déprécié | Remplacement |
|---|---|
| `LuTooltipModule` | `LuTooltipTriggerDirective, LuTooltipPanelComponent` |
| `LuTooltipTriggerModule` | `LuTooltipTriggerDirective` |

## Migration

```ts
// Avant
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
@NgModule({ imports: [LuTooltipModule] })

// Après
import { LuTooltipTriggerDirective, LuTooltipPanelComponent } from '@lucca-front/ng/tooltip';
@Component({ imports: [LuTooltipTriggerDirective, LuTooltipPanelComponent] })
```

## Migration automatique

Remplacer chaque module par ses équivalents standalone.
