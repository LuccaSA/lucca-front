---
name: lucca-front-deprecated-resolver
description: 'Skill de migration des APIs dépréciées de Lucca Front (@lucca-front/ng). Charge ce skill pour identifier et migrer automatiquement les éléments marqués @deprecated : NgModules (LuApiModule, LuDateModule, LuDropdownModule, LuSelectModule, LuSidepanelModule, LuDepartmentModule, LuEstablishmentModule, LuUserModule, LuOptionModule, LuTreeOptionModule, LuModalModule, LuInputModule, LuTooltipModule, LuTitleModule, LuToastsModule, LuNumberModule, LuScrollModule, LuSafeContentModule, LuFormlyModule, LuPopoverModule, LuPopupModule), composants dépréciés (LuSelectInputComponent, LuDepartmentSelectInputComponent, LuEstablishmentSelectInputComponent, LuUserSelectInputComponent, LuDropdownPanelComponent), inputs dépréciés (withRole, delete→critical, fullpage→fullPage, icon→illustration), modèles dépréciés (ILuTranslation, sidepanel model), services dépréciés (LuSidepanel, LuDepartmentV3Service, LuTitleService), tokens dépréciés (USER_POPOVER_IS_ACTIVATED, APP_TITLE). Use when migrating deprecated lucca-front APIs.'
---

# lucca-front-deprecated-resolver

Ce skill guide la migration automatique de tous les éléments marqués `@deprecated` dans `@lucca-front/ng` et `@lucca-front/prisme`.

---

## Étape 1 — Analyse

