# Strict — `strictNullChecks` sur l'API publique de `@lucca-front/ng`

> Sources :
> - PR **#4497 « [core] strict them all »** — activation de `@lucca-front/ts-error` en `error` + `strictNullChecks` dans les `tsconfig.lint.json`. C'est là que l'essentiel des signatures publiques a bougé (§1 à §4, §6).
> - PR **#5122 « core(ng): enable strictNullChecks so published types model nullability »** — promotion de `strictNullChecks` dans le `tsconfig.json` de build, donc dans les `.d.ts` **publiés**. Peu de signatures publiques touchées (§7), mais **une trentaine de templates ont été null-narrowés**, ce qui change le DOM rendu dans des cas limites (§8).
>
> Périmètre de ce document : **impact côté projet consommateur** de `@lucca-front/ng`, pas le travail interne.

---

## Pourquoi c'est breaking pour un consommateur

Les `.d.ts` publiés sont désormais **émis avec `strictNullChecks`**. Conséquence : tout ce qui pouvait valoir `null`/`undefined` au runtime est maintenant **écrit dans les types**.

| Type de projet consommateur | Ce qui se passe |
|---|---|
| Projet **strict** (`strictNullChecks: true`) | Nouvelles erreurs de compilation là où on consommait une valeur LF sans garde. C'est le gros du travail de migration. |
| Projet **non strict** | Presque aucune erreur TS… mais les **changements de comportement** (§5) s'appliquent quand même. Ne pas conclure « rien à faire » parce que `tsc` passe. |
| Projet qui **hérite** de classes de base LF (`ALuInput`, `ALuSelectInputComponent`, `ALuDateAdapter`, `BasePickerComponent`…) | Erreurs de **compatibilité de signature** sur les overrides. Le cas le plus douloureux. |

Deux familles d'erreurs à attendre :

1. `Object is possibly 'null' | 'undefined'` sur une valeur lue depuis LF.
2. `Property 'x' in type 'MonImpl' is not assignable to the same property in base type` sur une classe qui étend / implémente une abstraction LF.

---

## 1. ControlValueAccessor & `value` — `T` devient `T | null`

C'est le point qui touche le plus de code : **tous les wrappers de champ de formulaire maison** autour des inputs LF.

| Symbole | Avant | Après |
|---|---|---|
| `ALuSelectInputComponent.value` (getter) | `TValue` | `TValue \| null` |
| `ALuSelectInputComponent.valueSignal` | `WritableSignal<TValue>` | `WritableSignal<TValue \| null>` |
| `ALuSelectInputComponent.writeValue(v)` | `TValue` | `TValue \| null` |
| `ALuSelectInputComponent.updateValue(v, …)` | `TValue` | `TValue \| null` |
| `ALuSelectInputComponent.registerOnChange(fn)` | `(v: TValue) => void` | `(v: TValue \| null) => void` |
| `ALuSelectInputComponent._value` (protected) | `TValue \| undefined` | `TValue \| null` (initialisé à `null`) |
| `ALuInput.value` / `setValue()` / `registerOnChange()` | `T` | `T \| null` |
| `ALuInput.writeValue(v)` | `writeValue(v: T)` | `writeValue(v?: T)` |
| `ALuSelectInput.setValue(v)` (legacy `select`) | `T \| T[]` | `T \| T[] \| undefined` |
| `LuSimpleSelectPanelComponent.initialValue` | `T \| undefined` | `T \| null` |
| `LuMultiSelectWithSelectAllDirective.clearValue($event)` | `$event: Event` | `$event?: Event` |

**Ce qui casse concrètement :**

```ts
// ❌ ne compile plus en strict
this.select.registerOnChange((v: MonType) => this.form.setValue(v));
const id = mySelect.value.id;

// ✅
this.select.registerOnChange((v: MonType | null) => this.form.setValue(v));
const id = mySelect.value?.id;
```

`_value` n'est **plus jamais `undefined`** mais `null` : un test `=== undefined` sur l'état vide d'un select devient faux. Utiliser `isNil()` (exporté par `@lucca-front/ng/core`).

