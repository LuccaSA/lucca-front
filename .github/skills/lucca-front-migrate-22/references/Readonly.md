# Readonly — propriétés de classe passées en `readonly`

> Source : PR **#4718 « [core] readonly properties and update ESLint rules »** (`1e801c106`, 131 fichiers) — marquage `readonly` des propriétés de classe + ajout de la règle ESLint `@angular-eslint/prefer-signals` (`preferReadonlySignalProperties: true`, `useTypeChecking: true`).
> Périmètre : **impact côté projet consommateur**.

---

## 1. Ce que `readonly` interdit exactement

`readonly` est purement statique : il bloque la **réassignation de la propriété**, jamais la mutation de l'objet qu'elle contient. Comportement vérifié au compilateur (TS du repo, `--strict`) :

| Cas | Verdict |
|---|---|
| `luRef.outOptions$ = new Subject()` depuis l'extérieur | ❌ **`error TS2540`** |
| `this.outOptions$ = …` dans une sous-classe qui **ne redéclare pas** la propriété | ❌ **`error TS2540`** (y compris sur un `protected readonly`) |
| `this.prop = …` dans une sous-classe qui **redéclare** la propriété en mutable (`override prop = …`) | ✅ **compile** — `readonly` n'entre pas dans la relation d'assignabilité entre classe de base et classe dérivée |
| `luRef.outOptions$.next(v)` / `.push()` / `.set()` / `.next()` | ✅ compile — l'objet reste mutable |
| Affectation d'une **méthode** (`luRef.onClose = () => …`) | ✅ compile — les méthodes n'ont pas été marquées `readonly` |

Deux conséquences majeures :

1. **La surface de casse réelle est étroite.** Tout le code qui *pilote* un composant LF via ses flux (`select.options$.next(…)`, `picker.paging$.next(…)`) continue de fonctionner. Seule la **substitution complète** d'une propriété casse.
2. **La redéclaration est une porte de sortie légitime**, et c'est celle que LF utilise déjà en interne (§5).

⚠️ **Aucun changement de comportement runtime** : `readonly` disparaît à la compilation. Si ça compile, ça se comporte comme avant. Le risque est 100 % « compilation », 0 % « régression silencieuse ».

---

## 2. Propriétés publiques concernées (surface exploitable)

Sur ~360 propriétés marquées `readonly`, la grande majorité sont des `input()` / `output()` / `model()` / `viewChild()` / `computed()` — **non exploitables** côté consommateur (on ne réassigne pas un `InputSignal`). Restent les familles réellement atteignables :

### a. Flux `Subject` / `Observable` publics

| Fichier / classe | Propriétés |
|---|---|
| `ALuSelectInputComponent` (`core-select`) | `disabled$`, `isPanelOpen$`, `clueChange$`, `clue$`, `nextPage$`, `activeDescendant$` |
| `LuMultiSelectInputComponent` | `selectParent$`, `selectChildren$` (`override readonly`) |
| `ALuPopupRef` / `ILuPopupRef` | `onOpen`, `onClose`, `onDismiss`, `onBackdropClick` |
| Opérateurs d'options (`option`, `api/select`) | `outOptions$`, `paging$`, `clue$`, `displayPlaceholder$` |
| Sélecteurs d'options | `onSelectValue` |
| Directives `core-select` API | `totalCount$` |
| `LuTitleService` / `LuTitleStrategy` | `title$`, `titleParts$` |
| `LuToastsService` | `toasts$` |
| `FormFieldComponent` | `ready$` |
| `LuModalPanelComponent`, dialog adapter | `error$`, `submitClass$` |
| `FileEntryComponent` | `deleteFile$`, `passwordChange$` |
| `PopoverDirective`, `PopoverContentComponent` (popover2) | `open$`, `close$`, `closed$`, `mouseEnter$`, `mouseLeave$` |
| `LuUserPopoverComponent` | `employee$`, `userInitials$`, `userPictureHref$`, `userPictureDisplay$` |
| Displayers multi-select | `selectedOptions$`, `displayedOptions$`, `overflowOptions$` |

### b. Refs `@ViewChild` / `@ContentChild` non-signal

`ALuSelectInputComponent` (legacy `@lucca-front/ng/select`) : `ccPicker`, `vcPicker`, `ccDisplayer`, `vcDisplayer`, `ccClearer`, `vcClearer`, `clearerEltRef`, `suffixEltRef`
`DividerComponent` : `content` · `LuOptionItemComponent` / `LuTreeOptionItemComponent` : `element` · `LuTreeOptionPickerComponent` : `optionsQLVR` · `TimePickerPartComponent` : `timePickerInput` · searchers : `searchInput` · displayers : `inputElementRef` · dialog adapter : `contentProjectionRef`

