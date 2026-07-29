---
name: lucca-front-deprecated-resolver
description: 'Skill de migration des APIs dépréciées de Lucca Front (@lucca-front/ng). Charge ce skill pour identifier et migrer automatiquement les éléments marqués @deprecated : NgModules (LuApiModule, LuDateModule, LuDropdownModule, LuSelectModule, LuSidepanelModule, LuDepartmentModule, LuEstablishmentModule, LuUserModule, LuOptionModule, LuTreeOptionModule, LuModalModule, LuInputModule, LuTooltipModule, LuTitleModule, LuToastsModule, LuNumberModule, LuScrollModule, LuSafeContentModule, LuFormlyModule, LuPopoverModule, LuPopupModule), composants dépréciés (LuSelectInputComponent, LuDepartmentSelectInputComponent, LuEstablishmentSelectInputComponent, LuUserSelectInputComponent, LuDropdownPanelComponent), inputs dépréciés (withRole, delete→critical, fullpage→fullPage, icon→illustration), modèles dépréciés (ILuTranslation, sidepanel model), services dépréciés (LuSidepanel, LuDepartmentV3Service, LuTitleService), tokens dépréciés (USER_POPOVER_IS_ACTIVATED, APP_TITLE). Use when migrating deprecated lucca-front APIs.'
---

# lucca-front-deprecated-resolver

Ce skill guide la migration automatique de tous les éléments marqués `@deprecated` dans `@lucca-front/ng` et `@lucca-front/prisme`.

---

## Étape 1 — Analyse

Scanner le code source du projet à migrer :

1. Chercher les imports depuis `@lucca-front/ng/*` et `@lucca-front/prisme/*`.
2. Identifier les NgModules, composants, directives, services, tokens et types dépréciés présents.
3. Chercher les attributs HTML dépréciés dans les templates (`.html` et templates inline).
4. Associer chaque élément trouvé à son fichier de référence dans ce skill.

### Éléments à détecter

#### NgModules dépréciés → remplacer par imports standalone

| Détecté | Référence |
|---|---|
| `LuApiModule`, `LuApiSelectModule`, `LuApiSelectInputModule`, `LuApiSearcherModule` | [LuApiModule.md](./references/LuApiModule.md) |
| `LuDateModule`, `LuDatePickerModule`, `LuDateSelectInputModule`, `LuDateAdapterModule` | [LuDateModule.md](./references/LuDateModule.md) |
| `LuDropdownModule`, `LuDropdownPanelModule`, `LuDropdownItemModule`, `LuDropdownTriggerModule` | [LuDropdownModule.md](./references/LuDropdownModule.md) |
| `LuSelectModule`, `LuSelectInputModule` | [LuSelectModule.md](./references/LuSelectModule.md) |
| `LuSidepanelModule` | [LuSidepanelModule.md](./references/LuSidepanelModule.md) |
| `LuDepartmentModule`, `LuDepartmentSelectModule`, `LuDepartmentSelectInputModule` | [LuDepartmentModule.md](./references/LuDepartmentModule.md) |
| `LuEstablishmentModule`, `LuEstablishmentSelectModule`, `LuEstablishmentSelectInputModule` | [LuEstablishmentModule.md](./references/LuEstablishmentModule.md) |
| `LuUserModule`, `LuUserSelectModule`, `LuUserSelectInputModule`, `LuUserDisplayModule`, `LuUserPictureModule`, `LuUserTileModule`, `LuUserMeOptionModule`, `LuUserSearcherModule` | [LuUserModule.md](./references/LuUserModule.md) |
| `LuOptionModule`, `LuOptionItemModule`, `LuOptionPickerModule`, `LuOptionFeederModule`, `LuOptionPagerModule`, `LuOptionSearcherModule`, `LuOptionSelectAllModule`, `LuForOptionsModule` | [LuOptionModule.md](./references/LuOptionModule.md) |
| `LuTreeOptionModule`, `LuTreeOptionItemModule`, `LuTreeOptionPickerModule`, `LuTreeOptionFeederModule`, `LuForTreeOptionsModule`, `LuTreeOptionSearcherModule`, `LuTreeOptionOperatorModule` | [LuOptionModule.md](./references/LuOptionModule.md) |
| `LuModalModule` | [LuModalModule.md](./references/LuModalModule.md) |
| `LuPopupModule` | [LuModalModule.md](./references/LuModalModule.md) |
| `LuPopoverModule`, `LuPopoverPanelModule` | [LuModalModule.md](./references/LuModalModule.md) |
| `LuTooltipModule`, `LuTooltipTriggerModule` | [LuTooltipModule.md](./references/LuTooltipModule.md) |
| `LuInputModule`, `LuInputClearerModule`, `LuInputDisplayerModule` | [LuInputModule.md](./references/LuInputModule.md) |
| `LuTitleModule` | [LuTitleModule.md](./references/LuTitleModule.md) |
| `LuToastsModule`, `LuNumberModule`, `LuScrollModule`, `LuSafeContentModule`, `LuFormlyModule` | [NgModulesSimples.md](./references/NgModulesSimples.md) |

