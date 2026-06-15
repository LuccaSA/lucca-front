# LuOptionModule / LuTreeOptionModule et composants option dépréciés

## Contexte de dépréciation

Tous les NgModules wrappers du système "option" (ancienne architecture picker) sont dépréciés. Les composants et directives correspondants doivent être importés directement en standalone.

## Modules NgModule dépréciés

| Module déprécié | Remplacement |
|---|---|
| `LuOptionModule` | `LuOptionItemComponent, LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionPagerComponent, LuOptionFeederComponent, LuOptionSearcherComponent, LuForOptionsDirective, LuForGroupsDirective, LuOptionSelectAllComponent, LuOptionPlaceholderComponent` |
| `LuOptionItemModule` | `LuOptionItemComponent` |
| `LuOptionPickerModule` | `LuOptionPickerComponent, LuOptionPickerAdvancedComponent, LuOptionItemComponent` |
| `LuOptionFeederModule` | `LuOptionFeederComponent` |
| `LuOptionPagerModule` | `LuOptionPagerComponent` |
| `LuOptionSearcherModule` | `LuOptionSearcherComponent` |
| `LuOptionSelectAllModule` | `LuOptionSelectAllComponent` |
| `LuForOptionsModule` | `LuForOptionsDirective` |
| `LuTreeOptionModule` | `LuTreeOptionItemComponent, LuTreeOptionPickerComponent, LuTreeOptionPickerAdvancedComponent, LuTreeOptionFeederComponent, LuForTreeOptionsDirective, LuTreeOptionPagerComponent, LuTreeOptionSearcherComponent, LuTreeOptionSelectAllComponent` |
| `LuTreeOptionItemModule` | `LuTreeOptionItemComponent` |
| `LuTreeOptionPickerModule` | `LuTreeOptionPickerComponent, LuTreeOptionPickerAdvancedComponent` |
| `LuTreeOptionFeederModule` | `LuTreeOptionFeederComponent` |
| `LuForTreeOptionsModule` | `LuForTreeOptionsDirective` |
| `LuTreeOptionSearcherModule` | `LuTreeOptionSearcherComponent` |
| `LuTreeOptionOperatorModule` | `LuTreeOptionFeederComponent, LuForTreeOptionsDirective, LuTreeOptionPagerComponent, LuTreeOptionSearcherComponent` |

## Composants/Directives dépréciés (ancienne architecture)

Ces éléments sont utilisés dans l'ancienne architecture "picker" et doivent être évités dans du nouveau code :

- `LuOptionItemComponent` (`lu-option`)
- `LuOptionPickerComponent` (`lu-option-picker`)
- `ALuOptionPickerComponent`, `ALuOptionPickerAdvancedComponent` (classes abstraites)
- `LuOptionPlaceholderComponent` (`lu-option-placeholder`)
- `LuOptionSelectAllComponent` (`lu-option-select-all`)
- `LuTreeOptionItemComponent` (`lu-tree-option`)
- `LuTreeOptionPickerComponent` (`lu-tree-option-picker`)
- `ALuTreeOptionPickerComponent`, `ALuTreeOptionPickerAdvancedComponent` (classes abstraites)
- `LuTreeOptionFeederComponent` (`lu-tree-option-feeder`)
- `LuTreeOptionPagerComponent` (`lu-tree-option-pager`)
- `LuTreeOptionSearcherComponent` (`lu-tree-option-searcher`)
- `LuForTreeOptionsDirective` (`[luForTreeOptions]`)
- `LuTreeOptionSelectAllComponent` (`lu-tree-option-select-all`)
- `LuDepartmentFeederComponent` (`lu-department-feeder`)

## Migration automatique

Remplacer chaque NgModule par les imports standalone directs listés dans le tableau.

**Note :** L'utilisation des composants "picker" dans des templates nécessite une évaluation au cas par cas. Préférer les nouveaux composants `lu-simple-select` et `lu-multi-select`.
