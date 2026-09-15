# Signal — migration des `@Input()` / `@Output()` / `@ViewChild()` vers les APIs signal

> Source : PR **#4737 « core(signal): last module's »** (`e2f0f90d8`, 101 fichiers) — dernier lot de migration : `@Input()` et setters d'input → `input()`, `@Output()` → `output()` / `outputFromObservable()`, `@ViewChild`/`@ContentChild` → `viewChild()` / `contentChild()`, `@HostBinding`/`@HostListener` → métadonnée `host: {}`, et introduction de `syncInputSignal()`.
> Périmètre : **impact côté projet consommateur**.

**Usage standard, rien à faire** : si le projet ne fait que binder dans le template (`[input]="…"`, `(outputChange)="…"`, `#ref` pour le layout), la montée est transparente — le template fonctionne à l'identique et les outputs se souscrivent comme avant. Ce fichier ne concerne que l'**usage détourné** : accès TS aux composants LF, refs de vue, pilotage impératif, sous-classement.

Rappels sur les signaux : un signal se lit en l'**invoquant** (`ref.x()`) — y compris pour un template ref exportée (`#x="luX"` → `x.value()`, dans le template aussi) ; un `viewChild()` n'a de valeur qu'**après le premier change detection** ; un `InputSignal` ne s'assigne pas (passer par un `model()` / two-way ou un `linkedSignal` exposé, cf. §4).

---

## 1. Ce qui ne casse pas

Deux dispositifs de compatibilité ont été systématiquement employés — les connaître évite de chercher des régressions qui n'existent pas.

**Les alias de template sont préservés.** Chaque `@Input('nom-html')` a été converti en `input(défaut, { alias: 'nom-html' })`. Les bindings de template restent identiques, y compris les alias en kebab-case et les préfixes de directive :

```html
<!-- inchangé en 22 -->
<lu-popover [template-context]="ctx" close-on-click trap-focus scroll-strategy="block">
<div [luPopover]="panel" [luPopoverPosition]="'above'" (luPopoverOnOpen)="…">
<ng-template luDisabledOption="…" [luOptionOutletValue]="opt">
<lu-select [pickerOverlap]="true" multiple placeholder="…">
```

**Les propriétés « plaines » sous-jacentes sont maintenues en synchronisation** par `syncInputSignal(signal, setter)` (exporté par `@lucca-front/ng/core`). Là où un setter d'input alimentait une propriété classique, cette propriété existe toujours et reste lisible sans parenthèses :

```ts
// toujours valide : la propriété plaine est alimentée par syncInputSignal
panel.closeOnClick; // boolean
panel.scrollStrategy; // LuPopoverScrollStrategy
target.position; // LuPopoverPosition
```

Les valeurs par défaut des `input()` ont été alignées sur celles des classes de base, donc la synchronisation initiale n'écrase rien. ⚠️ Une sous-classe consommateur qui **redéfinissait une valeur par défaut différente** sur la propriété plaine se la fait désormais réécrire à l'initialisation par la valeur par défaut de l'`input()` : à vérifier au cas par cas.

**Les `EventEmitter` publics survivent.** Les `@Output()` ont été remplacés par un `EventEmitter` **non décoré** resté public, doublé d'un `outputFromObservable(…, { alias: 'nom' })` déclaré `protected`. Conséquence : le binding de template fonctionne via l'alias, et `.emit()` / `.subscribe()` sur l'`EventEmitter` fonctionnent toujours (`ClearComponent.onClear`, `ALuPopoverPanel.close`/`open`/`hovered`, `ALuPopoverTrigger.onOpen`/`onClose`, `ALuSelectInput.onOpen`/`onClose`).

---

## 2. Les motifs qui ne compilent plus