#### Composants dépréciés → migration HTML + TS

| Détecté | Référence |
|---|---|
| `lu-select` / `LuSelectInputComponent` | [LuSelectModule.md](./references/LuSelectModule.md) |
| `lu-department-select` / `LuDepartmentSelectInputComponent` | [LuDepartmentModule.md](./references/LuDepartmentModule.md) |
| `lu-establishment-select` / `LuEstablishmentSelectInputComponent` | [LuEstablishmentModule.md](./references/LuEstablishmentModule.md) |
| `lu-user-select` / `LuUserSelectInputComponent` | [LuUserModule.md](./references/LuUserModule.md) |
| `lu-input-clearer` / `LuInputClearerComponent` | [LuInputModule.md](./references/LuInputModule.md) |

#### Inputs/Outputs dépréciés

| Élément | Input déprécié | Référence |
|---|---|---|
| `lu-divider` | `withRole` | [DividerComponent.md](./references/DividerComponent.md) |
| `[luButton]` / `button[luButton]` | `delete` | [ButtonComponent.md](./references/ButtonComponent.md) |
| `lu-loading` | `type="fullpage"` | [LoadingComponent.md](./references/LoadingComponent.md) |
| `lu-empty-state-section` | `icon` | [EmptyStateSectionComponent.md](./references/EmptyStateSectionComponent.md) |
| `lu-single-file-upload`, `lu-multi-file-upload` | `illustration="paper"` | [BaseFileUploadComponent.md](./references/BaseFileUploadComponent.md) |
| `lu-highlight-data` | `icon="manifying-glass"` | [HighlightDataComponent.md](./references/HighlightDataComponent.md) |
| Composants select (core-select) | `.grouping` / `.grouping =` | [CoreSelectInputComponent.md](./references/CoreSelectInputComponent.md) |

#### Services, tokens et types dépréciés

| Détecté | Référence |
|---|---|
| `LuSidepanel` (service), `LU_SIDEPANEL_DATA`, `ILuSidepanelRef`, `ALuSidepanelRef` | [LuSidepanelModule.md](./references/LuSidepanelModule.md) |
| `LuDepartmentV3Service` | [LuDepartmentModule.md](./references/LuDepartmentModule.md) |
| `LuTitleService`, `LuTitleStrategy`, `APP_TITLE` | [LuTitleModule.md](./references/LuTitleModule.md) |
| `USER_POPOVER_IS_ACTIVATED`, `provideLuUserPopover` | [UserPopoverProviders.md](./references/UserPopoverProviders.md) |
| `ILuTranslation` | [TranslationModel.md](./references/TranslationModel.md) |
| `LuSimpleSelectApiV4Directive`, `ALuSimpleSelectApiDirective` (depuis `simple-select`) | [SimpleSelectApiAliases.md](./references/SimpleSelectApiAliases.md) |
| `defaultOnClosedFn<C>()` (version générique) | [DialogRoutingComponent.md](./references/DialogRoutingComponent.md) |