**Partir des `@deprecated` du package installé, pas des tables ci-dessous.** Les tables servent à trouver la référence de migration, pas à détecter : elles ne couvrent pas tout, et une recherche par nom rate les symboles ré-exportés (`@lucca-front/ng/tooltip` se résume à `export * from '@lucca/prisme/tooltip'`, et c'est là que `LuTooltipModule` porte son `@deprecated`).

1. Lancer l'inventaire depuis la racine du workspace consommateur :

   ```bash
   node <chemin-du-skill>/scripts/inventory-deprecated.mjs            # rapport lisible
   node <chemin-du-skill>/scripts/inventory-deprecated.mjs --json     # pour un traitement
   ```

   Le script :
   - parcourt **toutes les racines de sources** du workspace (chaque projet d'`angular.json` : `projects/…`, `packages/…`, `src/`…), ou celles passées via `--root <dir>` ; ne jamais supposer un unique `src/` ;
   - relève les imports `@lucca-front/ng/*`, `@lucca-front/prisme/*` et `@lucca/prisme/*` ;
   - lit la JSDoc de chaque symbole dans les `.d.ts` installés (via les `exports` du `package.json`), en suivant les `export *` et `export { … } from` ;
   - pour chaque NgModule déprécié, lit son `ɵinj` dans le fesm2022 : providers déclarés et modules importés ;
   - donne le **contexte de chaque usage** (`imports of @Component`, `importProvidersFrom`, `providers`, `imports of TestBed`…) ;
   - liste aussi les membres dépréciés (inputs, méthodes, overloads) des symboles importés non dépréciés, à chercher dans les templates.
2. Chercher dans les templates (`.html` et templates inline) les attributs dépréciés signalés par l'inventaire.
3. Associer chaque élément à son fichier de référence (tables ci-dessous). Un symbole déprécié absent des tables se migre d'après son message `@deprecated` et les règles générales de l'étape 3.
4. Traiter les « Unresolved imports » de l'inventaire à la main.

### Table des références

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
| `LuTitleService`, `APP_TITLE` (⚠️ `LuTitleStrategy` n'est **pas** déprécié : ne pas toucher à ses injections) | [LuTitleModule.md](./references/LuTitleModule.md) |
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

- **NgModules** : selon le contexte d'usage (voir règle ci-dessous). Mettre à jour les imports TypeScript.
- **Composants** : remplacer le sélecteur HTML et adapter le template. Mettre à jour les imports TypeScript.
- **Inputs/Outputs** : renommer, supprimer ou transformer les attributs HTML.
- **Services/Tokens** : remplacer les injections, providers et imports.
- **Types/Interfaces** : renommer les types et mettre à jour les imports.

### Règle générale pour les NgModules

**Regarder où le module est utilisé avant de le remplacer** (colonne contexte de l'inventaire). Un même module ne se migre pas de la même façon selon l'endroit :

| Contexte | Rôle du module | Migration |
|---|---|---|
| `imports` d'un `@Component` (ou d'un `@NgModule` qui déclare des composants) | exposer des déclarables au template | remplacer par les composants/directives/pipes standalone **que le template utilise vraiment** (voir ci-dessous) ; aucun utilisé → supprimer |
| `importProvidersFrom(...)` ou tableau `providers` | apporter ses providers | `ɵinj` sans providers (et sans module importé qui en apporte) → **supprimer** ; sinon → le remplacer par ses providers explicites (`provideXxx()`…) |
| `imports` de `TestBed.configureTestingModule` | les deux | même règle que pour un composant, plus les providers si le test en dépend |

⛔ **Ne jamais passer un composant, une directive ou un pipe standalone à `importProvidersFrom`.** Angular le refuse en dev mode (`NG0800`), alors que le build de prod passe. Exemple : `importProvidersFrom(BrowserModule, LuToastsModule)` devient `importProvidersFrom(BrowserModule)`, **pas** `importProvidersFrom(BrowserModule, LuToastsComponent)`.

### Ne garder que ce que le template utilise

Un NgModule importé pour rien passe sans bruit. Une directive ou un composant standalone importé pour rien est signalé par le compilateur (`NG8113`) : warning par défaut, mais erreur dès que `extendedDiagnostics` le configure ainsi ou que la CI refuse les warnings. Le traiter comme bloquant. Avant de choisir les remplaçants :

1. Lister les sélecteurs des déclarables proposés par la référence (ou par le message `@deprecated`) : `selector` des composants/directives, `name` des pipes (lisibles dans le `.d.ts` installé : `ɵɵComponentDeclaration<…, "lu-xxx", …>`, `ɵɵPipeDeclaration<…, "luXxx", …>`).
2. Les chercher dans le template du composant (`templateUrl` ou `template` inline).
3. N'importer que ceux qui apparaissent. Un déclarable instancié par code (ex. `LuTooltipPanelComponent`, créé par la directive `luTooltip`) ne s'importe pas.

### Modules qui portent des providers

Pour `LuModalModule`, `LuPopupModule`, `LuFormlyModule`, `LuTitleModule` et tout module dont l'`ɵinj` déclare des providers : **l'endroit où l'on pose les providers explicites change le comportement**. Suivre la section « Où poser les providers » de [LuModalModule.md](./references/LuModalModule.md) : trouver qui injecte les services, comment le composant est créé, et reproduire l'injecteur d'origine. Ne jamais remplacer mécaniquement `imports: [XxxModule]` par `providers: [provideXxx()]` sur le composant.

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
2. **Vérifier la compilation** : lancer `ng build` (de chaque projet touché) ou `tsc --noEmit`.
3. **Relancer l'inventaire** (`scripts/inventory-deprecated.mjs`) : il ne doit plus rester que les éléments signalés comme manuels.
4. **Valider au runtime** — indispensable : `ng build` et `tsc` ne voient ni `NG0800` ni les `NullInjectorError`, qui n'apparaissent qu'à l'exécution, certaines seulement en dev mode.
   - Servir **chaque app touchée** en dev mode (`ng serve <projet>`), puis relever les erreurs console au chargement de ses écrans principaux, et en priorité des écrans dont un provider a été déplacé :

     ```bash
     node <chemin-du-skill>/scripts/check-console.mjs http://localhost:4200/ http://localhost:4200/ma-route [--storage-state auth.json]
     ```

     (Playwright headless ; sortie en code 1 si une erreur console ou une exception non capturée est relevée. Pour une app derrière authentification, passer un `storageState` Playwright.)
   - Si le repo a un script `check:providers` (voir `package.json`), le lancer : migrer un NgModule à providers déplace de l'injection de dépendances.
   - Si l'app ne peut pas être servie dans l'environnement (auth, backend indisponible), le dire explicitement dans le rapport plutôt que de considérer la migration validée.
5. **Vérifier les nouvelles APIs** : confirmer que les nouveaux composants/directives sont correctement utilisés.
6. **Signaler les migrations impossibles** : noter les cas nécessitant une intervention humaine.

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

### Providers déplacés
- Pour chaque provider déplacé ou supprimé (`provideLuModal()`, `LuPopup`, `provideLuFormly()`, `provideLuTitleStrategy()`…) : emplacement d'origine → nouvel emplacement, et raison du choix
- L'écran ou le parcours à vérifier en recette (ouverture de modale, sidepanel, dialog route enfant, titre de page…)

### Validation
- Commandes lancées (`ng build`, `check:providers`, `check-console.mjs`) et leur résultat
- Ce qui n'a pas pu être validé au runtime, et pourquoi

### Récapitulatif
- Nombre total d'éléments dépréciés détectés
- Nombre de migrations automatiques
- Nombre de migrations manuelles requises
- Fichiers modifiés