| Motif | Correction |
|---|---|
| **Lire un input en TS** : `ref.granularity`, `ref.filters`, `ref.option` | `ref.granularity()` — voir §3 pour la liste |
| **Écrire un input en TS** : `ref.options = […]`, `ref.loading = true` | Un `InputSignal` est en lecture seule. Si la cible est un `linkedSignal` (§4) → `.set()`. Sinon, passer par le binding de template. |
| **Propriété renommée** : `ref.inputPlaceholder`, `ref.overlapInput` | Nouveaux noms au §3 |
| **Membre supprimé** : `select.placeholder$`, `select.isDisabled` | §3 |
| **`Subject` devenu observable dérivé** : `this.url$.next(v)`, `select.loading$.value` | La source est maintenant un `input()` : écrire dans l'input, plus dans le flux (§5) |
| **Ref de vue** : `ref.searchInput.nativeElement`, `ref.content` | `ref.searchInput()?.nativeElement` (§6) |
| **Output devenu `output()`** : `searcher.clueChange.pipe(…)` | `OutputEmitterRef` n'est pas un `Observable` : utiliser `.subscribe()`, ou `outputToObservable()` pour retrouver un flux |
| **Input devenu requis** : `<ng-template luOptionGroup>` sans `[luOptionGroupBy]` | Erreur **de compilation** du template : `Required input 'selector' from directive LuOptionGroupDirective must be specified` (§7) |
| **Réagir à un changement d'input via `ngOnChanges`** dans une sous-classe | Les signal inputs continuent d'alimenter `SimpleChanges` : le hook se déclenche toujours. ⚠️ Mais la clé de `SimpleChanges` est le **nom de la propriété TS**, pas l'alias de template : pour tout input renommé au §3 (`loading` → `loadingInput`, `options` → `optionsInput`…), `changes['loading']` ne se déclenche plus — **sans erreur de compilation**. Renommer la clé, ou mieux, remplacer par un `effect()` / `computed()` sur le signal. Rappel : seules les écritures venant du binding passent par `ngOnChanges` — un `.set()` sur un `linkedSignal` (§4) ne déclenche rien. |
| **Muter un tableau/objet passé en entrée** : `items.push()`, `items.sort()` en place | Les entrées sont typées `ReadonlyArray` : cloner (`[...items].sort()`) et gérer la source de vérité en amont |

---

## 3. Inventaire par entrypoint

### `@lucca-front/ng/core-select`

**`ALuSelectInputComponent`** — inputs convertis, avec **renommage** de la propriété TS quand l'alias de template devait être conservé :

| Template (inchangé) | Ancienne propriété TS | Nouvelle propriété TS |
|---|---|---|
| `clearable` | `clearable` (accesseur) | `clearableInput` (input) + `isClearable` (computed) |
| `addOptionLabel` | `addOptionLabel` (setter) | `addOptionLabelInput` |
| `loading` | `loading` (setter) | `loadingInput` + **`loading`** (`linkedSignal`) |
| `options` | `options` (setter) | `optionsInput` + **`options`** (`linkedSignal`) |
| `optionComparer` | `optionComparer` (propriété) | `optionComparerInput` + **`optionComparer`** (`linkedSignal`) |
| `optionKey` | `optionKey` (propriété) | `optionKeyInput` + **`optionKey`** (`linkedSignal`) |
| `placeholder` | `placeholder` (setter) + `placeholder$` | `placeholder` (input signal) |
| `addOptionStrategy` | `addOptionStrategy` (setter) | `addOptionStrategy` (input signal) |
| `overlayConfig` | `overlayConfig` (propriété) | `overlayConfig` (input signal) |

Également :

- **`placeholder$`, `options$`, `loading$` et `addOptionStrategy$` sont supprimés.** La PR les avait d'abord transformés en observables dérivés (`toObservable(input)`) ; en 22 finale ils ont disparu au profit des signaux. Remplacer par `select.placeholder()`, `select.options()`, `select.loading()`, `select.addOptionStrategy()`. `shouldDisplayAddOption` est désormais un signal (auparavant `shouldDisplayAddOption$`).
- `inputElementRef` : `@ViewChild` → `viewChild()`, et passe en **`private`**.
- `inputPlaceholder` (getter) retourne désormais `string | null | undefined`.

**`LuOptionComponent`** : `option`, `grouping`, `optionTpl`, `scrollIntoViewOptions` → inputs signal ; `optionContext` (`@ViewChild(LU_OPTION_CONTEXT)`) → `viewChild()`.

**`ɵCoreSelectPanelElement` / selectable item** : `disabled` → **`disabledInput`** (alias `disabled`).

**Directives d'options** : `LuOptionOutletDirective` (`luOptionOutlet`, `luOptionOutletValue`, `luOptionShowNull`), `LuDisabledOptionDirective` (`isDisabled`, alias `luDisabledOption`), `luOptionSelect` / `luDisplayerSelect` / `luMultiDisplayerSelect` (`select`) → inputs signal.

**`LuOptionGroupDirective`** : `select` et `selector` passent en **`input.required()`** (alias `luOptionGroupSelect` / `luOptionGroupBy`) — voir §7.

**`ALuCoreSelectApiDirective`** : `optionComparer` / `optionKey` sont désormais pilotés via les signaux du select (§4).