---

## Étape 2 — Lecture de la référence

Pour chaque élément déprécié identifié :
1. Ouvrir le fichier de référence correspondant (voir table ci-dessus).
2. Lire les règles de migration.
3. Déterminer si la migration est automatique ou nécessite une intervention humaine.

---

## Étape 3 — Migration

Appliquer les transformations selon les règles de chaque fichier de référence :

- **NgModules** : remplacer le module dans les `imports` par la liste de composants standalone. Mettre à jour les imports TypeScript.
- **Composants** : remplacer le sélecteur HTML et adapter le template. Mettre à jour les imports TypeScript.
- **Inputs/Outputs** : renommer, supprimer ou transformer les attributs HTML.
- **Services/Tokens** : remplacer les injections, providers et imports.
- **Types/Interfaces** : renommer les types et mettre à jour les imports.

### Règle générale pour les NgModules

La plupart des NgModules dépréciés sont de simples wrappers standalone. La migration consiste à :
1. Supprimer le module de `imports` dans `@NgModule` ou `@Component`.
2. Ajouter directement les composants/directives/pipes standalone dans `imports`.
3. Mettre à jour l'import TypeScript vers le bon chemin.

---

## Étape 4 — Annotation

**Uniquement pour les migrations de composants** (changements potentiellement breaking), ajouter une annotation à proximité du code modifié.

### Annotation dans un fichier TypeScript

```ts
/*
** IA lucca-front-deprecated-resolver
** try to migrate ${NomDuComposantDéprécié}
*/
```

### Annotation dans un fichier HTML

```html
<!--
  IA lucca-front-deprecated-resolver
  try to migrate ${NomDuComposantDéprécié}
-->
```

**Composants nécessitant une annotation :**
- `LuSelectInputComponent` (`lu-select`)
- `LuDepartmentSelectInputComponent` (`lu-department-select`)
- `LuEstablishmentSelectInputComponent` (`lu-establishment-select`)
- `LuUserSelectInputComponent` (`lu-user-select`)
- `LuSidepanelModule` / `LuSidepanel`
- `LuDropdownPanelComponent` (`lu-dropdown`)

**Pas d'annotation nécessaire pour :**
- Remplacement de NgModules simples (non breaking)
- Renommage d'inputs simples
- Suppression de tokens/providers obsolètes

---

## Étape 5 — Validation

Après migration :

1. **Vérifier les imports TypeScript** : s'assurer que tous les imports sont cohérents avec les nouveaux packages.
2. **Vérifier la compilation** : lancer `ng build` ou `tsc --noEmit` pour vérifier l'absence d'erreurs.
3. **Vérifier les nouvelles APIs** : confirmer que les nouveaux composants/directives sont correctement utilisés.
4. **Signaler les migrations impossibles** : noter les cas nécessitant une intervention humaine.

### Cas nécessitant une intervention humaine

- Migration de `lu-select` vers `lu-simple-select` ou `lu-multi-select` avec des options complexes
- Migration de `lu-department-select`, `lu-establishment-select`, `lu-user-select` avec des configurations avancées
- Migration de `lu-dropdown` (ancienne architecture) vers la nouvelle approche menu Prisme
- Migration de `LuSidepanel` si la logique de callback est complexe
- Migration de `LuTitleService` si des observables sont utilisés pour le titre

---

## Étape 6 — Reporting

Produire un rapport structuré contenant :

### Migrations réalisées automatiquement
- Liste des éléments migrés
- Fichiers modifiés
- Références utilisées

### Migrations partiellement réalisées
- Éléments partiellement migrés
- Ce qui a été fait
- Ce qui reste à faire manuellement

### Migrations impossibles à automatiser
- Éléments nécessitant une intervention humaine
- Raison
- Guidance pour la migration manuelle

### Récapitulatif
- Nombre total d'éléments dépréciés détectés
- Nombre de migrations automatiques
- Nombre de migrations manuelles requises
- Fichiers modifiés
