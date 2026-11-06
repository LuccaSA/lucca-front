# LuTooltipModule / LuTooltipTriggerModule

## Contexte de dépréciation

Ces NgModules sont des wrappers de compatibilité. Ils sont déclarés dans `@lucca/prisme/tooltip` et ré-exportés par `@lucca-front/ng/tooltip` (`export * from '@lucca/prisme/tooltip'`) : une recherche du `@deprecated` dans `@lucca-front/ng` seul ne les trouve pas.

## Modules concernés

| Module déprécié | Remplacement |
|---|---|
| `LuTooltipModule` | `LuTooltipTriggerDirective` |
| `LuTooltipTriggerModule` | `LuTooltipTriggerDirective` |

## Ne pas importer `LuTooltipPanelComponent`

Le message `@deprecated` de `LuTooltipModule` cite `LuTooltipPanelComponent`, mais aucun template ne l'utilise : la directive `luTooltip` crée elle-même le panel (`new ComponentPortal(LuTooltipPanelComponent)`). L'ajouter aux `imports` d'un composant ne sert à rien. N'importer `LuTooltipPanelComponent` que si le template contient réellement `<lu-tooltip-panel>`.

## Migration

```ts
// Avant
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
@Component({ imports: [LuTooltipModule] })

// Après — uniquement si le template utilise [luTooltip]
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
@Component({ imports: [LuTooltipTriggerDirective] })
```

Si le template n'utilise pas `luTooltip`, supprimer l'import sans le remplacer : une directive standalone importée sans être utilisée est signalée par le compilateur (`NG8113`, bloquant selon la config `extendedDiagnostics` ou la CI).

## Migration automatique

Dans les `imports` d'un composant, remplacer le module par `LuTooltipTriggerDirective` si le template contient `luTooltip`, sinon le supprimer.