**`LuCoreSelectApiV3Directive`** : `apiV3` passe en **`input.required<string>()`** ; `fields`, `orderBy`, `filters` deviennent des inputs signal ; les flux `protected url$` / `fields$` / `orderBy$` / `filters$` **ne sont plus des `Subject`** mais des `toObservable(input)` (§5).

### `@lucca-front/ng/select` (legacy) — `ALuSelectInput`

| Template (inchangé) | Ancienne propriété TS | Nouvelle propriété TS |
|---|---|---|
| `pickerOverlap` | `overlapInput` | **`pickerOverlap`** (+ `pickerOverlapRef`, `linkedSignal`) |
| `placeholder` | `inputPlaceholder` | **`placeholderInput`** |
| `multiple` | `inputMultiple` | **`multipleInput`** |
| `disabled` | `inputDisabled` | **`disabledInput`** |

- Le getter **`isDisabled` est supprimé** (c'était un `@HostBinding`) — remplacé par la métadonnée `host: { '[class.is-disabled]': 'disabledInput()' }`.
- `_vcDisplayContainer` : setter `protected` → `viewChild()` **`private`**.
- `tabindex`, `is-focused`, `mod-multiple`, `is-clearable` et les `@HostListener` (`click`, `mouseenter`, `mouseleave`, `focus`, `blur`, `keydown.space`, `keydown.enter`) passent dans `host: {}`. Les méthodes (`onClick`, `onFocus`…) restent surchargeables.

### `@lucca-front/ng/popover` (v1)

- **`ALuPopoverPanel`** : `template`, `templateContext` (alias `template-context`), `inputCloseOnClick` (`close-on-click`), `inputTrapFocus` (`trap-focus`), `inputScrollStrategy` (`scroll-strategy`), `inputPanelClasses` (`panel-classes`), `inputContentClasses` (`content-classes`) → inputs signal, **noms TS conservés**. Le setter `vcTemplateRef` devient un `viewChild(TemplateRef)`.
- **`LuPopoverTargetDirective`** : `inputPosition`, `inputAlignment`, `inputOverlap`, `inputOffsetX`, `inputOffsetY` → inputs signal, noms conservés.
- **`ALuPopoverTrigger`** : `inputPanel` (`luPopover`), `inputTarget`, `inputTriggerEvent`, `inputPosition`, `inputAlignment`, `inputEnterDelay`, `inputLeaveDelay`, `inputDisabled`, `inputOverlap`, `inputOffsetX`, `inputOffsetY` → inputs signal, noms conservés. Les `@HostBinding`/`@HostListener` passent dans `host: {}`.

Dans les trois cas les propriétés plaines (`position`, `alignment`, `closeOnClick`, `panel`, `target`, `triggerEvent`…) restent alimentées par `syncInputSignal`.

### `@lucca-front/ng/popover2`, `dropdown`, `date2`

`PopoverDirective` et `PopoverContentComponent` : inputs déjà signal, conversion des `@HostBinding` restants. `LuDropdownTriggerDirective` : `inputPanel` (alias `luDropdown`). `LuRepeatTimesDirective` : `repeatTimes` (alias `luRepeatTimes`). `Calendar2CellDirective` : `@HostBinding('tabindex')` → `host`.

### `@lucca-front/ng/api` — opérateurs de select

`LuApiFeederComponent`, `LuApiPagerComponent`, `LuApiSearcherComponent`, `LuApiPagedSearcherComponent`, `LuApiSelectInputComponent` : tous les `@Input() set standard / api / fields / filters / orderBy / sort` et `debounceTime` → inputs signal, **noms conservés**, propriétés de service alimentées par `syncInputSignal`. `searchInput` (`@ViewChild`) → `viewChild()`.

⚠️ Dans les templates de ces composants, les inputs sont désormais **relayés en tant que fonctions** (`[api]="api()"`). Un template consommateur qui recopiait ce câblage doit être ajusté.

### `@lucca-front/ng/option` — opérateurs legacy

`LuOptionFeederComponent` (`options`), `LuOptionSearcherComponent` (`searchFn`, `searchInput`), `LuForOptionsDirective` (`luForOptionsTrackBy`), `LuForGroupsDirective` (`attrGroupBy`, alias `luForGroupsGroupBy`), pickers → inputs signal / `viewChild()`, **noms conservés**.

### `@lucca-front/ng/user`, `establishment`, `date`, `multi-select`, `divider`, `time`, `modal`

- `LuUserMeOptionDirective` : `luUserMeOptionFields`, `…Filters`, `…OrderBy`, `…AppInstanceId`, `…Operations`, `…Clue` → inputs signal, noms conservés.
- `LuUserSearcherComponent` : `fields`, `filters`, `orderBy`, `appInstanceId`, `operations`, `enableFormerEmployees` → inputs signal ; **`clueChange` passe de `@Output() Observable<string>` à `output<string>()`** (plus de `.pipe()`).
- `LuEstablishmentSearcherComponent`, `LuEstablishmentSelectAllComponent`, `LuLegalUnitSelectorDirective` (`legalUnit`, `filters`, `appInstanceId`, `operations` avec leurs alias `luLegalUnitSelector*`) → inputs signal.
- `date` : `LuDateInputDirective`, `LuCalendarInputComponent`, `LuDatePickerComponent`, `LuDateSelectInputComponent` → `min`, `max`, `granularity`, `startOn`, `hideClearer` deviennent des inputs signal. Sur `LuDateSelectInputComponent`, la surcharge **`inputPlaceholder` est supprimée** (l'alias `placeholder` de la classe de base la remplace).
- `multi-select` : `LuMultiSelectSelectedChipDirective` (`option`, alias `luMultiSelectSelectedChip`), displayers (`inputElementRef` → `viewChild()`, inputs `required` du counter-displayer).
- `DividerComponent.content`, `TimePickerPartComponent.timePickerInput` → `viewChild()`.
- `LuModalPanelComponent` : `@ViewChild('container')` → **`viewChild.required()`** `protected _containerRef`. `LuDialogContentAdapterComponent.contentProjectionRef` → `viewChild()`.

---

## 4. Piloter un select depuis du TS

C'est le motif le plus courant côté consommateur (directive d'API maison, alimentation manuelle des options). Les propriétés pilotables ont été converties en **`linkedSignal`** : elles restent inscriptibles, mais via `.set()`.

```ts
// ❌ 21
this.select.options = options;
this.select.loading = true;
if (this.select.optionComparer === coreSelectDefaultOptionComparer) {
	this.select.optionComparer = myComparer;
}

// ✅ 22
this.select.options.set(options);
this.select.loading.set(true);
if (this.select.optionComparer() === coreSelectDefaultOptionComparer) {
	this.select.optionComparer.set(myComparer);
}
```

Le choix du `linkedSignal` est délibéré : la valeur suit l'input (`optionsInput`, `loadingInput`…) tant que personne n'écrit, et une écriture programmatique prend le dessus jusqu'au prochain changement d'input. C'est ce qui préserve le pilotage impératif tout en exposant un input de template.

---

## 5. Sous-classer une directive dont les flux ont changé de nature

Sur `LuCoreSelectApiV3Directive`, les flux protégés étaient des `Subject` alimentés par les setters d'input ; ce sont maintenant des projections d'input :

```ts
// avant : protected readonly url$ = new ReplaySubject<string>(1);
// après  : protected readonly url$ = toObservable(this.apiV3);
```

Une sous-classe qui poussait dans ces flux ne compile plus :

```ts
// ❌ url$ n'est plus un Subject
this.url$.next(this.buildUrl());

// ✅ piloter l'input, ou recomposer son propre flux
protected override readonly myUrl$ = toObservable(computed(() => this.buildUrl(this.apiV3())));
```

Même logique pour `fields$`, `orderBy$`, `filters$`, et pour `loading$` / `addOptionStrategy$` sur `ALuSelectInputComponent`.

À noter aussi : `syncInputSignal()` s'appelle **dans le constructeur** (contexte d'injection requis). Une sous-classe qui ajoute ses propres synchronisations doit le faire au même endroit, pas dans `ngOnInit`.

