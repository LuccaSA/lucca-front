# LuDropdownModule / LuDropdownPanelModule / LuDropdownItemModule / LuDropdownTriggerModule / LuDropdownPanelComponent

## Contexte de dépréciation

`LuDropdownPanelComponent` (sélecteur `lu-dropdown`) est déprécié au profit de la nouvelle approche menu de Prisme.
Les NgModules wrappers sont également dépréciés au profit des imports directs des composants/directives standalone.

## Modules concernés

| Module déprécié | Remplacement |
|---|---|
| `LuDropdownModule` | `LuDropdownTriggerDirective, LuDropdownPanelComponent, LuDropdownItemDirective` |
| `LuDropdownPanelModule` | `LuDropdownPanelComponent` |
| `LuDropdownItemModule` | `LuDropdownItemDirective` |
| `LuDropdownTriggerModule` | `LuDropdownTriggerDirective` |

## Composant déprécié : LuDropdownPanelComponent

**Remplacement recommandé :** nouvelle approche menu Prisme.
Voir documentation : https://prisme.lucca.io/94310e217/p/557682-dropdown

## Input déprécié : luDropdownAlignment

L'input `luDropdownAlignment` sur la directive `LuDropdownTriggerDirective` est déprécié.

**Remplacement :** utiliser `customPositions` à la place.

### Avant

```html
<button [luDropdown]="panel" luDropdownAlignment="bottom">Ouvrir</button>
```

### Après

```html
<button [luDropdown]="panel" [luPopoverCustomPositions]="[...]">Ouvrir</button>
```

## Migration automatique des modules

Remplacer chaque module par ses équivalents standalone listés dans le tableau ci-dessus.

**Note :** La migration de `LuDropdownPanelComponent` vers la nouvelle approche menu nécessite une intervention humaine car l'architecture est différente.