⚠️ **Changement de comportement** : `ALuSelectInput.setValue()` (select legacy) **ignore silencieusement** `null`/`undefined` (`if (this.disabled || isNil(value)) return;`). Avant, passer `null` remettait la valeur à vide. Un « reset » implémenté via `setValue(null)` ne fait plus rien.

---

## 2. Overlays — dialog, modal, popup, sidepanel

| Symbole | Avant | Après |
|---|---|---|
| `LuDialogRef.instance` | `C` | **`C \| null`** |
| `LuDialogSelfRef<R>.close(res)` | `R` | `R \| null \| undefined` |
| `ILuPopupRef.onOpen` / `ALuPopupRef.onOpen` | `Observable<D>` / `Subject<D>` | `…<D \| undefined>` |
| `ILuPopupRef.onClose` / `ALuPopupRef.onClose` | `Observable<R>` / `Subject<R>` | `…<R \| undefined>` |
| `ILuPopupRef.open(data)` | `open(data: D)` | `open(data?: D)` |
| `LuModal.open()` / `.legacyOpen()`, `LuSidepanel.open()`, `LuPopup.open()` | `data: D = undefined` | `data: D \| undefined = undefined` |
| `LuModalRefAdapter.onOpen` | `Observable<D>` | `Observable<D \| undefined>` |
| `LuDialogContentAdapterComponent.data` | `D` | `D \| undefined` |

**Le plus impactant : `LuDialogRef.instance`.**

```ts
// ❌
this.dialogRef.instance.reload();
const value = ref.instance.form.value;

// ✅
this.dialogRef.instance?.reload();
```

⚠️ **Changement de comportement sur `canClose`** : l'appel est désormais entouré d'un `try/catch` et n'est **pas appelé si `instance === null`**, avec `canClose = true` en cas d'exception. Une garde `canClose` qui lançait pour bloquer la fermeture **ne bloque plus rien** — le dialog se ferme silencieusement. À auditer si le projet s'appuie sur ce comportement.

Côté `onOpen`/`onClose` de popup : les souscripteurs reçoivent `D | undefined` / `R | undefined`. Le `close()` sans résultat émet désormais un `undefined` typé.

⚠️ `ALuPopoverTrigger` : `_attachPortalToOverlay()` et l'abonnement `keydownEvents$` sont **gardés par `if (this._overlayRef)`**. Là où on avait un crash explicite, on a maintenant un **no-op silencieux** (popover qui ne s'ouvre pas / ne réagit pas au clavier, sans erreur console). Plus dur à diagnostiquer.

---

## 3. Dates — `core/date`, `date`, `date2`

### Adaptateurs de date (breaking dur pour un adapter maison)

| Symbole | Avant | Après |
|---|---|---|
| `ILuDateAdapter<D>.parse()` | `D` | **`D \| undefined`** |
| `ALuDateAdapter<D>.parse()` (abstract) | `D` | **`D \| undefined`** |
| `LuNativeDateAdapter.parse()` | `Date` | `Date \| undefined` |
| `LuStringDateAdapter.dateToString()` (protected) | `(d: Date) => string` | `(d: Date \| undefined) => string \| undefined` |

Un adaptateur maison implémentant `ILuDateAdapter` **compile toujours** (retourner `D` est assignable à `D | undefined`), mais **tout appelant de `adapter.parse()` doit gérer `undefined`**. Et si l'adapter maison *étend* `LuStringDateAdapter` en surchargeant `dateToString`, la signature doit être élargie.

### `LuDateInputDirective` — changement de comportement

Une saisie non parsable **n'appelle plus `setValue()`** :

```ts
const value = this.parse(text);
if (isNotNil(value)) { this.setValue(value); }
```

Avant, un texte invalide écrivait une valeur invalide dans le contrôle (et déclenchait la validation). Maintenant le contrôle **conserve sa valeur précédente** : les validateurs ne se déclenchent plus, `dirty`/`valueChanges` non plus. À vérifier sur les formulaires qui affichaient une erreur « date invalide ».

### `date2`