---

## 6. Refs de vue

Toutes les refs converties suivent le même schéma — accès par appel, valeur potentiellement absente avant le premier change detection :

```ts
// ❌
this.searcher.searchInput.nativeElement.focus();
this.divider.content.nativeElement;

// ✅
this.searcher.searchInput()?.nativeElement.focus();
this.divider.content()?.nativeElement;
```

Deux cas de resserrement de visibilité, qui n'ont pas de correction côté consommateur : `inputElementRef` (`ALuSelectInputComponent`) et `_vcDisplayContainer` (`ALuSelectInput` legacy) sont passés en **`private`**. Un code qui s'appuyait dessus doit remonter le besoin.

---

## 7. Inputs devenus requis

Trois inputs sont passés en `input.required()`. **Ce que ça donne dépend du sélecteur de la directive**, pas de l'input :

| Directive / composant | Input requis | Alias de template | Sélecteur | Effet si non fourni |
|---|---|---|---|---|
| `LuOptionGroupDirective` | `select` | `luOptionGroupSelect` | `[luOptionGroup]` | **Erreur de compilation** |
| `LuOptionGroupDirective` | `selector` | `luOptionGroupBy` | `[luOptionGroup]` | **Erreur de compilation** |
| `LuCoreSelectApiV3Directive` | `apiV3` | `apiV3` | `lu-simple-select[apiV3], lu-multi-select[apiV3]` | **Rien** — la directive n'est pas instanciée |

