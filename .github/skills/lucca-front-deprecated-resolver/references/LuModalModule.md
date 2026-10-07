# LuModalModule / LuPopupModule / LuPopoverModule / LuPopoverPanelModule

## Contexte de dépréciation

Ces NgModules sont des wrappers de compatibilité. `LuPopoverModule` et `LuPopoverPanelModule` n'exposent que des déclarables. `LuModalModule` et `LuPopupModule` n'exposent **que des providers** : leur migration déplace de l'injection de dépendances, et l'endroit où l'on pose les providers change le comportement.

## Modules concernés

### LuModalModule

**Déprécié :** `LuModalModule`

**Contenu (`ɵinj`) :** providers `provideLuModal(), LuDialogService` ; imports `OverlayModule, DialogModule`.

`provideLuModal()` fournit `LuModal`, `LU_MODAL_REF_FACTORY` **et `LuDialogService`**.

**Remplacement :** `provideLuModal()` (plus `importProvidersFrom(OverlayModule, DialogModule)` si l'environnement ne les fournit pas déjà), **posé à l'endroit déterminé ci-dessous**.

### LuPopupModule

**Déprécié :** `LuPopupModule`

**Contenu (`ɵinj`) :** providers `LuPopup`, `LU_POPUP_CONFIG`, `LU_POPUP_REF_FACTORY` ; import `OverlayModule`.

**Remplacement :** les mêmes providers explicites, **posés à l'endroit déterminé ci-dessous** :

```ts
providers: [
  importProvidersFrom(OverlayModule),
  LuPopup,
  { provide: LU_POPUP_CONFIG, useValue: luDefaultPopupConfig },
  { provide: LU_POPUP_REF_FACTORY, useClass: LuPopupRefFactory },
]
```

### LuPopoverModule

**Déprécié :** `LuPopoverModule`

**Remplacement :** `LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective`, en ne gardant que ceux que le template utilise.

```ts
@Component({
  imports: [LuPopoverPanelComponent, LuPopoverTargetDirective, LuPopoverTriggerDirective],
})
```

### LuPopoverPanelModule

**Déprécié :** `LuPopoverPanelModule`

**Remplacement :** `LuPopoverPanelComponent` si le template l'utilise.

---

## Où poser les providers (LuModalModule, LuPopupModule)

### Ce que faisait réellement le module

Un NgModule importé par un composant standalone n'ajoute ses providers à un injecteur que **si ce composant est créé dynamiquement** : composant de route (`loadComponent` / `component`), dialog, `createComponent`, `ViewContainerRef`. Angular crée alors un injecteur d'environnement standalone pour ce composant.

Pour un composant instancié comme **enfant de template**, l'import dans `imports: [LuModalModule]` ne fait rien côté providers : le service injecté vient d'un ancêtre ou de la racine.

### Pourquoi ne pas tout mettre dans `providers` du composant

Remplacer `imports: [LuModalModule]` par `providers: [provideLuModal()]` sur le composant n'est **pas** équivalent :

- les providers d'un composant vont dans son injecteur de nœud. Le contenu de la modale ou du sidepanel ouvert depuis ce composant voit alors les providers de ce composant, y compris d'éventuels overrides (services surchargés, tokens), ce qui n'était pas le cas avant ;
- `provideLuModal()` fournit aussi `LuDialogService`, qui ouvre ses dialogs avec **l'injecteur où il a été instancié**. Le poser sur un composant peut masquer le `LuDialogService` d'un parent, y compris pour les dialog routes enfants, qui s'ouvrent alors avec un autre injecteur.

### Procédure

Avant de remplacer, pour chaque usage :

1. **Trouver qui injecte** `LuModal`, `LuPopup` ou `LuDialogService` (`inject(...)` ou paramètres de constructeur) dans le composant et dans ses descendants.
2. **Déterminer comment le composant est créé** : composant de route (chercher dans les fichiers de routes), ouvert par dialog/modal, `createComponent`, ou simple enfant de template.
3. **Placer les providers là où ils reproduisent l'injecteur d'origine** :

| Situation d'origine | Remplacement |
|---|---|
| Module dans `imports` d'un composant **routé** | providers dans le `providers` de **la route** (injecteur d'environnement de la route, comme avant) |
| Module dans `imports` d'un composant ouvert en dialog / `createComponent` | providers de l'injecteur d'environnement qui l'ouvre (route parente ou racine) ; signaler pour revue |
| Module dans `imports` d'un composant **enfant de template** | le module n'agissait pas : supprimer l'import. Si quelqu'un injecte le service, s'assurer qu'il est fourni à la racine (ou par l'ancêtre qui le fournissait déjà) |
| Module dans `imports` d'un `@NgModule` racine / `importProvidersFrom` au bootstrap | `provideLuModal()` aux providers racine |
| Module dans `imports` d'un `@NgModule` lazy-loadé | `providers` de la route qui charge ce module |
| Aucune injection de `LuModal` / `LuPopup` / `LuDialogService` nulle part | import mort : supprimer purement et simplement |

4. **Ne pas dupliquer** : si `provideLuModal()` est déjà fourni à la racine et que l'usage local n'introduisait pas d'injecteur distinct, supprimer simplement l'import.
5. **Lister chaque provider déplacé** dans le rapport final (fichier d'origine → nouvel emplacement) avec l'écran à vérifier en recette : ouverture de modale/sidepanel/dialog, dialog routes enfants.

```ts
// Avant — composant routé
@Component({ imports: [LuModalModule] })
export class MyPageComponent {
  #modal = inject(LuModal);
}
// routes: { path: 'page', loadComponent: () => import('./my-page.component') }

// Après — providers sur la route, pas sur le composant
@Component({ imports: [] })
export class MyPageComponent {
  #modal = inject(LuModal);
}
// routes: { path: 'page', loadComponent: () => import('./my-page.component'), providers: [provideLuModal()] }
```

## Migration automatique

- `LuPopoverModule` / `LuPopoverPanelModule` : automatique (déclarables utilisés par le template).
- `LuModalModule` / `LuPopupModule` : automatique seulement pour les cas sans ambiguïté du tableau (import mort, composant routé, module racine). Les cas dialog / `createComponent` ou les arbres avec overrides de providers sont à signaler en migration partielle.
- Valider au runtime (voir Étape 5 de [SKILL.md](../SKILL.md)) : un mauvais placement produit un `NullInjectorError` ou un dialog ouvert avec le mauvais injecteur, invisibles à la compilation.