C'est la famille la plus piégeuse, pour deux raisons : elle concerne les **sous-classes** de composants LF, et elle est fréquemment réassignée **dans les tests** (`component.element = mockElementRef`).

### c. Templates / stratégies substituables

`optionTpl`, `valueTpl`, `valuesTpl`, `panelHeaderTpl`, `panelFooterTpl`, `customLabelTpl`, `defaultLabelTpl`, `groupingSignal`, `isFilterPillEmpty`, `displayerTpl`, `pluginComponents`

> Seul le caractère réassignable est en jeu ici.

---

## 3. Motifs à risque, et pourquoi la casse reste rare

Les motifs ci-dessous couvrent les façons réalistes dont un projet consommateur touche une propriété de la liste §2. Pour chacun, le verdict découle des règles du §1.

| Motif dans le projet consommateur | Verdict |
|---|---|
| Sous-classe d'un composant LF qui **redéclare** les refs qu'elle pilote (`public ccClearer`, `vcClearer`, `clearerEltRef`, `suffixEltRef`…) | ✅ **Compile** — cas « redéclaration » du §1 |
| Opérateur d'options maison (`extends ALuOptionOperator` ou `implements ILuOptionOperator`) qui **déclare** son propre `outOptions$` | ✅ Compile — déclaration locale, pas assignation d'un membre hérité |
| Affectation d'un **hook méthode** sur une ref LF (`picker.onClose = () => …`) | ✅ Compile — les méthodes ne sont pas `readonly` |
| Sous-classe qui assigne un membre **`protected` non touché par #4718** (`_value`, `_picker`, `_displayer`, `_clearer`, `_isContentInitialized` de `select-input.model.ts`) | ✅ Compile — ces membres n'ont pas reçu de `readonly` |
| Sous-classe qui assigne un membre hérité de la liste §2 **sans le redéclarer** | ❌ **TS2540** — voir §4 |
| `luRef.prop = …` depuis un composant parent / une directive tierce | ❌ **TS2540** — voir §4 |

**Le motif bloquant est structurellement peu fréquent.** Un consommateur qui étend un composant LF est de toute façon obligé de **redéclarer** les membres qu'il veut piloter — les `@ViewChild`/`@ContentChild` doivent être re-décorés dans la sous-classe pour cibler son propre template. Ce style le place mécaniquement dans le cas tolérant du §1. Ce qui casse, c'est le pilotage **depuis l'extérieur** — les deux premières lignes du tableau du §1 ; remèdes au §4.

### Faux positifs à écarter lors d'un audit

Plusieurs noms de la liste §2 sont trop courants pour être concluants seuls : `content`, `element`, `value`, `label`, `size`, `format`, `mode`, `clue$`, `searchInput`, `totalCount$`, `paging$`, `onOpen`, `onClose`. Une occurrence n'est un vrai positif que si la propriété est **héritée de LF et non redéclarée localement** — vérifier la déclaration avant de conclure.

### Zones qu'un audit statique ne couvre pas

- Les **tests** qui injectent un mock dans une ref (`component.element = mockElementRef`) : motif le plus probable de casse, et invisible à un `ng build` de production.
- Le code **non typé** (`as any`, `Object.assign(luRef, {...})`) : contourne `readonly` sans erreur, donc invisible au compilateur comme au `grep`.

---

## 4. Si un projet tiers est bloqué : l'ordre des remèdes

Du moins au plus coûteux — et **avant** d'envisager de retirer le `readonly` côté LF :

1. **Muter au lieu de réassigner.** `select.options$.next(x)` au lieu de `select.options$ = of(x)`. Couvre la quasi-totalité des cas sur les flux.
2. **Redéclarer dans la sous-classe** : `override maProp = …`. Solution officiellement viable (§1) et déjà employée en interne.
3. **Remonter l'état côté parent** plutôt que de substituer une propriété d'un composant enfant.
4. **Retirer le `readonly` côté LF** — voir §5.

---

## 5. Quand retirer le `readonly` de notre côté

Un `readonly` posé sur une propriété **conçue pour être substituée** est une erreur de conception, pas une contrainte à faire absorber par les consommateurs. Le compilateur ne pardonne pas ce cas : il n'existe aucun moyen pour un tiers de réassigner sans redéclarer ou caster.