| Symbole | Avant | Après |
|---|---|---|
| `AbstractDateComponent.calendarMode` | `model<CalendarMode>()` (init `undefined`) | `model<CalendarMode \| null>(null)` |
| `AbstractDateComponent.isValidDate(date)` | `(date: Date) => boolean` | `(date: Date \| null \| undefined) => date is Date` |
| `Calendar2Component.getCellInfo` (input) | `(date, displayMode: CalendarMode) => CellStatus` | `(date, displayMode: CalendarMode \| null) => CellStatus` |
| `CalendarCellInfo.rangeInfo` | `RangeInfo` | `RangeInfo \| null` |
| `DateRange.end` (entrée) | `Date \| string \| undefined` | `Date \| string \| null \| undefined` |
| `DateRange.end` (sortie) | `Date \| undefined` | `Date \| null \| undefined` |
| CVA de `date-range-input` | `onChange(v: DateRange)` | `onChange(v: DateRange \| null)` |
| `comparePeriods()` / `startOfPeriod()` | `mode: CalendarMode` | `mode: CalendarMode \| null` (élargi, non breaking) |
| `transformDateInputToDate` / `transformDateToDateISO` | signature simple | **surchargées** (`null → null`, `Date|string → Date`…) |

Points d'attention :

- **`[(calendarMode)]`** : la cible du two-way doit accepter `CalendarMode | null`. Un `signal<CalendarMode>('day')` côté consommateur ne compile plus. Et la lecture rend `null`, plus `undefined`.
- **`getCellInfo`** : une fonction passée en input et typée `(date: Date, mode: CalendarMode) => CellStatus` **n'est plus assignable** (contravariance du paramètre). Élargir en `CalendarMode | null`.
- **`transformDateInputToDate` surchargée** : meilleure inférence, mais une annotation explicite du retour ou un appel avec `Date | string | undefined` peut ne plus résoudre — appeler avec `Date | string | null`.

---

## 4. Inputs / models dont le type a changé

| Composant | Input | Avant | Après |
|---|---|---|---|
| `lu-progress-bar` | `state` | `input<'success' \| 'error' \| 'null'>(null)` | `input<'success' \| 'error' \| null>(null)` |
| `lu-fancy-box` | `foreground` | `input<string>()` | `input<string \| null>(null)` |
| `lu-form-field` | `width` | `input<FormFieldWidth, …>` | `input<FormFieldWidth \| null, …>` |
| `lu-segmented-control-tabs` | `active` | `model<T>(null)` | `model<T \| null>(null)` |
| `BasePickerComponent` (time / duration) | `step` | `input<ISO8601Duration>(null)` | `input<ISO8601Duration \| null>(null)` |
| `luUserOptionUsersRef` | `usersDirective` | `input<LuCoreSelectUsersDirective<T>>(null)` | `input<… \| null>(null)` |
| `lu-user-tile` | `displayFormat` | `input<LuDisplayFormat>()` | `input<LuDisplayFormat>(#defaultFormat)` |

**🔴 `lu-progress-bar [state]` — le seul breaking « template » franc du lot.** L'ancien type contenait la *chaîne* `'null'` (coquille). Un `<lu-progress-bar state="null">` (ou `[state]="'null'"`) **ne compile plus** avec `strictTemplates`. Remplacer par l'absence de binding ou `[state]="null"`.

**`lu-user-tile [displayFormat]`** : l'input a maintenant une **valeur par défaut** au lieu de `undefined`. Un code TS qui lisait `tile.displayFormat()` pour détecter « non fourni » (`=== undefined`) est cassé fonctionnellement, sans erreur de compilation.

Les autres lignes du tableau sont des **élargissements** : le binding template reste valide ; c'est la **lecture en TS** (`ref.width()`, `ref.step()`) qui exige une garde, et la **cible du two-way** `[(active)]` qui doit accepter `T | null`.

---

## 5. Changements de comportement sans erreur de compilation

À auditer manuellement — c'est là que se cachent les régressions silencieuses.