**`luOptionGroup` : échec au build.** L'attribut nu suffit à faire matcher la directive, donc dès que `<ng-template luOptionGroup>` est écrit, le compilateur de template exige les inputs requis : `Required input 'selector' from directive LuOptionGroupDirective must be specified`. Un usage qui s'appuyait sur le caractère optionnel de `luOptionGroupBy` ne compile plus — c'est visible au build, pas en exécution.

**`apiV3` : pas de piège du tout.** La directive est sélectionnée *par* l'attribut `apiV3`. Sans lui, elle n'est jamais instanciée : rien à requérir, rien qui échoue. Le seul cas à surveiller est un binding présent mais dont la valeur peut être `undefined` (`[apiV3]="maybeUrl"`), qui devient une erreur de type sous `strictTemplates` (§7 « Types resserrés »).

`NG0950` (« Input is required but no value is available yet ») ne concerne qu'un autre scénario : **lire un input requis avant qu'Angular ne l'ait assigné** — initialiseur de champ, constructeur, ou instanciation dynamique via `createComponent()` sans `setInput()`. Même famille pour `LuModalPanelComponent._containerRef` (`viewChild.required()`), lu avant le premier change detection.

### Types resserrés

`strictTemplates` peut signaler deux resserrements :

- `luDisabledOption` accepte `boolean | undefined` là où le setter acceptait `boolean | null` → un binding dont la valeur est `boolean | null` échoue.
- `optionsInput` est typé `readonly TOption[] | null` (valeur par défaut `null`).

---

## 8. Checklist

1. **Compiler d'abord, la liste du §3 ensuite** : la conversion en `input()` produit des erreurs franches (`This expression is not callable` / `Cannot assign to …`). Traiter les erreurs, puis relire le §3 pour les renommages qui se manifestent en `Property 'inputPlaceholder' does not exist`.
2. **Chercher les écritures d'inputs sur des composants LF** :
   ```bash
   grep -rnE '\.(options|loading|optionComparer|optionKey|filters|fields|orderBy|sort|api|granularity|min|max|startOn)\s*=[^=>]' src/
   ```
   Sur un select : `.set()`. Ailleurs : passer par le binding.
3. **Chercher les anciens noms renommés** :
   ```bash
   grep -rnE '\.(inputPlaceholder|inputMultiple|inputDisabled|overlapInput|isDisabled|placeholder\$)\b' src/
   ```
4. **Chercher les `.next()` / `.value` sur des flux LF devenus dérivés** :
   ```bash
   grep -rnE '\.(url\$|fields\$|orderBy\$|filters\$)\.(next|value)' src/
   ```
   Et les usages des flux **supprimés** : `placeholder$`, `options$`, `loading$`, `addOptionStrategy$`, `shouldDisplayAddOption$`.
5. **Chercher les refs de vue LF utilisées sans appel** (`searchInput`, `content`, `timePickerInput`, `inputElementRef`, `contentProjectionRef`, `optionContext`).
6. **Chercher les `.pipe()` sur `clueChange`** d'un `LuUserSearcherComponent`.
7. **`luOptionGroup`** : les inputs `luOptionGroupSelect` / `luOptionGroupBy` sont requis et la directive matche sur l'attribut nu → le build échoue s'ils manquent, la correction est guidée par le compilateur. Rien à chercher en amont, et **rien à vérifier pour `apiV3`** : sans l'attribut, la directive n'est pas instanciée (§7).
8. **Vérifier les sous-classes qui redéfinissaient une valeur par défaut** d'une propriété plaine désormais alimentée par `syncInputSignal` (§1).

---

## 9. Contexte interne (pour information)

- `@angular-eslint/prefer-signals` repasse en configuration par défaut (`'error'` sans objet d'options) : les exceptions `preferInputSignals: false` / `preferQuerySignals: false` n'étaient plus nécessaires, la migration des inputs et des queries étant terminée.
- `syncInputSignal<T>(signal, setter)` est exporté publiquement par `@lucca-front/ng/core` (`core/signal.ts`, aux côtés de `ɵeffectWithDeps`). Utilisable côté consommateur pour le même besoin : exposer un `input()` tout en alimentant une propriété plaine héritée.