**Précédent interne — la preuve que le besoin existe.** `ALuSelectInputComponent` déclare `readonly isFilterPillEmpty` (`core-select/input/select-input.component.ts:191`), mais `LuMultiSelectWithSelectAllDirective` fait exactement ceci :

```ts
// multi-select/input/select-all/with-select-all.directive.ts
this.select.isFilterPillEmpty = computed(() => !this.#hasValue());
this.select.useSingleOptionDisplayer = computed(() => this.#mode() === 'include');
this.select.valueLength = computed(() => this.displayerCount() ?? 0);
this.select.hasValue = () => this.#hasValue();
```

Ça ne compile que parce que `LuMultiSelectInputComponent` **redéclare ces membres sans `readonly`** (`override isFilterPillEmpty`, `public valueLength`, `public useSingleOptionDisplayer`). Autrement dit : LF a dû se ménager sa propre échappatoire pour continuer à faire ce que le `readonly` interdit. Dans la même directive, `registerOnChange` a carrément dû être réassigné via un cast :

```ts
(this.select as { registerOnChange: (fn: …) => void }).registerOnChange = (fn) => this.registerOnChange(fn);
```

Un cast de contournement dans notre propre code est le signal le plus net qu'un `readonly` est mal placé.

**Critère de décision :**

| Situation | Décision |
|---|---|
| La propriété est un point d'extension documenté (template substituable, stratégie, hook de displayer) | **Retirer le `readonly`** |
| LF lui-même la réassigne, ou a dû la caster / la redéclarer pour y échapper | **Retirer le `readonly`** — l'invariant est faux |
| La propriété est un `Subject`/`Observable` que l'on ne fait que `next()`er | Garder — la mutation reste permise, aucun tiers n'est gêné |
| Ref `@ViewChild`/`@ContentChild` renseignée par Angular | Garder, mais accepter la redéclaration en sous-classe (ne pas ajouter d'invariant supplémentaire) |
| `input()` / `output()` / `model()` / `computed()` | Garder — `readonly` y est la bonne pratique, et c'est ce que `prefer-signals` impose |

---

## 6. Checklist de vérification côté consommateur

1. **Chercher les réassignations de flux et de templates LF** (specs inclus — c'est là que ça se cache) :
   ```bash
   grep -rnE '\.(outOptions\$|options\$|loading\$|disabled\$|clue\$|clueChange\$|paging\$|onSelectValue|onOpen|onClose|onDismiss|onBackdropClick|totalCount\$|toasts\$|title\$|optionTpl|valueTpl|panelHeaderTpl|panelFooterTpl|isFilterPillEmpty|groupingSignal)\s*=[^=>]' src/
   ```
2. **Chercher les réassignations de refs** (motif typique en test) :
   ```bash
   grep -rnE '\.(ccPicker|vcPicker|ccDisplayer|vcDisplayer|ccClearer|vcClearer|clearerEltRef|suffixEltRef|optionsQLVR|timePickerInput|searchInput|inputElementRef)\s*=[^=>]' src/
   ```
3. **Trier les résultats** : une propriété **redéclarée localement** dans la classe est un faux positif (cas tolérant du §1). Vérifier la déclaration avant de conclure.
4. **Ne pas se fier au seul `ng build`** : lancer aussi la compilation des specs (`tsc -p tsconfig.spec.json --noEmit`).
5. **Auditer les contournements existants** : `as any` et `Object.assign(luRef, …)` passent le compilateur en masquant la contrainte — ils indiquent un point d'extension à faire remonter à l'équipe LF plutôt qu'à laisser en place.

---

## 7. Contexte interne (pour information)

Règle ajoutée dans `eslint.config.mjs` :

```js
'@angular-eslint/prefer-signals': ['error', {
	preferReadonlySignalProperties: true,
	preferInputSignals: false,   // désactivé : migration inputs déjà faite/en cours
	preferQuerySignals: false,   // désactivé : refs @ViewChild non-signal encore présentes
	useTypeChecking: true,
}],
```

Seul `preferReadonlySignalProperties` est actif : la règle **impose** `readonly` sur toute propriété portant un signal. C'est ce qui explique le volume (~360 propriétés) et le fait que l'essentiel soit inoffensif pour les consommateurs. Les `readonly` réellement discutables sont ceux ajoutés **hors** signaux (§2a et §2b), posés à la main et non exigés par la règle.