| Zone | Changement | Risque |
|---|---|---|
| `LuDialogRef` | `canClose` en `try/catch`, ignoré si `instance === null` → `true` | Garde de fermeture neutralisée, dialog fermé alors qu'il devrait rester ouvert |
| `ALuSelectInput.setValue()` (legacy) | ignore `null`/`undefined` | Reset programmatique sans effet |
| `LuDateInputDirective` | saisie invalide → pas de `setValue` | Validation « date invalide » qui ne se déclenche plus |
| `ALuPopoverTrigger` | garde `if (this._overlayRef)` | Popover inerte au lieu d'un crash explicite |
| `ILuEstablishmentService.searchPaged()` | reçoit `''` au lieu de `null` quand pas de clue | Une implémentation maison qui testait `clue === null` part en recherche vide |
| `LuCoreSelectUsersDirective` | erreur sur `/me` → émet `{data:{items:[]}}` au lieu de `EMPTY` | Le « me » vaut `null` et le flux reste vivant (avant : flux complété, rien d'émis) |
| `panelHeaderTpl` (core-select, multi-select select-all) | `.set(null)` → `.set(undefined)` | Type `… \| undefined` : une comparaison `=== null` sur le signal devient fausse |
| `NumberFormat` (style `percent`) | `maximumFractionDigits` testé en **falsy** : plus d'arrondi `toFixed` si la valeur est `0` | Précision différente sur les pourcentages configurés à 0 décimale |
| `LuUserDisplayPipe` | `{ formatter: undefined }` → repasse sur le séparateur par défaut | Rendu différent (avant : formatter appelé avec `undefined`) |
| `templateErrorExtension` (formly) | `field?.validation` | Ne lève plus sur `field` absent |
| `TreeNode.children` | traité comme optionnel partout (`children?.push`, `!children?.length`) | Un `TreeNode` construit sans `children` est désormais toléré ; `toggle()` émet un nœud seul au lieu de lever |
| `FilterPillComponent` | `ref.enableFilterPillMode?.()`, `popoverRef()?.close()` | `enableFilterPillMode` devient de fait optionnel pour un input custom en filter-pill |
| `toSignal(…, { initialValue })` | `filterPillDisabled` → `false` (au lieu de `undefined`), `totalCount` → `0` | Première valeur émise différente ; `valueLength` passe par `?? 0` |
| `withSelectAll` | `displayerCount: Signal<number \| null>` | Compteur `null` possible côté displayer custom |
| `BasePickerComponent` (#5122) | `onChange` / `onTouched` initialisés à des no-ops | `if (picker.onChange)` toujours vrai ; picker hors form ne lève plus |
| `AbstractDateComponent.ranges` (#5122) | les ranges transformés en `null` sont filtrés | Un `[ranges]` partiellement invalide perd des entrées au lieu de propager `null` |
| `lu-user-tile`, `lu-page-header`, `lu-fieldset`, `lu-color-input`… (#5122) | élément hôte non rendu quand l'entrée est nil | Nœuds DOM disparus → sélecteurs e2e / snapshots / CSS (détail en §8) |
| `lu-data-table-row`, `multilanguage-input` (#5122) | gardes `?.` sur le parent injecté | Usage hors table / hors `lu-form-field` : rendu dégradé silencieux au lieu d'une erreur |

---

## 6. Génériques & types utilitaires

| Symbole | Changement | Impact |
|---|---|---|
| `PortalDirective<T>` | `T = unknown` → **`T extends object = object`** | `PortalDirective<string>` / `PortalDirective<number>` ne compilent plus. Idem `ngTemplateContextGuard<T extends object>`. Passer par un objet de contexte. |
| `LuUserMeOptionDirective.me` | `ILuUser` → `U \| undefined` | Mieux typé, mais `me` doit être gardé avant usage |
| `LuUserMeOptionDirective._viewRef` | `EmbeddedViewRef<{$implicit: ILuUser}>` → `<{$implicit: U}>` | Resserrement du générique |
| `displayPictureFormatRecord` (user/picture) | `Record<…>` → `as const satisfies Record<…>` | Objet **readonly** et littéral : mutation interdite, indexation plus étroite |
| `getDifferenceByUnit`, `nextRelativeTimeTickInMsByUnit`, `previousRelativeTimeUnitByUnit` (date/humanize) | idem `as const satisfies` | Idem — internes, mais visibles si réexportés |
| `NumberFormat.applyRange(value)` | `number \| null` → `number \| null \| undefined` | Élargissement, non breaking |
| `BasePickerComponent.getMinutesIncrement()` (abstract) | `number` → `number \| null` | Une implémentation retournant `number` reste valide ; **les appelants** doivent gérer `null` |

### Nouveau helper public

`@lucca-front/ng/core` exporte `assertNotNil` :

```ts
import { assertNotNil, isNil, isNotNil, isNotNilOrEmptyString } from '@lucca-front/ng/core';

assertNotNil(dialogRef.instance, 'instance attendue');
dialogRef.instance.reload(); // narrowing acquis
```

À privilégier plutôt qu'un `!` non tracé dans le code consommateur.

---

## 7. Signatures publiques modifiées par la PR #5122

La promotion de `strictNullChecks` dans le `tsconfig.json` de build a nécessité quelques ajustements de types publics supplémentaires. Ils sont peu nombreux mais deux sont de vrais breaking.

| Symbole | Avant | Après | Nature |
|---|---|---|---|
| `ALuModalPanelComponent.submitClass$` | `Subject<unknown>` (`new Subject()`) | **`Subject<string>`** | 🔴 **Resserrement.** `submitClass$.next(autreChose)` ne compile plus dans une classe qui étend `ALuModalPanelComponent`. |
| `CalendarMonthInfo.rangeInfo` | `RangeInfo` | **`RangeInfo \| null`** | 🔴 Une fonction `getCellInfo` / un template custom qui lit `month.rangeInfo.x` doit garder. |
| `CalendarYearInfo.rangeInfo` | `RangeInfo` | **`RangeInfo \| null`** | idem (le pendant `CalendarCellInfo.rangeInfo` est déjà listé en §3). |
| `DateRangeInputComponent.tabbableDateChange(date, calendarIndex)` | `date: Date` | `date: Date \| null` | Élargissement non breaking pour les overrides de méthode. |
| `LuSimpleSelectInputComponent.autocomplete` | `input<AutoFill>('off')` | `input<AutoFill \| null>('off')` | Élargissement. Binding template inchangé ; la **lecture TS** `select.autocomplete()` rend `AutoFill \| null`. |
| `CalloutIconPipe.transform(state, icon)` | `(state: CalloutState, icon: LuccaIcon)` | `(state?: CalloutState, icon?: LuccaIcon)` | Élargissement des paramètres, non breaking. |
| `BasePickerComponent.onChange` / `.onTouched` | déclarés non-optionnels mais **non initialisés** | initialisés à `() => {}` | Voir §5 : plus jamais `undefined`. |
| `AbstractDateComponent.ranges` (transform) | `v.map(transformDateRangeInputToDateRange)` | `.filter((r): r is DateRange => r !== null)` | Les ranges dont la transformation rend `null` sont désormais **silencieusement retirés** de `ranges()` au lieu d'y figurer comme `null`. |

⚠️ **`BasePickerComponent.onChange` / `onTouched`** (time-picker, duration-picker) : avant, ces callbacks valaient `undefined` tant que Angular n'avait pas appelé `registerOnChange` / `registerOnTouched` (usage hors `formControl`), et les templates les appelaient en `onTouched?.()`. Ils sont maintenant initialisés à des no-ops et appelés en `onTouched()`. Conséquence : un test `if (picker.onChange)` est **toujours vrai**, et un picker utilisé hors form ne lève plus.

---

## 8. Null-narrowing des templates (PR #5122) — DOM et rendu

~30 templates ont été réécrits pour satisfaire `strictNullChecks` (`@if (x(); as x)`, `?.`, `?? ''`). La plupart sont neutres, mais **certains suppriment l'élément hôte quand l'entrée est nil**, alors qu'avant il était rendu vide. Impact : sélecteurs de tests e2e, snapshots, et CSS qui compte sur la présence du nœud.

| Composant | Changement | Ce qui change à l'écran / dans le DOM |
|---|---|---|
| `lu-user-tile` | `{{ user() \| luUserDisplay }}` → entouré d'un `@if (user(); as user)` | Sans `[user]`, la `<div class="userTile-content-name">` **n'existe plus** (avant : div présente, texte vide). |
| `lu-page-header` | `@if (label(); as label)` autour du `<h1>` / du portal | Neutre — sans `[label]`, l'ancien template prenait déjà la branche portal, qui ne rendait aucun nœud. |
| `lu-fieldset` | `heading` et `helper` entourés d'un `@if` | Wrappers absents au lieu de vides. |
| `lu-comment` | `authorName` entouré d'un `@if`, `date()?.toISOString()` | Sans `authorName`, le `<span class="comment-infos-name">` n'existe plus (avant : span présent avec un portal sur `null`) ; `datetime` est absent si aucune date n'est fournie. |
| `lu-activity-feed-step` | `@if (user(); as user)`, `@if (label(); as label)`, `preparedDate()?.toISOString()` | idem. |
| `lu-segmented-control-tabs`, `lu-segmented-control-filter` | `label` entouré d'un `@if` | Neutre — le portal sur `null` ne rendait déjà aucun contenu et le bouton / label reste présent. |
| `lu-color-input` | `@let color = currentColorPresentation()` → `@if (currentColorPresentation(); as color)` | Le `<lu-color>` de la valeur courante **disparaît** quand il n'y a pas de couleur sélectionnée (avant : accès à `color.borderColor` sur `undefined`). |
| `lu-data-table-body`, `index-table-body` | `@if (group() && groupButtonAlt())` → deux `@if` imbriqués | Comportement identique (la ligne de groupe exige toujours les deux). |
| `lu-tag`, `lu-chip`, `lu-vertical-navigation*`, `lu-highlight-data`, `lu-empty-state-*`, `lu-input-framed`, `lu-form-label`, `lu-callout*` | `@if (x()) { … x() }` → `@if (x(); as x)` | Neutre — même condition de rendu. |
| `lu-dialog` (`dialog-content-adapter`) | `[value]="(submitCounter$ \| async) ?? 0"` | Le `lu-numeric-badge` reçoit `0` au lieu de `null` avant la première émission → un badge peut afficher `0` là où il était vide. À vérifier visuellement sur les modales avec compteur de soumission. |
| `date-input` (date2) | `prev(calendarMode())` → `prev(calendarMode() ?? mode())` | La navigation précédent/suivant utilise désormais `mode()` en repli quand `calendarMode` n'est pas encore posé (avant : appel avec `undefined`). **Correction fonctionnelle.** |
| `simple-select/panel` | `[selectedOptions]="[selected()]"` → `selectedOptions()` (`[]` si `null`) | Un `optionComparer` custom n'est plus appelé avec `null` côté tree-select. |
| `multilanguage-input` | `formFieldRef?.` / `formFieldSize?.()` partout, `[required]="… ?? false"` | Le composant tolère l'absence de `lu-form-field` parent au lieu de lever. Rendu dégradé silencieux si le wrapper manque. |
| `lu-data-table-row` | `tableRef.drag()` → `tableRef?.drag()` (host bindings inclus) | Une row utilisée hors `lu-data-table` ne lève plus : elle se rend sans les classes `mod-selectable` / `mod-draggable`. |
| `core-select` option « me » | `a && b && hasEmptyClue$ \| async` → `a && b && (hasEmptyClue$ \| async)` | 🐛 **Correction de précédence** : avant, l'`AsyncPipe` recevait le booléen `a && b` et levait `InvalidPipeArgument` quand `displayMeOption()` était faux. |
| `lu-toast` | `[class]="toast.type ? paletteClassByToastType[toast.type] : null"`, `(toast.duration ?? 0) > 0` | Neutre. |
| `lu-user-picture` | `[ngStyle]="!AI() && style()"` → `AI() ? null : style()` | Neutre. |
| `lu-pagination`, `formly/types/*`, `lu-file-entry`, `lu-form-field`, `lu-filter-bar`, `lu-tree-branch`, `lu-number-input`, `lu-radio`, `multi-select`/`simple-select` displayers & panels | `?? ''` / `?? 0` / `?? false` / `?? undefined` sur des bindings, `@if (grouping(); as grouping)` | Neutre — même rendu, mêmes conditions. |

---

## 9. Checklist de migration côté consommateur

1. **Conserver la configuration TypeScript existante.** Ne pas activer `noImplicitAny`, `strictNullChecks`, `strictTemplates` ou `strict` dans le cadre de cette migration : traiter uniquement les erreurs LF 22 produites avec les flags déjà activés dans le projet. Durcir le `tsconfig` ferait remonter un volume d'erreurs sans rapport avec LF 22, hors périmètre d'une migration à iso-comportement. Si le projet n'est pas strict, les points 2 à 9 ci-dessous ne remonteront quasiment rien — c'est attendu, et le vrai travail est alors le §5 et le §8 (changements de comportement et de rendu), à auditer dans tous les cas.
2. **Recenser les classes qui héritent de LF** — c'est la source des erreurs les plus coûteuses :
   ```bash
   grep -rnE 'extends\s+(ALuInput|ALuSelectInput|ALuSelectInputComponent|ALuDateAdapter|ALuPopupRef|ALuPopoverTrigger|BasePickerComponent|AbstractDateComponent)\b' src/
   grep -rnE 'implements\s+.*(ILuDateAdapter|ILuPopupRef|ILuEstablishmentService|ILuModalContent)' src/
   ```
   Élargir les signatures d'override (`| null` / `| undefined`) avant de toucher au reste.
3. **Auditer les accès `.instance`** des dialogs :
   ```bash
   grep -rnE '\.instance\.' src/
   ```
4. **Auditer les gardes `canClose`** (§2, comportement) :
   ```bash
   grep -rn 'canClose' src/
   ```
5. **Auditer les lectures TS de valeurs de select / input LF** :
   ```bash
   grep -rnE '\.(value|valueSignal\(\))\.' src/
   grep -rn 'registerOnChange' src/
   ```
6. **Chercher le `state="null"` de `lu-progress-bar`** :
   ```bash
   grep -rnE 'lu-progress-bar[^>]*state\s*=\s*"null"' src/
   grep -rnE "\[state\]\s*=\s*\"'null'\"" src/
   ```
7. **Chercher les `[(calendarMode)]`** et les `getCellInfo` typés strictement.
8. **Chercher les `PortalDirective<…>`** paramétrés avec un type primitif.
9. **Auditer les extensions de `ALuModalPanelComponent`** (§7) et les overrides de `tabbableDateChange` :
   ```bash
   grep -rn 'submitClass\$' src/
   grep -rn 'tabbableDateChange' src/
   ```
10. **Vérifier les sélecteurs de tests / le CSS qui dépendent d'un nœud désormais conditionnel** (§8) :
    ```bash
    grep -rnE 'userTile-content-name|pageHeader-content-title-content' src/ e2e/ cypress/ 2>/dev/null
    ```
11. **Relever les `as any` / `!` existants** qui masquent potentiellement les nullités et les signaler comme pistes hors périmètre, sans les modifier s'ils ne bloquent pas la migration LF 22.
12. **Rejouer les parcours listés en §5 et §8** — aucun de ces changements ne produit d'erreur `tsc`.

---

## 10. Contexte interne (pour information)

- `tsconfig.json` (build) : `strict: false` mais **`strictNullChecks: true`** → c'est ce flag qui se propage dans les `.d.ts` publiés. Posé par la PR #5122.
- ESLint : `@lucca-front/ts-error` passe en `error` sur `**/*.ts`, avec `packages/ng/schematics/**` et `stories/**` exclus.
- **Aucun schematic ne couvre cette migration** : c'est du diagnostic de compilation, pas un codemod. L'aide consiste à lire l'erreur et proposer la garde correcte (`?.`, `??`, `isNotNil`, `assertNotNil`, `@if`) — jamais un `!` posé au hasard.
